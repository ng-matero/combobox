import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectTagTemplate } from '@ng-matero/ng-select';

@Component({
  selector: 'app-tags-backend-example',
  templateUrl: './tags-backend-example.html',
  styleUrl: './tags-backend-example.scss',
  imports: [FormsModule, NgSelect, NgSelectTagTemplate, JsonPipe],
})
export class TagsBackendExample {
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];
  companies = this.companiesNames.map((c, i) => ({ id: i, name: c }));
  selectedCompanies: any[] = [];
  loading = false;

  addTagPromise(name: string) {
    return new Promise(resolve => {
      this.loading = true;
      // Simulate backend call.
      setTimeout(() => {
        resolve({ id: 5, name, valid: true });
        this.loading = false;
      }, 1000);
    });
  }
}
