import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlanListPage } from './subscription-plan-list.page';

describe('SubscriptionPlanListPage', () => {
  let component: SubscriptionPlanListPage;
  let fixture: ComponentFixture<SubscriptionPlanListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
