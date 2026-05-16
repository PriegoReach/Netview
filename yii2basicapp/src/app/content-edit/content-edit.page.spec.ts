import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentEditPage } from './content-edit.page';

describe('ContentEditPage', () => {
  let component: ContentEditPage;
  let fixture: ComponentFixture<ContentEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
