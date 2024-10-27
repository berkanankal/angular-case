export interface Market {
  id: string;
  name: string;
  reyonlar: Reyon[];
}

export interface Reyon {
  id: string;
  name: string;
  tur: ReyonTuru;
  urunler: Urun[];
}

export interface Urun {
  id: string;
  name: string;
  reyonId: string;
}

export enum ReyonTuru {
  GIDA = 'Gıda',
  TEMIZLIK = 'Temizlik',
  KIRTASIYE = 'Kırtasiye',
  KOZMETIK = 'Kozmetik',
  ELEKTRONIK = 'Elektronik',
}
