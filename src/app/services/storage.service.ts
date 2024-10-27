import { Injectable } from '@angular/core';
import { Market } from '../../types';
import { marketA, marketB } from '../../data';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'markets';

  constructor() {}

  getMarkets(): Market[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [marketA, marketB];
  }

  saveMarkets(markets: Market[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(markets));
  }
}
