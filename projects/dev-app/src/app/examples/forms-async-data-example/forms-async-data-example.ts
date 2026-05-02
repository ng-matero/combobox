import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect, NgSelectOptionHighlight, NgSelectOptionTemplate } from '@ng-matero/ng-select';
import { delay, tap } from 'rxjs';
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
export class FormsAsyncDataExample {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  allAlbums = toSignal(
    this.dataService.getAlbums().pipe(
      delay(500),
      tap(albums => {
        this.albums.set([...albums]);
        this.selectFirstAlbum();
      })
    ),
    { initialValue: [] }
  );

  albums = signal<any[]>([]);

  heroForm = this.fb.group({
    album: '',
  });

  openSelect(select: NgSelect) {
    select.open();
  }

  closeSelect(select: NgSelect) {
    select.close();
  }

  selectAlbumsRange(from: number, to: number) {
    this.albums.set(this.allAlbums().slice(from, to));
  }

  selectFirstAlbum() {
    const albums = this.albums();
    if (albums.length > 0) {
      this.heroForm.get('album')!.patchValue(albums[0].id);
    }
  }
}
