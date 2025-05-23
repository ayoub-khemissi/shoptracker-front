"use client";

import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Section from "../components/Section";

export default function Faq() {
  return (
    <>
      <title>Frequently Asked Questions | ShopTracker</title>
      <meta
        name="description"
        content="Frequently Asked Questions (Q&A) page for ShopTracker. This page provides answers to common questions about ShopTracker and how it works."
      />
      <Section>
        <Title className="pb-6 text-center text-2xl lg:text-4xl">
          ❓ Frequently Asked Questions (Q&A)
        </Title>

        <TextNormal>
          Welcome to our Q&A section! Here, you will find answers to some common questions about
          ShopTracker and how it works.
        </TextNormal>

        <Accordion>
          <AccordionItem key="1" aria-label="What is ShopTracker?" title="1. What is ShopTracker?">
            ShopTracker is a service that helps you track the restock and price changes of your
            favorite products from various e-commerce sites.
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="How does ShopTracker work?"
            title="2. How does ShopTracker work?"
          >
            After signing up, you can add products via the{" "}
            <UnderlineLink href="/tracker">Tracker</UnderlineLink> page. ShopTracker will notify you
            of any restocks or price changes via email or text message.
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Which e-commerce sites are supported?"
            title="3. Which e-commerce sites are supported?"
          >
            ShopTracker supports a very large variety of e-commerce sites. However, some sites may
            not be compatible with ShopTracker due to their structure or the way they display their
            products. Some other sites may simply block ShopTracker's requests. Make sure to check
            the compatibility of the site by tracking a product before engaging to a subscription.
          </AccordionItem>

          <AccordionItem
            key="4"
            aria-label="Do you offer personalized plans?"
            title="4. Do you offer personalized plans?"
          >
            Yes, we offer personalized plans to meet your specific needs. If you're interested,
            please contact us via the{" "}
            <UnderlineLink href={"/contact?subject=custom-offer"}>Contact page</UnderlineLink>, and
            our team will get back to you with tailored options.
          </AccordionItem>

          <AccordionItem
            key="5"
            aria-label="How do I add a product to my wishlist?"
            title="5. How do I add a product to my wishlist?"
          >
            To start tracking a product, navigate to the{" "}
            <UnderlineLink href="/tracker">Tracker</UnderlineLink> page and enter the product's URL
            in the designated field. If you have reached the limit of products being tracked
            simultaneously, the product will automatically be added to your pending tracking list
            which represents your wishlist.
          </AccordionItem>

          <AccordionItem
            key="6"
            aria-label="Will I be notified for every price change?"
            title="6. Will I be notified for every price change?"
          >
            In the <UnderlineLink href="/tracker">Tracker</UnderlineLink> page, you can choose to
            receive notifications for a price change. When you specify the product to track by
            entering its URL, you also have the option to select whether to track restocks.
            Additionally, you can set a price threshold; when the product's price falls below this
            threshold, you will be notified.
          </AccordionItem>

          <AccordionItem
            key="7"
            aria-label="Can I remove a product from my wishlist?"
            title="7. Can I remove a product from my wishlist?"
          >
            In the <UnderlineLink href="/tracklist">Tracklist</UnderlineLink> page, you can easily
            remove any product from your wishlist at any time by clicking the three vertical dots,
            🗑️ Delete option.
          </AccordionItem>

          <AccordionItem
            key="8"
            aria-label="What should I do if I encounter issues with tracking?"
            title="8. What should I do if I encounter issues with tracking? How can I contact customer support?"
          >
            If you face any issues with tracking specific products, please check the compatibility
            of the site. If the issue persists, contact our support for further assistance via the{" "}
            <UnderlineLink href={"/contact?subject=support"}>Contact page</UnderlineLink>.
          </AccordionItem>

          <AccordionItem
            key="9"
            aria-label="The website is slow, especially on the landing page."
            title="9. The website is slow, especially on the landing page."
          >
            Please ensure to enable hardware acceleration in your browser. On Google Chrome:
            Settings &gt; System &gt; Hardware acceleration &gt; Enable. On Firefox:{" "}
            <UnderlineLink href="https://support.mozilla.org/en-US/kb/performance-settings">
              click here
            </UnderlineLink>
            .
          </AccordionItem>
        </Accordion>
      </Section>
    </>
  );
}
