import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingEditPage } from './rating-edit.page';

describe('RatingEditPage', () => {
  let component: RatingEditPage;
  let fixture: ComponentFixture<RatingEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
