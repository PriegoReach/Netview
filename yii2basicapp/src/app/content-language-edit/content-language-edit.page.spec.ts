import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLanguageEditPage } from './content-language-edit.page';

describe('ContentLanguageEditPage', () => {
  let component: ContentLanguageEditPage;
  let fixture: ComponentFixture<ContentLanguageEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLanguageEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
