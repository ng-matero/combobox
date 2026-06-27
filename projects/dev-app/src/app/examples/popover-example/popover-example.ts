import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-popover-example',
  templateUrl: './popover-example.html',
  styleUrl: './popover-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class PopoverExample {
  private dataService = inject(DataService);
  people$ = this.dataService.getPeople();
  selected1: any;
  selected2: any;
}
