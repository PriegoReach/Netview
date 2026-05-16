import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteEditPage } from './favorite-edit.page';

describe('FavoriteEditPage', () => {
  let component: FavoriteEditPage;
  let fixture: ComponentFixture<FavoriteEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
