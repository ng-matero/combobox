import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgSelectConfig {
  placeholder?: string;
  fixedPlaceholder = true;
  notFoundText = 'No items found';
  typeToSearchText = 'Type to search';
  addTagText = 'Add item';
  loadingText = 'Loading...';
  clearAllText = 'Clear all';
  ariaLabelDropdown = 'Options List';
  virtualScroll = false;
  openOnEnter = true;
  appendTo?: string;
  bindValue?: string;
  bindLabel?: string;
  clearSearchOnAdd?: boolean;
  deselectOnClick?: boolean;
  appearance = 'underline';
}
