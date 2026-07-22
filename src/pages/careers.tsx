import { BUSINESS, FULL_ADDRESS, SOCIAL_MEDIA } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/Careers.module.css';

const openPositions = [
  {
    title: "Tea-Rek'z Barista",
    location: FULL_ADDRESS,
    schedule: 'Part-time, after-school and weekend availability preferred',
    status: 'Hiring selectively for exceptional candidates',
    summary:
      "Make premium craft tea, boba, smoothies, and specialty drinks while giving every guest a warm, fast, accurate Tea-Rek'z experience.",
    responsibilities: [
      'Prepare drinks consistently from recipes, with clean measurements and strong attention to tea quality, sweetness, ice, toppings, texture, and presentation.',
      'Keep the bar, toppings, tools, and guest areas clean, stocked, labeled, and ready before the rush hits.',
      'Welcome families, students, and Niles neighbors with upbeat hospitality and clear communication.',
      'Move with urgency, take coaching quickly, and help teammates finish the next right task without being reminded.',
    ],
    lookingFor: [
      'The best: reliable, kind, coachable people who take pride in doing the little things right.',
      'Diligent self-starters who notice what needs to be cleaned, restocked, prepped, or improved.',
      'People who care about craft drinks, accurate recipes, and consistent guest experiences.',
      'Local students and early-career applicants are welcome, especially if you want to grow with us for more than one season.',
    ],
  },
];

const culturePoints = [
  {
    title: 'Craft over shortcuts',
    description:
      'Real tea, real milk, real fruit, careful recipes, and consistent execution. Every drink should be something we are proud to hand to a guest.',
  },
  {
    title: 'Clean, stocked, ready',
    description:
      'Great service starts before the ticket prints. We keep stations clean, toppings fresh, tools ready, and the bar prepared for rushes.',
  },
  {
    title: 'Fast, warm hospitality',
    description:
      'We move quickly without making guests feel rushed. Families, kids, students, and neighbors should feel welcome here.',
  },
  {
    title: 'Coachability',
    description:
      'The best teammates listen, learn, improve, and make the next shift easier. Attitude matters as much as experience.',
  },
  {
    title: 'Ownership',
    description:
      'If something is off, we speak up and help fix it. Tea-Rek’z is young, and every strong teammate helps shape the standard.',
  },
  {
    title: 'Team first',
    description:
      'We cover gaps, help without being asked, and keep the whole shop moving. No one wins alone behind the bar.',
  },
];

const emailSubject = encodeURIComponent("Careers - Tea-Rek'z Barista");
const emailBody = encodeURIComponent(
  "Hi Tea-Rek'z team,\n\nI'm interested in the Tea-Rek'z Barista position.\n\nWhy I'm interested:\n\nWhy I would be a strong fit:\n\nMy availability:\n\nRelevant experience:\n"
);

export default function Careers() {
  return (
    <BasicPageLayout
      title="Careers at Tea-Rek'z"
      heading="Careers at Tea-Rek’z"
      intro="Tea-Rek’z is hiring selectively. We are always excited to meet exceptional people who care about craft drinks, clean execution, fast service, and genuine hospitality."
    >
      <section className={styles.fullWidthSection} aria-labelledby="culture-heading">
        <div className={styles.heroCard}>
          <p className={styles.eyebrow}>Premium craft tea & boba in Niles</p>
          <h2 id="culture-heading">We are building the Tea-Rek’z standard</h2>
          <p>
            Tea-Rek’z is a small, growing shop next to Skillet&apos;z Cafe in historic Niles. We
            make drinks with real ingredients, careful recipes, and a lot of pride. The team we hire
            now helps define what this place becomes.
          </p>
          <p>
            We are not trying to hire everyone. We are looking for the best people: dependable,
            kind, sharp, coachable teammates who want to learn a craft and can be trusted with real
            responsibility.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {culturePoints.map((point) => (
            <article className={styles.valueCard} key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fullWidthSection} aria-labelledby="open-positions-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Open positions</p>
          <h2 id="open-positions-heading">We are hiring Tea-Rek’z Baristas</h2>
          <p>
            The barista position stays open because the right person is worth making room for.
            Experience helps, but reliability, work ethic, coachability, and attitude matter most.
          </p>
        </div>

        <div className={styles.positionsList}>
          {openPositions.map((position) => (
            <article className={styles.positionCard} key={position.title}>
              <div className={styles.positionHeader}>
                <div>
                  <p className={styles.positionStatus}>{position.status}</p>
                  <h3>{position.title}</h3>
                </div>
                <div className={styles.positionMeta}>
                  <span>{position.location}</span>
                  <span>{position.schedule}</span>
                </div>
              </div>

              <p className={styles.positionSummary}>{position.summary}</p>

              <div className={styles.positionDetailsGrid}>
                <div>
                  <h4>What you will do</h4>
                  <ul>
                    {position.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Who we want</h4>
                  <ul>
                    {position.lookingFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fullWidthSection} aria-labelledby="apply-heading">
        <div className={styles.applyCard}>
          <div>
            <p className={styles.eyebrow}>How to apply</p>
            <h2 id="apply-heading">Tell us why you would be excellent</h2>
            <p>
              No long application is needed. Send a short note with why you are interested, why you
              would be a strong fit, your availability, and any relevant experience.
            </p>
          </div>
          <div className={styles.applyActions}>
            <a
              className={styles.primaryButton}
              href={`mailto:${BUSINESS.contact.careersEmail}?subject=${emailSubject}&body=${emailBody}`}
            >
              Email {BUSINESS.contact.careersEmail}
            </a>
            <a
              className={styles.secondaryButton}
              href={SOCIAL_MEDIA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              DM us on Instagram
            </a>
            <a
              className={styles.secondaryButton}
              href={SOCIAL_MEDIA.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on Facebook
            </a>
          </div>
        </div>
      </section>
    </BasicPageLayout>
  );
}
