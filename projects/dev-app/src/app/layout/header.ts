import { Component, DOCUMENT, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';

type langDir = 'ltr' | 'rtl';

@Component({
  selector: 'app-layout-header',
  template: `
    <nav class="container gap-3">
      <a class="navbar-brand" href="#">Angular Select</a>

      <div class="flex-grow-1"></div>

      <ul class="navbar-nav flex-row flex-wrap">
        <li class="nav-item">
          <a class="btn nav-link lh-1" href="https://github.com/ng-matero/combobox" target="_blank">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
          </a>
        </li>
        <li class="nav-item">
          <button class="btn nav-link lh-1" (click)="toggleTheme()">
            @if (lightTheme) {
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13"
                />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
                />
              </svg>
            }
          </button>
        </li>
        <li class="nav-item" ngbDropdown>
          <button class="btn nav-link text-uppercase" ngbDropdownToggle>{{ dir }}</button>
          <div ngbDropdownMenu class="dropdown-menu-end">
            <button class="text-uppercase" ngbDropdownItem (click)="changeDirTo('ltr')">ltr</button>
            <button class="text-uppercase" ngbDropdownItem (click)="changeDirTo('rtl')">rtl</button>
          </div>
        </li>
      </ul>
    </nav>
  `,
  styles: `
    :host {
      --bs-emphasis-color-rgb: 222, 235, 255;

      background-color: rgb(38, 132, 255);
      background-image: linear-gradient(135deg, rgb(38, 132, 255) 0%, rgb(7, 71, 166) 100%);
      color: white;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 0px;
    }
  `,
  host: {
    class: 'navbar navbar-expand sticky-top',
  },
  imports: [NgbDropdown, NgbDropdownItem, NgbDropdownToggle, NgbDropdownMenu, FormsModule],
})
export class LayoutHeader {
  private readonly document = inject(DOCUMENT);
  private readonly htmlElement = this.document.querySelector('html')!;

  dir: langDir = 'ltr';

  lightTheme = true;

  changeDirTo(dir: langDir) {
    this.dir = dir;
    this.htmlElement.dir = dir;
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    if (this.lightTheme) {
      this.htmlElement.classList.remove('theme-dark');
      this.htmlElement.setAttribute('data-bs-theme', 'light');
    } else {
      this.htmlElement.classList.add('theme-dark');
      this.htmlElement.setAttribute('data-bs-theme', 'dark');
    }
  }
}
