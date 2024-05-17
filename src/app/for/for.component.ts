import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

interface Operadores {
  menor: string;
  menorIgual: string;
  igual: string;
  maior: string;
  maiorIgual: string;
  diferente: string;
}


@Component({
  selector: 'app-for',
  templateUrl: './for.component.html',
  styleUrls: ['./for.component.css']
})
export class ForComponent implements OnInit {

  firstDropdownTitle: string = "O que é o laço for?";

  secondDropdownTitle: string = "Como funciona o laço for?";

  thirdDropdownTitle: string = "Variações de uso do for.";

  fourthDropdownTitle: string = "Cuidados com o laço for."

  firstDropdownContent: string = "O laço for é uma estrutura de repetição condiconal. For, significando 'para', faz com que um determinado bloco de código seja repetido enquanto uma determinada condição de parada não for alcançada. " +
    "Sendo ambas estruturas para o mesmo fim, o for se assemelha bastante ao laço while, com a diferença de ter uma estrutura mais adequada para trabalhar com conjuntos de elementos.";

  secondDropdownContent: string = "Para se estabelecer o laço for, são necessárias estabelecer três elementos. O primeiro é a inicialização, representando uma estrutura geralmente usada para controlar as iterações do for. O segundo é a condição de parada, " +
    "ou seja, o ponto a partir do qual o for não deve mais ocorrer, sendo igual às condicionais vistas na estrutura if. Por fim, o for possui uma estrutura de alteração, feita para incrementar ou decrementar os parâmetros usados no for para possibilitar o eventual fim do laço. " +
    "É importante destacar que embora o desenvolvedor tenha liberdade para estabelecer e modificar esses parâmetros como quiser, é importante seguir regras básicas: por exemplo, se o parâmetro usado na condição de parada nunca for modificado, o for nunca irá terminar, " +
    "resultando no que chamamos de 'loop infinito', algo que trava o código e realiza grandes gastos computacionais desnecessários. É padrão, também, utilizarmos a inicialização como uma espécie de índice das iterações do for, usando-a como parâmetro de parada e alterando seu valor a cada iteração."

  thirdDropdownContent: string = "Além da estrutura tradicional for, existem duas variações implementadas por diferentes linguagens: o 'for in' e o 'for each'. Embora tenham nomes diferentes, ambas tem um funcionamento similar: nessas estruturas, o desenvolvedor " + 
    "especifica um determinado tipo de parâmetro (numérico, string, booleano ou outros) e define um nome padrão para suas iterações dentro de um conjunto de elementos daquele parâmetro. Ambas as estruturas a seguir acessam cada elemento do conjunto, usando o nome " + 
    "definido pelo usuário como indicador desses elementos e permitindo a manipulação deles pelo desenvolvedor. Ambas as estruturas são otimizadas para facilitar o uso de for ao longo de conjuntos, mas é importante destacar que, ao menos em sua forma básica, são mais " + 
    "limitadas do que o laço for tradicional. Sendo assim, focaremos aqui no entendimento da versão tradicional do for.";

  fourthDropdownContent: string = "Tal como o laço while, uma estrutura de repetição como o laço for requer cautela. Caso a condição de parada ou as alterações dos parâmetros não sejam bem definidos, um 'loop infinito' pode ocorrer, efetivamente quebrando a aplicação. " +
    "Uma vez que a estrutura for declara de forma mais direta as alterações dos parâmetros, o risco de loop infinito é de forma geral menor do que no laço while, embora o desenvolvedor ainda deva se manter atento à possibilidade. Além disso, um laço for mal elaborado " + 
    "pode ocasionar em múltiplas iterações desnecessárias, gerando altos custos computacionais ao usuário. Assim, torna-se importante analisar o que está sendo feito ao longo do laço para evitar comportamentos desnecessários."

  operadores: Operadores = {
      menor: '<',
      menorIgual: '<=',
      igual: '==',
      maior: '>',
      maiorIgual: '>=',
      diferente: '!='
   };

   createFor = this.fb.group({
    inicializador: ["indice", Validators.required],
    valorInicializador: [null, Validators.required],
    condicaoParada: [null, Validators.required],
    condicaoParadaValor: [null, Validators.required],
    acrescimoDecrescimo: [true, Validators.required],
    acao: [null, Validators.required]
  }, { validator: [validateLoop, forNuncaIniciadoValidator] });

  get inicializador(): FormControl {
    return <AbstractControl>this.createFor.get('inicializador') as FormControl;
  }

  get valorInicializador(): FormControl {
    return <AbstractControl>this.createFor.get('valorInicializador') as FormControl;
  }

  get condicaoParada(): FormControl {
    return <AbstractControl>this.createFor.get('condicaoParada') as FormControl;
  }

  get condicaoParadaValor(): FormControl {
    return <AbstractControl>this.createFor.get('condicaoParadaValor') as FormControl;
  }

  get acrescimoDecrescimo(): FormControl {
    return <AbstractControl>this.createFor.get('acrescimoDecrescimo') as FormControl;
  }

  get acao(): FormControl {
    return <AbstractControl>this.createFor.get('acao') as FormControl;
  }

  createdFor: string | undefined;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  getOperadorLogico(): string {
    const valorSelecionado = this.condicaoParada.value as keyof Operadores;
    return this.operadores[valorSelecionado];
  }

  gerarFor() {
    let forString = '';
    const operador = this.getOperadorLogico();
    forString = 
    `para ${this.inicializador.value} = ${this.valorInicializador.value}; ${this.inicializador.value} ${operador} ${this.condicaoParadaValor.value}; ${this.inicializador.value}${this.acrescimoDecrescimo.value ? '++' : '--'}
          escreva("${this.acao.value}")
      fimpara`
    this.createdFor = forString;
  }

/*   updateValidity() {

    // Verifica se as condições mudaram
    const initialValues = this.valorInicializador.value;
    const condition = this.condicaoParada.value;
    const conditionValue = this.condicaoParadaValor.value;
    const acrescimoDecrescimo = this.acrescimoDecrescimo.value;
  
    if (initialValues != null && condition != null && conditionValue != null) {
      const errorControls = ['valorInicializador', 'condicaoParada', 'condicaoParadaValor'];
  
      errorControls.forEach(controlName => {
        if (this.createFor.get(controlName)?.hasError('noFor') && this.createFor.get(controlName)?.value) {
          switch (condition) {
            case 'maior':
              if (initialValues > conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            case 'maiorIgual':
              if (initialValues >= conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            case 'menor':
              if (initialValues < conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            case 'menorIgual':
              if (initialValues <= conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            case 'igual':
              if (initialValues !== conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            case 'diferente':
              if (initialValues == conditionValue) {
                this.createFor.get(controlName)?.setErrors(null);
              }
              break;
            default:
              break;
          }
        }
      });
    }
  } */


}

const numericValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const value = control.value;
  if (isNaN(value)) {
    return { 'numeric': true };
  }
  return null;
};

const forNuncaIniciadoValidator: any = (formGroup: FormGroup): {[key: string]: any} | null => {
  const valorInicializador = formGroup.get('valorInicializador')?.value;
  const condicaoParada = formGroup.get('condicaoParada')?.value;
  const condicaoParadaValor = formGroup.get('condicaoParadaValor')?.value;

  if (valorInicializador !== null && condicaoParada !== null && condicaoParadaValor !== null) {
    let forNuncaIniciado = false;

    switch (condicaoParada) {
      case 'menor':
        forNuncaIniciado = (valorInicializador >= condicaoParadaValor);
        break;
      case 'menorIgual':
        forNuncaIniciado = (valorInicializador > condicaoParadaValor);
        break;
      case 'igual':
        forNuncaIniciado = (valorInicializador === condicaoParadaValor);
        break;
      case 'maior':
        forNuncaIniciado = (valorInicializador <= condicaoParadaValor);
        break;
      case 'maiorIgual':
        forNuncaIniciado = (valorInicializador < condicaoParadaValor);
        break;
      case 'diferente':
        forNuncaIniciado = (valorInicializador !== condicaoParadaValor);
        break;
    }

    if (forNuncaIniciado) {
      return { 'forNuncaIniciado': true };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const validateLoop: any = (formGroup: FormGroup): {[key: string]: any} | null => {
  const valorInicializador = formGroup.get('valorInicializador')?.value;
  const condicaoParada = formGroup.get('condicaoParada')?.value;
  const condicaoParadaValor = formGroup.get('condicaoParadaValor')?.value;
  const acrescimoDecrescimo = formGroup.get('acrescimoDecrescimo')?.value;

  if (valorInicializador !== null && condicaoParada !== null && condicaoParadaValor !== null && acrescimoDecrescimo !== null) {
    let isLoopInfinito = false;

    switch (condicaoParada) {
      case 'menor':
        isLoopInfinito = (!acrescimoDecrescimo && valorInicializador < condicaoParadaValor);
        break;
      case 'menorIgual':
        isLoopInfinito = (!acrescimoDecrescimo && valorInicializador <= condicaoParadaValor);
        break;
      case 'igual':
        isLoopInfinito = (acrescimoDecrescimo && valorInicializador > condicaoParadaValor) || (!acrescimoDecrescimo && valorInicializador < condicaoParadaValor);
        break;
      case 'maior':
        isLoopInfinito = (acrescimoDecrescimo && valorInicializador > condicaoParadaValor);
        break;
      case 'maiorIgual':
        isLoopInfinito = (acrescimoDecrescimo && valorInicializador >= condicaoParadaValor);
        break;
    }

    if (isLoopInfinito) {
      return { 'loopInfinito': true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}