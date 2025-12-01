import { BUSINESS } from '@/config';

import Layout from '@/components/Layout';

import styles from '@/styles/OurStory.module.css';

export default function OurStoryPage() {
  return (
    <Layout title="Our Story" description={`How ${BUSINESS.name} came to life`}>
      <div className={styles.page}>
        <h1>Our Story: How Tea-Rek&apos;z Came to Life</h1>

        <div className={styles.content}>
          <p>
            Most boba shops begin with a dream of opening a boba shop —{' '}
            <strong>the brand first, then the location, then the build-out, then the staff.</strong>
          </p>

          <p>Tea-Rek&apos;z started the opposite way.</p>

          <p>
            We had a tiny storefront right next to Skillet&apos;z — small, empty, full of potential.
            We didn&apos;t know what it would become, only that we wanted to create something
            special for the Niles community. We imagined all sorts of possibilities: a bakery… a
            sweets shop… a souvenir store… maybe even something totally unexpected.
          </p>

          <p>
            But one idea kept coming back to us: <strong>a boba shop.</strong>
          </p>

          <p>
            Why?
            <br />
            Because Niles didn&apos;t have one. Because our own kids love boba and were constantly
            begging us to take them to get drinks. And because it felt like the kind of joyful,
            everyday treat that could bring people together.
          </p>

          <p>
            But then came the <em>grandparent veto</em>.
          </p>

          <blockquote>
            &ldquo;Boba drinks are unhealthy.
            <br />
            If you open a boba shop, the kids will drink even more.
            <br />
            And what kind of business sells something harmful — especially to children?&rdquo;
          </blockquote>

          <p>
            They weren&apos;t wrong. We felt the same tension ourselves. How could we run a shop we
            didn&apos;t feel 100% good about? How could we serve drinks to families that{' '}
            <em>we wouldn&apos;t confidently serve to our own kids every day</em>?
          </p>

          <p>That question became the foundation of Tea-Rek&apos;z.</p>

          <p>
            We decided that if we were going to do this, we would reinvent what a boba shop could be
            — <strong>one where quality isn&apos;t an afterthought but the starting point.</strong>
          </p>

          <h2>It Begins With Water</h2>

          <p>
            Water is the simplest ingredient, yet the most important.
            <br />
            So we invested in a six-stage filtration system to strip out impurities, chemicals, and
            off-flavors. Then we remineralized it with one of the best filters on the market — Vitev
            — so the water used in every tea, jelly, and boba pot is clean, crisp, and natural.
          </p>

          <h2>Then, Sugar — But the Right Kind</h2>

          <p>
            Instead of cheap fructose syrup, we chose <strong>real cane sugar</strong>.
          </p>

          <p>
            As we kept learning, we kept improving. We replaced artificial fruit syrups with{' '}
            <strong>all-natural fruit purees</strong>.
          </p>

          <p>
            We also made a major change many boba shops don&apos;t:
            <br />
            we stopped using <strong>nondairy powdered creamer</strong>, which is filled with
            additives and artificial ingredients.
          </p>

          <p>Instead, we use:</p>

          <ul>
            <li>
              <strong>Organic half &amp; half</strong> (our dairy creamer)
            </li>
            <li>
              <strong>Organic oat creamer</strong> (non-dairy)
            </li>
            <li>
              <strong>Organic coconut creamer</strong> (non-dairy)
            </li>
          </ul>

          <p>
            Each one is clean, simple, and real — nothing artificial, nothing we wouldn&apos;t drink
            ourselves.
          </p>

          <p>
            Every time we read an ingredient label and find a long list of chemicals or things we
            can&apos;t pronounce, we challenge ourselves to find a cleaner, more natural
            alternative.
          </p>

          <p>
            Today, <strong>over 90% of our ingredients are sourced domestically</strong>, and that
            percentage keeps growing as we discover better options.
          </p>

          <h2>The Heart of Tea-Rek&apos;z</h2>

          <p>We built this shop with one simple rule:</p>

          <blockquote>
            <strong>
              If we wouldn&apos;t want our own kids to drink it, we won&apos;t serve it.
            </strong>
          </blockquote>

          <p>
            That&apos;s why we can honestly say — our children drink our boba every day, and we feel
            great about it. And we want your family to feel the same confidence.
          </p>

          <p>
            Tea-Rek&apos;z isn&apos;t just a boba shop.
            <br />
            It&apos;s a promise:{' '}
            <strong>joy without guilt, flavor without compromise, treats made with care.</strong>
          </p>

          <p className={styles.closing}>
            Welcome to Tea-Rek&apos;z — where delicious meets better.
          </p>
        </div>
      </div>
    </Layout>
  );
}
