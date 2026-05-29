import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).shipping-policy';
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
