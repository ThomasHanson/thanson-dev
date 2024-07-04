"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import profilePic from "@/public/developer-pic-1.png";
import { Button, buttonVariants } from "@/components/ui/button";
import WavingHand from "@/components/waving-hand";
import { FaArrowRight } from "react-icons/fa";

const HeroContent = () => (
  <div className="text-center lg:text-start space-y-6">
    <main className="text-5xl md:text-6xl font-bold">
      <WavingHand />
      <h1 className="inline">
        <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          {" "}
          Hi, I&apos;m Thomas
        </span>
      </h1>
    </main>

    <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
      I love building full-stack applications and solving technical problems through code.
    </p>

    <div className="space-y-4 md:space-y-0 md:space-x-4">
      <Link href="/contact" className={`w-full md:w-1/3 ${buttonVariants()}`}>
          Contact Me <FaArrowRight className="ml-2" />
      </Link>

      <a
        rel="noreferrer noopener"
        href="/resume/Thomas_Hanson_CV.pdf"
        download="Thomas_Hanson_CV.pdf"
        className={`w-full md:w-1/3 ${buttonVariants({ variant: "outline" })}`}
      >
        Download CV
      </a>
    </div>
  </div>
);

const HeroImage = () => (
  <div className="z-10">
    <Image src={profilePic} alt="mockup" width={300} height={300} />
  </div>
);

const Home = () => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <HeroContent />
          <HeroImage />
          <div className="shadow"></div>
        </section>
      </div>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <section className="container grid place-items-center py-20 md:py-32 gap-10">
          <HeroImage />
          <HeroContent />
          <div className="shadow"></div>
        </section>
      </div>
    </>
  );
};

export default Home;
