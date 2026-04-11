import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectMultiLabelTemplate, NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-custom-example',
  templateUrl: './multi-select-custom-example.html',
  styleUrl: './multi-select-custom-example.scss',
  imports: [NgSelect, FormsModule, NgSelectMultiLabelTemplate, AsyncPipe, SlicePipe],
})
export class MultiSelectCustomExample implements OnInit {
  githubUsers$!: Observable<any[]>;
  selectedUsers = ['anjmao', 'anjmittu', 'anjmendoza'];

  private dataService = inject(DataService);

  ngOnInit() {
    this.githubUsers$ = this.dataService.getGithubAccounts('anjm');
  }
}
