import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlanCreatePage } from './subscription-plan-create.page';

describe('SubscriptionPlanCreatePage', () => {
  let component: SubscriptionPlanCreatePage;
  let fixture: ComponentFixture<SubscriptionPlanCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
