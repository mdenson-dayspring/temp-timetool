import { Component, Input, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import { HM } from '../../models';
import * as fromRoot from '../../store';

@Component({
  selector: 'nav-bar',
  template: require('./nav-bar.component.html'),
  styles: [require('./nav-bar.component.scss')]
})
export class NavBarComponent implements OnInit {
  @Input() time: HM;
  private path: string;
  private urlDefinitions: { key: string, url: string }[] = [
    { key: 'now', url: '/now' },
    { key: 'end', url: '/eod' },
    { key: 'settings', url: '/settings' }
  ];
  private urls: any;
  private active: any;

  constructor(
    private store: Store<fromRoot.State>,
    private $log: Logger) {
    this.urls = {};
    this.active = {};
    this.urlDefinitions.forEach(value => {
      this.urls[value.key] = value.url;
      this.active[value.key] = false;
    });
  }

  ngOnInit() {
    this.store.select(fromRoot.getRouterPath)
      .subscribe((path) => {
        this.path = path;
        this.urlDefinitions.forEach(value => {
          this.active[value.key] = (path === value.url);
        });
      });
  }

  private go(urlName: string): void {
    this.store.dispatch(go([this.urls[urlName]]));
  }
}
