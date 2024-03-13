import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsService } from '@shared/services';

type inputType = 'text' | 'password' | 'email';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="row mb-3">
      <label class="col-sm-3 col-form-label">{{ label() }}</label>
      <div class="col-sm-9">
        <input
          [type]="type()"
          [formControl]="control()"
          class="form-control"
          [placeholder]="placeholder()"
        />
        @if (isValidControl()) {
        <span class="form-text text-danger">
          {{ getError() }}
        </span>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class InputComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  type = input<inputType>('text');
  placeholder = input<string>('');

  #validatorsService = inject(ValidatorsService);

  public isValidControl(): boolean | null {
    return this.#validatorsService.isValidField(this.control());
  }

  public getError(): string | null {
    return this.#validatorsService.getControlError(this.control());
  }
}
