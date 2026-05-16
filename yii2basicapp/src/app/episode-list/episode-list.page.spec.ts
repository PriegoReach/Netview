import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeListPage } from './episode-list.page';

describe('EpisodeListPage', () => {
  let component: EpisodeListPage;
  let fixture: ComponentFixture<EpisodeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
