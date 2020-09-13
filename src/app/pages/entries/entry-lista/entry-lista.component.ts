import { Component, OnInit } from '@angular/core';
import { EntriesService } from '../shared/entries.service';
import { Entry } from '../shared/entries.dto';

@Component({
  selector: 'app-entry-lista',
  templateUrl: './entry-lista.component.html',
  styleUrls: ['./entry-lista.component.css']
})
export class EntryListaComponent implements OnInit {

  entries : Entry[] = [] ;

  constructor(private entriesServices: EntriesService) {
    this.entriesServices.getResources().subscribe(
      response => {
        this.entries = response;
      }
    );
   }

  ngOnInit(): void {
  }

  deletar(entry: Entry){
    const mustDelete = confirm('Vai querer arroxar o nó mesmo?');
    if(mustDelete){
      this.entriesServices.eliminarResource(entry.id).subscribe(()=>{
        this.entries = this.entries.filter(c => {
          if(c.id != entry.id){
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
