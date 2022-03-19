import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTitleComponent } from './class-title.component';

describe('ClassTitleComponent', () => {
  let component: ClassTitleComponent;
  let fixture: ComponentFixture<ClassTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
