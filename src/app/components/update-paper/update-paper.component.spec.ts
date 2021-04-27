import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaperComponent } from './update-paper.component';

describe('UpdatePaperComponent', () => {
  let component: UpdatePaperComponent;
  let fixture: ComponentFixture<UpdatePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
