import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentyComponent } from './presenty.component';

describe('PresentyComponent', () => {
  let component: PresentyComponent;
  let fixture: ComponentFixture<PresentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
