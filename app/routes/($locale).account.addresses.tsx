import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import type {
  AddressFragment,
  CustomerFragment,
} from 'customer-accountapi.generated';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type Fetcher,
} from 'react-router';
import type {Route} from './+types/($locale).account.addresses';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';

export type ActionResponse = {
  addressId?: string | null;
  createdAddress?: AddressFragment;
  defaultAddress?: string | null;
  deletedAddress?: string | null;
  error: Record<AddressFragment['id'], string> | null;
  updatedAddress?: AddressFragment;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Addresses'}];
};

export async function loader({context}: Route.LoaderArgs) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: CustomerAddressInput = {};
    const keys: (keyof CustomerAddressInput)[] = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        try {
          const {data, errors} = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        try {
          const {data, errors} = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        try {
          const {data, errors} = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {
                addressId: decodeURIComponent(addressId),
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {error: null, deletedAddress: addressId};
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return data(
        {error: error.message},
        {
          status: 400,
        },
      );
    }
    return data(
      {error},
      {
        status: 400,
      },
    );
  }
}

export default function Addresses() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {defaultAddress, addresses} = customer;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Addresses</h2>

      <div className="mb-8">
        <details className="group">
          <summary className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer shadow-sm shadow-red-200 list-none">
            <svg className="w-4 h-4 group-open:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add new address
          </summary>
          <div className="mt-5 backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6">
            <NewAddressForm key={addresses.nodes.length} />
          </div>
        </details>
      </div>

      {!addresses.nodes.length ? (
        <div className="text-center py-12 backdrop-blur-sm bg-white/40 rounded-2xl border border-gray-100">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p className="text-gray-500">You have no addresses saved yet.</p>
        </div>
      ) : (
        <ExistingAddresses
          addresses={addresses}
          defaultAddress={defaultAddress}
        />
      )}
    </div>
  );
}

function NewAddressForm() {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    territoryCode: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  } as CustomerAddressInput;

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
    >
      {({stateForMethod}) => (
        <div className="mt-5 flex justify-end">
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
            className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm shadow-red-200 cursor-pointer"
          >
            {stateForMethod('POST') !== 'idle' ? 'Creating...' : 'Create Address'}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

function ExistingAddresses({
  addresses,
  defaultAddress,
}: Pick<CustomerFragment, 'addresses' | 'defaultAddress'>) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {addresses.nodes.map((address) => (
        <div
          key={address.id}
          className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <details className="group">
            <summary className="list-none cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {address.firstName && address.lastName
                      ? `${address.firstName} ${address.lastName}`
                      : 'Address'}
                    {defaultAddress?.id === address.id && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {[address.address1, address.city, address.zoneCode, address.zip]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 mt-1 group-open:rotate-180 transition-transform flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <AddressForm
                addressId={address.id}
                address={address}
                defaultAddress={defaultAddress}
              >
                {({stateForMethod}) => (
                  <div className="mt-5 flex flex-wrap gap-3 justify-end">
                    <button
                      disabled={stateForMethod('DELETE') !== 'idle'}
                      formMethod="DELETE"
                      type="submit"
                      className="px-5 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {stateForMethod('DELETE') !== 'idle' ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      disabled={stateForMethod('PUT') !== 'idle'}
                      formMethod="PUT"
                      type="submit"
                      className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm shadow-red-200 cursor-pointer"
                    >
                      {stateForMethod('PUT') !== 'idle' ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </AddressForm>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}

export function AddressForm({
  addressId,
  address,
  defaultAddress,
  children,
}: {
  addressId: AddressFragment['id'];
  address: CustomerAddressInput;
  defaultAddress: CustomerFragment['defaultAddress'];
  children: (props: {
    stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
  }) => React.ReactNode;
}) {
  const {state, formMethod} = useNavigation();
  const action = useActionData<ActionResponse>();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;
  return (
    <Form id={addressId}>
      <input type="hidden" name="addressId" defaultValue={addressId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${addressId}-firstName`} className="block text-sm font-medium text-gray-700 mb-1">
            First name*
          </label>
          <input
            aria-label="First name"
            autoComplete="given-name"
            defaultValue={address?.firstName ?? ''}
            id={`${addressId}-firstName`}
            name="firstName"
            placeholder="First name"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-lastName`} className="block text-sm font-medium text-gray-700 mb-1">
            Last name*
          </label>
          <input
            aria-label="Last name"
            autoComplete="family-name"
            defaultValue={address?.lastName ?? ''}
            id={`${addressId}-lastName`}
            name="lastName"
            placeholder="Last name"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-company`} className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            aria-label="Company"
            autoComplete="organization"
            defaultValue={address?.company ?? ''}
            id={`${addressId}-company`}
            name="company"
            placeholder="Company"
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-phoneNumber`} className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            aria-label="Phone Number"
            autoComplete="tel"
            defaultValue={address?.phoneNumber ?? ''}
            id={`${addressId}-phoneNumber`}
            name="phoneNumber"
            placeholder="+919999999999"
            pattern="^\+?[1-9]\d{3,14}$"
            type="tel"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${addressId}-address1`} className="block text-sm font-medium text-gray-700 mb-1">
            Address line*
          </label>
          <input
            aria-label="Address line 1"
            autoComplete="address-line1"
            defaultValue={address?.address1 ?? ''}
            id={`${addressId}-address1`}
            name="address1"
            placeholder="Address line 1*"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${addressId}-address2`} className="block text-sm font-medium text-gray-700 mb-1">
            Address line 2
          </label>
          <input
            aria-label="Address line 2"
            autoComplete="address-line2"
            defaultValue={address?.address2 ?? ''}
            id={`${addressId}-address2`}
            name="address2"
            placeholder="Address line 2"
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-city`} className="block text-sm font-medium text-gray-700 mb-1">
            City*
          </label>
          <input
            aria-label="City"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            id={`${addressId}-city`}
            name="city"
            placeholder="City"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-zoneCode`} className="block text-sm font-medium text-gray-700 mb-1">
            State / Province*
          </label>
          <input
            aria-label="State/Province"
            autoComplete="address-level1"
            defaultValue={address?.zoneCode ?? ''}
            id={`${addressId}-zoneCode`}
            name="zoneCode"
            placeholder="State / Province"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-zip`} className="block text-sm font-medium text-gray-700 mb-1">
            Zip / Postal Code*
          </label>
          <input
            aria-label="Zip"
            autoComplete="postal-code"
            defaultValue={address?.zip ?? ''}
            id={`${addressId}-zip`}
            name="zip"
            placeholder="Zip / Postal Code"
            required
            type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor={`${addressId}-territoryCode`} className="block text-sm font-medium text-gray-700 mb-1">
            Country Code*
          </label>
          <input
            aria-label="Country code"
            autoComplete="country"
            defaultValue={address?.territoryCode ?? ''}
            id={`${addressId}-territoryCode`}
            name="territoryCode"
            placeholder="IN"
            required
            type="text"
            maxLength={2}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          defaultChecked={isDefaultAddress}
          id={`${addressId}-defaultAddress`}
          name="defaultAddress"
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
        />
        <label htmlFor={`${addressId}-defaultAddress`} className="text-sm text-gray-700 cursor-pointer">
          Set as default address
        </label>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2 border border-red-100">
          {error}
        </p>
      ) : null}

      {children({
        stateForMethod: (method) => (formMethod === method ? state : 'idle'),
      })}
    </Form>
  );
}
