import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentGenreEditPage } from './content-genre-edit.page';

describe('ContentGenreEditPage', () => {
  let component: ContentGenreEditPage;
  let fixture: ComponentFixture<ContentGenreEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGenreEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
