import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 relative overflow-hidden group ${
              disabled ?? fetcher.state !== 'idle'
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-zinc-950 text-white shadow-xl shadow-zinc-950/20 hover:shadow-2xl hover:-translate-y-1 hover:shadow-zinc-950/30'
            }`}
          >
            <span className="relative z-10">{children}</span>
            {!(disabled ?? fetcher.state !== 'idle') && (
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            )}
          </button>
        </>
      )}
    </CartForm>
  );
}
