import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageListPage } from './language-list.page';

describe('LanguageListPage', () => {
  let component: LanguageListPage;
  let fixture: ComponentFixture<LanguageListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
