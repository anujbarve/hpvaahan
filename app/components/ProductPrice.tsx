import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div aria-label="Price" className="flex items-center gap-4 mt-4" role="group">
      {compareAtPrice ? (
        <div className="flex items-end flex-wrap gap-3">
          {price ? (
            <span className="text-3xl md:text-4xl font-black text-rose-600 tracking-tight leading-none">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-xl md:text-2xl font-medium text-slate-400 mb-0.5">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <span className="text-3xl md:text-4xl font-black text-rose-600 tracking-tight leading-none">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
