import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-tags-custom-example',
  templateUrl: './tags-custom-example.html',
  styleUrl: './tags-custom-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class TagsCustomExample implements OnInit {
  selectedCompanies: any[] = [];
  companies: any[] = [];
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];

  ngOnInit() {
    this.companiesNames.forEach((c, i) => {
      this.companies.push({ id: i, name: c });
    });
  }

  addTagFn(name: string) {
    return { name, tag: true };
  }
}
