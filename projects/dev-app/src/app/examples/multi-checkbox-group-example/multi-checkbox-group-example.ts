import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptgroupTemplate, NgOptionTemplate, NgSelect } from '@ng-matero/ng-select';
import { map } from 'rxjs/operators';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-multi-checkbox-group-example',
  templateUrl: './multi-checkbox-group-example.html',
  styleUrl: './multi-checkbox-group-example.scss',
  imports: [NgSelect, FormsModule, NgOptgroupTemplate, NgOptionTemplate, UpperCasePipe],
})
export class MultiCheckboxGroupExample implements OnInit {
  people: Person[] = [];
  selectedPeople: string[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService
      .getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe(res => {
        this.people = res;
        this.selectedPeople = [this.people[0].id];
      });
  }
}
