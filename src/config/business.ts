import { buildFullAddress } from '@/utils/address';

export const BUSINESS = {
  domain: 'tearekz.cafe',
  name: "Tea-Rek'z",
  branding: {
    welcome: 'Welcome to',
    tagline: 'Premium Boba Tea & Specialty Drinks in Historic Niles - Fresh, Handcrafted Beverages',
    slogan:
      'Dino-mite Boba & Tea - Fresh, Handcrafted Drinks in Historic Niles, Fremont, California',
  },
  founding: {
    year: 2025,
  },
  location: {
    address: '37390 Niles Blvd',
    city: 'Fremont',
    state: 'CA',
    zip: '94536',
    neighborhood: 'Niles',
    country_abbrev: 'US',
    lat: 37.5773115,
    lng: -121.9802536,
    phone: '(510) 793-8161',
  },
  contact: {
    email: 'hello@tearekz.cafe',
  },
  hours: {
    mondayToWednesday: {
      days: 'Monday - Wednesday',
      dayList: ['Monday', 'Tuesday', 'Wednesday'],
      open: '12:00',
      close: '19:00',
      display: '12pm - 7pm',
    },
    thursdayFriday: {
      days: 'Thursday - Friday',
      dayList: ['Thursday', 'Friday'],
      open: '12:00',
      close: '21:00',
      display: '12pm - 9pm',
    },
    weekend: {
      days: 'Saturday - Sunday',
      dayList: ['Saturday', 'Sunday'],
      open: '10:00',
      close: '21:00',
      display: '10am - 9pm',
    },
  },
} as const;

export const FULL_ADDRESS = buildFullAddress(BUSINESS.location);
