import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export default function NotFound() {
  return (
    <div className="pb-32 md:pb-56">
      <PageIntro label="00°00′N 00°00′E" title="Off the map">
        <Link href="/" className="label link-line">
          Back to the start
        </Link>
      </PageIntro>
    </div>
  );
}
