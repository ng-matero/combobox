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
  selector: '[ngSelectOption]',
})
export class NgSelectOptionTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectOptgroup]',
})
export class NgSelectOptgroupTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectLabel]',
})
export class NgSelectLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectMultiLabel]',
})
export class NgSelectMultiLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectPanelHeader]',
})
export class NgSelectPanelHeaderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectPanelFooter]',
})
export class NgSelectPanelFooterTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectNotFound]',
})
export class NgSelectNotFoundTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectPlaceholder]',
})
export class NgSelectPlaceholderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectTypeToSearch]',
})
export class NgSelectTypeToSearchTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectLoadingText]',
})
export class NgSelectLoadingTextTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectTag]',
})
export class NgSelectTagTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectLoading]',
})
export class NgSelectLoadingTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ngSelectClearButton]',
})
export class NgSelectClearButtonTemplate {
  template = inject(TemplateRef);
}
