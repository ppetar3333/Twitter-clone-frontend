import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    constructor(private element: ElementRef) {
        // no-op
    }

    public ngAfterViewInit(): void {
        Promise.resolve(undefined).then(() => { this.element.nativeElement.focus(); });
    }

}

