import CalendlyButton from "~/components/CalendlyButton";
import ContactForm from "~/components/ContactForm";
import Page from "~/components/Page";

export default function Contact() {
  return (
    <Page
      title="Thomas Hanson - Contact"
      description="The one-stop place to get in contact with me or schedule a meeting."
    >
      <section>
        <div className="flex justify-center">
          <CalendlyButton />
        </div>
        <ContactForm />
      </section>
    </Page>
  );
}
