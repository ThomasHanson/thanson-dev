import Image from "next/image";
import avatar from "public/images/profile/developer-pic-1.png";
import Page from "~/components/Page";

export default function About() {
  return (
    <Page
      title="Thomas Hanson - About"
      description="A page that highlights my background and hobbies outside of work."
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-4 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <div className="flex items-center justify-center">
              <Image
                src={avatar}
                alt="avatar"
                className="h-48 w-48 rounded-full"
              />
            </div>
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Thomas Hanson</h3>
            <div className="text-gray-500 dark:text-gray-400">Software Engineer</div>
            <div className="flex space-x-3 pt-6"></div>
          </div>
          <div className="max-w-screen-md pt-8 pb-8 xl:col-span-2 flex flex-col justify-center">
            <p className="mb-8">
              My name is Thomas. I&apos;m a graduate from the University of Central Florida with a Bachelor&apos;s Degree in Computer Science. I&apos;ve always loved technology/programming and began learning to code in Java when I was about 14, after being interested in how things worked, or how I could make them better.
            </p>
            <p className="mb-8">
              I am currently working on learning new technologies and pursuing a Software Engineering position, where I can land a dream job and grow my career. You can find some of my other projects on my GitHub.
            </p>
            <p className="mb-8">
              Outside of work, I love to try new things and anything involving adrenaline. I have been skydiving over 15 times and learned how to fly a paramotor at Aviator PPG with 7 other student pilots.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
