import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PopupButton = dynamic(() => import("react-calendly").then((mod) => mod.PopupButton), {
  ssr: false, // Disable server-side rendering for this component
});

export default function CalendlyModal() {
  const [isClient, setIsClient] = useState(false);
  const rootElement = isClient ? document.getElementById("__next") : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!rootElement) {
    return null;
  }

  return (
    <>
      <PopupButton
        url="https://calendly.com/thanson-dev/15-20-minute-screening-interview"
        rootElement={rootElement}
        text="Click here to schedule!"
      />
    </>
  );
}
