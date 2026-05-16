import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeEditPage } from './episode-edit.page';

describe('EpisodeEditPage', () => {
  let component: EpisodeEditPage;
  let fixture: ComponentFixture<EpisodeEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
