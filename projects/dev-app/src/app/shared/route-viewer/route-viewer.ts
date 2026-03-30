import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EXAMPLE_COMPONENTS } from '../../examples/examples';
import { ExampleViewer } from '../example-viewer/example-viewer';

@Component({
  selector: 'app-route-viewer',
  templateUrl: './route-viewer.html',
  imports: [ExampleViewer],
})
export class RouteViewer implements OnInit {
  examples: string[] = [];

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.examples = Object.keys(EXAMPLE_COMPONENTS).filter(x => x.startsWith(data.examples));
    });
  }
}
