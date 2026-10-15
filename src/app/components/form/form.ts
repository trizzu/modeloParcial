import { Component, inject, input, output, signal } from '@angular/core';
import { PantalonService } from '../../service/pantalon.service';
import { form, required, FormField, FormRoot, min, maxLength } from '@angular/forms/signals';
import { PantalonForm, Talle, Corte, Pantalon } from '../../models/pantalones.models';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [FormField, FormRoot],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private readonly service = inject(PantalonService);

  readonly pantalon = input<Pantalon | undefined> (undefined);
  readonly actualizado = output<Pantalon>();

  readonly talles: Talle[] = ['XS', 'S', 'M', 'L', 'XL'];
  readonly cortes: Corte[] = ['Recto', 'Slim', 'Oxford', 'Skinny', 'Cargo', 'Jogger'];

  private readonly formVacio : PantalonForm = {
    nombre : '',
    precio : 0,
    talle : '' as Talle,
    corte : '' as Corte,
    descripcion : '',
    isInStore : false
  };

  readonly pantalonFormModel = signal<PantalonForm>({
    ...this.formVacio
  });

  readonly pantalonForm = form(
    this.pantalonFormModel,
    (pantalon) => {
      required(pantalon.nombre, {message : 'Obligatorio'});
      required(pantalon.precio, {message : 'Obligatorio'});
      required(pantalon.talle, {message : 'Obligatorio'});
      required(pantalon.corte, {message : 'Obligatorio'});
      min(pantalon.precio, 0, {message : 'El precio no puede ser negativo'});
      maxLength(pantalon.descripcion, 200, {message : 'La descripcion tiene un maximo de 200 caracteres'});
    },
    {
      submission:{
        action: async (pantalon) => {
          const datosPantalon = pantalon().value();
          const actual = this.pantalon();
          if(actual){
            const actualizado = await firstValueFrom(
              this.service.editProduct(datosPantalon, actual.id)
            );
            this.actualizado.emit(actualizado);
          }else{
            await firstValueFrom(
              this.service.addProduct(datosPantalon)
            );
          }
        }
      }
    }
  );

  resetForm(){
    this.pantalonForm().reset({...this.formVacio})
  }
}