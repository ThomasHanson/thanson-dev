import CalendlyButton from "~/components/CalendlyButton";
import ContactForm from "~/components/ContactForm";
import Page from "~/components/Page";

export default function Contact() {
  return (
    <Page>
      <section>
        <div className="flex justify-center">
          <CalendlyButton />
        </div>
        <ContactForm />
      </section>
    </Page>
  );
}
