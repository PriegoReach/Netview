import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeCreatePage } from './episode-create.page';

describe('EpisodeCreatePage', () => {
  let component: EpisodeCreatePage;
  let fixture: ComponentFixture<EpisodeCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
