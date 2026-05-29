import {useLoaderData, Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import type {Route} from './+types/($locale).collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Cinematic Header */}
      <section className="relative w-full bg-zinc-950 py-24 lg:py-32 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full mix-blend-screen blur-[120px] opacity-50 transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-400/10 rounded-full mix-blend-screen blur-[120px] opacity-40 transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Collections</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Discover our full range of premium automotive care formulas.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <PaginatedResourceSection<CollectionFragment>
          connection={collections}
          resourcesClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {({node: collection, index}) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>
      </section>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="group relative flex flex-col bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        {collection?.image ? (
          <Image
            alt={collection.image.altText || collection.title}
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 45em) 400px, 100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <span className="font-medium text-sm">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      <div className="p-6 sm:p-8 flex items-center justify-between">
        <h5 className="text-2xl font-bold text-zinc-950 tracking-tight">
          {collection.title}
        </h5>
        <div className="w-12 h-12 rounded-full border border-slate-200 flex flex-shrink-0 items-center justify-center text-zinc-950 transition-all duration-300 group-hover:bg-rose-50 group-hover:border-rose-100 group-hover:text-rose-600 group-hover:-rotate-45">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
