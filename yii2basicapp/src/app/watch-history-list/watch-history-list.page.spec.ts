import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchHistoryListPage } from './watch-history-list.page';

describe('WatchHistoryListPage', () => {
  let component: WatchHistoryListPage;
  let fixture: ComponentFixture<WatchHistoryListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHistoryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
