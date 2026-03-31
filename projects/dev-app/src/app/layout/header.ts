import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

type langDir = 'ltr' | 'rtl';
type theme = 'default' | 'ant' | 'material';

@Component({
  selector: 'app-layout-header',
  template: `
    <nav class="container flex-wrap flex-lg-nowrap">
      <a class="navbar-brand" href="#">@ng-matero/ng-select</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <div ngbDropdown class="d-inline-block">
          <button class="btn btn-outline-secondary" ngbDropdownToggle>
            {{ theme }}
          </button>
          <div ngbDropdownMenu>
            <button (click)="setTheme('default')" class="dropdown-item btn-sm">
              Default theme
            </button>
            <button (click)="setTheme('material')" class="dropdown-item btn-sm">
              Material theme
            </button>
            <button (click)="setTheme('ant')" class="dropdown-item btn-sm">Ant Design theme</button>
          </div>
        </div>

        <div ngbDropdown class="d-inline-block ml-2">
          <button
            class="btn btn-outline-secondary text-uppercase"
            ngbDropdownToggle
          >
            {{ dir }}
          </button>
          <div ngbDropdownMenu>
            <button (click)="changeDirTo('ltr')" class="dropdown-item btn-sm text-uppercase">
              ltr
            </button>
            <button (click)="changeDirTo('rtl')" class="dropdown-item btn-sm text-uppercase">
              rtl
            </button>
          </div>
        </div>

        <ul class="navbar-nav mr-auto"></ul>
      </div>
    </nav>
  `,
  styles: `
    :host {
      box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.1);
      border-bottom: 1px solid #d4dadf;
      background-color: #fff;
    }
  `,
  host: {
    class: 'navbar navbar-expand-lg bd-navbar sticky-top',
  },
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, FormsModule],
})
export class LayoutHeader {
  @Input() dir: langDir = 'ltr';
  @Input() theme = 'default';
  @Input() version = '';
  @Output() dirChange = new EventEmitter<langDir>();
  @Output() themeChange = new EventEmitter<theme>();

  setTheme(theme: theme) {
    this.theme = theme;
    this.themeChange.emit(theme);
  }

  changeDirTo(dir: langDir) {
    this.dir = dir;
    this.dirChange.emit(dir);
  }
}
