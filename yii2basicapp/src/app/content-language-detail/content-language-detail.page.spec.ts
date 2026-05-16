import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLanguageDetailPage } from './content-language-detail.page';

describe('ContentLanguageDetailPage', () => {
  let component: ContentLanguageDetailPage;
  let fixture: ComponentFixture<ContentLanguageDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLanguageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
