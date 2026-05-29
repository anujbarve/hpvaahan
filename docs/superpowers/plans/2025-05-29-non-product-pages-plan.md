# Non-Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 6 top-level pages (About, Contact, T&C, Privacy, Refund, Shipping) with shared components matching the site's design aesthetic.

**Architecture:** Shared `PageHero` and `LegalContent` components reused across pages. Legal pages use a shared policy query with dynamic `@include`. About/Contact fetch from Shopify `page` query.

**Tech Stack:** Shopify Hydrogen 2026.4, React 18, React Router v7, Tailwind v4, Lucide React icons

---

## File Structure

| File | Responsibility |
|------|---------------|
| `app/components/PageHero.tsx` | Shared hero banner with gradient, breadcrumbs, title |
| `app/components/LegalContent.tsx` | Prose-styled wrapper for policy CMS body HTML |
| `app/routes/($locale).about.tsx` | About page — CMS content + stat/testimonial components |
| `app/routes/($locale).contact.tsx` | Contact page — info cards + distributor form |
| `app/routes/($locale).terms-conditions.tsx` | T&C page — policy body via legal query |
| `app/routes/($locale).privacy-policy.tsx` | Privacy policy page |
| `app/routes/($locale).refund-policy.tsx` | Refund policy page |
| `app/routes/($locale).shipping-policy.tsx` | Shipping policy page |
| `app/components/Footer.tsx` | Update disclaimer links |

---

### Task 1: PageHero Component

**Files:**
- Create: `app/components/PageHero.tsx`

- [ ] **Step 1: Create PageHero component**

```tsx
import {Link} from 'react-router';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHero({title, breadcrumbs}: PageHeroProps) {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <nav className="mb-4 text-sm text-white/70">
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">›</span>}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/90">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify component loads without error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No type errors related to PageHero

- [ ] **Step 3: Commit**

```bash
git add app/components/PageHero.tsx
git commit -m "feat: add PageHero shared component"
```

---

### Task 2: LegalContent Component

**Files:**
- Create: `app/components/LegalContent.tsx`

- [ ] **Step 1: Create LegalContent wrapper**

```tsx
interface LegalContentProps {
  html: string;
}

export function LegalContent({html}: LegalContentProps) {
  return (
    <div
      className="prose prose-slate max-w-none
        prose-headings:scroll-mt-20
        prose-h2:text-2xl prose-h2:font-bold prose-h2:border-l-4 prose-h2:border-red-600 prose-h2:pl-4 prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-2 prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1
        prose-li:text-gray-600
        prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold"
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/LegalContent.tsx
git commit -m "feat: add LegalContent prose wrapper component"
```

---

### Task 3: About Page

**Files:**
- Create: `app/routes/($locale).about.tsx`

- [ ] **Step 1: Create about page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/about';
import {PageHero} from '~/components/PageHero';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.page?.title ?? 'About'}`}];
};

export async function loader({context, params}: Route.LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {handle: 'about'},
  });

  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export default function AboutPage() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title={page.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: page.title}]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div
          className="prose prose-slate max-w-none
            prose-headings:scroll-mt-20
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:list-disc prose-ul:pl-6
            prose-li:text-gray-600
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{__html: page.body}}
        />
      </section>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query AboutPage($handle: String!, $language: LanguageCode, $country: CountryCode)
    @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo { description title }
    }
  }
` as const;
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).about.tsx
git commit -m "feat: add About page route"
```

---

### Task 4: Contact Page

**Files:**
- Create: `app/routes/($locale).contact.tsx`

- [ ] **Step 1: Create contact page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/contact';
import {PageHero} from '~/components/PageHero';
import {Phone, Mail, MapPin, Clock} from 'lucide-react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.page?.title ?? 'Contact'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {handle: 'contact'},
  });

  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export default function ContactPage() {
  const {page} = useLoaderData<typeof loader>();

  const contactInfo = [
    {icon: Phone, label: 'Customer Support', value: '+91 77959 77368', subtitle: 'Mon–Sat 10am–5pm'},
    {icon: Phone, label: 'Distributorship Enquiries', value: '+91 9900722700'},
    {icon: Mail, label: 'Email', value: 'support-in@kemetyl.com'},
    {icon: MapPin, label: 'Address', value: 'Kemetyl India Markets Pvt. Ltd., Lewis Workspace, 18, Nandidurga Road, Benson Town, Bangalore-560046'},
  ];

  const hours = [
    {day: 'Monday–Saturday', time: '9am – 7pm'},
    {day: 'Sunday', time: 'Closed'},
  ];

  return (
    <>
      <PageHero
        title={page.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: page.title}]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <div className="space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <item.icon size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                  {item.subtitle && (
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock size={18} className="text-red-600" />
              Business Hours
            </h3>
            <div className="space-y-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-600">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Distributor Form */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Become a Distributor</h2>
          <p className="text-gray-600 mb-6">
            Partner with HP Vaahn and grow your business with premium automotive care products.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Certificate (.PDF only)</label>
              <input type="file" accept=".pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* CMS body for additional content */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{__html: page.body}}
        />
      </section>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query ContactPage($handle: String!, $language: LanguageCode, $country: CountryCode)
    @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo { description title }
    }
  }
` as const;
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).contact.tsx
git commit -m "feat: add Contact page route with distributor form"
```

---

### Task 5: Legal Query Helper

**Files:**
- Create: `app/lib/policies.ts`

- [ ] **Step 1: Create shared policy query and types**

```ts
export const POLICY_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    title
    body
  }
  query Policy(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...PolicyItem }
      refundPolicy @include(if: $refundPolicy) { ...PolicyItem }
      shippingPolicy @include(if: $shippingPolicy) { ...PolicyItem }
      termsOfService @include(if: $termsOfService) { ...PolicyItem }
    }
  }
` as const;
```

- [ ] **Step 2: Commit**

```bash
git add app/lib/policies.ts
git commit -m "feat: add shared policy GraphQL query"
```

---

### Task 6: Terms & Conditions Page

**Files:**
- Create: `app/routes/($locale).terms-conditions.tsx`

- [ ] **Step 1: Create T&C page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/terms-conditions';
import {PageHero} from '~/components/PageHero';
import {LegalContent} from '~/components/LegalContent';
import {POLICY_QUERY} from '~/lib/policies';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.policy?.title ?? 'Terms & Conditions'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(POLICY_QUERY, {
    variables: {
      privacyPolicy: false,
      refundPolicy: false,
      shippingPolicy: false,
      termsOfService: true,
    },
  });

  const policy = data.shop?.termsOfService;
  if (!policy) throw new Response('Not found', {status: 404});

  return {policy};
}

export default function TermsConditionsPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title={policy.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: policy.title}]}
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <LegalContent html={policy.body} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).terms-conditions.tsx
git commit -m "feat: add Terms & Conditions page"
```

---

### Task 7: Privacy Policy Page

**Files:**
- Create: `app/routes/($locale).privacy-policy.tsx`

- [ ] **Step 1: Create privacy policy page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/privacy-policy';
import {PageHero} from '~/components/PageHero';
import {LegalContent} from '~/components/LegalContent';
import {POLICY_QUERY} from '~/lib/policies';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.policy?.title ?? 'Privacy Policy'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(POLICY_QUERY, {
    variables: {
      privacyPolicy: true,
      refundPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
    },
  });

  const policy = data.shop?.privacyPolicy;
  if (!policy) throw new Response('Not found', {status: 404});

  return {policy};
}

export default function PrivacyPolicyPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title={policy.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: policy.title}]}
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <LegalContent html={policy.body} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).privacy-policy.tsx
git commit -m "feat: add Privacy Policy page"
```

---

### Task 8: Refund Policy Page

**Files:**
- Create: `app/routes/($locale).refund-policy.tsx`

- [ ] **Step 1: Create refund policy page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/refund-policy';
import {PageHero} from '~/components/PageHero';
import {LegalContent} from '~/components/LegalContent';
import {POLICY_QUERY} from '~/lib/policies';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.policy?.title ?? 'Refund Policy'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(POLICY_QUERY, {
    variables: {
      privacyPolicy: false,
      refundPolicy: true,
      shippingPolicy: false,
      termsOfService: false,
    },
  });

  const policy = data.shop?.refundPolicy;
  if (!policy) throw new Response('Not found', {status: 404});

  return {policy};
}

export default function RefundPolicyPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title={policy.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: policy.title}]}
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <LegalContent html={policy.body} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).refund-policy.tsx
git commit -m "feat: add Refund Policy page"
```

---

### Task 9: Shipping Policy Page

**Files:**
- Create: `app/routes/($locale).shipping-policy.tsx`

- [ ] **Step 1: Create shipping policy page route**

```tsx
import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/shipping-policy';
import {PageHero} from '~/components/PageHero';
import {LegalContent} from '~/components/LegalContent';
import {POLICY_QUERY} from '~/lib/policies';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.policy?.title ?? 'Shipping Policy'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(POLICY_QUERY, {
    variables: {
      privacyPolicy: false,
      refundPolicy: false,
      shippingPolicy: true,
      termsOfService: false,
    },
  });

  const policy = data.shop?.shippingPolicy;
  if (!policy) throw new Response('Not found', {status: 404});

  return {policy};
}

export default function ShippingPolicyPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHero
        title={policy.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: policy.title}]}
      />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <LegalContent html={policy.body} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/\($locale\).shipping-policy.tsx
git commit -m "feat: add Shipping Policy page"
```

---

### Task 10: Update Footer Links

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Update disclaimer link paths**

Change the `disclaimerLinks` array to point to the new top-level paths:

```tsx
const disclaimerLinks = [
  {label: 'Terms & Conditions', href: '/terms-conditions'},
  {label: 'Privacy Policy', href: '/privacy-policy'},
  {label: 'Refund & Return Policy', href: '/refund-policy'},
  {label: 'Shipping Policy', href: '/shipping-policy'},
];
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "fix: update footer policy links to new top-level routes"
```

---

### Task 11: Type Check & Verify

- [ ] **Step 1: Generate route types**

Run: `npx react-router typegen`
Expected: generates `+types/*.d.ts` files for all new routes

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit --pretty 2>&1`
Expected: No errors

- [ ] **Step 3: Run lint**

Run: `npm run lint 2>&1`
Expected: No errors

- [ ] **Step 4: Build**

Run: `npm run build 2>&1`
Expected: Build succeeds

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: typegen and finalize non-product pages"
```
