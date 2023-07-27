import Page from "~/components/Page";

export default function About() {
  return (
    <Page>
      <div className="flex justify-center">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center mb-6">
            My name is Thomas. I&apos;m a graduate from the University of Central Florida with a Bachelor&apos;s Degree in Computer Science. I&apos;ve always loved technology/programming and began learning to code in Java when I was about 14, after being interested in how things worked, or how I could make them better.
          </p>
        
          <p className="text-center mb-6">
            I am currently working on learning new technologies and pursuing a Software Engineering position, where I can land a dream job and grow my career. You can find some of my other projects on my GitHub.
          </p>
          <p className="text-center mb-6">
            Outside of work, I love to try new things and am a self-proclaimed adrenaline junkie. I have been skydiving over 15 times and learned how to fly a paramotor at Aviator PPG with 7 other student pilots.
          </p>
        </section>
      </div>
    </Page>
  );
}
