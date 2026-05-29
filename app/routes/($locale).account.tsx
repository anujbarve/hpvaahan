import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/($locale).account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {User, Package, MapPin, LogOut} from 'lucide-react';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600/5 via-white to-red-600/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-red-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg shadow-red-900/5 border border-white/30 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h1>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <nav className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-1">
            <NavLink
              to="/account/orders"
              className={({isActive}) =>
                `inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`
              }
            >
              <Package size={16} />
              Orders
            </NavLink>
            <NavLink
              to="/account/profile"
              className={({isActive}) =>
                `inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`
              }
            >
              <User size={16} />
              Profile
            </NavLink>
            <NavLink
              to="/account/addresses"
              className={({isActive}) =>
                `inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`
              }
            >
              <MapPin size={16} />
              Addresses
            </NavLink>
            <Form method="POST" action="/account/logout">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </Form>
          </nav>

          <div className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
            <Outlet context={{customer}} />
          </div>
        </div>
      </section>
    </>
  );
}
