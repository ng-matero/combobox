import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-disabled-example',
  templateUrl: './multi-select-disabled-example.html',
  styleUrl: './multi-select-disabled-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectDisabledExample implements OnInit {
  people$!: Observable<any[]>;
  selectedPeople: any[] = [];
  disable = true;

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
    this.setSelectedPeople();
  }

  toggleModel() {
    if (this.selectedPeople.length > 0) {
      this.selectedPeople = [];
    } else {
      this.setSelectedPeople();
    }
  }

  setSelectedPeople() {
    this.selectedPeople = [
      { id: '5a15b13c2340978ec3d2c0ea', name: 'Rochelle Estes', disabled: true },
      { id: '5a15b13c663ea0af9ad0dae8', name: 'Mendoza Ruiz' },
      { id: '5a15b13c728cd3f43cc0fe8a', name: 'Marquez Nolan', disabled: true },
    ];
  }
}
