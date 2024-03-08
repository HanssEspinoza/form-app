import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

        <span class="form-text text-danger">
          Debe de ser en formato de nombre y apellido
        </span>
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
}
