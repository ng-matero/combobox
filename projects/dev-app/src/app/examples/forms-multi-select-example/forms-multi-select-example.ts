import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-forms-multi-select-example',
  templateUrl: './forms-multi-select-example.html',
  styleUrl: './forms-multi-select-example.scss',
  imports: [FormsModule, ReactiveFormsModule, NgSelect],
})
export class FormsMultiSelectExample {
  private fb = inject(FormBuilder);

  isCitiesControlVisible = true;

  cities: any[] = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys (Disabled)', disabled: true },
    { id: 4, name: 'Pabradė' },
  ];

  heroForm = this.fb.group({
    selectedCitiesIds: [] as any,
  });

  toggleCitiesControl() {
    this.isCitiesControlVisible = !this.isCitiesControlVisible;
  }

  clearCities() {
    this.heroForm.get('selectedCitiesIds')!.patchValue([]);
  }
}
