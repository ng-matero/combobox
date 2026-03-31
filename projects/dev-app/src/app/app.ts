import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgSelectConfig } from '@ng-matero/ng-select';
import { filter, map, mergeMap } from 'rxjs/operators';
import { LayoutHeader } from './layout/header';
import { LayoutSidenav } from './layout/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [LayoutHeader, LayoutSidenav, RouterOutlet],
  host: {
    '[class]': 'themeClass',
  },
})
export class App implements OnInit {
  title = '';
  dir: 'ltr' | 'rtl' = 'ltr';
  theme: 'default' | 'ant' | 'material' = 'default';

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private config = inject(NgSelectConfig);

  get themeClass() {
    return `${this.theme}-theme`;
  }

  constructor() {
    this.config.placeholder = 'Select item';
    // This could be useful if you want to use appendTo in entire application without explicitly defining it. (eg: appendTo = 'body')
    // this.config.appendTo = null;
    // set the bindValue to global config when you use the same bindValue in most of the place.
    // You can also override bindValue for the specified template by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    // this.config.bindValue = 'value';
  }

  ngOnInit() {
    this.setTitle();
  }

  private setTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        this.title = event['title'];
        this.titleService.setTitle(this.title);
      });
  }
}
