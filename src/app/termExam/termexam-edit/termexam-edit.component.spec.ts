import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermexamEditComponent } from './termexam-edit.component';

describe('TermexamEditComponent', () => {
  let component: TermexamEditComponent;
  let fixture: ComponentFixture<TermexamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermexamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermexamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
