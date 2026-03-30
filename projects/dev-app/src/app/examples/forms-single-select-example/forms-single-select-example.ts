import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-forms-single-select-example',
  templateUrl: './forms-single-select-example.html',
  styleUrl: './forms-single-select-example.scss',
  imports: [FormsModule, ReactiveFormsModule, NgSelect],
})
export class FormsSingleSelectExample {
  ages = [
    { value: '<18', label: 'Under 18' },
    { value: '18', label: '18' },
    { value: '>18', label: 'More than 18' },
  ];

  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal);

  heroForm = this.fb.group({
    age: [null, Validators.required],
  });

  toggleAgeDisable() {
    if (this.heroForm.controls.age.disabled) {
      this.heroForm.controls.age.enable();
    } else {
      this.heroForm.controls.age.disable();
    }
  }

  showConfirm(content: any) {
    this.modalService.open(content);
  }
}
