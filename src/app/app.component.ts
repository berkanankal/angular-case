import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MarketComponent } from './components/market/market.component';
import { StorageService } from './services/storage.service';
import { Market } from '../types';
import { CommonModule } from '@angular/common';
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
export class AppComponent implements OnInit {
  markets: Market[] = [];

  @ViewChildren(MarketComponent) marketComponents!: QueryList<MarketComponent>;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.markets = this.storageService.getMarkets();
  }

  saveChanges() {
    if (confirm(`Değişiklikleri kaydetmek istediğinizden emin misiniz?`)) {
      const updatedMarkets = this.marketComponents.map((mc) => mc.market);
      this.storageService.saveMarkets(updatedMarkets);
      alert('Değişiklikler başarıyla kaydedildi.');
    }
  }
}
