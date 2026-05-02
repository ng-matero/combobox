import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-append-to-example',
  templateUrl: './append-to-example.html',
  styleUrl: './append-to-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class AppendToExample {
  private dataService = inject(DataService);
  people$ = this.dataService.getPeople();
  selected: any;
  selected2: any;
  selected3: any;
}
