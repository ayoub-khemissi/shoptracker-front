"use client";

import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ShopTrackerLogo from "../components/ShopTrackerLogo";
import Title from "../components/Title";
import Checkbox from "../components/Checkbox";
import Switch from "../components/Switch";
import TextLink from "../components/TextLink";
import TextNormal from "../components/TextNormal";
import NavLink from "../components/NavLink";
import Separator from "../components/Separator";
import Subtitle from "../components/Subtitle";
import TextImportant from "../components/TextImportant";
import FooterLink from "../components/FooterLink";
import Breadcrumb from "../components/Breadcrumb";
import Subscription from "../components/Subscription";
import CircleButton from "../components/CircleButton";
import ButtonLink from "../components/ButtonLink";
import TextSeparator from "../components/TextSeparator";
import Track from "../components/Track";
import Image from "next/image";
import GoogleLogoSvg from "../../public/assets/svg/icons/google-logo.svg";
import TextLabel from "../components/TextLabel";
import SubscriptionInfo from "../components/SubscriptionInfo";
import Modal from "../components/Modal";
import Constants from "@/utils/Constants";

export default function Showcase() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-10 md:px-20 lg:px-40">
      <Button type="primary" onClick={() => {}}>
        S'inscrire
      </Button>
      <Button type="contrast" onClick={() => {}}>
        Retour
      </Button>
      <Button type="tertiary" onClick={() => {}}>
        Sélectionner
      </Button>
      <Button type="primary" defaultCursor onClick={() => {}}>
        Liste de souhaits
      </Button>
      <Button type="contrast" defaultCursor onClick={() => {}}>
        Historique
      </Button>
      <ShopTrackerLogo />
      <Title className="text-left text-3xl text-primary">
        Choisis ton abonnement et profite dès
        <br />
        <span className="text-secondary">maintenant de nos services</span> !
      </Title>
      <Input
        className="w-full"
        labelText="Adresse email"
        type="email"
        placeholder="xyz@mail.com"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Checkbox
        labelText="Traquer le restockage"
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <Switch
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <TextLink href="/register">S'inscrire</TextLink>
      <Input
        className="w-full"
        type="text"
        placeholder="0.00€"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <TextNormal>Tu n'as pas de compte ?</TextNormal>
      <NavLink className="text-xl" href="/contact">
        Contact
      </NavLink>
      <Separator type="primary" />
      <Subtitle className="text-lg">Gratuit</Subtitle>
      <Breadcrumb href="/subscribe">⇽ Retour aux abonnements</Breadcrumb>
      <TextImportant className="leading-4">
        Parfait pour un suivi régulier <br />
        <span className="text-secondary">et fiable de tes produits.</span> <br />
        N'attends plus !
      </TextImportant>
      <FooterLink href="cgv">CGV</FooterLink>
      <CircleButton onClick={() => {}}>
        <Image src={GoogleLogoSvg} alt="google sign" />
      </CircleButton>
      <Subscription
        type="primary"
        planInfo={{
          id: Constants.SUBSCRIPTION_PLAN_ID_PRO,
          monthlyAnnually: false,
          title: "Pro Plan",
          price: 25.99,
          trackCheckInterval: 21600000,
          trackEnabledMaxProducts: 1,
          trackDisabledMaxProducts: 5,
          trackMaxUserSearchesPerDay: 5,
        }}
      />
      <ButtonLink href="/checkout">Sélectionner</ButtonLink>
      <TextSeparator>Or</TextSeparator>
      <Track
        number={0}
        product={{
          id: 1,
          name: {
            value: "1 Million - Coffret Eau de toilette ambrée",
            accuracy: 0.9,
          },
          description: {
            value:
              "1 Million, les parfums homme signés par Rabanne. Eau de toilette ou eau de parfum, best seller ou nouveauté? Choisissez votre nouvelle signature olfactive. Optez pour un parfum au cuir epicé frais, ambré boisé ou un cuir floral. Le lingot d'or est travaillé dans l'épure. Massif, précieux, parfaitement lisse.",
            accuracy: 0.9,
          },
          normal_price: {
            value: 75.99,
            accuracy: 0.8,
          },
          discounted_price: {
            value: 65.99,
            accuracy: 0.5,
          },
          currency: {
            value: "EUR",
            accuracy: 1,
          },
          availability: {
            value: false,
            accuracy: 0.7,
          },
          price_status: 1,
          created_at: 1721682389515,
          check_interval: 1800000,
          status: 2,
          url: "https://www.rabanne.com/fr/fr/fragrance/c/frag-men-onemillion",
          initial_price: 75.99,
        }}
      />
      <TextLabel>Email</TextLabel>
      <SubscriptionInfo
        planInfo={{
          id: Constants.SUBSCRIPTION_PLAN_ID_BASIC,
          monthlyAnnually: false,
          title: "Basic Plan",
          price: 4.99,
          trackCheckInterval: 21600000,
          trackEnabledMaxProducts: 1,
          trackDisabledMaxProducts: 5,
          trackMaxUserSearchesPerDay: 5,
        }}
        subscriptionInfo={{
          startDate: 1721920481470,
          nextPaymentDate: 1724512481470,
          paymentMethod: "Master Card (4242)",
          paymentHistory: [
            {
              id: 1245,
              created_at: 1721920481470,
              price: 24.99,
            },
            {
              id: 1175,
              created_at: 1719328481470,
              price: 24.99,
            },
          ],
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Ouvrir la modale
      </Button>
      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <Title className="pb-4 text-center text-3xl text-primary">
          Personnalise
          <br />
          <span className="text-secondary">ton abonnement</span> !
        </Title>
        <div className="flex items-center justify-between">
          <Button
            type="contrast"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Retour
          </Button>
          <Button type="primary" onClick={() => {}}>
            Valider
          </Button>
        </div>
      </Modal>
    </main>
  );
}
