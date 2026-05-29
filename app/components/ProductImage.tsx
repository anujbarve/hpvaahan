import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
}: {
  image: ProductVariantFragment['image'];
}) {
  if (!image) {
    return (
      <div className="w-full aspect-square bg-white border border-slate-200/60 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-slate-200/20">
        <span className="text-slate-400 font-medium">No Image Available</span>
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/20 p-8 flex items-center justify-center group sticky top-24">
      <Image
        alt={image.altText || 'Product Image'}
        data={image}
        key={image.id}
        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        sizes="(min-width: 45em) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
