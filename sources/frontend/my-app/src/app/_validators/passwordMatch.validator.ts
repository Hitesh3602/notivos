import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl) => {
        const sourceCtrl = control.get(source);
        const targetCtrl = control.get(target);
        // console.log(`source=${sourceCtrl?.value}, target=${targetCtrl?.value}`);
        return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { mismatch: true }
            : null;
    }
}