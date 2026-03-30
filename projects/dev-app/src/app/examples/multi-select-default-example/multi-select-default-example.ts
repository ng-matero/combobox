import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-default-example',
  templateUrl: './multi-select-default-example.html',
  styleUrl: './multi-select-default-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectDefaultExample implements OnInit {
  people$!: Observable<any[]>;
  selectedPeople = [{ name: 'Karyn Wright' }];

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }

  clearModel() {
    this.selectedPeople = [];
  }

  changeModel() {
    this.selectedPeople = [{ name: 'New person' }];
  }
}
