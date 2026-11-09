import type { Product } from "@/content/products";
import { Plate } from "./Plate";

/** Product tile. Not clickable yet — product pages arrive with the shop step. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Plate
        frame={{ alt: product.title, tone: product.tone }}
        className="aspect-[4/5]"
        sizes="(min-width: 768px) 25vw, 50vw"
      />
      <div className="mt-3 flex flex-col gap-1 md:mt-4 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="text-sm">{product.title}</p>
          <p className="coord mt-1 text-stone-deep">
            {product.colour} · {product.chapter}
          </p>
        </div>
        <p className="coord">{product.price}</p>
      </div>
    </div>
  );
}
