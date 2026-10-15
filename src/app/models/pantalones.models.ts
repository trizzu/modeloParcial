export type Talle = 'XS'|'S'|'M'|'L'|'XL';

export type Corte = 'Recto'|'Slim'|'Oxford'|'Skinny'|'Cargo'|'Jogger';

export interface Pantalon {
    id : string,
    nombre : string,
    precio : number,
    talle : Talle,
    corte : Corte,
    descripcion : string,
    isInStore : boolean
}

export interface PantalonForm {
    nombre : string,
    precio : number,
    talle : Talle,
    corte : Corte,
    descripcion : string,
    isInStore : boolean
}