import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/TRY';

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<{ usd: number; gbp: number; eur: number }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => ({
        usd: 1 / response.rates.USD,
        gbp: 1 / response.rates.GBP,
        eur: 1 / response.rates.EUR,
      }))
    );
  }

  getCurrencyRatesEvery30Seconds(): Observable<{
    usd: number;
    gbp: number;
    eur: number;
  }> {
    return timer(0, 30000).pipe(switchMap(() => this.getCurrencyRates()));
  }
}
