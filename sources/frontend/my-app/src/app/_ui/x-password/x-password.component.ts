import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-x-password',
  templateUrl: './x-password.component.html',
  styleUrls: ['./x-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XPasswordComponent),
      useClass: DefaultValueAccessor,
      multi: true
    }
  ]
})
export class XPasswordComponent implements ControlValueAccessor {

  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;

  // a simple way to generate a "unique" id for each component
  // in production, you should rather use a library like uuid
  public id = String(Date.now() + Math.random());

  value: string = '';
  passwordFieldTextType!: boolean;

  onChange: (event: any) => void = noop;
  OnTouched: (v: boolean) => void = noop;

  togglePasswordFieldTextType() {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
