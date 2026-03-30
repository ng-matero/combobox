import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-tags-default-example',
  templateUrl: './tags-default-example.html',
  styleUrl: './tags-default-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class TagsDefaultExample implements OnInit {
  selectedCompany: any;

  ngOnInit() {}
}
