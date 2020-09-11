import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../shared/categorias.service';
import { Categoria } from '../shared/categoria.dto';


@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css'],
  
})
export class CategoriaListaComponent implements OnInit {

  categorias : Categoria[] = [] ;

  constructor(private categoriasServices: CategoriasService) {
    this.categoriasServices.getCategorias().subscribe(
      response => {
        this.categorias = response;
      }
    );
   }

  ngOnInit(): void {
  }

  deletar(categoria: Categoria){
    const mustDelete = confirm('Vai querer arroxar o nó mesmo?');
    if(mustDelete){
      this.categoriasServices.eliminarCategoria(categoria.id).subscribe(()=>{
        this.categorias = this.categorias.filter(c => {
          if(c.id != categoria.id){
            return c;
          }
        });
      },
      error => {
        console.error('teste');
      });
    }else {
      console.log('voce é um cagão');
    }
    
  }

}
