import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  usdRate: number = 0;
  gbpRate: number = 0;
  eurRate: number = 0;

  private currencySubscription: Subscription | undefined;

  constructor(
    private currencyService: CurrencyService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.currencySubscription = this.currencyService
      .getCurrencyRatesEvery30Seconds()
      .subscribe((rates) => {
        this.usdRate = rates.usd;
        this.gbpRate = rates.gbp;
        this.eurRate = rates.eur;
      });
  }

  ngOnDestroy() {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
  }

  onSearch() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
}
