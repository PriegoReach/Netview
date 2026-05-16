import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentGenreDetailPage } from './content-genre-detail.page';

describe('ContentGenreDetailPage', () => {
  let component: ContentGenreDetailPage;
  let fixture: ComponentFixture<ContentGenreDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGenreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
