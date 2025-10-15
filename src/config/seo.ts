import { BUSINESS } from './business';

const LOCATION = `${BUSINESS.location.neighborhood}, ${BUSINESS.location.city}, ${BUSINESS.location.state}, ${BUSINESS.location.country_abbrev}`;
const BASE_TITLE = `${BUSINESS.name} | Boba Tea & Specialty Drinks in ${LOCATION}`;

export const SEO = {
  formatTitle: (page?: string) => (page ? `${page} | ${BASE_TITLE}` : BASE_TITLE),

  description: {
    default: `Premium boba tea and specialty drinks in ${LOCATION}. Serving fresh, handcrafted bubble tea, milk tea, fruit tea, and specialty beverages daily. Open ${BUSINESS.hours.mondayToWednesday.days} ${BUSINESS.hours.mondayToWednesday.display}, ${BUSINESS.hours.thursdayFriday.days} ${BUSINESS.hours.thursdayFriday.display}, ${BUSINESS.hours.weekend.days} ${BUSINESS.hours.weekend.display}. Fresh, quality ingredients in every cup.`,
  },
} as const;
