import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mat-twitter-input',
  templateUrl: './mat-input.component.html',
  styleUrls: ['./mat-input.component.scss']
})
export class MatInputComponent implements OnInit {
  @Input('placeholder') placeholder: string = '';
  @Input('textarea') textarea: boolean = false;
  @Input('onlyLetter') onlyLetter: boolean = false;
  @Input('type') type: string = '';
  @Input('input') input: boolean = true;
  @Input('value') value: string | number = '';
  @Input('label') label: string = '';
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('numberType') numberType: boolean = false;
  @Input('dropdown') dropdown: boolean = false;
  @Input('dropdownItems') dropdownItems: Array<any> = [];
  @Output('valueChange') valueChange = new EventEmitter<string | number | object>();
  private timeout: any = null;

  constructor() { }

  public ngOnInit(): void { }

  public onUserInput(event: any): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getInputData(event);
    }, 100);
  }

  public getInputData(event: any): void {
    if (this.dropdown) {
      this.valueChange.emit(event.source.value);
    } else {
      this.valueChange.emit(event.target.value);
    }
  }
}
