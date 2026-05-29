import {useLoaderData, type MetaFunction} from 'react-router';
import {type Route} from './+types/($locale).contact';
import {PageHero} from '~/components/PageHero';
import {Phone, Mail, MapPin, Clock, Send, Building2, Users, ShieldCheck} from 'lucide-react';

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
    {
      icon: Phone,
      label: 'Customer Support',
      value: '+91 77959 77368',
      subtitle: 'Mon–Sat 10am–5pm',
    },
    {
      icon: Phone,
      label: 'Distributorship Enquiries',
      value: '+91 9900722700',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'support-in@kemetyl.com',
      href: 'mailto:support-in@kemetyl.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Kemetyl India Markets Pvt. Ltd., Lewis Workspace, 18, Nandidurga Road, Benson Town, Bangalore-560046',
    },
  ];

  const perks = [
    {icon: Building2, text: '30+ years of industry expertise'},
    {icon: Users, text: 'Trusted by 500+ distributors nationwide'},
    {icon: ShieldCheck, text: 'GST-registered partnership only'},
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

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-red-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[25rem] h-[25rem] bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Have a question or want to become a distributor? We'd love to hear from you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="backdrop-blur-sm bg-white/60 rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:border-red-100 transition-all duration-300"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                      <Icon size={20} className="text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                      {'href' in item && item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-gray-900 hover:text-red-600 transition-colors break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900 break-words">{item.value}</p>
                      )}
                      {item.subtitle && (
                        <p className="text-sm text-gray-400 mt-0.5">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="backdrop-blur-sm bg-white/60 rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-red-600" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0"
                  >
                    <span className="text-gray-600">{h.day}</span>
                    <span className="font-medium text-gray-900">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Distributor Form */}
          <div>
            <div className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Become a Distributor</h2>
              <p className="text-gray-500 mb-6">
                Partner with HP Vaahn and grow your business with premium automotive care products.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <span
                      key={perk.text}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1.5"
                    >
                      <Icon size={13} className="text-red-500" />
                      {perk.text}
                    </span>
                  );
                })}
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white/80 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Your state"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    GST Certificate (PDF only)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100 file:cursor-pointer file:transition-colors cursor-pointer border border-gray-200 rounded-xl p-1.5 bg-white/80"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3.5 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-red-200"
                >
                  <Send size={16} />
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {page.body && (
        <section className="relative overflow-hidden bg-gray-50/50 py-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-400/5 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6">
            <div className="backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
              <div
                className="
                  prose prose-slate max-w-none
                  prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-5
                  prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-img:rounded-xl prose-img:shadow-md
                "
                dangerouslySetInnerHTML={{__html: page.body}}
              />
            </div>
          </div>
        </section>
      )}
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
