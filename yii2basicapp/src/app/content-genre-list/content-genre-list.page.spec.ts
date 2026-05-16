import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentGenreListPage } from './content-genre-list.page';

describe('ContentGenreListPage', () => {
  let component: ContentGenreListPage;
  let fixture: ComponentFixture<ContentGenreListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGenreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
