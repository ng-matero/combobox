import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NgLabelTemplate,
  NgOptionHighlight,
  NgOptionTemplate,
  NgSelect,
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
    NgLabelTemplate,
    NgOptionTemplate,
    NgOptionHighlight,
  ],
})
export class FormsCustomTemplateExample implements OnInit {
  photos: any[] = [];

  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal);
  private dataService = inject(DataService);

  heroForm = this.fb.group({
    photo: '',
  });

  ngOnInit() {
    this.loadPhotos();
  }

  selectFirstPhoto() {
    this.heroForm.get('photo')!.patchValue(this.photos[0].thumbnailUrl);
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

  private loadPhotos() {
    this.dataService.getPhotos().subscribe(photos => {
      this.photos = photos;
      this.selectFirstPhoto();
    });
  }
}
