import { Component } from '@angular/core';
import { EntriesService } from '../shared/entries.service';
import { Entry } from '../shared/entries.dto';
import { BaseResourceListaComponent } from 'src/app/shared/components/base-resource/base-resource-lista.component';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';

@Component({
  selector: 'app-entry-lista',
  templateUrl: './entry-lista.component.html',
  styleUrls: ['./entry-lista.component.css']
})
export class EntryListaComponent extends BaseResourceListaComponent<Entry> {

  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('LIST');
  
  constructor(protected entriesServices: EntriesService) {
    super(entriesServices);
    this.itemHeader.acao = this.itemHeader.acao + ' Lançamento';
    this.itemHeader.link = 'new';
    this.itemHeader.title = 'Lançamentos';
      
   }
}
