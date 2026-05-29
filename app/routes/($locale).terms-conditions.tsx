import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).terms-conditions';
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
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-red-300/5 rounded-full blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-8">
          <LegalContent html={policy.body} />
        </div>
      </section>
    </>
  );
}
