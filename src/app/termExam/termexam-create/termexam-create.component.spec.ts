import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermexamCreateComponent } from './termexam-create.component';

describe('TermexamCreateComponent', () => {
  let component: TermexamCreateComponent;
  let fixture: ComponentFixture<TermexamCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermexamCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermexamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
