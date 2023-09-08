import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarificationsListsComponent } from './clarifications-lists.component';

describe('ClarificationsListsComponent', () => {
  let component: ClarificationsListsComponent;
  let fixture: ComponentFixture<ClarificationsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClarificationsListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClarificationsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
