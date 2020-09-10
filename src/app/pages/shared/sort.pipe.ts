import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], campo: string): any[] {
    if(!Array.isArray(array))
      return null;

      const c = array[0];
      
    if(c){
      console.log(c.hasOwnProperty(campo));
      if(!c.hasOwnProperty(campo))
      return array;

      
    }
      
    
    array.sort(
      (primeiroElemento,segundoElemento)=> {
        if (primeiroElemento[campo] < segundoElemento[campo]) {
          return -1;
        } else if (primeiroElemento[campo] > segundoElemento[campo]) {
          return 1;
        } else {
          return 0;
        }
      });

      return array;
  }

}
