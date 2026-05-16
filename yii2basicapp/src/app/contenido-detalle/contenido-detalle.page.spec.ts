import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoDetallePage } from './contenido-detalle.page';

describe('ContenidoDetallePage', () => {
  let component: ContenidoDetallePage;
  let fixture: ComponentFixture<ContenidoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
