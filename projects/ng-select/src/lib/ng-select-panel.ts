import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { animationFrameScheduler, asapScheduler, fromEvent, merge, Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { NgSelectPanelUtils } from './ng-select-panel-utils';
import { DropdownPanelPosition, NgOptionItem, ScrollEvent } from './ng-select-types';
import { isDefined } from './ng-select-utils';

const CSS_POSITIONS: readonly string[] = ['top', 'right', 'bottom', 'left'];
const SCROLL_SCHEDULER =
  typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;

@Component({
  selector: 'ng-select-panel',
  template: `
    @if (headerTemplate) {
      <div class="ng-select-panel-header">
        <ng-container
          [ngTemplateOutlet]="headerTemplate"
          [ngTemplateOutletContext]="{ searchTerm: filterValue }"
        />
      </div>
    }
    <div
      #scrollHost
      class="ng-select-listbox"
      [class.ng-select-virtual-scroll-host]="virtualScroll"
      [attr.id]="listboxId"
      role="listbox"
    >
      <div #scrollSpacer [class.ng-select-virtual-scroll-spacer]="virtualScroll"></div>
      <div #scrollContent [class.ng-select-virtual-scroll-content]="virtualScroll && items.length">
        <ng-content />
      </div>
    </div>
    @if (footerTemplate) {
      <div class="ng-select-panel-footer">
        <ng-container
          [ngTemplateOutlet]="footerTemplate"
          [ngTemplateOutletContext]="{ searchTerm: filterValue }"
        />
      </div>
    }
  `,
  imports: [NgTemplateOutlet],
  host: {
    class: 'ng-select-panel',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSelectPanel implements OnInit, OnChanges, OnDestroy {
  @Input() listboxId = '';
  @Input() items: NgOptionItem[] = [];
  @Input() markedItem?: NgOptionItem;
  @Input() position: DropdownPanelPosition = 'auto';
  @Input() appendTo?: string;
  @Input() bufferAmount = 4;
  @Input({ transform: booleanAttribute }) virtualScroll = false;
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;
  @Input() filterValue: string | null = null;

  @Output() update = new EventEmitter<NgOptionItem[]>();
  @Output() scroll = new EventEmitter<ScrollEvent>();
  @Output() scrollToEnd = new EventEmitter<void>();
  @Output() outsideClick = new EventEmitter<void>();

  @ViewChild('scrollHost', { read: ElementRef, static: true })
  scrollHostElRef!: ElementRef<HTMLElement>;
  @ViewChild('scrollContent', { read: ElementRef, static: true })
  scrollContentElRef!: ElementRef<HTMLElement>;
  @ViewChild('scrollSpacer', { read: ElementRef, static: true })
  scrollSpacerElRef!: ElementRef<HTMLElement>;

  private _document = inject(DOCUMENT, { optional: true });
  private _renderer = inject(Renderer2);
  private _zone = inject(NgZone);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _panelUtils = inject(NgSelectPanelUtils);

  private readonly _destroy$ = new Subject<void>();
  private readonly _dropdown = this._elementRef.nativeElement;
  private _select!: HTMLElement;
  private _parent!: HTMLElement;
  private _scrollHost!: HTMLElement;
  private _scrollContent!: HTMLElement;
  private _scrollSpacer!: HTMLElement;
  private _scrollToEndFired = false;
  private _updateScrollHeight = false;
  private _lastScrollPosition = 0;

  get currentPosition() {
    return this._currentPosition;
  }
  private _currentPosition: DropdownPanelPosition = 'auto';

  private get itemsLength() {
    return this._itemsLength;
  }
  private set itemsLength(value: number) {
    if (value !== this._itemsLength) {
      this._itemsLength = value;
      this._onItemsLengthChanged();
    }
  }
  private _itemsLength!: number;

  private get _startOffset() {
    if (this.markedItem) {
      const { itemHeight, panelHeight } = this._panelUtils.dimensions;
      const offset = this.markedItem.index! * itemHeight;
      return panelHeight > offset ? 0 : offset;
    }
    return 0;
  }

  ngOnInit() {
    this._select = this._dropdown.parentElement!;
    this._scrollHost = this.scrollHostElRef.nativeElement;
    this._scrollContent = this.scrollContentElRef.nativeElement;
    this._scrollSpacer = this.scrollSpacerElRef.nativeElement;
    this._handleScroll();
    this._handleOutsideClick();
    this._appendDropdown();
    this._setupMousedownListener();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      const change = changes['items'];
      this._onItemsChange(change.currentValue, change.firstChange);
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    if (this.appendTo) {
      this._renderer.removeChild(this._dropdown.parentNode, this._dropdown);
    }
  }

  scrollTo(option?: NgOptionItem, startFromOption = false) {
    if (!option) {
      return;
    }

    const index = this.items.indexOf(option);
    if (index < 0 || index >= this.itemsLength) {
      return;
    }

    let scrollTo;
    if (this.virtualScroll) {
      const itemHeight = this._panelUtils.dimensions.itemHeight;
      scrollTo = this._panelUtils.getScrollTo(
        index * itemHeight,
        itemHeight,
        this._lastScrollPosition
      );
    } else {
      const item = this._dropdown.querySelector<HTMLElement>(`#${option.htmlId}`)!;
      const lastScroll = startFromOption ? item.offsetTop : this._lastScrollPosition;
      scrollTo = this._panelUtils.getScrollTo(item.offsetTop, item.clientHeight, lastScroll);
    }

    if (isDefined(scrollTo)) {
      this._scrollHost.scrollTop = scrollTo!;
    }
  }

  scrollToTag() {
    const panel = this._scrollHost;
    panel.scrollTop = panel.scrollHeight - panel.clientHeight;
  }

  adjustPosition() {
    this._updateYPosition();
  }

  private _handleDropdownPosition() {
    this._currentPosition = this._calculateCurrentPosition(this._dropdown);
    if (CSS_POSITIONS.includes(this._currentPosition)) {
      this._updateDropdownClass(this._currentPosition);
    } else {
      this._updateDropdownClass('bottom');
    }

    if (this.appendTo) {
      this._updateYPosition();
    }

    this._dropdown.style.opacity = '1';
  }

  private _updateDropdownClass(currentPosition: string) {
    CSS_POSITIONS.forEach(position => {
      const REMOVE_CSS_CLASS = `ng-select-${position}`;
      this._renderer.removeClass(this._dropdown, REMOVE_CSS_CLASS);
      this._renderer.removeClass(this._select, REMOVE_CSS_CLASS);
    });

    const ADD_CSS_CLASS = `ng-select-${currentPosition}`;
    this._renderer.addClass(this._dropdown, ADD_CSS_CLASS);
    this._renderer.addClass(this._select, ADD_CSS_CLASS);
  }

  private _handleScroll() {
    this._zone.runOutsideAngular(() => {
      fromEvent(this._scrollHost, 'scroll')
        .pipe(takeUntil(this._destroy$), auditTime(0, SCROLL_SCHEDULER))
        .subscribe(e => {
          const path = (e as any).path || (e.composedPath && e.composedPath());
          if (!path || (path.length === 0 && !e.target)) {
            return;
          }
          const scrollTop =
            !path || path.length === 0 ? (e.target as HTMLElement).scrollTop : path[0].scrollTop;
          this._onContentScrolled(scrollTop);
        });
    });
  }

  private _handleOutsideClick() {
    if (!this._document) {
      return;
    }

    this._zone.runOutsideAngular(() => {
      merge(
        fromEvent(this._document!, 'touchstart', { capture: true }),
        fromEvent(this._document!, 'click', { capture: true })
      )
        .pipe(takeUntil(this._destroy$))
        .subscribe($event => this._checkToClose($event));
    });
  }

  private _checkToClose($event: any) {
    if (this._select.contains($event.target) || this._dropdown.contains($event.target)) {
      return;
    }

    const path = $event.path || ($event.composedPath && $event.composedPath());
    if (
      $event.target &&
      $event.target.shadowRoot &&
      path &&
      path[0] &&
      this._select.contains(path[0])
    ) {
      return;
    }

    this._zone.run(() => this.outsideClick.emit());
  }

  private _onItemsChange(items: NgOptionItem[], firstChange: boolean) {
    this.items = items || [];
    this._scrollToEndFired = false;
    this.itemsLength = items.length;

    if (this.virtualScroll) {
      this._updateItemsRange(firstChange);
    } else {
      this._setVirtualHeight();
      this._updateItems(firstChange);
    }
  }

  private _updateItems(firstChange: boolean) {
    this.update.emit(this.items);
    if (firstChange === false) {
      return;
    }

    this._zone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        const panelHeight = this._scrollHost.clientHeight;
        this._panelUtils.setDimensions(0, panelHeight);
        this._handleDropdownPosition();
        this.scrollTo(this.markedItem, firstChange);
      });
    });
  }

  private _updateItemsRange(firstChange: boolean) {
    this._zone.runOutsideAngular(() => {
      this._measureDimensions().then(() => {
        if (firstChange) {
          this._renderItemsRange(this._startOffset);
          this._handleDropdownPosition();
        } else {
          this._renderItemsRange();
        }
      });
    });
  }

  private _onContentScrolled(scrollTop: number) {
    if (this.virtualScroll) {
      this._renderItemsRange(scrollTop);
    }
    this._lastScrollPosition = scrollTop;
    this._fireScrollToEnd(scrollTop);
  }

  private _updateVirtualHeight(height: number) {
    if (this._updateScrollHeight) {
      this._scrollSpacer.style.height = `${height}px`;
      this._updateScrollHeight = false;
    }
  }

  private _setVirtualHeight() {
    if (!this._scrollSpacer) {
      return;
    }

    this._scrollSpacer.style.height = `0px`;
  }

  private _onItemsLengthChanged() {
    this._updateScrollHeight = true;
  }

  private _renderItemsRange(scrollTop?: number) {
    if (scrollTop && this._lastScrollPosition === scrollTop) {
      return;
    }

    scrollTop = scrollTop || this._scrollHost.scrollTop;
    const range = this._panelUtils.calculateItems(scrollTop, this.itemsLength, this.bufferAmount);
    this._updateVirtualHeight(range.scrollHeight);
    this._scrollContent.style.transform = `translateY(${range.topPadding}px)`;

    this._zone.run(() => {
      this.update.emit(this.items.slice(range.start, range.end));
      this.scroll.emit({ start: range.start, end: range.end });
    });

    if (isDefined(scrollTop) && this._lastScrollPosition === 0) {
      this._scrollHost.scrollTop = scrollTop;
      this._lastScrollPosition = scrollTop;
    }
  }

  private _measureDimensions() {
    if (this._panelUtils.dimensions.itemHeight > 0 || this.itemsLength === 0) {
      return Promise.resolve(this._panelUtils.dimensions);
    }

    const [first] = this.items;
    this.update.emit([first]);

    return Promise.resolve().then(() => {
      const option = this._dropdown.querySelector(`#${first.htmlId}`)!;
      const optionHeight = option.clientHeight;
      this._scrollSpacer.style.height = `${optionHeight * this.itemsLength}px`;
      const panelHeight = this._scrollHost.clientHeight;
      this._panelUtils.setDimensions(optionHeight, panelHeight);

      return this._panelUtils.dimensions;
    });
  }

  private _fireScrollToEnd(scrollTop: number) {
    if (this._scrollToEndFired || scrollTop === 0) {
      return;
    }

    const padding = this.virtualScroll ? this._scrollSpacer : this._scrollContent;

    if (scrollTop + this._dropdown.clientHeight >= padding.clientHeight - 1) {
      this._zone.run(() => this.scrollToEnd.emit());
      this._scrollToEndFired = true;
    }
  }

  private _calculateCurrentPosition(dropdownEl: HTMLElement) {
    if (this.position !== 'auto') {
      return this.position;
    }
    const selectRect = this._select.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const offsetTop = selectRect.top + window.pageYOffset;
    const height = selectRect.height;
    const dropdownHeight = dropdownEl.getBoundingClientRect().height;
    if (offsetTop + height + dropdownHeight > scrollTop + document.documentElement.clientHeight) {
      return 'top';
    } else {
      return 'bottom';
    }
  }

  private _appendDropdown() {
    if (!this.appendTo) {
      return;
    }

    this._parent = this._dropdown.shadowRoot
      ? this._dropdown.shadowRoot.querySelector(this.appendTo)!
      : document.querySelector(this.appendTo)!;

    if (!this._parent) {
      throw new Error(`appendTo selector ${this.appendTo} did not found any parent element`);
    }

    this._updateXPosition();
    this._parent.appendChild(this._dropdown);
  }

  private _updateXPosition() {
    const select = this._select.getBoundingClientRect();
    const parent = this._parent.getBoundingClientRect();
    const offsetLeft = select.left - parent.left;

    this._dropdown.style.left = offsetLeft + 'px';
    this._dropdown.style.width = select.width + 'px';
    this._dropdown.style.minWidth = select.width + 'px';
  }

  private _updateYPosition() {
    const select = this._select.getBoundingClientRect();
    const parent = this._parent.getBoundingClientRect();
    const delta = select.height;

    if (this._currentPosition === 'top') {
      const offsetBottom = parent.bottom - select.bottom;
      this._dropdown.style.bottom = offsetBottom + delta + 'px';
      this._dropdown.style.top = 'auto';
    } else if (this._currentPosition === 'bottom') {
      const offsetTop = select.top - parent.top;
      this._dropdown.style.top = offsetTop + delta + 'px';
      this._dropdown.style.bottom = 'auto';
    }
  }

  private _setupMousedownListener(): void {
    this._zone.runOutsideAngular(() => {
      fromEvent(this._dropdown, 'mousedown')
        .pipe(takeUntil(this._destroy$))
        .subscribe(event => {
          const target = event.target as HTMLElement;
          if (target.tagName === 'INPUT') {
            return;
          }
          event.preventDefault();
        });
    });
  }
}
