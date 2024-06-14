import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import { TooltipConfigService } from '../services/tooltip-config.service';
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  firstDropdownTitle: string = "O que são variáveis?";

  secondDropdownTitle: string = "Para que são usadas variáveis?";

  thirdDropdownTitle: string = "Quais são os tipos de variáveis existentes?";

  fourthDropdownTitle: string = "Como são usadas as variáveis?"

  firstDropdownContent: string = "As variáveis são espaços de memória reservados para o armazenamento de dados. " +
    "Variáveis conseguem armazenar diversos tipos de dados, tais como texto, valores numéricos, datas e objetos - estruturas mais complexas que armazenam dentro de si um conjunto de dados. " +
    "Cada variável possui sempre um nome único que a identifica no sistema e marcações que definem características do seu comportamento, tais como os tipos de dados que elas armazenam ou se podem ser modificadas."

  secondDropdownContent: string = `Variáveis são fundamentais no processamento, armazenamento e manipulação de dados em aplicações das mais diversas. ` +
    `Elas permitem que informações sejam armazenadas na memória do computador e utilizadas em múltiplos contextos. ` +
    `Quando um usuário está realizando login em alguma plataforma, por exemplo, as informações de acesso estão muito provavelmente sendo armazenadas em uma variável para então se fazer a validação.`

  thirdDropdownContent: string = "De forma geral, os tipos de variáveis existentes variam dentre diferentes linguagens de programação. " +
    "Enquanto o Javascript representa valores numéricos com 'numbers', por exemplo, linguagens como o Java quebram essa representação em vários tipos diferentes, como o long, int, double e float. " +
    "Isso dito, de forma geral, podemos entender que existem os seguintes tipos: variáveis numéricas, variáveis textuais, variáveis de datas, " +
    "variáveis booleanas (que armazenam valores em uma noção binária de verdadeiro ou falso), variáveis de lista ou array (armazenam múltiplos valores de um mesmo tipo), " +
    "variáveis de mapa (armazenam valores em uma relação chave-valor), variáveis de objeto (que armazenam conjuntos de dados dentro de si), variáveis nulas e variáveis indefinidas. " +
    "Se isso parece complicado, no entanto, não se preocupe! Aqui focaremos apenas nos dois primeiros tipos."

  fourthDropdownContent: string = "A forma de utilização de variáveis varia um pouco de acordo com a linguagem de programação usada, mas segue certos padrões. " +
    "Antes de qualquer coisa, é necessário que seja feita a declaração da variável, criando uma instância que irá identificá-la e armazená-la na memória. " +
    "Dependendo da linguagem de programação usada, pode ser necessário nesse caso se determinar o tipo de variável ou estabelecer se essa variável pode ou não sofrer alterações. " +
    "Uma vez definida a variável, ela já pode ser usada de multiplas formas: valores numéricos podem sofrer operações aritméticas, valores textuais podem ser concatenados ou cortados, " +
    "valores de data podem ter informações quanto a dia, mês, ano ou hora extraídas de si e todos os tipos de variáveis podem ser usadas em validações ou exibidas ao usuário, conforme necessário."

  createVariable = this.fb.group({
    type: [null, Validators.required],
    name: [null, [Validators.required]],
    value: [null]
  });

  createdVariable: string | undefined;
  createdVariableValue: any | undefined;
  createdVariableType: string | undefined;
  inputVariable: string = '';
  displayedText: string = '';
  correctValue: boolean = false;

  snackbarConfig: MatSnackBarConfig = new MatSnackBarConfig<any>();

  showTooltipOnClick: boolean = false;
  hideDelay: number = 0;
  position: TooltipPosition = "after";

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private tooltipConfigService: TooltipConfigService) {
    this.tooltipConfigService.showTooltipOnClick$.subscribe(value => this.showTooltipOnClick = value);
    this.tooltipConfigService.hideDelay$.subscribe(value => this.hideDelay = value);
    this.tooltipConfigService.position$.subscribe(value => this.position = value);
  }

  ngOnInit(): void {
    this.snackbarConfig.duration = 5000;
    this.snackbarConfig.horizontalPosition = 'center';
    this.snackbarConfig.verticalPosition = 'top';
    this.snackbarConfig.panelClass = ['red-snackbar'];
  }

  onSubmit() {
    const type = this.createVariable.get('type')?.value;
    const name = this.createVariable.get('name')?.value;
    let value = this.createVariable.get('value')?.value;

    if (type == 'real' && value !== null && isNaN(value)) {
      this._snackBar.open('Se o tipo da variável é numérico (real), o valor inserido para ela deve ser numérico. Convertendo valor inserido para null.', 'Ok', this.snackbarConfig);
      value = null;
    } if (type == 'logico' && value !== null && value.toLowerCase() !== 'verdadeiro' && value.toLowerCase() !== 'falso') {
      this._snackBar.open('Se o tipo da variável é lógico, o valor inserido para ela deve ser verdadeiro ou falso. Convertendo valor inserido para null.', 'Ok', this.snackbarConfig);
      value = null;
    }

    this.createdVariable = type + ' ' + name;

    this.createdVariableValue = value;
    this.createdVariableType = type;

    if (this.createdVariableValue != null) {
      if (type == 'inteiro') {
        this.createdVariable = this.createdVariable + ': ' + this.createdVariableValue;
      } else if (type == 'texto') {
        this.createdVariable = this.createdVariable + ': ' + `"${this.createdVariableValue}"`;
      } else {
        if (this.createdVariableValue.toLowerCase() == 'verdadeiro' || this.createdVariableValue.toLowerCase() == 'falso') {
          this.createdVariable = this.createdVariable + `: ${this.createdVariableValue.toLowerCase()}`;
        }
      }
    }

    this.createVariable.reset();
    this.createVariable.markAsPristine();
    this.createVariable.markAsUntouched();

    Object.keys(this.createVariable.controls).forEach(key => {
      this.createVariable.get(key)?.setErrors(null);
    });

    console.log(this.createVariable)

  }

  submitVariable() {
    let receivedValue;

    if (this.inputVariable == 'null') {
      receivedValue = null;
    } else if (this.createdVariableType == 'real') {
      receivedValue = +this.inputVariable;
    } else {
      receivedValue = this.inputVariable;
    }

    if (receivedValue == this.createdVariableValue) {
      this.displayedText = "O valor está correto!"
      this.correctValue = true;
    } else {
      this.displayedText = "O valor está errado!"
      this.correctValue = false;
    }
  }

}
