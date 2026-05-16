import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageCreatePage } from './language-create.page';

describe('LanguageCreatePage', () => {
  let component: LanguageCreatePage;
  let fixture: ComponentFixture<LanguageCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
