import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NgSelect,
  NgSelectOptionTemplate,
  NgSelectPanelHeaderTemplate,
} from '@ng-matero/ng-select';

@Component({
  selector: 'app-virtual-scroll-example',
  templateUrl: './virtual-scroll-example.html',
  styleUrl: './virtual-scroll-example.scss',
  imports: [NgSelect, NgSelectPanelHeaderTemplate, NgSelectOptionTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollExample implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);

  photos: any[] = [];
  photosBuffer: any[] = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').subscribe(photos => {
      this.photos = photos;
      this.photosBuffer = this.photos.slice(0, this.bufferSize);
      this.cdr.detectChanges();
    });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }: { end: number }) {
    if (this.loading || this.photos.length <= this.photosBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.photos.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.photosBuffer = this.photosBuffer.concat(more);
      this.cdr.detectChanges();
    }, 200);
  }
}
