import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class MockNgZone extends NgZone {
  constructor() {
    super({ enableLongStackTrace: true });
  }

  override run(fn: () => any): any {
    return fn();
  }

  override runOutsideAngular(fn: () => any): any {
    return fn();
  }
}

@Injectable()
export class MockConsole {
  warn() {}
}
