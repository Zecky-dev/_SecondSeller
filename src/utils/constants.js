const padding = {
  L1: 4,
  L2: 8,
  L3: 12,
  L4: 16,
  L5: 24,
  L6: 32,
};
const margin = padding;
const borderRadius = padding;
const fontSize = {
  L1: 8,
  L2: 12,
  L3: 16,
  L4: 18,
  L5: 24,
  L6: 32,
  L7: 48,
  L8: 64,
};
const borderWidth = {
  thin: 0.5,
  normal: 1,
  medium: 1.5,
};

const APP_NAME = 'SecondSeller';
const APP_SLOGAN = 'Ikinci el, birinci sınıf kalite!';
const APP_FONT = 'Galada-Regular';

const ADVERTISEMENT_CATEGORIES = [
  {
    key: 1,
    label: 'Elektronik',
    value: 'electronic',
  },
  {
    key: 2,
    label: 'Giyim',
    value: 'clothes',
  },
  {
    key: 3,
    label: 'Araç',
    value: 'vehicle',
  },
  {
    key: 4,
    label: 'Eğlence',
    value: 'entertainment',
  },
  {
    key: 5,
    label: 'Kitap',
    value: 'book',
  },
  {
    key: 6,
    label: 'Diğer',
    value: 'other'
  }
];

const FILTER_OPTIONS = {
  PRICE: [
    {
      key: 1,
      label: 'Azalan',
      value: 'descending',
    },
    {
      key: 2,
      label: 'Artan',
      value: 'ascending',
    },
  ],

  CREATE_DATE: [
    {
      key: 1,
      label: 'Eskiden Yeniye',
      value: 'descending',
    },
    {
      key: 2,
      label: 'Yeniden Eskiye',
      value: 'ascending',
    },
  ],

  CATEGORY: ADVERTISEMENT_CATEGORIES,
};

const FAST_MESSAGES = {
  RECEIVER: {
    messages: [
      {
        key: 1,
        message: 'Hala satılık mı?',
      },
      {
        key: 2,
        message: 'Son fiyat nedir?',
      },
      {
        key: 3,
        message: 'Durumu nasıl?',
      },
      {
        key: 4,
        message: 'Daha fazla bilgi alabilir miyim?',
      },
    ],
  },
  OWNER: {
    messages: [
      {
        key: 1,
        message: 'Evet, hala satılık.',
      },
      {
        key: 2,
        message: 'Üzgünüm, satıldı.',
      },
      {
        key: 3,
        message: 'Teklifin nedir?',
      },
      {
        key: 4,
        message: 'Maalesef, teklifini kabul edemem.',
      },
    ],
  },
};

export default {
  padding,
  margin,
  fontSize,
  borderRadius,
  borderWidth,
  ADVERTISEMENT_CATEGORIES,
  APP_NAME,
  APP_SLOGAN,
  APP_FONT,
  FILTER_OPTIONS,
  FAST_MESSAGES,
};
