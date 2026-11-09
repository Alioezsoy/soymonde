import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Bag" };

// Step 2: the real cart (Shopify) replaces this page.
export default function CartPage() {
  return (
    <div className="pb-32 md:pb-56">
      <PageIntro label="Bag" title="Your bag is empty">
        <Link href="/shop" className="label link-line">
          Continue to shop
        </Link>
      </PageIntro>
    </div>
  );
}
