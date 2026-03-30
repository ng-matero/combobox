import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-hidden-example',
  templateUrl: './multi-select-hidden-example.html',
  styleUrl: './multi-select-hidden-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectHiddenExample implements OnInit {
  people$!: Observable<any[]>;
  selectedPeople = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
  }
}
