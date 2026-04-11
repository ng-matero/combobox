import { Directive, ElementRef, inject, Input, OnChanges, TemplateRef } from '@angular/core';
import { escapeHTML } from './ng-select-utils';

@Directive({
  selector: '[ngSelectLabelValue]',
})
export class NgSelectLabelRenderer implements OnChanges {
  @Input() ngSelectLabelValue = '';
  @Input() ngSelectLabelEscape = true;

  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnChanges() {
    this.element.nativeElement.innerHTML = this.ngSelectLabelEscape
      ? escapeHTML(this.ngSelectLabelValue)
      : this.ngSelectLabelValue;
  }
}

@Directive({
  selector: '[ng-option-tmp]',
})
export class NgSelectOptionTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-optgroup-tmp]',
})
export class NgSelectOptgroupTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-label-tmp]',
})
export class NgSelectLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-multi-label-tmp]',
})
export class NgSelectMultiLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-header-tmp]',
})
export class NgSelectPanelHeaderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-footer-tmp]',
})
export class NgSelectPanelFooterTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-notfound-tmp]',
})
export class NgSelectNotFoundTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-placeholder-tmp]',
})
export class NgSelectPlaceholderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-typetosearch-tmp]',
})
export class NgSelectTypeToSearchTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-loadingtext-tmp]',
})
export class NgSelectLoadingTextTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-tag-tmp]',
})
export class NgSelectTagTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-loadingspinner-tmp]',
})
export class NgSelectLoadingTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-clearbutton-tmp]',
})
export class NgSelectClearButtonTemplate {
  template = inject(TemplateRef);
}
