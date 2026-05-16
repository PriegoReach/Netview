import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionDetailPage } from './subscription-detail.page';

describe('SubscriptionDetailPage', () => {
  let component: SubscriptionDetailPage;
  let fixture: ComponentFixture<SubscriptionDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
