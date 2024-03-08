import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@shared/components';

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

    <h2>Form Valid: {{registerForm().valid}}</h2>
    <h2>Form Status: {{registerForm().status}}</h2>
    <h2>Form Pending: {{registerForm().pending}}</h2>
    <h2>Form errors</h2>
    <pre>{{ registerForm().errors | json }}</pre>

    <h5>Nombre</h5>
    <pre>{{ registerForm().value.name | json }}</pre>

    <h5>Email</h5>
    <pre>{{ registerForm().value.email | json }}</pre>

    <h5>Username</h5>
    <pre>{{ registerForm().value.username | json }}</pre>

    <h5>Password</h5>
    <pre>{{ registerForm().value.password | json }}</pre>

    <h5>Confirmar</h5>
    <pre>{{ registerForm().value.confirmPassword | json }}</pre>
  `,
  styles: ``,
})
export class RegisterPageComponent {
  #fb = inject(FormBuilder);

  public registerForm = signal<FormGroup>(
    this.#fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    })
  );

  onSubmit(): void {
    this.registerForm().markAllAsTouched();
  }
}
