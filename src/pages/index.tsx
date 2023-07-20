import Image from "next/image";
import Page from "~/components/Page";
import WavingHand from "~/components/WavingHand";
import profilePic from "../../public/images/profile/developer-pic-1.png";

export default function Home() {
  return (
    <Page>
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:pr-8">
          <Image src={profilePic} alt="mockup" className="w-full" />
        </div>
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              <WavingHand />
              <span className="px-4">Hi, I&apos;m Thomas</span>
            </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            I’m a Computer Science student at the University of Central Florida looking to pursue a Software Engineering position. I love building full-stack web applications and solving technical problems through code. Thanks for visiting my site.
          </p>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Contact Me
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg light:hover:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Download CV
          </a>
        </div>
      </div>
    </Page>
  );
}
