import React from "react";
import Feed from "../components/layout/Feed.js";
import Hero from "../components/layout/Hero.js";
import Features from "../components/layout/Features";

export default function Home(props) {
  return (
    <>
      <Hero />
      <Features py={{ base: 6, md: 8 }} />
      <Feed />
    </>
  );
}
