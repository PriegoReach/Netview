import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageDetailPage } from './language-detail.page';

describe('LanguageDetailPage', () => {
  let component: LanguageDetailPage;
  let fixture: ComponentFixture<LanguageDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
