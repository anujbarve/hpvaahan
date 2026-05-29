import { Link } from 'react-router';
import type { Route } from './+types/($locale)._index';
import { ArrowRight, Star, Shield, Truck, Leaf, Award, Package, ChevronRight, Quote } from 'lucide-react';
import { HeroSection } from '~/components/sections/HeroSection';
import { ProductCategories } from '~/components/sections/ProductCategories';
import { WhyChooseUs } from '~/components/sections/WhyChooseUs';
import { BenefitsSection } from '~/components/sections/BenefitsSection';
import { TestimonialsSection } from '~/components/sections/TestimonialsSection';
import { InstagramSection } from '~/components/sections/InstagramSection';


export const meta: Route.MetaFunction = () => {
  return [{ title: 'HP Vaahn | Premium Car & Bike Care Products in India' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  return {};
}

const features = [
  {
    icon: Shield,
    title: 'European Formulations, Indian Trust',
    description: 'Developed with Kemetyl\'s European expertise and backed by HPCL\'s trusted legacy, ensuring top-tier automotive care.',
  },
  {
    icon: Award,
    title: 'High Performance Automotive Fluids',
    description: 'From windshield washer fluids to coolants and brake fluids, our products are designed for superior vehicle protection and efficiency.',
  },
  {
    icon: Truck,
    title: 'Tested for Indian Roads & Climate',
    description: 'Formulated to withstand India\'s extreme weather conditions, ensuring long-lasting performance in heat, cold, and humidity.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly & Sustainable',
    description: 'Committed to reducing environmental impact, HP Vaahn products feature biodegradable and low-emission formulations.',
  },
  {
    icon: Package,
    title: 'Affordable Premium Quality',
    description: 'Bringing world-class automotive solutions at competitive prices, making premium car care accessible to all.',
  },
];





export default function Homepage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== PRODUCT CATEGORIES ===== */}
      <ProductCategories />

      {/* ===== WHY CHOOSE US ===== */}
      <WhyChooseUs />

      {/* ===== BENEFITS ===== */}
      <BenefitsSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== INSTAGRAM FEED ===== */}
      <InstagramSection />
    </>
  );
}










