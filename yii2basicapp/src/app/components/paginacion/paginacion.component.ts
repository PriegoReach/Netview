import { Component, Input, OnChanges, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.scss'],
  standalone: false,
})
export class PaginacionComponent implements OnInit, OnChanges, AfterViewInit {

  paginas: number = 0;
  activeIndex: number = 0;
  paginacionItems: number[] = [];

  @Input() total: number = 0;
  @Input() porPagina: number = 5;

  constructor() {}

  ngOnInit() {
    this.calcular();
  }

  ngAfterViewInit() {
    this.calcular();
  }

  ngOnChanges() {
    this.paginas = Math.ceil(this.total / this.porPagina);
    this.paginacionItems = this.calcularPaginacionItems();
  }

  calcular() {
    this.paginas = Math.ceil(this.total / this.porPagina);
    this.paginacionItems = this.calcularPaginacionItems();
  }

  calcularPaginacionItems(): number[] {
    const items: number[] = [];
    for (let i = 1; i <= this.paginas; i++) {
      items.push(i);
    }
    return items;
  }

  onClickSlide(index: number) {
    this.activeIndex = index;
  }
}
