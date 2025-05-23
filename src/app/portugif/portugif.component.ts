import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TooltipPosition} from "@angular/material/tooltip";
import { TooltipConfigService } from '../services/tooltip-config.service';

@Component({
  selector: 'app-portugif',
  templateUrl: './portugif.component.html',
  styleUrls: ['./portugif.component.css']
})
export class PortugifComponent implements OnInit {
  firstConditionTranslatedCode: string = '';
  secondConditionTranslatedCode: string = '';
  printTranslatedCode: string = '';
  closeCode: string = '}';
  generatedCode = false;

  textToCodeOutput = this.fb.group({
    textStart: [null, Validators.required],
    firstNegative: [false, [Validators.required]],
    firstFreeInput: [null, [Validators.required]],
    insertConnector: [false, [Validators.required]],
    textConnector: [null],
    secondNegative: [false, [Validators.required]],
    secondFreeInput: [null],
    textConsequence: [null, [Validators.required]],
    thirdNegative: [false, [Validators.required]],
    thirdFreeInput: [null, [Validators.required]],
  });

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  showTooltipOnClick: boolean = false;
  hideDelay: number = 0;
  position: TooltipPosition = "after";


  clickedGenerateCode = false;

  constructor(private fb: FormBuilder, private tooltipConfigService: TooltipConfigService) {
    this.tooltipConfigService.showTooltipOnClick$.subscribe(value => this.showTooltipOnClick = value);
    this.tooltipConfigService.hideDelay$.subscribe(value => this.hideDelay = value);
    this.tooltipConfigService.position$.subscribe(value => this.position = value);
  }

  ngOnInit() {
    this.textToCodeOutput.get('insertConnector')?.valueChanges.subscribe(value => {
      this.validateConnector();
    })
  }

  validateConnector() {
    if (this.textToCodeOutput.get('insertConnector')?.value) {
      this.textToCodeOutput.get('secondFreeInput')?.setValidators(Validators.required);
      this.textToCodeOutput.get('secondFreeInput')?.updateValueAndValidity();
      this.textToCodeOutput.get('textConnector')?.setValidators(Validators.required);
      this.textToCodeOutput.get('textConnector')?.updateValueAndValidity();
    } else {
      this.textToCodeOutput.get('secondFreeInput')?.setValidators(null);
      this.textToCodeOutput.get('secondFreeInput')?.updateValueAndValidity();
      this.textToCodeOutput.get('textConnector')?.setValidators(null);
      this.textToCodeOutput.get('textConnector')?.updateValueAndValidity();
    }
  }

  onGenerateCodeClick() {
    this.clickedGenerateCode = true;
  }

  translateCode() {

    this.firstConditionTranslatedCode = `${this.textToCodeOutput.get('textStart')?.value.toLowerCase()} ${this.textToCodeOutput.get('insertConnector')?.value ? '(' : ''}${this.textToCodeOutput.get('firstNegative')?.value ? '(!' : '('}${this.textToCodeOutput.get('firstFreeInput')?.value +') '}${this.textToCodeOutput.get('insertConnector')?.value ? '' : '{'}`;
    if (this.textToCodeOutput.get('insertConnector')?.value) {
      this.secondConditionTranslatedCode = ` ${this.textToCodeOutput.get('textConnector')?.value} ${this.textToCodeOutput.get('secondNegative')?.value ? '(!' : '('}${this.textToCodeOutput.get('secondFreeInput')?.value + ')'}) {`
    }

    this.printTranslatedCode += ` escreva("${this.textToCodeOutput.get('thirdNegative')?.value ? 'não ' : ''}${this.textToCodeOutput.get('thirdFreeInput')?.value}")`;

    this.generatedCode = true;

  }
}
