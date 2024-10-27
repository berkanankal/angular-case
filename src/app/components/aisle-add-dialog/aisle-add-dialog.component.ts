import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Market, ReyonTuru } from '../../../types';

@Component({
  selector: 'app-aisle-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './aisle-add-dialog.component.html',
  styleUrl: './aisle-add-dialog.component.scss',
})
export class AisleAddDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() market!: Market;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() aisleAdded = new EventEmitter<{ name: string; tur: ReyonTuru }>();

  reyonName: string = '';
  selectedTur: ReyonTuru | null = null;

  turOptions = [
    { label: 'Gıda', value: ReyonTuru.GIDA },
    { label: 'Temizlik', value: ReyonTuru.TEMIZLIK },
    { label: 'Kırtasiye', value: ReyonTuru.KIRTASIYE },
    { label: 'Kozmetik', value: ReyonTuru.KOZMETIK },
    { label: 'Elektronik', value: ReyonTuru.ELEKTRONIK },
  ];

  ngOnInit() {
    this.updateReyonName();
  }

  updateReyonName() {
    const existingIds = this.market.reyonlar.map((reyon) =>
      parseInt(reyon.name.slice(1))
    );
    const maxId = Math.max(...existingIds, 0);
    this.reyonName = `R${maxId + 1}`;
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selectedTur = null;
    this.updateReyonName();
  }

  addAisle() {
    if (this.selectedTur) {
      this.aisleAdded.emit({ name: this.reyonName, tur: this.selectedTur });
      this.hideDialog();
    }
  }
}
