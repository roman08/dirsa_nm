import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsListComponent } from './courts-list.component';

describe('CourtsListComponent', () => {
  let component: CourtsListComponent;
  let fixture: ComponentFixture<CourtsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
