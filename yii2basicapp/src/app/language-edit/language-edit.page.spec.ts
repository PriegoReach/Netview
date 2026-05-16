import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageEditPage } from './language-edit.page';

describe('LanguageEditPage', () => {
  let component: LanguageEditPage;
  let fixture: ComponentFixture<LanguageEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
