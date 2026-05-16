import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingCreatePage } from './rating-create.page';

describe('RatingCreatePage', () => {
  let component: RatingCreatePage;
  let fixture: ComponentFixture<RatingCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
