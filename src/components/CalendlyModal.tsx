import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { InlineWidget } from "react-calendly";

export default function CalendlyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={handleOpen}>Open Modal</button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <InlineWidget url="https://calendly.com/thanson-dev/15-20-minute-screening-interview" />
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
