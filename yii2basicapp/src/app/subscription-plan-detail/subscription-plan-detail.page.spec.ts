import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlanDetailPage } from './subscription-plan-detail.page';

describe('SubscriptionPlanDetailPage', () => {
  let component: SubscriptionPlanDetailPage;
  let fixture: ComponentFixture<SubscriptionPlanDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
