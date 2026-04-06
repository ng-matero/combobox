export interface NgOptionItem {
  [name: string]: any;

  index?: number | null;
  htmlId?: string;
  selected?: boolean;
  disabled?: boolean;
  marked?: boolean;
  label?: string;
  value?: string | any;
  parent?: NgOptionItem | null;
  children?: NgOptionItem[] | null;
}

export type DropdownPanelPosition = 'top' | 'right' | 'bottom' | 'left' | 'auto';

export type AddTagFn = (term: string) => any | Promise<any>;

export type CompareWithFn = (a: any, b: any) => boolean;

export type GroupValueFn = (key: string | any, children: any[]) => string | any;

export type SearchFn = (term: string, item: any) => boolean;

export type TrackByFn = (item: any) => any;

export interface SearchEvent {
  term: string;
  items: any[];
}

export interface ScrollEvent {
  start: number;
  end: number;
}
