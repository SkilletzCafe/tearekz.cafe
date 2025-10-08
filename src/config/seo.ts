import { BUSINESS } from './business';

const LOCATION = `${BUSINESS.location.neighborhood}, ${BUSINESS.location.city}, ${BUSINESS.location.state}, ${BUSINESS.location.country_abbrev}`;
const BASE_TITLE = `${BUSINESS.name} | Boba Tea & Specialty Drinks in ${LOCATION}`;

export const SEO = {
  formatTitle: (page?: string) => (page ? `${page} | ${BASE_TITLE}` : BASE_TITLE),

  description: {
    default: `Premium boba tea and specialty drinks in ${LOCATION}. Serving fresh, handcrafted bubble tea, milk tea, fruit tea, and specialty beverages daily. Open weekdays ${BUSINESS.hours.weekday.open}-${BUSINESS.hours.weekday.close}, weekends ${BUSINESS.hours.weekend.open}-${BUSINESS.hours.weekend.close}. Fresh, quality ingredients in every cup.`,
  },
} as const;
