/* eslint-disable @next/next/no-img-element */
import { logos } from "@/lib/brand";

// Runs before the page paints: skip the curtain if it was already shown in this visit.
const script = `try{if(sessionStorage.getItem("sm-intro")){document.documentElement.classList.add("intro-seen")}else{sessionStorage.setItem("sm-intro","1")}}catch(e){}`;

/** Opening curtain with the monogram. Pure CSS animation, shown once per visit. */
export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="intro" aria-hidden="true">
        <img src={logos.monogramWhite} alt="" />
      </div>
    </>
  );
}
