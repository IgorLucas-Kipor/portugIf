import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'portugif';

  firstConditionTranslatedCode: string = '';
  secondConditionTranslatedCode: string = '';
  printTranslatedCode: string = '';
  finalString: string = "}"
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
  position = new FormControl(this.positionOptions[0]);

  hideDelay = new FormControl(0);

  showTooltipOnClick = new FormControl(false);

  clickedGenerateCode = false;

  constructor(private fb: FormBuilder) {}

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

  configureDelay() {
    if (this.showTooltipOnClick.value) {
      this.hideDelay.disable();
      this.hideDelay.setValue(0);
    } else {
      this.hideDelay.enable();
    }
  }

  onGenerateCodeClick() {
    this.clickedGenerateCode = true;
  }

  translateCode() {

    this.firstConditionTranslatedCode = '';

    this.firstConditionTranslatedCode += this.textToCodeOutput.get('textStart')?.value.toLowerCase();
    this.firstConditionTranslatedCode += ' ';
    if (this.textToCodeOutput.get('insertConnector')?.value) {
      this.firstConditionTranslatedCode += '(';
    }
    this.firstConditionTranslatedCode += this.textToCodeOutput.get('firstNegative')?.value ? '(!' : '(';
    this.firstConditionTranslatedCode += this.textToCodeOutput.get('firstFreeInput')?.value +')';

    if (this.textToCodeOutput.get('insertConnector')?.value) {
      this.secondConditionTranslatedCode += '  ' + this.textToCodeOutput.get('textConnector')?.value + ' ';
      this.secondConditionTranslatedCode += this.textToCodeOutput.get('secondNegative')?.value ? '(!' : '(';
      this.secondConditionTranslatedCode += this.textToCodeOutput.get('secondFreeInput')?.value + ')';
      this.secondConditionTranslatedCode += ') {';
    } else {
      this.firstConditionTranslatedCode += ' {';
    }

    this.printTranslatedCode += '     escreva(';
    this.printTranslatedCode += this.textToCodeOutput.get('thirdNegative')?.value ? 'não ' : '';
    this.printTranslatedCode += this.textToCodeOutput.get('thirdFreeInput')?.value;
    this.printTranslatedCode += ')';

    this.generatedCode = true;

  }
}
