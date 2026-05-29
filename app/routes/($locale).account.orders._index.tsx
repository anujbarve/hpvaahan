import {data as remixData, Link, Form, useLoaderData, useSearchParams} from 'react-router';
import type {Route} from './+types/($locale).account.orders._index';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import {Package, Search, ChevronLeft, ChevronRight} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Orders'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const searchTerm = searchParams.get('search') || '';
  const cursor = searchParams.get('cursor') || '';
  const direction = searchParams.get('direction') || '';

  const {customerAccount} = context;

  const paginationVariables: Record<string, string | number> = {};

  if (direction === 'next' && cursor) {
    paginationVariables.first = 12;
    paginationVariables.after = cursor;
  } else if (direction === 'previous' && cursor) {
    paginationVariables.last = 12;
    paginationVariables.before = cursor;
  } else {
    paginationVariables.first = 12;
  }

  const {data, errors} = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query: searchTerm || undefined,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Orders not found');
  }

  return remixData(
    {customer: data.customer, searchTerm},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

function orderStatusColor(status: string) {
  switch (status) {
    case 'FULFILLED':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'IN_PROGRESS':
    case 'IN_FULFILLMENT':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'UNFULFILLED':
    case 'PARTIALLY_FULFILLED':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

function financialStatusColor(status: string | null) {
  switch (status) {
    case 'PAID':
      return 'text-green-600';
    case 'REFUNDED':
    case 'PARTIALLY_REFUNDED':
      return 'text-red-600';
    case 'PENDING':
      return 'text-amber-600';
    default:
      return 'text-gray-600';
  }
}

export default function OrdersPage() {
  const {customer, searchTerm} = useLoaderData<typeof loader>();
  const {orders} = customer;
  const [searchParams, setSearchParams] = useSearchParams();
  const hasPreviousPage = orders?.pageInfo?.hasPreviousPage;
  const hasNextPage = orders?.pageInfo?.hasNextPage;
  const startCursor = orders?.pageInfo?.startCursor;
  const endCursor = orders?.pageInfo?.endCursor;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

      <Form method="GET" className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          name="search"
          defaultValue={searchTerm}
          placeholder="Search orders..."
          aria-label="Search orders"
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
        />
      </Form>

      {!orders?.nodes?.length ? (
        <div className="text-center py-16 backdrop-blur-sm bg-white/40 rounded-2xl border border-gray-100">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-4">No orders found.</p>
          {searchTerm && (
            <p className="text-sm text-gray-400">
              Try a different search term.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.nodes.map((order) => (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="block backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                    Order #{order.number}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Intl.DateTimeFormat('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(order.processedAt))}
                    {order.fulfillmentStatus && (
                      <>
                        <span className="mx-2 text-gray-300">·</span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${orderStatusColor(order.fulfillmentStatus)}`}
                        >
                          {order.fulfillmentStatus.replace(/_/g, ' ')}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: order.totalPrice.currencyCode,
                      }).format(Number(order.totalPrice.amount))}
                    </span>
                    {order.financialStatus && (
                      <span
                        className={`block text-xs font-medium ${financialStatusColor(order.financialStatus)}`}
                      >
                        {order.financialStatus.replace(/_/g, ' ')}
                      </span>
                    )}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {(hasPreviousPage || hasNextPage) && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={!hasPreviousPage}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('direction', 'previous');
              params.set('cursor', startCursor || '');
              setSearchParams(params);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            disabled={!hasNextPage}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('direction', 'next');
              params.set('cursor', endCursor || '');
              setSearchParams(params);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
