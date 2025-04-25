"use client";

import Section from "./components/Section";
import ButtonLink from "./components/ButtonLink";
import TextNormal from "./components/TextNormal";
import Title from "./components/Title";

const NotFound = () => {
  return (
    <Section centerX centerY>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Title className="bg-gradient-to-r from-secondary via-orange-200 to-secondary bg-clip-text text-8xl font-extrabold text-transparent drop-shadow-lg">
          404
        </Title>
        <Title className="text-2xl font-semibold">Oops! This page doesn't exist</Title>
        <TextNormal>
          The page you are looking for doesn't exist or has been moved. Please check the URL or
          return to the home page.
        </TextNormal>
        <ButtonLink type="quaternary" href="/">
          Back to home
        </ButtonLink>
      </div>
    </Section>
  );
};

export default NotFound;
