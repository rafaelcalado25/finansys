import { Injectable, Injector } from '@angular/core';

import { Entry } from './entries.dto';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends BaseResourceService<Entry>{

  //private apiPath:string = 'api/entries';

  constructor(protected injector : Injector) { 
    super('api/entries', injector);
  }

  /* getEntries(): Observable<Entry[]>{
    return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategorias)
    );
  }

  getById(id: number) : Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
  );
}

  inserirEntry( entry: Entry): Observable<Entry> {
      return this.http.post(this.apiPath, entry).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategoria)
    );
  }

  atualizarEntry (entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
        catchError(this.handleError),
        map(()=> entry)
    );
  }

  eliminarEntry (id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
        catchError(this.handleError),
        map(()=> null)
    );
  } */

  //PRIVATE METHODS

  /* private jsonDataToCategorias (datas: any[]):Entry[]{
    const entries: Entry[] = [];
    datas.forEach(data => {
      entries.push(data as Entry);
    });
    return entries;
  }

  private jsonDataToCategoria (data: any):Entry{
    const entry: Entry = data as Entry;
    
    return entry;
  }

  private handleError (error: any): Observable<any>{
      console.error('Erro na requisição. Error => ', error);
      return throwError(error);
  } */
}
