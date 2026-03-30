import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-app-search-editable-example',
  templateUrl: './search-editable-example.html',
  styleUrl: './search-editable-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class SearchEditableExample implements OnInit {
  people$!: Observable<Person[]>;
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }
}
