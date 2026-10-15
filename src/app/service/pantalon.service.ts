  import { Injectable, inject } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Pantalon, PantalonForm } from '../models/pantalones.models';

  @Injectable({
    providedIn: 'root',
  })
export class PantalonService {

  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/pantalones';

  getAll(){
      return this.http.get<Pantalon[]>(this.url);
  }

  getPantalonById(id : string){
    return this.http.get<Pantalon>(`${this.url}/${id}`);
  }

  addProduct(newProduct: PantalonForm) {
    return this.http.post<Pantalon>(this.url, newProduct);
  }

  editProduct(edittedProduct: PantalonForm, id: string) {
    return this.http.put<Pantalon>(`${this.url}/${id}`, edittedProduct);
  }

  deleteProduct(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

} 
