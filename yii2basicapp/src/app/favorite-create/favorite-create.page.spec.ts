import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteCreatePage } from './favorite-create.page';

describe('FavoriteCreatePage', () => {
  let component: FavoriteCreatePage;
  let fixture: ComponentFixture<FavoriteCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
