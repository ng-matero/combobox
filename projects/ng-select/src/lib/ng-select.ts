import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostAttributeToken,
  inject,
  InjectionToken,
  Input,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { ItemsList } from './items-list';
import { NgDropdownPanel } from './ng-dropdown-panel';
import { NgOption } from './ng-option';
import { NgSelectConfig } from './ng-select-config';
import {
  NgClearButtonTemplate,
  NgFooterTemplate,
  NgHeaderTemplate,
  NgItemLabel,
  NgLabelTemplate,
  NgLoadingSpinnerTemplate,
  NgLoadingTextTemplate,
  NgMultiLabelTemplate,
  NgNotFoundTemplate,
  NgOptgroupTemplate,
  NgOptionTemplate,
  NgPlaceholderTemplate,
  NgTagTemplate,
  NgTypeToSearchTemplate,
} from './ng-select-templates';
import {
  AddTagFn,
  CompareWithFn,
  DropdownPanelPosition,
  GroupValueFn,
  NgOptionItem,
  ScrollEvent,
  SearchEvent,
  SearchFn,
  TrackByFn,
} from './ng-select-types';
import { isDefined, isFunction, isObject, isPromise, KeyCode } from './ng-select-utils';
import { DefaultSelectionModelFactory, SelectionModelFactory } from './selection-model';

export const SELECTION_MODEL_FACTORY = new InjectionToken<SelectionModelFactory>(
  'ng-select-selection-model'
);

let nextUniqueId = 0;

@Component({
  selector: 'ng-select',
  templateUrl: './ng-select.html',
  styleUrl: './ng-select.scss',
  imports: [NgTemplateOutlet, NgItemLabel, NgDropdownPanel],
  host: {
    'class': 'ng-select',
    '[class.ng-select-single]': '!multiple',
    '[class.ng-select-multiple]': 'multiple',
    '[class.ng-select-typeahead]': 'typeahead',
    '[class.ng-select-taggable]': 'addTag',
    '[class.ng-select-searchable]': 'searchable',
    '[class.ng-select-clearable]': 'clearable',
    '[class.ng-select-opened]': 'isOpen',
    '[class.ng-select-filtered]': 'filtered',
    '[class.ng-select-disabled]': 'disabled',
    '(keydown)': 'handleKeyDown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelect),
      multi: true,
    },
  ],
})
export class NgSelect implements OnDestroy, OnChanges, OnInit, AfterViewInit, ControlValueAccessor {
  private _cdr = inject(ChangeDetectorRef);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _config = inject(NgSelectConfig);
  readonly newSelectionModel = inject(SELECTION_MODEL_FACTORY, { optional: true });
  readonly autoFocus = inject(new HostAttributeToken('autofocus'), { optional: true });
  readonly classes = inject(new HostAttributeToken('class'), { optional: true });
  _classList: Record<string, boolean> = {};

  _uid = `ng-select-${nextUniqueId++}`;

  @Input() bindLabel = this._config.bindLabel;
  @Input() bindValue = this._config.bindValue;
  @Input() placeholder = this._config.placeholder;
  @Input() fixedPlaceholder = this._config.fixedPlaceholder ?? false;
  @Input() appendTo = this._config.appendTo;
  @Input() panelPosition: DropdownPanelPosition = 'auto';
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: booleanAttribute }) searchable = true;
  @Input({ transform: booleanAttribute }) clearable = true;
  @Input({ transform: booleanAttribute }) clearOnBackspace = true;
  @Input() clearAllText = this._config.clearAllText;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input() loadingText = this._config.loadingText;
  @Input({ transform: booleanAttribute }) closeOnSelect = true;
  @Input({ transform: booleanAttribute }) hideSelected = false;
  @Input({ transform: booleanAttribute }) selectOnTab = false;
  @Input({ transform: booleanAttribute }) openOnEnter = this._config.openOnEnter;
  @Input({ transform: booleanAttribute }) virtualScroll = this._config.virtualScroll;
  @Input({ transform: numberAttribute }) bufferAmount = 4;
  @Input({ transform: booleanAttribute }) selectableGroup = false;
  @Input({ transform: booleanAttribute }) selectableGroupAsModel = true;
  @Input({ transform: booleanAttribute }) searchWhileComposing = true;
  @Input({ transform: booleanAttribute }) editableSearchTerm = false;
  @Input({ transform: numberAttribute }) maxSelectedItems = Infinity;
  @Input({ transform: numberAttribute }) minTermLength = 0;
  @Input({ transform: booleanAttribute }) markFirst = true;
  @Input({ transform: booleanAttribute }) preventToggleOnRightClick = false;
  @Input() addTag: boolean | AddTagFn = false;
  @Input() addTagText = this._config.addTagText;
  @Input() notFoundText = this._config.notFoundText;
  @Input() typeahead?: Subject<string>;
  @Input() typeToSearchText = this._config.typeToSearchText;
  @Input() groupBy?: string | ((value: any) => any);
  @Input() groupValue?: GroupValueFn;
  @Input() searchFn: SearchFn | null = null;
  @Input() keyDownFn = (_: KeyboardEvent) => true;
  @Input() trackByFn: TrackByFn | null = null;
  @Input() appearance = this._config.appearance;
  @Input({ transform: numberAttribute }) tabIndex?: number;
  @Input() ariaLabel?: string | null;
  @Input() ariaLabelledby?: string | null;
  @Input() ariaDescribedby?: string | null;
  @Input() inputAttrs: Record<string, string> = {};

  // isOpen should allow undefined value, so avoid using booleanAttribute!
  @Input() isOpen?: boolean = false;

  @Input()
  set panelClass(value: string | string[] | Record<string, any> | undefined) {
    const newClassList: Record<string, boolean> = {};
    this.classes?.split(/\s+/).forEach(c => (newClassList[c] = true));

    if (typeof value === 'string') {
      value.split(/\s+/).forEach(c => c && (newClassList[c] = true));
    } else if (Array.isArray(value)) {
      value.forEach(c => c && (newClassList[c] = true));
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => v && (newClassList[k] = true));
    }

    this._classList = newClassList;
    this._cdr.markForCheck();
  }

  @Input()
  get inputId() {
    return this._inputId || `${this._uid}-input`;
  }
  set inputId(value: string) {
    this._inputId = value;
  }
  private _inputId = '';

  @Input()
  get items() {
    return this._items;
  }
  set items(value: readonly any[] | null | undefined) {
    this._itemsAreUsed = true;
    this._items = value ?? [];
  }
  private _items: readonly any[] = [];

  get disabled() {
    return this.readonly || this._disabled;
  }
  private _disabled = false;

  @Input()
  get compareWith() {
    return this._compareWith;
  }
  set compareWith(fn: CompareWithFn) {
    if (fn != null && !isFunction(fn)) {
      throw Error('`compareWith` must be a function.');
    }
    this._compareWith = fn;
  }
  private _compareWith!: CompareWithFn;

  @Input()
  get clearSearchOnAdd() {
    return this._clearSearchOnAdd ?? this._config.clearSearchOnAdd ?? this.closeOnSelect;
  }
  set clearSearchOnAdd(value) {
    this._clearSearchOnAdd = value;
  }
  private _clearSearchOnAdd?: boolean;

  @Input()
  get deselectOnClick() {
    return this._deselectOnClick ?? this._config.deselectOnClick ?? this.multiple;
  }
  set deselectOnClick(value) {
    this._deselectOnClick = value;
  }
  private _deselectOnClick?: boolean;

  // output events
  @Output('blur') blurEvent = new EventEmitter<FocusEvent>();
  @Output('focus') focusEvent = new EventEmitter<FocusEvent>();
  @Output('change') changeEvent = new EventEmitter<any>();
  @Output('open') openEvent = new EventEmitter<void>();
  @Output('close') closeEvent = new EventEmitter<void>();
  @Output('search') searchEvent = new EventEmitter<SearchEvent>();
  @Output('clear') clearEvent = new EventEmitter<void>();
  @Output('add') addEvent = new EventEmitter<any>();
  @Output('remove') removeEvent = new EventEmitter<any>();
  @Output() scroll = new EventEmitter<ScrollEvent>();
  @Output() scrollToEnd = new EventEmitter<void>();

  @ViewChild(forwardRef(() => NgDropdownPanel)) dropdownPanel!: NgDropdownPanel;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('clearButton') clearButton?: ElementRef<HTMLSpanElement>;
  @ContentChildren(NgOption, { descendants: true }) ngOptions?: QueryList<NgOption>;

  // custom templates
  @ContentChild(NgOptionTemplate, { read: TemplateRef })
  optionTemplate?: TemplateRef<any>;
  @ContentChild(NgOptgroupTemplate, { read: TemplateRef })
  optgroupTemplate?: TemplateRef<any>;
  @ContentChild(NgLabelTemplate, { read: TemplateRef })
  labelTemplate?: TemplateRef<any>;
  @ContentChild(NgMultiLabelTemplate, { read: TemplateRef })
  multiLabelTemplate?: TemplateRef<any>;
  @ContentChild(NgHeaderTemplate, { read: TemplateRef })
  headerTemplate?: TemplateRef<any>;
  @ContentChild(NgFooterTemplate, { read: TemplateRef })
  footerTemplate?: TemplateRef<any>;
  @ContentChild(NgNotFoundTemplate, { read: TemplateRef })
  notFoundTemplate?: TemplateRef<any>;
  @ContentChild(NgPlaceholderTemplate, { read: TemplateRef })
  placeholderTemplate?: TemplateRef<any>;
  @ContentChild(NgTypeToSearchTemplate, { read: TemplateRef })
  typeToSearchTemplate?: TemplateRef<any>;
  @ContentChild(NgLoadingTextTemplate, { read: TemplateRef })
  loadingTextTemplate?: TemplateRef<any>;
  @ContentChild(NgTagTemplate, { read: TemplateRef })
  tagTemplate?: TemplateRef<any>;
  @ContentChild(NgLoadingSpinnerTemplate, { read: TemplateRef })
  loadingSpinnerTemplate?: TemplateRef<any>;
  @ContentChild(NgClearButtonTemplate, { read: TemplateRef })
  clearButtonTemplate?: TemplateRef<any>;

  itemsList = new ItemsList(this, this.newSelectionModel?.() ?? DefaultSelectionModelFactory());
  element = this._elementRef.nativeElement;
  viewPortItems: NgOptionItem[] = [];
  searchTerm: string | null = null;
  focused?: boolean;
  escapeHTML = true;
  private _itemsAreUsed?: boolean;
  private _primitive: any;
  private _manualOpen?: boolean;
  private _pressedKeys: string[] = [];
  private _isComposing = false;
  private readonly _defaultLabel = 'label';
  private readonly _destroy$ = new Subject<void>();
  private readonly _keyPress$ = new Subject<string>();

  get selectedItems() {
    return this.itemsList.selectedItems;
  }

  get selectedValues() {
    return this.selectedItems.map(x => x.value);
  }

  get hasValue() {
    return this.selectedItems.length > 0;
  }

  get currentPanelPosition() {
    if (this.dropdownPanel) {
      return this.dropdownPanel.currentPosition;
    }
    return undefined;
  }

  get showAddTag() {
    if (!this._validTerm) {
      return false;
    }

    const term = this.searchTerm?.toLowerCase().trim();
    return (
      this.addTag &&
      !this.itemsList.filteredItems.some(x => x.label!.toLowerCase() === term) &&
      ((!this.hideSelected && this.isOpen) ||
        !this.selectedItems.some(x => x.label!.toLowerCase() === term)) &&
      !this.loading
    );
  }

  get filtered() {
    return (!!this.searchTerm && this.searchable) || this._isComposing;
  }

  private get _editableSearchTerm() {
    return this.editableSearchTerm && !this.multiple;
  }

  private get _isTypeahead() {
    return this.typeahead && this.typeahead.observers.length > 0;
  }

  private get _validTerm() {
    const term = this.searchTerm?.trim();
    return term && term.length >= this.minTermLength;
  }

  get showClearButton() {
    return this.clearable && (this.hasValue || this.searchTerm) && !this.disabled;
  }

  get showNoItemsFound() {
    const empty = this.itemsList.filteredItems.length === 0;
    return (
      ((empty && !this._isTypeahead && !this.loading) ||
        (empty && this._isTypeahead && this._validTerm && !this.loading)) &&
      !this.showAddTag
    );
  }

  get showTypeToSearch() {
    const empty = this.itemsList.filteredItems.length === 0;
    return empty && this._isTypeahead && !this._validTerm && !this.loading;
  }

  get listboxId() {
    return `${this._uid}-listbox`;
  }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  trackByOption = (_: number, item: NgOptionItem) => {
    if (this.trackByFn) {
      return this.trackByFn(item.value);
    }
    return item;
  };

  constructor() {
    this.classes?.split(/\s+/).forEach(c => (this._classList[c] = true));
  }

  ngOnInit() {
    this._handleKeyPresses();
    this._setInputAttributes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['multiple']) {
      this.itemsList.clearSelected();
    }
    if (changes['items']) {
      this._setItems(changes['items'].currentValue || []);
    }
    if (changes['isOpen']) {
      this._manualOpen = isDefined(changes['isOpen'].currentValue);
    }
    if (changes['groupBy']) {
      if (!changes['items']) {
        this._setItems([...this.items!]);
      }
    }
    if (changes['inputAttrs']) {
      this._setInputAttributes();
    }
  }

  ngAfterViewInit() {
    if (!this._itemsAreUsed) {
      this.escapeHTML = false;
      this._setItemsFromNgOptions();
    }

    if (isDefined(this.autoFocus)) {
      this.focus();
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  writeValue(value: any): void {
    this.itemsList.clearSelected();
    this._handleWriteValue(value);
    this._cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._cdr.markForCheck();
  }

  clearItem = (item?: NgOptionItem | null) => {
    const option = this.selectedItems.find(x => x.value === item);
    this.unselect(option);
  };

  handleKeyDown(e: KeyboardEvent) {
    const keyName = e.key as KeyCode;
    if (Object.values(KeyCode).includes(keyName)) {
      if (this.keyDownFn(e) === false) {
        return;
      }
      this.handleKeyCode(e);
    } else if (keyName && keyName.length === 1) {
      this._keyPress$.next(keyName.toLocaleLowerCase());
    }
  }

  handleKeyCode(e: KeyboardEvent) {
    const target = e.target;

    if (this.clearButton && this.clearButton.nativeElement === target) {
      this.handleKeyCodeClear(e);
    } else {
      this.handleKeyCodeInput(e);
    }
  }

  handleKeyCodeInput(e: KeyboardEvent) {
    switch (e.key) {
      case KeyCode.ArrowDown:
        this._handleArrowDown(e);
        break;
      case KeyCode.ArrowUp:
        this._handleArrowUp(e);
        break;
      case KeyCode.Space:
        this._handleSpace(e);
        break;
      case KeyCode.Enter:
        this._handleEnter(e);
        break;
      case KeyCode.Tab:
        this._handleTab(e);
        break;
      case KeyCode.Esc:
        this.close();
        e.preventDefault();
        break;
      case KeyCode.Backspace:
        this._handleBackspace();
        break;
    }
  }

  handleKeyCodeClear(e: KeyboardEvent) {
    switch (e.key) {
      case KeyCode.Enter:
        this.handleClearClick();
        e.preventDefault();
        break;
    }
  }

  handleMousedown(e: MouseEvent) {
    if (this.preventToggleOnRightClick && e.button === 2) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT') {
      e.preventDefault();
    }

    if (target.classList.contains('ng-clear-wrapper')) {
      this.handleClearClick();
      return;
    }

    if (target.classList.contains('ng-arrow-wrapper')) {
      this.handleArrowClick();
      return;
    }

    if (target.classList.contains('ng-value-remove')) {
      return;
    }

    if (!this.focused) {
      this.focus();
    }

    if (this.searchable) {
      this.open();
    } else {
      this.toggle();
    }
  }

  handleArrowClick() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleClearClick() {
    if (this.hasValue) {
      this.itemsList.clearSelected(true);
      this._updateNgModel();
    }
    this._clearSearch();
    this.focus();
    this.clearEvent.emit();

    this._onSelectionChanged();
  }

  clearModel() {
    if (!this.clearable) {
      return;
    }
    this.itemsList.clearSelected();
    this._updateNgModel();
  }

  toggle() {
    if (!this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    if (this.disabled || this.isOpen || this._manualOpen) {
      return;
    }

    if (!this._isTypeahead && !this.addTag && this.itemsList.noItemsToSelect) {
      return;
    }
    this.isOpen = true;
    this.itemsList.markSelectedOrDefault(this.markFirst);
    this.openEvent.emit();
    if (!this.searchTerm) {
      this.focus();
    }
    this.detectChanges();
  }

  close() {
    if (!this.isOpen || this._manualOpen) {
      return;
    }
    this.isOpen = false;
    this._isComposing = false;
    if (!this._editableSearchTerm) {
      this._clearSearch();
    } else {
      this.itemsList.resetFilteredItems();
    }
    this.itemsList.unmarkItem();
    this._onTouched();
    this.closeEvent.emit();
    this._cdr.markForCheck();
  }

  toggleItem(item: NgOptionItem) {
    if (!item || item.disabled || this.disabled) {
      return;
    }

    if (this.deselectOnClick && item.selected) {
      this.unselect(item);
    } else {
      this.select(item);
    }

    if (this._editableSearchTerm) {
      this._setSearchTermFromItems();
    }
  }

  select(item: NgOptionItem) {
    if (!item.selected) {
      this.itemsList.select(item);
      if (this.clearSearchOnAdd && !this._editableSearchTerm) {
        this._clearSearch();
      }

      this._updateNgModel();
      if (this.multiple) {
        this.addEvent.emit(item.value);
      }
    }

    if (this.closeOnSelect || this.itemsList.noItemsToSelect) {
      this.close();
    }

    this._onSelectionChanged();
  }

  focus() {
    this.searchInput.nativeElement.focus();
  }

  blur() {
    this.searchInput.nativeElement.blur();
  }

  unselect(item?: NgOptionItem | null) {
    if (!item) {
      return;
    }

    this.itemsList.unselect(item);
    this.focus();
    this._updateNgModel();
    this.removeEvent.emit(item.value);
    this._onSelectionChanged();
  }

  selectTag() {
    let tag;
    if (isFunction(this.addTag)) {
      tag = (this.addTag as AddTagFn)(this.searchTerm || '');
    } else {
      tag = this._primitive ? this.searchTerm : { [this.bindLabel as string]: this.searchTerm };
    }

    const handleTag = (item: any) =>
      this._isTypeahead || !this.isOpen
        ? this.itemsList.mapItem(item, null)
        : this.itemsList.addItem(item);
    if (isPromise(tag)) {
      tag.then(item => this.select(handleTag(item))).catch(() => {});
    } else if (tag) {
      this.select(handleTag(tag));
    }
  }

  onCompositionStart() {
    this._isComposing = true;
  }

  onCompositionEnd(term: string) {
    this._isComposing = false;
    if (this.searchWhileComposing) {
      return;
    }

    this.filter(term);
  }

  filter(term: string) {
    if (this._isComposing && !this.searchWhileComposing) {
      return;
    }

    this.searchTerm = term;
    if (this._isTypeahead && (this._validTerm || this.minTermLength === 0)) {
      this.typeahead?.next(term);
    }

    if (!this._isTypeahead) {
      this.itemsList.filter(this.searchTerm);
      if (this.isOpen) {
        this.itemsList.markSelectedOrDefault(this.markFirst);
      }
    }

    this.searchEvent.emit({ term, items: this.itemsList.filteredItems.map(x => x.value) });
    this.open();
  }

  onInputFocus(e: FocusEvent) {
    if (this.focused) {
      return;
    }

    if (this._editableSearchTerm) {
      this._setSearchTermFromItems();
    }

    this.element.classList.add('ng-select-focused');
    this.focusEvent.emit(e);
    this.focused = true;
  }

  onInputBlur(e: FocusEvent) {
    this.element.classList.remove('ng-select-focused');
    this.blurEvent.emit(e);
    if (!this.isOpen && !this.disabled) {
      this._onTouched();
    }
    if (this._editableSearchTerm) {
      this._setSearchTermFromItems();
    }
    this.focused = false;
  }

  onItemHover(item: NgOptionItem) {
    if (item.disabled) {
      return;
    }
    this.itemsList.markItem(item);
  }

  detectChanges() {
    if (!(this._cdr as any).destroyed) {
      this._cdr.detectChanges();
    }
  }

  private _setSearchTermFromItems() {
    const selected = this.selectedItems?.[0];
    this.searchTerm = selected?.label ?? null;
  }

  private _setItems(items: any[]) {
    const firstItem = items[0];
    this.bindLabel = this.bindLabel || this._defaultLabel;
    this._primitive = isDefined(firstItem)
      ? !isObject(firstItem)
      : this._primitive || this.bindLabel === this._defaultLabel;
    this.itemsList.setItems(items);
    if (items.length > 0 && this.hasValue) {
      this.itemsList.mapSelectedItems();
    }
    if (this.isOpen && isDefined(this.searchTerm) && !this._isTypeahead) {
      this.itemsList.filter(this.searchTerm!);
    }
    if (this._isTypeahead || this.isOpen) {
      this.itemsList.markSelectedOrDefault(this.markFirst);
    }
  }

  private _setItemsFromNgOptions() {
    const mapNgOptions = (options: QueryList<NgOption>) => {
      this.items = options.map(option => ({
        $ngOptionValue: option.value,
        $ngOptionLabel: option.elementRef.nativeElement.innerHTML,
        disabled: option.disabled,
      }));
      this.itemsList.setItems(this.items);
      if (this.hasValue) {
        this.itemsList.mapSelectedItems();
      }
      this.detectChanges();
    };

    const handleOptionChange = () => {
      const changedOrDestroyed = merge(this.ngOptions!.changes, this._destroy$);
      merge(...this.ngOptions!.map(option => option.stateChange$))
        .pipe(takeUntil(changedOrDestroyed))
        .subscribe(option => {
          const item = this.itemsList.findItem(option.value);
          item.disabled = option.disabled;
          item.label = option.label || item.label;
          this._cdr.detectChanges();
        });
    };

    this.ngOptions!.changes.pipe(startWith(this.ngOptions), takeUntil(this._destroy$)).subscribe(
      options => {
        this.bindLabel = this._defaultLabel;
        mapNgOptions(options);
        handleOptionChange();
      }
    );
  }

  private _isValidWriteValue(value: any) {
    if (
      !isDefined(value) ||
      (this.multiple && value === '') ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return false;
    }

    const validateBinding = (item: any) => {
      if (!isDefined(this.compareWith) && isObject(item) && this.bindValue) {
        console.warn(
          `Setting object(${JSON.stringify(item)}) as your model with bindValue is not allowed unless [compareWith] is used.`
        );
        return false;
      }
      return true;
    };

    if (this.multiple) {
      if (!Array.isArray(value)) {
        console.warn('Multiple select ngModel should be array.');
        return false;
      }
      return value.every(item => validateBinding(item));
    } else {
      return validateBinding(value);
    }
  }

  private _handleWriteValue(ngModel: any | any[]) {
    if (!this._isValidWriteValue(ngModel)) {
      return;
    }

    const select = (val: any) => {
      let item = this.itemsList.findItem(val);
      if (item) {
        this.itemsList.select(item);
      } else {
        const isValObject = isObject(val);
        const isPrimitive = !isValObject && !this.bindValue;
        if (isValObject || isPrimitive) {
          this.itemsList.select(this.itemsList.mapItem(val, null));
        } else if (this.bindValue) {
          item = {
            [this.bindLabel as string]: null,
            [this.bindValue]: val,
          };
          this.itemsList.select(this.itemsList.mapItem(item, null));
        }
      }
    };

    if (this.multiple) {
      (ngModel as any[]).forEach(item => select(item));
    } else {
      select(ngModel);
    }
  }

  private _handleKeyPresses() {
    if (this.searchable) {
      return;
    }

    this._keyPress$
      .pipe(
        takeUntil(this._destroy$),
        tap(letter => this._pressedKeys.push(letter)),
        debounceTime(200),
        filter(() => this._pressedKeys.length > 0),
        map(() => this._pressedKeys.join(''))
      )
      .subscribe(term => {
        const item = this.itemsList.findByLabel(term);
        if (item) {
          if (this.isOpen) {
            this.itemsList.markItem(item);
            this._scrollToMarked();
            this._cdr.markForCheck();
          } else {
            this.select(item);
          }
        }
        this._pressedKeys = [];
      });
  }

  private _setInputAttributes() {
    const input = this.searchInput.nativeElement;
    const attributes: Record<string, string> = {
      type: 'text',
      autocorrect: 'off',
      autocapitalize: 'off',
      autocomplete: 'off',
      ...this.inputAttrs,
    };

    for (const key of Object.keys(attributes)) {
      input.setAttribute(key, attributes[key]);
    }
  }

  private _updateNgModel() {
    const model = [];
    for (const item of this.selectedItems) {
      if (this.bindValue) {
        let value = null;
        if (item.children) {
          const groupKey = this.groupValue ? this.bindValue : (this.groupBy as string);
          value = item.value[groupKey || (this.groupBy as string)];
        } else {
          value = this.itemsList.resolveNested(item.value, this.bindValue);
        }
        model.push(value);
      } else {
        model.push(item.value);
      }
    }

    const selected = this.selectedItems.map(x => x.value);
    if (this.multiple) {
      this._onChange(model);
      this.changeEvent.emit(selected);
    } else {
      this._onChange(isDefined(model[0]) ? model[0] : null);
      this.changeEvent.emit(selected[0]);
    }

    this._cdr.markForCheck();
  }

  private _clearSearch() {
    if (!this.searchTerm) {
      return;
    }

    this._changeSearch(null);
    this.itemsList.resetFilteredItems();
  }

  private _changeSearch(searchTerm: string | null) {
    this.searchTerm = searchTerm;
    if (this._isTypeahead) {
      this.typeahead?.next(searchTerm!);
    }
  }

  private _scrollToMarked() {
    if (!this.isOpen || !this.dropdownPanel) {
      return;
    }
    this.dropdownPanel.scrollTo(this.itemsList.markedItem);
  }

  private _scrollToTag() {
    if (!this.isOpen || !this.dropdownPanel) {
      return;
    }
    this.dropdownPanel.scrollToTag();
  }

  private _onSelectionChanged() {
    if (this.isOpen && this.deselectOnClick && this.appendTo) {
      // Make sure items are rendered.
      this._cdr.detectChanges();
      this.dropdownPanel.adjustPosition();
    }
  }

  private _handleTab(e: KeyboardEvent) {
    if (this.isOpen === false) {
      if (!this.addTag) {
        return;
      }
    }

    if (this.selectOnTab) {
      if (this.itemsList.markedItem) {
        this.toggleItem(this.itemsList.markedItem);
        e.preventDefault();
      } else if (this.showAddTag) {
        this.selectTag();
        e.preventDefault();
      } else {
        this.close();
      }
    } else {
      this.close();
    }
  }

  private _handleEnter(e: KeyboardEvent) {
    if (this.isOpen || this._manualOpen) {
      if (this.itemsList.markedItem) {
        this.toggleItem(this.itemsList.markedItem);
      } else if (this.showAddTag) {
        this.selectTag();
      }
    } else if (this.openOnEnter) {
      this.open();
    } else {
      return;
    }

    e.preventDefault();
  }

  private _handleSpace(e: KeyboardEvent) {
    if (this.isOpen || this._manualOpen) {
      return;
    }
    this.open();
    e.preventDefault();
  }

  private _handleArrowDown(e: KeyboardEvent) {
    if (this._nextItemIsTag(+1)) {
      this.itemsList.unmarkItem();
      this._scrollToTag();
    } else {
      this.itemsList.markNextItem();
      this._scrollToMarked();
    }
    this.open();
    e.preventDefault();
  }

  private _handleArrowUp(e: KeyboardEvent) {
    if (!this.isOpen) {
      return;
    }

    if (this._nextItemIsTag(-1)) {
      this.itemsList.unmarkItem();
      this._scrollToTag();
    } else {
      this.itemsList.markPreviousItem();
      this._scrollToMarked();
    }
    e.preventDefault();
  }

  private _nextItemIsTag(nextStep: number) {
    const nextIndex = this.itemsList.markedIndex + nextStep;
    return !!(
      this.addTag &&
      this.searchTerm &&
      this.itemsList.markedItem &&
      (nextIndex < 0 || nextIndex === this.itemsList.filteredItems.length)
    );
  }

  private _handleBackspace() {
    if (this.searchTerm || !this.clearable || !this.clearOnBackspace || !this.hasValue) {
      return;
    }

    if (this.multiple) {
      this.unselect(this.itemsList.lastSelectedItem!);
    } else {
      this.clearModel();
    }
  }
}
