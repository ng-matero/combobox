import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-tags-custom-example',
  templateUrl: './tags-custom-example.html',
  styleUrl: './tags-custom-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class TagsCustomExample {
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];
  companies = this.companiesNames.map((c, i) => ({ id: i, name: c }));
  selectedCompanies: any[] = [];

  addTagFn(name: string) {
    return { name, tag: true };
  }
}
