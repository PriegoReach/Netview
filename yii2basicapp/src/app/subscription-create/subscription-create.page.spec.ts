import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionCreatePage } from './subscription-create.page';

describe('SubscriptionCreatePage', () => {
  let component: SubscriptionCreatePage;
  let fixture: ComponentFixture<SubscriptionCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
