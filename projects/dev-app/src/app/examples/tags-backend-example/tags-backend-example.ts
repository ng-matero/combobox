import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectTagTemplate } from '@ng-matero/ng-select';

@Component({
  selector: 'app-tags-backend-example',
  templateUrl: './tags-backend-example.html',
  styleUrl: './tags-backend-example.scss',
  imports: [NgSelect, FormsModule, NgSelectTagTemplate],
})
export class TagsBackendExample implements OnInit {
  selectedCompanies: any[] = [];
  companies: any[] = [];
  loading = false;
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];

  ngOnInit() {
    this.companiesNames.forEach((c, i) => {
      this.companies.push({ id: i, name: c });
    });
  }

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
