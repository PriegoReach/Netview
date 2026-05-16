import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLanguageCreatePage } from './content-language-create.page';

describe('ContentLanguageCreatePage', () => {
  let component: ContentLanguageCreatePage;
  let fixture: ComponentFixture<ContentLanguageCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLanguageCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
