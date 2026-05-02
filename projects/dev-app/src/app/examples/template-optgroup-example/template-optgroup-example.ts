import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgSelect,
  NgSelectLabelTemplate,
  NgSelectOptgroupTemplate,
  NgSelectOptionHighlight,
  NgSelectOptionTemplate,
} from '@ng-matero/ng-select';

@Component({
  selector: 'app-template-optgroup-example',
  templateUrl: './template-optgroup-example.html',
  styleUrl: './template-optgroup-example.scss',
  imports: [
    NgSelect,
    FormsModule,
    NgSelectLabelTemplate,
    NgSelectOptgroupTemplate,
    NgSelectOptionTemplate,
    NgSelectOptionHighlight,
  ],
})
export class TemplateOptgroupExample {
  cities = [
    {
      id: 1,
      name: 'Vilnius',
      avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
    },
    {
      id: 2,
      name: 'Kaunas',
      avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15',
    },
    {
      id: 3,
      name: 'Pavilnys',
      avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
    },
    {
      id: 4,
      name: 'Siauliai',
      avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
    },
  ];

  selectedCity = this.cities[2].name;
}
