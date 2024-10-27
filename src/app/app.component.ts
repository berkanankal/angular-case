import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MarketComponent } from './components/market/market.component';
import { StorageService } from './services/storage.service';
import { SearchService } from './services/search.service';
import { Market } from '../types';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    NavbarComponent,
    MarketComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  allMarkets: Market[] = [];
  filteredMarkets: Market[] = [];
  private searchSubscription: Subscription | undefined;

  constructor(
    private storageService: StorageService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.allMarkets = this.storageService.getMarkets();
    this.filteredMarkets = [...this.allMarkets];

    this.searchSubscription = this.searchService.searchTerm$.subscribe(
      (term) => {
        this.filterMarkets(term);
      }
    );
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  filterMarkets(searchTerm: string) {
    if (!searchTerm) {
      this.filteredMarkets = [...this.allMarkets];
      return;
    }

    this.filteredMarkets = this.allMarkets
      .map((market) => ({
        ...market,
        reyonlar: market.reyonlar
          .map((reyon) => ({
            ...reyon,
            urunler: reyon.urunler.filter((urun) =>
              urun.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
          }))
          .filter((reyon) => reyon.urunler.length > 0),
      }))
      .filter((market) => market.reyonlar.length > 0);
  }

  saveChanges() {
    if (confirm(`Değişiklikleri kaydetmek istediğinizden emin misiniz?`)) {
      this.storageService.saveMarkets(this.allMarkets);
      alert('Değişiklikler başarıyla kaydedildi.');
    }
  }
}
