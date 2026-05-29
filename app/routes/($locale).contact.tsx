import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).contact';
import {PageHero} from '~/components/PageHero';
import {Phone, Mail, MapPin, Clock} from 'lucide-react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `HP Vaahn | ${data?.page?.title ?? 'Contact'}`}];
};

export async function loader({context}: Route.LoaderArgs) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {handle: 'contact'},
  });

  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export default function ContactPage() {
  const {page} = useLoaderData<typeof loader>();

  const contactInfo = [
    {icon: Phone, label: 'Customer Support', value: '+91 77959 77368', subtitle: 'Mon–Sat 10am–5pm'},
    {icon: Phone, label: 'Distributorship Enquiries', value: '+91 9900722700'},
    {icon: Mail, label: 'Email', value: 'support-in@kemetyl.com'},
    {icon: MapPin, label: 'Address', value: 'Kemetyl India Markets Pvt. Ltd., Lewis Workspace, 18, Nandidurga Road, Benson Town, Bangalore-560046'},
  ];

  const hours = [
    {day: 'Monday–Saturday', time: '9am – 7pm'},
    {day: 'Sunday', time: 'Closed'},
  ];

  return (
    <>
      <PageHero
        title={page.title}
        breadcrumbs={[{label: 'Home', href: '/'}, {label: page.title}]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <div className="space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <item.icon size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                  {item.subtitle && (
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock size={18} className="text-red-600" />
              Business Hours
            </h3>
            <div className="space-y-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-600">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Become a Distributor</h2>
          <p className="text-gray-600 mb-6">
            Partner with HP Vaahn and grow your business with premium automotive care products.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Certificate (.PDF only)</label>
              <input type="file" accept=".pdf" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Submit Application
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{__html: page.body}}
        />
      </section>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query ContactPage($handle: String!, $language: LanguageCode, $country: CountryCode)
    @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo { description title }
    }
  }
` as const;
