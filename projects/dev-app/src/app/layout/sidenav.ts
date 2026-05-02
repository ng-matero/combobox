import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-layout-sidenav',
  template: `
    <ul class="nav nav-pills flex-column">
      @for (route of routes; track route) {
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link" routerLink="{{ route.url }}" routerLinkActive="active">
            {{ route.title }}
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      position: sticky;
      top: 56px;
    }

    // All levels of nav
    .nav {
      --bs-nav-pills-link-active-bg: transparent;
      --bs-nav-link-padding-x: 0;

      > li {
        > a {
          display: block;
          color: rgb(122, 134, 154);

          &:hover {
            color: rgb(38, 132, 255);
          }
        }

        &.active {
          a {
            color: light-dark(rgb(9, 30, 66), rgb(225, 235, 255));
            font-weight: 500;
          }
        }
      }
    }
  `,
  imports: [RouterLinkActive, RouterLink],
})
export class LayoutSidenav {
  routes: any[] = [];

  constructor() {
    this.routes = routes
      .filter(route => route.component)
      .map(route => ({
        title: route.data!['title'],
        url: `/${route.path}`,
      }));
  }
}
