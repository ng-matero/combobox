import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EXAMPLE_COMPONENTS } from '../../examples/examples';
import { ExampleViewer } from '../example-viewer/example-viewer';

@Component({
  selector: 'app-route-viewer',
  templateUrl: './route-viewer.html',
  imports: [ExampleViewer],
})
export class RouteViewer implements OnInit {
  private route = inject(ActivatedRoute);

  examples = signal<string[]>([]);

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      const examples = Object.keys(EXAMPLE_COMPONENTS).filter(c => c.startsWith(data.examples));
      this.examples.set(examples);
    });
  }
}
