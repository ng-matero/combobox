import { Component, inject, OnInit } from '@angular/core';
import { DataService, Person } from '../data.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-data-source-backend-example',
  templateUrl: './data-source-backend-example.html',
  styleUrl: './data-source-backend-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class DataSourceBackendExample implements OnInit {
  people$?: Observable<Person[]>;
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }
}
