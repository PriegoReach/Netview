import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonEditPage } from './season-edit.page';

describe('SeasonEditPage', () => {
  let component: SeasonEditPage;
  let fixture: ComponentFixture<SeasonEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
