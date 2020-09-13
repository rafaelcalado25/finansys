import { BaseResourceModel } from '../models/base-resource.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injector } from '@angular/core';


export abstract class BaseResourceService <T extends BaseResourceModel>{

    protected http: HttpClient;

    constructor(protected apiPath: string, protected injector: Injector){
            this.http = injector.get(HttpClient);
        }

    getResources(): Observable<T[]>{
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError),            
        );
      }
    
      getById(id: number) : Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
          catchError(this.handleError),          
      );
    }
    
      inserirResource( resource: T): Observable<T> {
          return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError),            
        );
      }
    
      atualizarResource (resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(()=> resource),
            catchError(this.handleError),
            
        );
      }
    
      eliminarResource (id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(()=> null),
            catchError(this.handleError),            
        );
      }

      //PROTECTED METHODS

  protected jsonDataToResources (datas: any[]):T[]{
    const resources: T[] = [];
    datas.forEach(data => {
      resources.push(data as T);
    });
    return resources;
  }

  protected jsonDataToResource (data: any):T{
    const resource: T = data as T;
    
    return resource;
  }

  protected handleError (error: any): Observable<any>{
      console.error('Erro na requisição. Error => ', error);
      return throwError(error);
  }

}