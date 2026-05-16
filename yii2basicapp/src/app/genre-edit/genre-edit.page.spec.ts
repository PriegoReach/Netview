import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreEditPage } from './genre-edit.page';

describe('GenreEditPage', () => {
  let component: GenreEditPage;
  let fixture: ComponentFixture<GenreEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
