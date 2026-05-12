import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Settings {
  theme = signal<'light' | 'dark'>('light');
}
