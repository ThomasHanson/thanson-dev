import Image from "next/image";
import Page from "~/components/Page";
import profilePic from "../../public/images/profile/developer-pic-1.png";

export default function Home() {
  return (
    <Page>
      <main className="flex items-center w-full min-h-screen">
        <div className="flex items-center justify-between w-full">
          <div className="w-1/2">
            <Image 
              src={profilePic}
              alt="Profile Picture"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2">
            <h1 className="!text-6xl">Hi, I'm Thomas</h1>
            <p>I’m a Computer Science student at the University of Central Florida pursuing a Software Engineering position. I love building full-stack web applications and solving technical problems through code. Thanks for visiting my site.</p>
          </div>
        </div>
      </main>
    </Page>
  );
}
