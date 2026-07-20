import { BUSINESS } from '@/config';

import { margarine } from '@/config/fonts';

import Layout from '@/components/Layout';

import styles from '@/styles/OurStory.module.css';

const storySections = [
  {
    type: 'paragraph',
    lines: [
      'Most boba shops begin with a dream.',
      'A name.',
      'A logo.',
      'A beautiful build-out.',
      'A grand opening.',
    ],
  },
  {
    type: 'paragraph',
    lines: [
      "Tea-Rek'z began with something much simpler: an empty storefront next to Skillet'z in Niles and one question.",
    ],
  },
  { type: 'emphasis', lines: ['What should this become?'] },
  {
    type: 'paragraph',
    lines: [
      'We considered everything.',
      'A bakery.',
      'A dessert shop.',
      'A gift store.',
      'Something completely different.',
    ],
  },
  { type: 'paragraph', lines: ['But one idea kept finding its way back.'] },
  { type: 'paragraph', lines: ['A boba shop.'] },
  {
    type: 'paragraph',
    lines: [
      'Not because it was the easiest business to open.',
      'Not because it was the most profitable.',
      "But because our own kids loved boba, Niles didn't have a neighborhood boba shop, and we loved the idea of creating a place where families and friends could gather over a great drink.",
    ],
  },
  { type: 'paragraph', lines: ['The problem was...'] },
  { type: 'paragraph', lines: ['We knew almost nothing about the boba industry.'] },
  {
    type: 'paragraph',
    lines: [
      'So we did what many first-time owners do. We learned from experienced suppliers and industry professionals. They taught us proven recipes, efficient operations, and how to make drinks that customers would enjoy while keeping costs under control.',
    ],
  },
  { type: 'paragraph', lines: ["When we opened our doors, that's exactly what we did."] },
  { type: 'paragraph', lines: ['Then something unexpected happened.'] },
  {
    type: 'paragraph',
    lines: [
      'As we became more familiar with the ingredients behind many of those recipes, we started asking questions. We found ourselves reading long ingredient labels, researching unfamiliar ingredients, and thinking more carefully about what was going into each cup.',
    ],
  },
  {
    type: 'paragraph',
    lines: ['Around the same time, customers began asking us thoughtful questions.'],
  },
  {
    type: 'quote',
    lines: [
      '“Do you use nondairy creamer?”',
      '“Is there high-fructose corn syrup?”',
      '“Are the fruit syrups artificial?”',
    ],
  },
  {
    type: 'paragraph',
    lines: [
      'Those questions stayed with us because we were asking many of the same ones ourselves.',
    ],
  },
  {
    type: 'paragraph',
    lines: [
      'Like many parents, we care deeply about what our children eat and drink. One of our children is especially sensitive to certain artificial food additives, so we had already become careful label readers at home.',
    ],
  },
  { type: 'paragraph', lines: ['Then we realized something that made us uncomfortable.'] },
  {
    type: 'paragraph',
    lines: [
      "There were drinks in our own shop that we didn't feel good about serving to our own kids.",
    ],
  },
  { type: 'paragraph', lines: ["That wasn't the kind of business we wanted to build."] },
  {
    type: 'paragraph',
    lines: ['So instead of accepting things as they were, we started changing them.'],
  },
  {
    type: 'paragraph',
    lines: ['One ingredient at a time.', 'One recipe at a time.', 'One improvement after another.'],
  },
  {
    type: 'paragraph',
    lines: [
      'Every time we found an ingredient that better matched our values, we tested it. Every change meant revisiting recipes we had originally learned and carefully adjusting them until the flavor was exactly where we wanted it to be.',
    ],
  },
  {
    type: 'paragraph',
    lines: [
      'Sometimes that process took days.',
      'Sometimes weeks.',
      'Occasionally we started over completely.',
    ],
  },
  { type: 'paragraph', lines: ['To our surprise, we discovered something wonderful.'] },
  {
    type: 'paragraph',
    lines: [
      "When you begin with better ingredients and take the time to build recipes around them, the drinks don't just align better with our standards—they often taste even better.",
    ],
  },
  { type: 'paragraph', lines: ["That realization changed the direction of Tea-Rek'z."] },
];

const menuSections = [
  {
    heading: 'Water',
    paragraphs: [
      [
        'Tea is mostly water.',
        "That's why every tea, coffee, lemonade, and batch of boba begins with multi-stage filtered and remineralized water. It isn't something most people notice, but it's the foundation of every drink we serve.",
      ],
    ],
  },
  {
    heading: 'Sweetness',
    paragraphs: [
      [
        'Sweet drinks should be enjoyable—not overwhelming.',
        'We chose golden cane sugar for its fuller flavor, allowing us to create balanced drinks without relying on excessive sweetness.',
      ],
      [
        'We also developed our own sugar-free sweetener blend using allulose and organic monk fruit extract, giving customers another option that we feel good about offering.',
      ],
    ],
  },
  {
    heading: 'Ingredients',
    paragraphs: [
      [
        'As we continued learning, we looked for cleaner, higher-quality alternatives wherever we could.',
      ],
      [
        "Today you'll find all-natural fruit purées in place of many artificial fruit syrups, locally made tapioca pearls without preservatives, and recipes that rely on real ingredients whenever possible.",
      ],
      [
        "We're constantly evaluating every ingredient we use. Whenever we find an option that better aligns with our standards—without compromising flavor—we're willing to rethink our recipes and make the change.",
      ],
      ["Our menu is still evolving because we're still learning."],
      ["If we find something better, we'll happily make the switch."],
    ],
  },
];

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function OurStoryPage() {
  return (
    <Layout title="Our Story" description={`How ${BUSINESS.name} came to life`}>
      <div className={styles.page}>
        <h1 className={margarine.className}>Tea-Rek&apos;z: A Different Kind of Boba Shop</h1>

        <div className={styles.content}>
          {storySections.map((section, index) => {
            if (section.type === 'emphasis') {
              return (
                <p key={`story-${index}`}>
                  <em>{renderLines(section.lines)}</em>
                </p>
              );
            }

            if (section.type === 'quote') {
              return <blockquote key={`story-${index}`}>{renderLines(section.lines)}</blockquote>;
            }

            return <p key={`story-${index}`}>{renderLines(section.lines)}</p>;
          })}

          <h2>Building Our Menu with Intention</h2>

          <p>Today, every ingredient we choose has a reason behind it.</p>

          {menuSections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.heading}-${index}`}>{renderLines(paragraph)}</p>
              ))}
            </section>
          ))}

          <h2>The Standard That Guides Us</h2>

          <p>We don&apos;t believe any drink is &ldquo;perfect.&rdquo;</p>

          <p>Boba is still a treat, and we think treats should be fun.</p>

          <p>But we also believe families deserve thoughtful choices and honest ingredients.</p>

          <p>So we made ourselves one simple promise:</p>

          <p>
            <em>
              If we wouldn&apos;t feel good serving it to our own children, we won&apos;t feel good
              serving it to yours.
            </em>
          </p>

          <p>That question continues to guide every decision we make.</p>

          <p>We&apos;ve also learned something unexpected along the way.</p>

          <p>
            Chasing the highest margins wasn&apos;t what excited us. Building drinks we&apos;re
            genuinely proud to serve did.
          </p>

          <p>
            Our hope is simple: if we keep making better drinks and treating people well, the
            business will grow naturally.
          </p>

          <h2>More Than a Drink</h2>

          <p>Tea-Rek&apos;z isn&apos;t just about tea or tapioca.</p>

          <p>It&apos;s about creating a place where people genuinely enjoy spending time.</p>

          <p>
            Whether you&apos;re meeting friends, studying for an exam, working remotely, taking a
            break between errands, or simply looking for a quiet corner with a great drink, we hope
            Tea-Rek&apos;z feels like your neighborhood gathering place.
          </p>

          <p>
            It&apos;s also about constantly learning, improving, and never settling simply because
            &ldquo;that&apos;s how it&apos;s always been done.&rdquo;
          </p>

          <p>
            Tea-Rek&apos;z wasn&apos;t built because we thought we had all the answers. It was built
            because we kept asking one simple question:
          </p>

          <p>
            <em>Would we feel good serving this to our own kids?</em>
          </p>

          <p>That question still guides every drink we make today.</p>

          <p className={styles.closing}>We&apos;re grateful you&apos;re part of the journey.</p>
        </div>
      </div>
    </Layout>
  );
}
