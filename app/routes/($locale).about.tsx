import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).about';
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
