import { Component, computed, inject, signal } from '@angular/core';
import { PantalonService } from '../../service/pantalon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Corte } from '../../models/pantalones.models';
import { CurrencyPipe } from '@angular/common';


type OrdenPrecio = 'original' | 'asc' | 'desc';

@Component({
  selector: 'app-catalogo',
  imports: [CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private readonly pantalonService = inject(PantalonService);

  readonly pantalones = toSignal(
    this.pantalonService.getAll()
  );

  readonly filtroPorCategoria = signal<Corte | ''>('');

  readonly ordenPorPrecio = signal<OrdenPrecio>('original');

  readonly errorMessage = signal('');

  readonly pantalonesFiltrados = computed(() => {
      const categoria = this.filtroPorCategoria();
      const resultado = this.pantalones()?.filter(
        (pantalon) => categoria === '' || pantalon.corte === categoria
     );

      switch (this.ordenPorPrecio()) {
      case 'asc':
        resultado?.sort((a, b) => a.precio - b.precio);
        break;

      case 'desc':
        resultado?.sort((a, b) => b.precio - a.precio);
        break;

      case 'original':
      default:
        break;
    }
    
     return resultado;
    }
  );
}
