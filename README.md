# Combobox

[![npm](https://img.shields.io/npm/v/@ng-matero/ng-select.svg)](https://www.npmjs.com/package/@ng-matero/ng-select)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/ng-matero/combobox/blob/main/LICENSE)

Angular Select - Lightweight all in one UI Select, Multiselect and Autocomplete

#### Quick links

[Documentation](https://github.com/ng-matero/combobox#installation) |
[Examples](https://ng-matero.github.io/combobox/)

## Installation

```bash
npm install @ng-matero/ng-select --save
```

## Inlcude styles

```scss
@use '@ng-matero/ng-select';
```

## Usage

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-matero/ng-select';

@Component({
  selector: 'your-app',
  template: `
    <!-- Using items input -->
    <ng-select [items]="cars" bindLabel="name" bindValue="id" [(ngModel)]="selectedCar" />

    <!-- Using ng-option and for loop -->
    <ng-select [(ngModel)]="selectedCar">
      @for (car of cars; track car.id) {
        <ng-option [value]="car.id">{{ car.name }}</ng-option>
      }
    </ng-select>
  `,
  imports: [FormsModule, NgSelectModule],
})
export class YourAppComponent {
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  selectedCar = 3;
}
```

## Templates

Use template directives to customize the rendering of specific components:

```html
<ng-select [items]="cars" bindLabel="name" bindValue="id" [(ngModel)]="selectedCar">
  <ng-template ngSelectLabel let-item="item">
    <img height="15" width="15" [src]="item.cover" alt="" />
    {{ item.name }}
  </ng-template>
</ng-select>
```

[View more template examples](https://ng-matero.github.io/combobox/#/templates)

## API

### Inputs

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `[addTag]` | `boolean \| AddTagFn` | `false` | Allows to create custom options. |
| `[addTagText]` | `string` | `'Add item'` | Set custom text when using tagging. |
| `[appendTo]` | `string` | `null` | Append dropdown to body or any other element using css selector. For correct positioning body should have `position:relative`. |
| `[bindValue]` | `string` | | Object property to use for selected model. By default binds to whole object. |
| `[bindLabel]` | `string` | `'label'` | Object property to use for label. |
| `[closeOnSelect]` | `boolean` | `true` | Whether to close the menu when a value is selected. |
| `[clearAllText]` | `string` | `'Clear all'` | Set custom text for clear all icon title. |
| `[clearable]` | `boolean` | `true` | Allow to clear selected value. |
| `[clearOnBackspace]` | `boolean` | `true` | Clear selected values one by one when clicking backspace. |
| `[compareWith]` | `CompareWithFn` | | A function to compare the option values with the selected values. |
| `[items]` | `any[]` | `[]` | Items array. |
| `[panelPosition]` | `PanelPosition` | `'auto'` | Set the panel position on open. |
| `[panelDisabled]` | `boolean` | `false` | Whether disable the panel opening. |
| `[panelClass]` | `string \| string[] \| Record<string, any>` | | This method takes classes set on the ng-select panel element. |
| `[groupBy]` | `string \| ((value: any) => any)` | | Allow to group items by key or function expression. |
| `[groupValue]` | `GroupValueFn` | | Function expression to provide group value. |
| `[selectableGroup]` | `boolean` | `false` | Allow to select group when groupBy is used. |
| `[selectableGroupAsModel]` | `boolean` | `true` | Indicates whether to select all children or group itself. |
| `[loading]` | `boolean` | | You can set the loading state from the outside (e.g. async items loading). |
| `[loadingText]` | `string` | `'Loading...'` | Set custom text when for loading items. |
| `[markFirst]` | `boolean` | `true` | Marks first item as focused when opening/filtering. |
| `[maxSelectedItems]` | `number` | | When `multiple = true`, allows to set a limit number of selection. |
| `[hideSelected]` | `boolean` | `false` | Allows to hide selected items. |
| `[multiple]` | `boolean` | `false` | Allows to select multiple items. |
| `[notFoundText]` | `string` | `'No items found'` | Set custom text when filter returns empty result. |
| `[placeholder]` | `string` | | Placeholder text. |
| `[searchable]` | `boolean` | `true` | Allow to search for value. |
| `[readonly]` | `boolean` | `false` | Set ng-select as readonly. Mostly used with reactive forms. |
| `[searchFn]` | `SearchFn` | `null` | Allow to clear selected value. |
| `[searchWhileComposing]` | `boolean` | `true` | Whether items should be filtered while composition started. |
| `[trackByFn]` | `TrackByFn` | `null` | Provide custom trackBy function. |
| `[clearSearchOnAdd]` | `boolean` | `true` | Clears search input when item is selected. Default `false` when `closeOnSelect` is `false`. |
| `[editableSearchTerm]` | `boolean` | `false` | Allow to edit search query if option selected. Works only if `[multiple]="false"`. |
| `[selectOnTab]` | `boolean` | `true` | Select marked dropdown item using tab. |
| `[openOnEnter]` | `boolean` | `true` | Open dropdown using enter. |
| `[typeahead]` | `Subject` | | Custom autocomplete or advanced filter. |
| `[minTermLength]` | `number` | `0` | Minimum term length to start a search. Should be used with typeahead. |
| `[typeToSearchText]` | `string` | `'Type to search'` | Set custom text when using Typeahead. |
| `[virtualScroll]` | `boolean` | `false` | Enable virtual scroll for better performance when rendering a lot of data. |
| `[bufferAmount]` | `number` | `4` | Used in virtual scrolling, the bufferAmount property controls the number of items preloaded in the background to ensure smoother and more seamless scrolling. |
| `[keyDownFn]` | `(e: KeyboardEvent) => boolean` | `true` | Provide custom keyDown function. Executed before default handler. Return false to suppress execution of default key down handlers. |
| `[fixedPlaceholder]` | `boolean` | `false` | Set placeholder visible even when an item is selected. |
| `[deselectOnClick]` | `boolean` | `false` | Deselects a selected item when it is clicked in the dropdown. Default `true` when `[multiple]="true"`. |
| `[preventToggleOnRightClick]` | `boolean` | `false` | Prevent opening of ng-select on right mouse click. |
| `[tabIndex]` | `number` | | The tabindex of ng-select input. |
| `[inputId]` | `string` | | The input id. |
| `[inputAttrs]` | `{ [key: string]: string }` | | Pass custom attributes to underlying input element. |
| `[ariaLabel]` | `string` | | `aria-label` of the ng-select input. |
| `[ariaLabelledby]` | `string` | | `aria-labelledby` of the ng-select input. |
| `[ariaDescribedby]` | `string` | | `aria-describedby` of the ng-select input. |

### Outputs

| Name | Type | Description |
| :--- | :--- | :--- |
| `(focus)` | `FocusEvent` | Fired on select focus. |
| `(blur)` | `FocusEvent` | Fired on select blur. |
| `(change)` | `any` | Fired on model change. Outputs whole model. |
| `(open)` | `void` | Fired on select dropdown open. |
| `(close)` | `void` | Fired on select dropdown close. |
| `(add)` | `any` | Fired when item is added while `[multiple]="true"`. Outputs added item. |
| `(remove)` | `any` | Fired when item is removed while `[multiple]="true"`. |
| `(search)` | `SearchEvent` | Fired while typing search term. Outputs search term with filtered items. |
| `(clear)` | `void` | Fired on clear icon click. |
| `(scroll)` | `ScrollEvent` | Fired when scrolled. Provides the start and end index of the currently available items. Can be used for loading more items in chunks before the user has scrolled all the way to the bottom of the list. |
| `(scrollToEnd)` | `void` | Fired when scrolled to the end of items. Can be used for loading more items in chunks. |

### Methods

| Name | Description |
| :--- | :--- |
| `open` | Opens the select dropdown panel. |
| `close` | Closes the select dropdown panel. |
| `focus` | Focuses the select element. |
| `blur` | Blurs the select element. |

## License

MIT
