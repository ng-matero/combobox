import { NgModule } from '@angular/core';
import { NgSelect, SELECTION_MODEL_FACTORY } from './ng-select';
import { NgSelectOption } from './ng-select-option';
import { NgSelectPanel } from './ng-select-panel';
import {
  NgSelectClearButtonTemplate,
  NgSelectLabelRenderer,
  NgSelectLabelTemplate,
  NgSelectLoadingTemplate,
  NgSelectLoadingTextTemplate,
  NgSelectMultiLabelTemplate,
  NgSelectNotFoundTemplate,
  NgSelectOptgroupTemplate,
  NgSelectOptionTemplate,
  NgSelectPanelFooterTemplate,
  NgSelectPanelHeaderTemplate,
  NgSelectPlaceholderTemplate,
  NgSelectTagTemplate,
  NgSelectTypeToSearchTemplate,
} from './ng-select-templates';
import { DefaultSelectionModelFactory } from './selection-model';

@NgModule({
  imports: [
    NgSelectPanel,
    NgSelect,
    NgSelectOption,
    NgSelectOptgroupTemplate,
    NgSelectOptionTemplate,
    NgSelectLabelTemplate,
    NgSelectMultiLabelTemplate,
    NgSelectPanelHeaderTemplate,
    NgSelectPanelFooterTemplate,
    NgSelectPlaceholderTemplate,
    NgSelectClearButtonTemplate,
    NgSelectNotFoundTemplate,
    NgSelectTypeToSearchTemplate,
    NgSelectLoadingTextTemplate,
    NgSelectTagTemplate,
    NgSelectLoadingTemplate,
    NgSelectLabelRenderer,
  ],
  exports: [
    NgSelect,
    NgSelectOption,
    NgSelectOptgroupTemplate,
    NgSelectOptionTemplate,
    NgSelectLabelTemplate,
    NgSelectMultiLabelTemplate,
    NgSelectPanelHeaderTemplate,
    NgSelectPanelFooterTemplate,
    NgSelectPlaceholderTemplate,
    NgSelectClearButtonTemplate,
    NgSelectNotFoundTemplate,
    NgSelectTypeToSearchTemplate,
    NgSelectLoadingTextTemplate,
    NgSelectTagTemplate,
    NgSelectLoadingTemplate,
  ],
  providers: [
    {
      provide: SELECTION_MODEL_FACTORY,
      useValue: DefaultSelectionModelFactory,
    },
  ],
})
export class NgSelectModule {}
