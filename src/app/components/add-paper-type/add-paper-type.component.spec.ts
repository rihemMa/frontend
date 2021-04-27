import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaperTypeComponent } from './add-paper-type.component';

describe('AddPaperTypeComponent', () => {
  let component: AddPaperTypeComponent;
  let fixture: ComponentFixture<AddPaperTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaperTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaperTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
