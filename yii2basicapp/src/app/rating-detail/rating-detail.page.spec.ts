import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingDetailPage } from './rating-detail.page';

describe('RatingDetailPage', () => {
  let component: RatingDetailPage;
  let fixture: ComponentFixture<RatingDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
