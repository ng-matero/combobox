import {
  Component,
  computed,
  Directive,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import { EXAMPLE_COMPONENTS } from '../../examples/examples';
import { Settings } from '../../settings';

@Directive({
  selector: '[appExampleHost]',
})
export class ExampleHostDirective {
  viewContainerRef = inject(ViewContainerRef);
}

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.html',
  styleUrl: './example-viewer.scss',
  imports: [ExampleHostDirective, HighlightModule, NgbTooltip],
})
export class ExampleViewer implements OnInit {
  private readonly settings = inject(Settings);

  @ViewChild(ExampleHostDirective, { static: true }) exampleHost!: ExampleHostDirective;

  @Input() example = '';

  theme = computed(() => this.settings.theme());

  title = signal('');

  showSourceCode = signal(false);

  sourceTypes = [
    { label: 'HTML', value: 'html' },
    { label: 'TS', value: 'ts' },
    { label: 'SCSS', value: 'scss' },
  ];
  selectedSourceType = signal('html');

  sourceCode = signal('');

  isSourceCodeLoading = signal(true);

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    const example = EXAMPLE_COMPONENTS[this.example];
    this.title.set(example.title);

    const vcr = this.exampleHost.viewContainerRef;
    vcr.clear();
    vcr.createComponent(example.component);
  }

  toggleSourceCode() {
    this.showSourceCode.update(v => !v);
    if (this.showSourceCode()) {
      this.getRawContent();
    }
  }

  changeSourceCodeType(type: string) {
    this.selectedSourceType.set(type);
    this.getRawContent(type);
  }

  getRawContent(type = 'html') {
    this.isSourceCodeLoading.set(true);
    fetch(
      `https://raw.githubusercontent.com/ng-matero/combobox/refs/heads/main/` +
        `projects/dev-app/src/app/examples/${this.example}/${this.example}.${type}`
    )
      .then(async res => {
        const code = await res.text();
        this.sourceCode.set(code);
        this.isSourceCodeLoading.set(false);
      })
      .catch(err => {
        console.error(err);
        this.sourceCode.set('');
        this.isSourceCodeLoading.set(false);
      });
  }
}
