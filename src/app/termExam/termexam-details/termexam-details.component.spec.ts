import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermexamDetailsComponent } from './termexam-details.component';

describe('TermexamDetailsComponent', () => {
  let component: TermexamDetailsComponent;
  let fixture: ComponentFixture<TermexamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermexamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermexamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
