import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-append-to-example',
  templateUrl: './append-to-example.html',
  styleUrl: './append-to-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class AppendToExample implements OnInit {
  people: any = [];
  selected: any;
  selected2: any;
  selected3: any;

  private dataService = inject(DataService);

  ngOnInit() {
    this.people = this.dataService.getPeople();
  }
}
