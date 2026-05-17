import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NgSelect,
  NgSelectOptionTemplate,
  NgSelectPanelHeaderTemplate,
} from '@ng-matero/ng-select';
import { tap } from 'rxjs';

@Component({
  selector: 'app-virtual-scroll-example',
  templateUrl: './virtual-scroll-example.html',
  styleUrl: './virtual-scroll-example.scss',
  imports: [NgSelect, NgSelectPanelHeaderTemplate, NgSelectOptionTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollExample {
  private http = inject(HttpClient);

  photos = toSignal(
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').pipe(
      tap(photos => {
        this.photosBuffer.set(photos.slice(0, this.bufferSize));
      })
    ),
    { initialValue: [] }
  );
  photosBuffer = signal<any[]>([]);
  loading = signal(false);
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }: { end: number }) {
    if (this.loading() || this.photos().length <= this.photosBuffer().length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer().length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const currentBufferLen = this.photosBuffer().length;
    const more = this.photos().slice(currentBufferLen, this.bufferSize + currentBufferLen);

    this.loading.set(true);
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading.set(false);
      this.photosBuffer.update(prev => prev.concat(more));
    }, 200);
  }
}
