import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputComponent } from '@shared/components';
import { ValidatorsService } from '@shared/services';
import { EmailValidator, IsEqualFieldValidator } from '@shared/validators';
// import * as customValidators from '@shared/validators';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, InputComponent],
  template: `
    <h2>Validaciones Reactivas</h2>
    <hr />

    <div class="row">
      <div class="col">
        <form
          [formGroup]="registerForm()"
          (ngSubmit)="onSubmit()"
          autocomplete="off"
        >
          <shared-input
            label="Nombre"
            placeholder="Nombre de Usuario"
            [control]="$any(registerForm().get('name'))"
          />
          <shared-input
            label="Email"
            [type]="'email'"
            [control]="$any(registerForm().get('email'))"
            placeholder="Email del usuario"
          />
          <shared-input
            label="Username"
            [control]="$any(registerForm().get('username'))"
            placeholder="Nombre código del usuario"
          />
          <shared-input
            label="Password"
            [control]="$any(registerForm().get('password'))"
            type="password"
            placeholder="Password de su cuenta"
          />
          <shared-input
            label="Confirmar"
            type="password"
            [control]="$any(registerForm().get('confirmPassword'))"
            placeholder="Confirmar la contraseña"
          />

          <div class="row">
            <div class="col">
              <button class="btn btn-primary float-end" type="submit">
                Crear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <h2>Form Valid: {{ registerForm().valid }}</h2>
    <h2>Form Status: {{ registerForm().status }}</h2>
    <h2>Form Pending: {{ registerForm().pending }}</h2>
    <h2>Form errors</h2>
    <pre>{{ registerForm().errors | json }}</pre>

    <h5>Nombre</h5>
    <pre>{{ registerForm().controls['name'].errors | json }}</pre>

    <h5>Email</h5>
    <pre>{{ registerForm().controls['email'].errors | json }}</pre>

    <h5>Username</h5>
    <pre>{{ registerForm().controls['username'].errors | json }}</pre>

    <h5>Password</h5>
    <pre>{{ registerForm().value.password | json }}</pre>

    <h5>Confirmar</h5>
    <pre>{{ registerForm().controls['confirmPassword'].errors | json }}</pre>
  `,
  styles: ``,
})
export class RegisterPageComponent {
  #fb = inject(FormBuilder);
  #validatorsService = inject(ValidatorsService);
  #emailValidator = inject(EmailValidator);
  #isEqualFieldValidator = inject(IsEqualFieldValidator);

  public registerForm = signal<FormGroup>(
    this.#fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(
              this.#validatorsService.firstNameAndLastNamePattern()
            ),
          ],
        ],
        // email: ['', [Validators.required, Validators.pattern(this.#validatorsService.emailPatter())], [new EmailValidator()]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.#validatorsService.emailPatter()),
          ],
          [this.#emailValidator],
        ],
        username: [
          '',
          [Validators.required, this.#validatorsService.cantBeStrider],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          this.#isEqualFieldValidator.validate('password', 'confirmPassword'),
        ],
      }
    )
  );

  // isValidField(field: string): boolean | null {
  //   return this.#validatorsService.isValidField(this.registerForm(), field)
  // }

  onSubmit(): void {
    this.registerForm().markAllAsTouched();
  }
}
