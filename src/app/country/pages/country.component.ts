import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Region, SmallCountry } from '@country/interfaces';
import { CountryService } from '@country/services';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Selectores Anidados (cascada)</h1>
    <hr />

    <form [formGroup]="countryForm()">
      <!-- Region -->
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Continente:</label>
          <select class="form-control" formControlName="region">
            <option value="" disabled>>-- Seleccione Continente --<</option>
            @for(region of regions; track region) {
            <option [value]="region">{{ region }}</option>
            }
          </select>
        </div>
      </div>
      <!-- Country -->
      @if(countriesByRegion().length > 0) {
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">País:</label>
          <select class="form-control" formControlName="country">
            <option value="" disabled>>-- Seleccione País --<</option>
            @for(country of countriesByRegion(); track country) {
            <option [value]="country.cca3">{{ country.name }}</option>
            }
          </select>
        </div>
      </div>
      }
    </form>

    <h3>Formulario</h3>
    <code>
      {{ countryForm().value | json }}
    </code>
    <p>is form valid: {{ countryForm().valid }}</p>
  `,
  styles: ``,
})
export class CountryComponent {
  public countriesByRegion = signal<SmallCountry[]>([]);

  #fb = inject(FormBuilder);
  #countryService = inject(CountryService);

  public countryForm = signal<FormGroup>(
    this.#fb.group({
      region: ['', Validators.required],
      country: ['', Validators.required],
      borders: ['', Validators.required],
    })
  );

  get regions(): Region[] {
    return this.#countryService.regions;
  }

  ngOnInit() {
    this.#onRegionChanged();
  }

  #onRegionChanged(): void {
    this.countryForm()
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.countryForm().get('country')!.setValue('')),
        switchMap((region) => this.#countryService.getCountriesByRegion(region))
      )
      .subscribe((countries) => this.countriesByRegion.set(countries));
  }
}
