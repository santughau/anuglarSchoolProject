import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTitleEditComponent } from './class-title-edit.component';

describe('ClassTitleEditComponent', () => {
  let component: ClassTitleEditComponent;
  let fixture: ComponentFixture<ClassTitleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassTitleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTitleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
