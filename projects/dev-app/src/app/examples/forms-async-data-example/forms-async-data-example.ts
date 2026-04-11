import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectOptionTemplate, NgSelect, NgSelectOptionHighlight } from '@ng-matero/ng-select';
import { delay } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forms-async-data-example',
  templateUrl: './forms-async-data-example.html',
  styleUrl: './forms-async-data-example.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelect,
    NgSelectOptionTemplate,
    NgSelectOptionHighlight,
  ],
})
export class FormsAsyncDataExample implements OnInit {
  albums: any[] = [];
  allAlbums: any[] = [];

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  heroForm = this.fb.group({
    album: '',
  });

  ngOnInit() {
    this.loadAlbums();
  }

  openSelect(select: NgSelect) {
    select.open();
  }

  closeSelect(select: NgSelect) {
    select.close();
  }

  selectAlbumsRange(from: number, to: number) {
    this.albums = this.allAlbums.slice(from, to);
  }

  selectFirstAlbum() {
    this.heroForm.get('album')!.patchValue(this.albums[0].id);
  }

  private loadAlbums() {
    this.dataService
      .getAlbums()
      .pipe(delay(500))
      .subscribe(albums => {
        this.allAlbums = albums;
        this.albums = [...this.allAlbums];
        this.selectFirstAlbum();
      });
  }
}
