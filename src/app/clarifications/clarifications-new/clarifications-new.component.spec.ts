import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarificationsNewComponent } from './clarifications-new.component';

describe('ClarificationsNewComponent', () => {
  let component: ClarificationsNewComponent;
  let fixture: ComponentFixture<ClarificationsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClarificationsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClarificationsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
