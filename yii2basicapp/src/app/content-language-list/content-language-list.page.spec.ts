import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLanguageListPage } from './content-language-list.page';

describe('ContentLanguageListPage', () => {
  let component: ContentLanguageListPage;
  let fixture: ComponentFixture<ContentLanguageListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLanguageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
