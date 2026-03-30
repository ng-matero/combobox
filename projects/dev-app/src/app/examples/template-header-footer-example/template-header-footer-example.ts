import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFooterTemplate, NgHeaderTemplate, NgSelect } from '@ng-matero/ng-select';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-template-header-footer-example',
  templateUrl: './template-header-footer-example.html',
  styleUrl: './template-header-footer-example.scss',
  imports: [NgSelect, FormsModule, NgHeaderTemplate, NgFooterTemplate],
})
export class TemplateHeaderFooterExample implements OnInit {
  people: Person[] = [];
  selectedPeople: string[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.getPeople().subscribe(items => {
      this.people = items;
    });
  }

  selectAll() {
    this.selectedPeople = this.people.map(x => x.name);
  }

  unselectAll() {
    this.selectedPeople = [];
  }
}
