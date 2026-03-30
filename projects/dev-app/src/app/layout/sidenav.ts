import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'layout-sidenav',
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
