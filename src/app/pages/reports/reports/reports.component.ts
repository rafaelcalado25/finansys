import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';
import { CategoriasService, Categoria } from '../../categorias/shared';
import { EntriesService, Entry } from '../../entries/shared';
import currencyFormatter from 'currency-formatter';
import { Type } from '../../entries/shared/constante.config';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('REPORT');


  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero:true,
          },
        }
      ],
    },
  };


  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;
  expenseChartData: any;
  revenueChartData: any;
  categorias: Categoria[] = [];
  lancamentos: Entry[] = [];
  lancamentosEscolhidos: Entry[] = [];
  despesas: number =0;
  receitas: number = 0;
  total: number = 0;
  despesasString: string = 'R$ 0,00';
  receitasString: string = 'R$ 0,00';
  totalString: string = 'R$ 0,00';
  mapAgrupamentoReceitas: Map<string,number> = new Map();
  mapAgrupamentoDespesas: Map<string,number> = new Map();

  constructor(protected categoriasServices: CategoriasService,
              protected lancamentosServices: EntriesService) {

    this.itemHeader.acao = this.itemHeader.acao;
    this.itemHeader.link = '';
    this.itemHeader.title = 'RELATÓRIOS';
   }

  ngOnInit(): void {

    this.categoriasServices.getResources().subscribe(
      response => {
        this.categorias = response;
      },
      error => {
        console.log(error);
      }
    );

    this.lancamentosServices.getResources().subscribe(
      response => {
        this.lancamentos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  gerarRelatorio(){
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!year || !month){
      alert('Você deve escolher o ano e o mês');
      return;
    }
    this.lancamentosEscolhidos = this.filterByMonthAndYear(month, year);
    this.setValues(this.lancamentosEscolhidos);
    this.setDataSet();
    
    console.log(this.lancamentosEscolhidos);
  }

  private filterByMonthAndYear(month: string, year:string): Entry[]{
    return this.lancamentos.filter(lancamento => {
      if(lancamento.date.substr(3,2) == month && lancamento.date.substr(6,4) == year){
        return lancamento;
      }
    });    
  }

  private setValues(lancamentos: Entry[]): void {
    this.despesas = 0;
    this.receitas = 0;
    this.total = 0;
    this.mapAgrupamentoReceitas = new Map();
    this.mapAgrupamentoDespesas = new Map();
    lancamentos.forEach(lancamento =>{
      if(lancamento.type == Type.expense){
        this.despesas = this.despesas + Number.parseFloat(lancamento.amount);
        this.total = this.total - Number.parseFloat(lancamento.amount);
      }else {
        this.receitas = this.receitas + Number.parseFloat(lancamento.amount);
        this.total = this.total + Number.parseFloat(lancamento.amount);
      }
      if(lancamento.type == Type.expense){
        if(this.mapAgrupamentoDespesas.has(lancamento.categoria.nome)){
          this.mapAgrupamentoDespesas.set(lancamento.categoria.nome,
            this.mapAgrupamentoDespesas.get(lancamento.categoria.nome) +Number.parseFloat(lancamento.amount) );
        } else {
          this.mapAgrupamentoDespesas.set(lancamento.categoria.nome,
            Number.parseFloat(lancamento.amount) );
        }
      } else {
        if(this.mapAgrupamentoReceitas.has(lancamento.categoria.nome)){
          this.mapAgrupamentoReceitas.set(lancamento.categoria.nome,
            this.mapAgrupamentoReceitas.get(lancamento.categoria.nome) +Number.parseFloat(lancamento.amount) );
        } else {
          this.mapAgrupamentoReceitas.set(lancamento.categoria.nome,
            Number.parseFloat(lancamento.amount) );
        }
      }
      
    });
    this.despesasString = currencyFormatter.format(this.despesas,{code:'BRL'});
    this.receitasString = currencyFormatter.format(this.receitas,{code:'BRL'});
    this.totalString = currencyFormatter.format(this.total,{code:'BRL'});
    
  }  

  setDataSet():void{
    let labelRevenues: string [] = [];
    let labelExpense: string [] = [];
    let dataRevenues: number [] = [];
    let dataExpense: number [] = [];
    this.mapAgrupamentoReceitas.forEach((value,chave)=>{
      labelRevenues.push(chave);
      dataRevenues.push(value);
    });
    this.mapAgrupamentoDespesas.forEach((value,chave)=>{
      labelExpense.push(chave);
      dataExpense.push(value);
    });

    this.revenueChartData = {
      labels: labelRevenues,
      datasets: [
        {
          label: 'Gráfico de Receitas',
          backgroundColor: '#9CCC65',
          data: dataRevenues,
        },
      ],
    };
    this.expenseChartData = {
      labels: labelExpense,
      datasets: [
        {
          label: 'Gráfico de Despesas',
          backgroundColor: '#E03131',
          data: dataExpense,
        },
      ],
    };
    console.log(this.revenueChartData);
  }
}
