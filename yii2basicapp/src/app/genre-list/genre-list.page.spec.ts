import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreListPage } from './genre-list.page';

describe('GenreListPage', () => {
  let component: GenreListPage;
  let fixture: ComponentFixture<GenreListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
