import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionEditPage } from './subscription-edit.page';

describe('SubscriptionEditPage', () => {
  let component: SubscriptionEditPage;
  let fixture: ComponentFixture<SubscriptionEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
