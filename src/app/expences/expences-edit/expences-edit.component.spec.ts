import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesEditComponent } from './expences-edit.component';

describe('ExpencesEditComponent', () => {
  let component: ExpencesEditComponent;
  let fixture: ComponentFixture<ExpencesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpencesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
