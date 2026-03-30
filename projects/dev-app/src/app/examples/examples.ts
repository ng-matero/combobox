import { AppendToExample } from './append-to-example/append-to-example';
import { BindingsCustomExample } from './bindings-custom-example/bindings-custom-example';
import { BindingsDefaultExample } from './bindings-default-example/bindings-default-example';
import { BindingsNestedExample } from './bindings-nested-example/bindings-nested-example';
import { DataSourceArrayExample } from './data-source-array-example/data-source-array-example';
import { DataSourceBackendExample } from './data-source-backend-example/data-source-backend-example';
import { DataSourceOptionsExample } from './data-source-options-example/data-source-options-example';
import { DropdownPositionExample } from './dropdown-position-example/dropdown-position-example';
import { FixedPlaceholderExample } from './fixed-placeholder-example/fixed-placeholder-example';
import { FormsAsyncDataExample } from './forms-async-data-example/forms-async-data-example';
import { FormsCustomTemplateExample } from './forms-custom-template-example/forms-custom-template-example';
import { FormsMultiSelectExample } from './forms-multi-select-example/forms-multi-select-example';
import { FormsSingleSelectExample } from './forms-single-select-example/forms-single-select-example';
import { FormsWithOptionsExample } from './forms-with-options-example/forms-with-options-example';
import { GroupChildrenExample } from './group-children-example/group-children-example';
import { GroupDefaultExample } from './group-default-example/group-default-example';
import { GroupFunctionExample } from './group-function-example/group-function-example';
import { GroupSelectableExample } from './group-selectable-example/group-selectable-example';
import { GroupSelectableHiddenExample } from './group-selectable-hidden-example/group-selectable-hidden-example';
import { MultiCheckboxExample } from './multi-checkbox-example/multi-checkbox-example';
import { MultiCheckboxGroupExample } from './multi-checkbox-group-example/multi-checkbox-group-example';
import { MultiSelectCustomExample } from './multi-select-custom-example/multi-select-custom-example';
import { MultiSelectDefaultExample } from './multi-select-default-example/multi-select-default-example';
import { MultiSelectDisabledExample } from './multi-select-disabled-example/multi-select-disabled-example';
import { MultiSelectHiddenExample } from './multi-select-hidden-example/multi-select-hidden-example';
import { MultiSelectLimitExample } from './multi-select-limit-example/multi-select-limit-example';
import { MultiSelectTemplateExample } from './multi-select-template-example/multi-select-template-example';
import { OutputEventsExample } from './output-events-example/output-events-example';
import { SearchAutocompleteExample } from './search-autocomplete-example/search-autocomplete-example';
import { SearchCustomExample } from './search-custom-example/search-custom-example';
import { SearchDefaultExample } from './search-default-example/search-default-example';
import { SearchEditableExample } from './search-editable-example/search-editable-example';
import { TagsBackendExample } from './tags-backend-example/tags-backend-example';
import { TagsClosedDropdownExample } from './tags-closed-dropdown-example/tags-closed-dropdown-example';
import { TagsCustomExample } from './tags-custom-example/tags-custom-example';
import { TagsDefaultExample } from './tags-default-example/tags-default-example';
import { TemplateClearExample } from './template-clear-example/template-clear-example';
import { TemplateDisplayExample } from './template-display-example/template-display-example';
import { TemplateHeaderFooterExample } from './template-header-footer-example/template-header-footer-example';
import { TemplateLabelExample } from './template-label-example/template-label-example';
import { TemplateLoadingExample } from './template-loading-example/template-loading-example';
import { TemplateOptgroupExample } from './template-optgroup-example/template-optgroup-example';
import { TemplateOptionExample } from './template-option-example/template-option-example';
import { TemplatePlaceholderExample } from './template-placeholder-example/template-placeholder-example';
import { TemplateSearchExample } from './template-search-example/template-search-example';
import { VirtualScrollExample } from './virtual-scroll-example/virtual-scroll-example';

export interface Example {
  component: any;
  title: string;
}

export const EXAMPLE_COMPONENTS: Record<string, Example> = {
  'data-source-backend-example': {
    component: DataSourceBackendExample,
    title: 'Backend data with async pipe',
  },
  'data-source-array-example': {
    component: DataSourceArrayExample,
    title: 'Array of objects',
  },
  'data-source-options-example': {
    component: DataSourceOptionsExample,
    title: 'Display data using ng-option',
  },
  'forms-with-options-example': {
    component: FormsWithOptionsExample,
    title: 'Reactive form using ng-option',
  },
  'forms-single-select-example': {
    component: FormsSingleSelectExample,
    title: 'Single select with required validation',
  },
  'forms-multi-select-example': {
    component: FormsMultiSelectExample,
    title: 'Multi select with clear button',
  },
  'forms-async-data-example': {
    component: FormsAsyncDataExample,
    title: 'Reactive forms using async data',
  },
  'forms-custom-template-example': {
    component: FormsCustomTemplateExample,
    title: 'Reactive forms with custom template',
  },
  'bindings-default-example': {
    component: BindingsDefaultExample,
    title: 'Bind to default values',
  },
  'bindings-custom-example': {
    component: BindingsCustomExample,
    title: 'Bind to custom values',
  },
  'bindings-nested-example': {
    component: BindingsNestedExample,
    title: 'Bind to nested properties',
  },
  'search-default-example': {
    component: SearchDefaultExample,
    title: 'Default search example',
  },
  'search-custom-example': {
    component: SearchCustomExample,
    title: 'Search across multiple fields using [searchFn]',
  },
  'search-autocomplete-example': {
    component: SearchAutocompleteExample,
    title: 'Custom server-side search',
  },
  'search-editable-example': {
    component: SearchEditableExample,
    title: 'Editable search value',
  },
  'tags-default-example': {
    component: TagsDefaultExample,
    title: 'Default tags',
  },
  'tags-custom-example': {
    component: TagsCustomExample,
    title: 'Custom tags',
  },
  'tags-backend-example': {
    component: TagsBackendExample,
    title: 'Server side tags',
  },
  'tags-closed-dropdown-example': {
    component: TagsClosedDropdownExample,
    title: 'Tags without dropdown panel',
  },
  'template-label-example': {
    component: TemplateLabelExample,
    title: 'Custom label template',
  },
  'template-placeholder-example': {
    component: TemplatePlaceholderExample,
    title: 'Custom placeholder template',
  },
  'template-option-example': {
    component: TemplateOptionExample,
    title: 'Custom option template',
  },
  'template-optgroup-example': {
    component: TemplateOptgroupExample,
    title: 'Custom optgroup template',
  },
  'template-header-footer-example': {
    component: TemplateHeaderFooterExample,
    title: 'Custom header footer template',
  },
  'template-display-example': {
    component: TemplateDisplayExample,
    title: 'Custom info display templates',
  },
  'template-search-example': {
    component: TemplateSearchExample,
    title: 'Custom search control',
  },
  'template-loading-example': {
    component: TemplateLoadingExample,
    title: 'Custom loading spinner',
  },
  'template-clear-example': {
    component: TemplateClearExample,
    title: 'Custom clear button',
  },
  'multi-select-default-example': {
    component: MultiSelectDefaultExample,
    title: 'Multi select',
  },
  'multi-select-hidden-example': {
    component: MultiSelectHiddenExample,
    title: 'Hidden selected items',
  },
  'multi-select-limit-example': {
    component: MultiSelectLimitExample,
    title: 'Multi select with limited number of selections',
  },
  'multi-select-disabled-example': {
    component: MultiSelectDisabledExample,
    title: 'Disabled select',
  },
  'multi-select-template-example': {
    component: MultiSelectTemplateExample,
    title: 'Custom selected item template',
  },
  'multi-select-custom-example': {
    component: MultiSelectCustomExample,
    title: 'Custom selected items template',
  },
  'multi-checkbox-example': {
    component: MultiCheckboxExample,
    title: 'Multi select with checkboxes',
  },
  'multi-checkbox-group-example': {
    component: MultiCheckboxGroupExample,
    title: 'Grouped multi select with checkboxes',
  },
  'output-events-example': {
    component: OutputEventsExample,
    title: 'Output events',
  },
  'virtual-scroll-example': {
    component: VirtualScrollExample,
    title: 'Virtual scroll',
  },
  'dropdown-position-example': {
    component: DropdownPositionExample,
    title: 'Dropdown position',
  },
  'fixed-placeholder-example': {
    component: FixedPlaceholderExample,
    title: 'Fixed Placeholder',
  },
  'append-to-example': {
    component: AppendToExample,
    title: 'Append to position',
  },
  'group-default-example': {
    component: GroupDefaultExample,
    title: 'Group by item key',
  },
  'group-function-example': {
    component: GroupFunctionExample,
    title: 'Group by function expression',
  },
  'group-selectable-example': {
    component: GroupSelectableExample,
    title: 'Selectable groups',
  },
  'group-selectable-hidden-example': {
    component: GroupSelectableHiddenExample,
    title: 'Selectable groups with hidden selected items',
  },
  'group-children-example': {
    component: GroupChildrenExample,
    title: 'Items with already grouped children array',
  },
};
