import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchHistoryDetailPage } from './watch-history-detail.page';

describe('WatchHistoryDetailPage', () => {
  let component: WatchHistoryDetailPage;
  let fixture: ComponentFixture<WatchHistoryDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHistoryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
