import {Link, redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).account.orders.$id';
import {Money, Image} from '@shopify/hydrogen';
import type {
  OrderLineItemFullFragment,
  OrderQuery,
} from 'customer-accountapi.generated';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';
import {Package, Truck, CreditCard, MapPin, ChevronLeft, ExternalLink} from 'lucide-react';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors}: {data: OrderQuery; errors?: Array<{message: string}>} =
    await customerAccount.query(CUSTOMER_ORDER_QUERY, {
      variables: {
        orderId,
        language: customerAccount.i18n.language,
      },
    });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;
  const lineItems = order.lineItems.nodes;
  const discountApplications = order.discountApplications.nodes;
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'N/A';
  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2'
      ? (firstDiscount as Extract<
          typeof firstDiscount,
          {__typename: 'MoneyV2'}
        >)
      : null;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? (
          firstDiscount as Extract<
            typeof firstDiscount,
            {__typename: 'PricingPercentageValue'}
          >
        ).percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

function statusBadgeClasses(status: string) {
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

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to orders
      </Link>

      <div className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order {order.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Placed on{' '}
              {order.processedAt
                ? new Intl.DateTimeFormat('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(order.processedAt))
                : 'N/A'}
            </p>
            {order.confirmationNumber && (
              <p className="text-sm text-gray-500 mt-0.5">
                Confirmation: {order.confirmationNumber}
              </p>
            )}
          </div>
          <a
            target="_blank"
            href={order.statusPageUrl}
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            View Order Status
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="backdrop-blur-sm bg-white/80 rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Package size={16} className="text-red-500" />
              Fulfillment
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadgeClasses(fulfillmentStatus)}`}
            >
              {fulfillmentStatus.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="backdrop-blur-sm bg-white/80 rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CreditCard size={16} className="text-red-500" />
              Payment
            </div>
            {order.financialStatus ? (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadgeClasses(order.financialStatus)}`}
              >
                {order.financialStatus.replace(/_/g, ' ')}
              </span>
            ) : (
              <span className="text-sm text-gray-400">N/A</span>
            )}
          </div>
          <div className="backdrop-blur-sm bg-white/80 rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Truck size={16} className="text-red-500" />
              Shipping
            </div>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.name || 'N/A'}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {lineItems.map((lineItem, lineItemIndex) => (
            <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
          ))}
        </div>

        <div className="mt-6 space-y-2 text-sm max-w-xs ml-auto">
          {((discountValue && discountValue.amount) ||
            discountPercentage) && (
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-green-600">
                {discountPercentage ? (
                  <>-{discountPercentage}% OFF</>
                ) : (
                  discountValue && <Money data={discountValue!} />
                )}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-700">
              <Money data={order.subtotal!} />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span className="font-medium text-gray-700">
              <Money data={order.totalTax!} />
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">
              <Money data={order.totalPrice!} />
            </span>
          </div>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="mt-6 backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            Shipping Address
          </h3>
          <address className="not-italic text-sm text-gray-600 space-y-0.5">
            <p className="font-medium text-gray-800">{order.shippingAddress.name}</p>
            {order.shippingAddress.formatted ? (
              <p>{order.shippingAddress.formatted}</p>
            ) : null}
            {order.shippingAddress.formattedArea ? (
              <p>{order.shippingAddress.formattedArea}</p>
            ) : null}
          </address>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/account/orders"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to all orders
        </Link>
      </div>
    </div>
  );
}

function OrderLineRow({lineItem}: {lineItem: OrderLineItemFullFragment}) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-white/50 transition-colors">
      {lineItem?.image && (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
          <Image data={lineItem.image} width={64} height={64} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{lineItem.title}</p>
        {lineItem.variantTitle && (
          <p className="text-xs text-gray-500 mt-0.5">{lineItem.variantTitle}</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">Qty: {lineItem.quantity}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-medium text-gray-900">
          <Money data={lineItem.price!} />
        </p>
        <p className="text-xs text-gray-500">
          <Money data={lineItem.totalDiscount!} />
        </p>
      </div>
    </div>
  );
}
