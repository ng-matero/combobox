import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOption, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-forms-with-options-example',
  templateUrl: './forms-with-options-example.html',
  styleUrl: './forms-with-options-example.scss',
  imports: [FormsModule, ReactiveFormsModule, NgSelect, NgOption],
})
export class FormsWithOptionsExample implements OnInit {
  private fb = inject(FormBuilder);

  basePath = '';
  heroForm = this.fb.group({
    heroId: 'batman',
    agree: null,
  });

  ngOnInit() {
    this.basePath = window.location.host.includes('localhost') ? '' : '/ng-select';
  }
}
