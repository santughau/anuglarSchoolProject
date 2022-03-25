import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermexamListComponent } from './termexam-list.component';

describe('TermexamListComponent', () => {
  let component: TermexamListComponent;
  let fixture: ComponentFixture<TermexamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermexamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermexamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
