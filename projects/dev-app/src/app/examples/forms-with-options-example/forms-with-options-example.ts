import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect, NgSelectOption } from '@ng-matero/ng-select';

@Component({
  selector: 'app-forms-with-options-example',
  templateUrl: './forms-with-options-example.html',
  styleUrl: './forms-with-options-example.scss',
  imports: [FormsModule, ReactiveFormsModule, NgSelect, NgSelectOption],
})
export class FormsWithOptionsExample {
  private fb = inject(FormBuilder);

  heroForm = this.fb.group({
    heroId: 'batman',
    agree: null,
  });
}
