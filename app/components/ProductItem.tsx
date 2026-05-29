import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {ArrowRight} from 'lucide-react';
export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="group relative flex flex-col bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden p-6 flex items-center justify-center">
        {image ? (
          <Image
            alt={image.altText || product.title}
            data={image}
            loading={loading}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-md"
            sizes="(min-width: 45em) 400px, 100vw"
          />
        ) : (
          <div className="text-slate-300 font-medium text-sm">No Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow justify-between border-t border-slate-100">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-zinc-950 tracking-tight leading-snug mb-2 line-clamp-2">
            {product.title}
          </h4>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-rose-600 font-black text-lg md:text-xl tracking-tight">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-zinc-400 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:-rotate-45">
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
