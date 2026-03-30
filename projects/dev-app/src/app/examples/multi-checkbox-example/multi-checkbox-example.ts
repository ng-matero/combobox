import { Component, inject, OnInit } from '@angular/core';
import { DataService, Person } from '../data.service';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { NgOptgroupTemplate, NgOptionTemplate, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-multi-checkbox-example',
  templateUrl: './multi-checkbox-example.html',
  styleUrl: './multi-checkbox-example.scss',
  imports: [NgSelect, FormsModule, NgOptgroupTemplate, NgOptionTemplate, UpperCasePipe, JsonPipe],
})
export class MultiCheckboxExample implements OnInit {
  people: Person[] = [];
  selectedPeople: string[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService
      .getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe(res => {
        this.people = res;
        this.selectedPeople = [this.people[0].id, this.people[1].id];
      });
  }
}
