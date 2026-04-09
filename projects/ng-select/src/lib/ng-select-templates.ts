import { Directive, ElementRef, inject, Input, OnChanges, TemplateRef } from '@angular/core';
import { escapeHTML } from './ng-select-utils';

@Directive({
  selector: '[ngItemLabel]',
})
export class NgItemLabel implements OnChanges {
  @Input() ngItemLabel = '';
  @Input() escape = true;

  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnChanges() {
    this.element.nativeElement.innerHTML = this.escape
      ? escapeHTML(this.ngItemLabel)
      : this.ngItemLabel;
  }
}

@Directive({
  selector: '[ng-option-tmp]',
})
export class NgOptionTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-optgroup-tmp]',
})
export class NgOptgroupTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-label-tmp]',
})
export class NgLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-multi-label-tmp]',
})
export class NgMultiLabelTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-header-tmp]',
})
export class NgHeaderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-footer-tmp]',
})
export class NgFooterTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-notfound-tmp]',
})
export class NgNotFoundTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-placeholder-tmp]',
})
export class NgPlaceholderTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-typetosearch-tmp]',
})
export class NgTypeToSearchTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-loadingtext-tmp]',
})
export class NgLoadingTextTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-tag-tmp]',
})
export class NgTagTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-loadingspinner-tmp]',
})
export class NgLoadingSpinnerTemplate {
  template = inject(TemplateRef);
}

@Directive({
  selector: '[ng-clearbutton-tmp]',
})
export class NgClearButtonTemplate {
  template = inject(TemplateRef);
}
