import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonCreatePage } from './season-create.page';

describe('SeasonCreatePage', () => {
  let component: SeasonCreatePage;
  let fixture: ComponentFixture<SeasonCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
