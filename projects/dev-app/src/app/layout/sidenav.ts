import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    .nav > li > a {
      display: block;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 500;
    }

    .nav > li > a:hover {
      color: rgba(0, 0, 0, 0.85);
      text-decoration: none;
      background-color: transparent;
    }

    .nav > .active > a,
    .nav > .active:hover > a {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      background-color: transparent;
    }

    .nav > .active > a.active {
      border: 0 #343a40 solid;
      border-left-width: 4px;
      background-color: rgba(248, 248, 248, 0.62);
      border-radius: 0;
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
