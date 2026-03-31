import { Component, inject, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StackblitzService } from './stackblitz.service';

@Component({
  selector: 'app-stackblitz-button',
  templateUrl: './stackblitz-button.html',
  styles: `
    svg {
      height: 18px;
      vertical-align: sub;
    }
  `,
})
export class StackblitzButton {
  @Input() example = '';

  private stackblitz = inject(StackblitzService);

  async openExample() {
    if (!environment.production) {
      return;
    }

    await this.stackblitz.openNewProject(this.example);
  }
}
