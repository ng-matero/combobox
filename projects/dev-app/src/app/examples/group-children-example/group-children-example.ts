import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptgroupTemplate, NgOptionTemplate, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-group-children-example',
  templateUrl: './group-children-example.html',
  styleUrl: './group-children-example.scss',
  imports: [NgSelect, FormsModule, NgOptgroupTemplate, NgOptionTemplate, JsonPipe],
})
export class GroupChildrenExample {
  selectedProjects = [];
  projects = [
    {
      id: 'p1',
      title: 'Project A',
      subprojects: [
        { title: 'Subproject 1 of A', id: 's1p1' },
        { title: 'Subproject 2 of A', id: 's2p1' },
      ],
    },
    {
      id: 'p2',
      title: 'Project B',
      subprojects: [
        { title: 'Subproject 1 of B', id: 's1p2' },
        { title: 'Subproject 2 of B', id: 's2p2' },
      ],
    },
  ];
}
