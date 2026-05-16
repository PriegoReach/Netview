import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCreatePage } from './profile-create.page';

describe('ProfileCreatePage', () => {
  let component: ProfileCreatePage;
  let fixture: ComponentFixture<ProfileCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
