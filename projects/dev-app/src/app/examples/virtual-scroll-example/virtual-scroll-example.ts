import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgHeaderTemplate, NgOptionTemplate, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-virtual-scroll-example',
  templateUrl: './virtual-scroll-example.html',
  styleUrl: './virtual-scroll-example.scss',
  imports: [NgSelect, NgHeaderTemplate, NgOptionTemplate],
})
export class VirtualScrollExample implements OnInit {
  photos: any[] = [];
  photosBuffer: any[] = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;

  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').subscribe(photos => {
      this.photos = photos;
      this.photosBuffer = this.photos.slice(0, this.bufferSize);
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
    }, 200);
  }
}
