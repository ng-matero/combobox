import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NgSelect,
  NgSelectLabelTemplate,
  NgSelectOptionHighlight,
  NgSelectOptionTemplate,
} from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forms-custom-template-example',
  templateUrl: './forms-custom-template-example.html',
  styleUrl: './forms-custom-template-example.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelect,
    NgSelectLabelTemplate,
    NgSelectOptionTemplate,
    NgSelectOptionHighlight,
  ],
})
export class FormsCustomTemplateExample {
  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal);
  private dataService = inject(DataService);

  photos = toSignal(this.dataService.getPhotos(), { initialValue: [] });

  heroForm = this.fb.group({
    photo: '',
  });

  constructor() {
    effect(() => {
      this.selectFirstPhoto();
    });
  }

  selectFirstPhoto() {
    const photos = this.photos();
    if (photos.length > 0) {
      this.heroForm.get('photo')!.patchValue(photos[0].thumbnailUrl);
    }
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  changePhoto(photo: any) {
    this.heroForm.get('photo')!.patchValue(photo ? photo.thumbnailUrl : null);
  }

  togglePhotoDisabled() {
    const photo = this.heroForm.get('photo')!;
    if (photo.disabled) {
      photo.enable();
    } else {
      photo.disable();
    }
  }
}
