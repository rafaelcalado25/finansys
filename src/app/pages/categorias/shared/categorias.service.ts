import { Injectable, Injector } from '@angular/core';
import { Categoria } from './categoria.dto';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends BaseResourceService<Categoria>{

  
  constructor(protected injector: Injector) { 
    super('api/categorias', injector);    
    
  }

  /* getCategorias(): Observable<Categoria[]>{
    return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategorias)
    );
  }

  getById(id: number) : Observable<Categoria> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
  );
}

  inserirCategoria( categoria: Categoria): Observable<Categoria> {
      return this.http.post(this.apiPath, categoria).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategoria)
    );
  }

  atualizarCategoria (categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiPath}/${categoria.id}`;
    return this.http.put(url, categoria).pipe(
        catchError(this.handleError),
        map(()=> categoria)
    );
  }

  eliminarCategoria (id: number): Observable<Categoria> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
        catchError(this.handleError),
        map(()=> null)
    );
  }

  //PRIVATE METHODS

  private jsonDataToCategorias (datas: any[]):Categoria[]{
    const categorias: Categoria[] = [];
    datas.forEach(data => {
      categorias.push(data as Categoria);
    });
    return categorias;
  }

  private jsonDataToCategoria (data: any):Categoria{
    const categoria: Categoria = data as Categoria;
    
    return categoria;
  }

  private handleError (error: any): Observable<any>{
      console.error('Erro na requisição. Error => ', error);
      return throwError(error);
  } */
}
