import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {TooltipPosition} from "@angular/material/tooltip";
import { TooltipConfigService } from '../services/tooltip-config.service';

@Component({
  selector: 'app-while',
  templateUrl: './while.component.html',
  styleUrls: ['./while.component.css']
})
export class WhileComponent implements OnInit {

  firstDropdownTitle: string = "O que é o laço while?";

  secondDropdownTitle: string = "Como funciona o laço while?";

  thirdDropdownTitle: string = "Variações de uso do while.";

  fourthDropdownTitle: string = "Cuidados com while."

  firstDropdownContent: string = "O laço while trata-se de uma estrutura de repetição condicional. While, significando 'se', realiza um determinado bloco de código enquanto uma condição passada " +
    "pelo usuário for verdadeira. Dessa forma, o while se assemelha a estrutura if, com a diferença que enquanto o if ocorre apenas uma vez, o while ocorre enquanto a condição se manter verdadeira.";

  secondDropdownContent: string = "Dentro do laço while trabalhamos com duas estruturas principais: o while ('se') e o do ('faça'). Na estrutura while é feita a especificação da condição desejada, " +
    "seguindo as mesmas regras utilizadas na estrutura condicional if. Por sua vez, a estrutura do abriga o bloco de código a ser realizado enquanto a condição for verdadeira. Traçando novamente um " +
    "paralelo com o if, podemos considerar o while a parte da condição do if e o do a parte da consequência do if."

  thirdDropdownContent: string = "Existem, essencialmente, duas formas diferentes de se utilizar o laço while: com a estrutura while antes da estrutura do e na ordem inversa, com a estrutura do antes " +
    "da while. A diferença está no funcionamento que desejamos; quando a estrutura while é a primeira, o bloco de código no do será executado apenas enquanto a condição for verdadeira. Já quando a ordem " +
    "se inverte, o bloco é sempre executado pelo menos uma vez antes de se verificar se deve-se repetir o processo. Em outras palavras, podemos entender que no primeiro caso você está basicamente dizendo " +
    "'se x for verdade, faça y', enquanto no segundo caso você diz 'faça y, depois verifique se x é verdade para saber se repete y'.";

  fourthDropdownContent: string = "Como uma estrutura de repetição, o laço while deve ser executado com cautela. Caso a condição de um laço while seja sempre verdadeira, o do irá continuar ocorrendo, efetivamente travando " +
    "o código em um loop infinito até que a máquina não seja mais capaz de executá-lo. Para evitar esses casos, é importante que seja inserido no do alguma lógica que trabalhe em alterar a condição, fazendo com que ela se torne falsa " +
    "quando necessário, conforme a lógica implementada."

  createWhile = this.fb.group({
    condition: [null, Validators.required],
    do: [true, [Validators.required]],
    action: [null, [Validators.required]]
  });

  get condition(): FormControl {
    return <AbstractControl>this.createWhile.get('condition') as FormControl;
  }

  get do(): FormControl {
    return <AbstractControl>this.createWhile.get('do') as FormControl;
  }

  get action(): FormControl {
    return <AbstractControl>this.createWhile.get('action') as FormControl;
  }

  createdWhile: string | undefined;

  showTooltipOnClick: boolean = false;
  hideDelay: number = 0;
  position: TooltipPosition = "after";

  constructor(private fb: FormBuilder, private tooltipConfigService: TooltipConfigService) {
    this.tooltipConfigService.showTooltipOnClick$.subscribe(value => this.showTooltipOnClick = value);
    this.tooltipConfigService.hideDelay$.subscribe(value => this.hideDelay = value);
    this.tooltipConfigService.position$.subscribe(value => this.position = value);
   }

  ngOnInit(): void {
  }

  gerarWhile() {
    let whileString = '';
    if (this.do.value) {
      whileString = `faca {
          escreva("${this.action.value}")
      } enquanto (${this.condition.value})`
    } else {
      whileString = `enquanto (${this.condition.value}) {
          escreva("${this.action.value}")
      }`
    }

    this.createdWhile = whileString;
  }

}
