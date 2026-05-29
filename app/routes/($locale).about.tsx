import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).about';
import {PageHero} from '~/components/PageHero';
import {Shield, Truck, Leaf, Award} from 'lucide-react';

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

  const highlights = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Industry-leading automotive care products trusted by professionals across India.',
    },
    {
      icon: Truck,
      title: 'Pan-India Delivery',
      description: 'Reliable supply chain reaching every corner of the country with speed and care.',
    },
    {
      icon: Leaf,
      title: 'Eco-Conscious Formulations',
      description: 'Responsibly crafted solutions that deliver results without compromising the planet.',
    },
    {
      icon: Award,
      title: 'Trusted Since 1994',
      description: 'Decades of expertise in manufacturing and distributing world-class car care products.',
    },
  ];

  return (
    <>
      <PageHero
        title={page.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: page.title}]}
      />

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl">
            <div className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
              <div
                className="
                  prose prose-slate max-w-none
                  prose-headings:scroll-mt-24
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-5
                  prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-li:text-gray-600
                  prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                "
                dangerouslySetInnerHTML={{__html: page.body}}
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="backdrop-blur-sm bg-white/60 rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md hover:border-red-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <item.icon size={22} className="text-red-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
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
