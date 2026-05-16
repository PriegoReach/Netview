import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentCreatePage } from './content-create.page';

describe('ContentCreatePage', () => {
  let component: ContentCreatePage;
  let fixture: ComponentFixture<ContentCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
