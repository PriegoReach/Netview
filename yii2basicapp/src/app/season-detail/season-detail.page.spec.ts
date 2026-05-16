import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonDetailPage } from './season-detail.page';

describe('SeasonDetailPage', () => {
  let component: SeasonDetailPage;
  let fixture: ComponentFixture<SeasonDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
