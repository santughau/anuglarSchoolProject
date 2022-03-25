import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMarksComponent } from './quiz-marks.component';

describe('QuizMarksComponent', () => {
  let component: QuizMarksComponent;
  let fixture: ComponentFixture<QuizMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
