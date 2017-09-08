import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Observable } from 'rxjs';

import { NavBarComponent } from './nav-bar.component';
import * as fromRoot from '../../store';
import { HM } from '../../models';

class MockStore {
  select(query: any) {
  }
  dispatch(action: any) {
  }
}

describe('Nav Bar Component', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NavBarComponent
      ],
      providers: [
        LOG_LOGGER_PROVIDERS,
        { provide: Store, useClass: MockStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    store = fixture.debugElement.injector.get(Store);
  });

  it('construct component', fakeAsync(() => {
    spyOn(store, 'select')
      .and
      .returnValue(Observable.of('/'));

    fixture.detectChanges();
    tick();

    expect(fixture.componentInstance instanceof NavBarComponent)
      .toBe(true, 'Should create NavBarComponent');
  }));
});
