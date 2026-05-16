import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlanEditPage } from './subscription-plan-edit.page';

describe('SubscriptionPlanEditPage', () => {
  let component: SubscriptionPlanEditPage;
  let fixture: ComponentFixture<SubscriptionPlanEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
