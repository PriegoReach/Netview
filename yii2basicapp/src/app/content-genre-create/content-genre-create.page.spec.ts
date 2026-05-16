import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentGenreCreatePage } from './content-genre-create.page';

describe('ContentGenreCreatePage', () => {
  let component: ContentGenreCreatePage;
  let fixture: ComponentFixture<ContentGenreCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGenreCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
