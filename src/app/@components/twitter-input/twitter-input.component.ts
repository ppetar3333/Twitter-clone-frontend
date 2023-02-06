import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'twitter-input',
  templateUrl: './twitter-input.component.html',
  styleUrls: ['./twitter-input.component.scss'],
})
export class TwitterInputComponent implements OnInit {
  @Input('placeholder') placeholder: string = '';
  @Input('type') type: string = '';
  @Input('autocomplete') autocomplete: boolean = false;
  @Input('value') value: string | number = '';
  @Input('model') model: string = '';
  @Input('label') label: string = '';
  @Input('disabled') disabled: boolean = false;
  @Input('required') required: boolean = false;
  @Input('optional') optional: boolean = false;
  @Input('sufix') sufix: any;
  @Input('sufixIcon') sufixIcon: string = '';
  @Input('prefix') prefix: any;
  @Input('errorState') errorState: boolean = false;
  @Input('customErrorMessage') customErrorMessage: string = '';
  @Output('valueChange') valueChange = new EventEmitter<string | number | object>();
  private timeout: any = null;
  public customError: string = 'Error message needs to be customed';

  constructor() {}

  public ngOnInit(): void {}

  public onUserInput(event: any): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getInputData(event);
    }, 800);
  }

  public getInputData(event: any): void {
    if (this.type === 'text') {
      this.valueChange.emit(event.target.value);
    } else {
      this.valueChange.emit(Number.parseFloat(event.target.value));
    }
  }
}
