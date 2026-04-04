import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

interface Event {
  name: string;
  value: any;
}

@Component({
  selector: 'app-output-events-example',
  templateUrl: './output-events-example.html',
  styleUrl: './output-events-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class OutputEventsExample implements OnInit {
  selectedItems: any;
  items: any[] = [];

  events: Event[] = [];

  private dataService = inject(DataService);

  constructor() {
    this.dataService.getPeople().subscribe(items => {
      this.items = items;
    });
  }

  ngOnInit() {}

  onChange($event: Event) {
    this.events.push({ name: '(change)', value: $event });
  }

  onFocus($event: FocusEvent) {
    this.events.push({ name: '(focus)', value: $event });
  }

  onBlur($event: FocusEvent) {
    this.events.push({ name: '(blur)', value: $event });
  }

  onOpen() {
    this.events.push({ name: '(open)', value: null });
  }

  onClose() {
    this.events.push({ name: '(close)', value: null });
  }

  onAdd($event: Event) {
    this.events.push({ name: '(add)', value: $event });
  }

  onRemove($event: Event) {
    this.events.push({ name: '(remove)', value: $event });
  }

  onClear() {
    this.events.push({ name: '(clear)', value: null });
  }

  onScrollToEnd() {
    this.events.push({ name: '(scrollToEnd)', value: null });
  }

  onSearch($event: any) {
    this.events.push({ name: '(search)', value: $event });
  }
}
