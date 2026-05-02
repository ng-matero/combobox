import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectLabelTemplate, NgSelectOptionTemplate } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-template-example',
  templateUrl: './multi-select-template-example.html',
  styleUrl: './multi-select-template-example.scss',
  imports: [NgSelect, FormsModule, NgSelectLabelTemplate, NgSelectOptionTemplate, AsyncPipe],
})
export class MultiSelectTemplateExample {
  private dataService = inject(DataService);
  githubUsers$ = this.dataService.getGithubAccounts('anjm');
  selectedUsers = ['anjmao'];
}
