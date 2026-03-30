import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-multi-select-limit-example',
  templateUrl: './multi-select-limit-example.html',
  styleUrl: './multi-select-limit-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectLimitExample implements OnInit {
  people$!: Observable<any[]>;
  selectedPeople: any[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }

  clearModel() {
    this.selectedPeople = [];
  }
}
