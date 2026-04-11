import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectLabelTemplate, NgSelectOptionTemplate, NgSelect } from '@ng-matero/ng-select';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-template-example',
  templateUrl: './multi-select-template-example.html',
  styleUrl: './multi-select-template-example.scss',
  imports: [NgSelect, FormsModule, NgSelectLabelTemplate, NgSelectOptionTemplate, AsyncPipe],
})
export class MultiSelectTemplateExample implements OnInit {
  githubUsers$!: Observable<any[]>;
  selectedUsers = ['anjmao'];

  private dataService = inject(DataService);

  ngOnInit() {
    this.githubUsers$ = this.dataService.getGithubAccounts('anjm');
  }
}
