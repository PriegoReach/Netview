import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchHistoryEditPage } from './watch-history-edit.page';

describe('WatchHistoryEditPage', () => {
  let component: WatchHistoryEditPage;
  let fixture: ComponentFixture<WatchHistoryEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHistoryEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
