import {
  Component,
  Directive,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EXAMPLE_COMPONENTS } from '../../examples/examples';
import { StackblitzButton } from './stackblitz-button/stackblitz-button';

@Directive({ selector: '[example-host]' })
export class ExampleHostDirective {
  viewContainerRef = inject(ViewContainerRef);
}

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.html',
  styles: `
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.54);
    }

    a.btn {
      color: rgba(0, 0, 0, 0.54);
    }

    .card {
      margin-bottom: 20px;
    }
  `,
  imports: [StackblitzButton, ExampleHostDirective],
})
export class ExampleViewer implements OnInit {
  @Input() example = '';

  @ViewChild(ExampleHostDirective, { static: true }) exampleHost!: ExampleHostDirective;

  title = '';

  get sourcePath() {
    return `https://github.com/ng-matero/combobox/tree/main/projects/dev-app/app/examples/${this.example}`;
  }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    const example = EXAMPLE_COMPONENTS[this.example];
    this.title = example.title;

    const vcr = this.exampleHost.viewContainerRef;
    vcr.clear();
    vcr.createComponent(example.component);
  }
}
