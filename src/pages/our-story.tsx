import { BUSINESS } from '@/config';

import Layout from '@/components/Layout';

import styles from '@/styles/OurStory.module.css';

export default function OurStoryPage() {
  return (
    <Layout title="Our Story" description={`How ${BUSINESS.name} came to life`}>
      <div className={styles.page}>
        <h1>Tea-Rek&apos;z: A Different Kind of Boba Story</h1>

        <div className={styles.content}>
          <p>Most boba shops begin with a dream.</p>

          <p>
            A name.
            <br />
            A logo.
            <br />
            A beautiful build-out.
            <br />A grand opening.
          </p>

          <p>
            Tea-Rek&apos;z began with a small, empty storefront next to Skillet&apos;z in Niles —
            and a simple question:
          </p>

          <p>
            <em>What should this become?</em>
          </p>

          <p>
            We imagined everything.
            <br />
            A bakery.
            <br />
            A sweets shop.
            <br />
            A gift store.
            <br />
            Something totally unexpected.
          </p>

          <p>But one idea kept coming back.</p>

          <p>A boba shop.</p>

          <p>
            Not because it was trendy.
            <br />
            Not because it was easy.
            <br />
            But because Niles didn&apos;t have one.
            <br />
            Because our own kids loved boba and were constantly asking for it.
            <br />
            And because there&apos;s something joyful about a colorful cup in your hand — something
            that brings people together after school, after work, after a long day.
          </p>

          <p>Then came the grandparent veto.</p>

          <blockquote>
            &ldquo;Boba drinks are unhealthy.
            <br />
            If you open one, the kids will just drink more.
            <br />
            What kind of business sells something harmful — especially to children?&rdquo;
          </blockquote>

          <p>It stopped us.</p>

          <p>
            Not because we disagreed.
            <br />
            But because we couldn&apos;t dismiss the question.
          </p>

          <p>
            If we wouldn&apos;t feel good serving it to our own kids every day,
            <br />
            how could we feel good serving it to yours?
          </p>

          <p>That question became the foundation of Tea-Rek&apos;z.</p>

          <h2>Reinventing What a Boba Shop Could Be</h2>

          <p>We decided that if we were going to do this, we would do it differently.</p>

          <p>
            Not &ldquo;slightly better.&rdquo;
            <br />
            Not &ldquo;good enough.&rdquo;
            <br />
            But thoughtfully.
          </p>

          <p>We started with the simplest ingredient of all.</p>

          <h2>Water</h2>

          <p>
            Tea is mostly water.
            <br />
            So if water isn&apos;t clean, nothing else matters.
          </p>

          <p>
            We invested in advanced multi-stage filtration and remineralization — not because
            customers would see it, but because they would taste it. Every tea, coffee, lemonade,
            and pot of boba begins with clean, balanced water that lets real ingredients shine.
          </p>

          <p>
            It&apos;s invisible.
            <br />
            But it changes everything.
          </p>

          <h2>Sugar — With Intention</h2>

          <p>Boba drinks are sweet. That&apos;s part of the joy.</p>

          <p>But sweetness doesn&apos;t have to mean shortcuts.</p>

          <p>
            Instead of inexpensive fructose syrups, we chose less-refined golden cane sugar for
            depth and balance. Because when sugar tastes fuller, you don&apos;t need as much of it.
          </p>

          <p>
            As we listened to our customers, we went further. We developed our own sugar-free
            sweetener blend using allulose and organic monk fruit extract — chosen for their cleaner
            profile and minimal aftertaste. Not to chase trends. But to give families real choice.
          </p>

          <h2>Real Ingredients, No Shortcuts</h2>

          <p>As we read ingredient labels across the industry, we kept asking the same question:</p>

          <p>
            <em>Why so many things we can&apos;t pronounce?</em>
          </p>

          <p>
            Artificial fruit syrups filled with high-fructose corn syrup.
            <br />
            Powdered nondairy creamers with long lists of additives.
            <br />
            Imported boba preserved for shelf life, not freshness.
          </p>

          <p>So we made changes.</p>

          <p>
            We replaced artificial fruit syrups with all-natural fruit purées.
            <br />
            We eliminated nondairy powdered creamer entirely.
            <br />
            We switched to locally made tapioca pearls without preservatives.
            <br />
            We even developed our own house crème brûlée recipe using real ingredients instead of
            industrial flavor powders.
          </p>

          <p>
            Today, more than 90% of our ingredients are sourced domestically — and that number
            continues to grow as we discover better partners.
          </p>

          <p>Every time we find a cleaner option, we switch.</p>

          <p>
            Not because it&apos;s easy.
            <br />
            But because it&apos;s right.
          </p>

          <h2>Our Rule</h2>

          <p>From the beginning, we made one simple promise:</p>

          <blockquote>
            <strong>
              If we wouldn&apos;t want our own kids to drink it, we won&apos;t serve it.
            </strong>
          </blockquote>

          <p>
            That standard guides every decision — from water to sugar to sourcing to new menu items.
          </p>

          <p>And yes, our children drink our boba.</p>

          <p>Every day.</p>

          <p>
            Not because it&apos;s perfect.
            <br />
            Not because it&apos;s health food.
            <br />
            But because it&apos;s made thoughtfully, transparently, and without compromise.
          </p>

          <h2>More Than a Drink</h2>

          <p>Tea-Rek&apos;z isn&apos;t just about tea and tapioca.</p>

          <p>
            It&apos;s about creating a place where families feel comfortable.
            <br />
            Where after-school treats don&apos;t come with guilt.
            <br />
            Where quality isn&apos;t marketing — it&apos;s practice.
          </p>

          <p>We didn&apos;t set out to build the trendiest boba shop.</p>

          <p>We set out to build one we could stand behind.</p>

          <p className={styles.closing}>
            Welcome to Tea-Rek&apos;z.
            <br />
            <br />
            Where joy meets intention.
            <br />
            Where flavor meets responsibility.
            <br />
            Where a simple cup becomes something better.
          </p>
        </div>
      </div>
    </Layout>
  );
}
