import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDownloadCsvComponent } from './exam-download-csv.component';

describe('ExamDownloadCsvComponent', () => {
  let component: ExamDownloadCsvComponent;
  let fixture: ComponentFixture<ExamDownloadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDownloadCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDownloadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
