import { Injectable, Injector } from '@angular/core';

import { Entry } from './entries.dto';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends BaseResourceService<Entry>{

  
  constructor(protected injector : Injector) { 
    super('api/entries', injector);
  }
  
}
