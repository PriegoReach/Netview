import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeDetailPage } from './episode-detail.page';

describe('EpisodeDetailPage', () => {
  let component: EpisodeDetailPage;
  let fixture: ComponentFixture<EpisodeDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
