import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

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
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-12 lg:pb-24">
      {/* Cinematic Header */}
      <section className="relative w-full bg-zinc-950 py-20 lg:py-32 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full mix-blend-screen blur-[120px] opacity-50 transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-400/10 rounded-full mix-blend-screen blur-[120px] opacity-40 transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <PaginatedResourceSection<ProductItemFragment>
          connection={collection.products}
          resourcesClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      </section>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
