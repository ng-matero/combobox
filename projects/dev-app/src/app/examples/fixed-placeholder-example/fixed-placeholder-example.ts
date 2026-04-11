import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectOption, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-fixed-placeholder-example',
  templateUrl: './fixed-placeholder-example.html',
  styleUrl: './fixed-placeholder-example.scss',
  imports: [FormsModule, NgSelect, NgSelectOption],
})
export class FixedPlaceholderExample {
  isPlaceholderFixed: boolean = false;
}
