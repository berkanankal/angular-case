import { Market, ReyonTuru } from './types';

export const marketA: Market = {
  id: 'market-a',
  name: 'Market A',
  reyonlar: [
    {
      id: 'r1',
      name: 'R1',
      tur: ReyonTuru.GIDA,
      urunler: [
        { id: 'u1', name: 'Pirinç', reyonId: 'r1' },
        { id: 'u2', name: 'Ekmek', reyonId: 'r1' },
        { id: 'u3', name: 'Un', reyonId: 'r1' },
        { id: 'u4', name: 'Makarna', reyonId: 'r1' },
      ],
    },
    {
      id: 'r2',
      name: 'R2',
      tur: ReyonTuru.TEMIZLIK,
      urunler: [
        { id: 'u5', name: 'Bez', reyonId: 'r2' },
        { id: 'u6', name: 'Deterjan', reyonId: 'r2' },
        { id: 'u7', name: 'Sabun', reyonId: 'r2' },
        { id: 'u8', name: 'Sünger', reyonId: 'r2' },
      ],
    },
    {
      id: 'r3',
      name: 'R3',
      tur: ReyonTuru.KIRTASIYE,
      urunler: [
        { id: 'u9', name: 'Kalem', reyonId: 'r3' },
        { id: 'u10', name: 'Defter', reyonId: 'r3' },
        { id: 'u11', name: 'Silgi', reyonId: 'r3' },
      ],
    },
    {
      id: 'r4',
      name: 'R4',
      tur: ReyonTuru.GIDA,
      urunler: [
        { id: 'u12', name: 'Pirinç', reyonId: 'r4' },
        { id: 'u13', name: 'Un', reyonId: 'r4' },
        { id: 'u14', name: 'Bulgur', reyonId: 'r4' },
        { id: 'u15', name: 'Salça', reyonId: 'r4' },
      ],
    },
  ],
};

export const marketB: Market = {
  id: 'market-b',
  name: 'Market B',
  reyonlar: [
    {
      id: 'r5',
      name: 'R1',
      tur: ReyonTuru.GIDA,
      urunler: [
        { id: 'u16', name: 'Ekmek', reyonId: 'r5' },
        { id: 'u17', name: 'Un', reyonId: 'r5' },
        { id: 'u18', name: 'Makarna', reyonId: 'r5' },
      ],
    },
    {
      id: 'r6',
      name: 'R2',
      tur: ReyonTuru.TEMIZLIK,
      urunler: [
        { id: 'u19', name: 'Sabun', reyonId: 'r6' },
        { id: 'u20', name: 'Toz Bezi', reyonId: 'r6' },
      ],
    },
    {
      id: 'r7',
      name: 'R3',
      tur: ReyonTuru.KIRTASIYE,
      urunler: [
        { id: 'u21', name: 'Silgi', reyonId: 'r7' },
        { id: 'u22', name: 'Kalemtraş', reyonId: 'r7' },
        { id: 'u23', name: 'Kalem', reyonId: 'r7' },
        { id: 'u24', name: 'Defter', reyonId: 'r7' },
      ],
    },
    {
      id: 'r8',
      name: 'R4',
      tur: ReyonTuru.KOZMETIK,
      urunler: [{ id: 'u25', name: 'Kadın Parfüm', reyonId: 'r8' }],
    },
  ],
};
