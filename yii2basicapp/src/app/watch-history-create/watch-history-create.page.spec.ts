import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchHistoryCreatePage } from './watch-history-create.page';

describe('WatchHistoryCreatePage', () => {
  let component: WatchHistoryCreatePage;
  let fixture: ComponentFixture<WatchHistoryCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHistoryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
