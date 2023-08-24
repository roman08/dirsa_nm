import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniaListDaysComponent } from './campania-list-days.component';

describe('CampaniaListDaysComponent', () => {
  let component: CampaniaListDaysComponent;
  let fixture: ComponentFixture<CampaniaListDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaniaListDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaniaListDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
