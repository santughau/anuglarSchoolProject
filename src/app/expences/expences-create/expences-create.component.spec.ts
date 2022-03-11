import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesCreateComponent } from './expences-create.component';

describe('ExpencesCreateComponent', () => {
  let component: ExpencesCreateComponent;
  let fixture: ComponentFixture<ExpencesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpencesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpencesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
