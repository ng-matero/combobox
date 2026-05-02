import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectMultiLabelTemplate } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-custom-example',
  templateUrl: './multi-select-custom-example.html',
  styleUrl: './multi-select-custom-example.scss',
  imports: [FormsModule, NgSelect, NgSelectMultiLabelTemplate, AsyncPipe, SlicePipe],
})
export class MultiSelectCustomExample {
  private dataService = inject(DataService);
  githubUsers$ = this.dataService.getGithubAccounts('anjm');
  selectedUsers = ['anjmao', 'anjmittu', 'anjmendoza'];
}
