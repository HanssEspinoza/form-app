import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Country, Region, SmallCountry } from '@country/interfaces';
import { of, Observable, tap, map, combineLatest } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  #http = inject(HttpClient);

  private _regions = signal<Region[]>([
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ]);

  get regions(): Region[] {
    return [...this._regions()];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url: string = `${environment.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.#http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      ),
      tap((resp) => console.log(resp))
    );
  }

  public getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url: string = `${environment.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.#http.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      })),
      tap((resp) => console.log(resp))
    );
  }

  public getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }
}
