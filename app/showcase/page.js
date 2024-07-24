"use client"

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
import OrSeparator from "../components/OrSeparator";
import Track from "../components/Track";

export default function Showcase() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <main className="lg:flex flex-col justify-center items-center h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt space-y-4 lg:px-40 md:px-20 px-10">
      <Button type="primary" onClick={() => { }}>S'inscrire</Button>
      <Button type="contrast" onClick={() => { }}>Retour</Button>
      <Button type="tertiary" onClick={() => { }}>Sélectionner</Button>
      <Button type="primary" defaultCursor onClick={() => { }}>Liste de souhaits</Button>
      <Button type="contrast" defaultCursor onClick={() => { }}>Historique</Button>
      <ShopTrackerLogo />
      <Title className="text-primary text-3xl text-left">Choisis ton abonnement et profite dès<br /><span className="text-secondary">maintenant de nos services</span> !</Title>
      <Input labelText="Adresse email" type="email" placeholder="xyz@mail.com" value={input} onChange={e => { setInput(e.target.value) }} />
      <Checkbox labelText="Traquer le restockage" checked={checked} onChange={() => { setChecked(!checked) }} />
      <Switch checked={checked} onChange={() => { setChecked(!checked) }} />
      <TextLink href="/register">S'inscrire</TextLink>
      <Input type="text" placeholder="0.00€" value={input} onChange={(e) => { setInput(e.target.value) }} />
      <TextNormal>Tu n'as pas de compte ?</TextNormal>
      <NavLink className="text-xl" href="/contact">Contact</NavLink>
      <Separator type="primary" />
      <Subtitle className="text-lg">Gratuit</Subtitle>
      <Breadcrumb href="/subscribe">⇽ Retour aux abonnements</Breadcrumb>
      <TextImportant className="leading-4">Parfait pour un suivi régulier <br /><span className="text-secondary">et fiable de tes produits.</span> <br />N'attends plus !</TextImportant>
      <FooterLink href="cgv">CGV</FooterLink>
      <CircleButton onClick={() => { }}><img src="assets/svg/icons/google-logo.svg" /></CircleButton>
      <Subscription type="contrast" planInfo={
        {
          monthlyAnnually: false,
          title: "Basic Plan",
          price: 4.99,
          description: <>Our free plan to test our <br /><span className="text-secondary">application with</span> <br />confidence!</>,
          trackCheckInterval: 21600000,
          trackEnabledMaxProducts: 1,
          trackDisabledMaxProducts: 5,
          trackMaxUserSearchesPerDay: 5
        }
      } />
      <ButtonLink href="/checkout">Sélectionner</ButtonLink>
      <OrSeparator />
      <Track number={0} product={{
        id: 1,
        name: {
          value: "1 Million - Coffret Eau de toilette ambrée",
          accuracy: 0.9
        },
        description: {
          value: "1 Million, les parfums homme signés par Rabanne. Eau de toilette ou eau de parfum, best seller ou nouveauté? Choisissez votre nouvelle signature olfactive. Optez pour un parfum au cuir epicé frais, ambré boisé ou un cuir floral. Le lingot d'or est travaillé dans l'épure. Massif, précieux, parfaitement lisse.",
          accuracy: 0.9
        },
        normal_price: {
          value: 75.99,
          accuracy: 0.8
        },
        discounted_price: {
          value: 65.99,
          accuracy: 0.5
        },
        currency: {
          value: "EUR",
          accuracy: 1
        },
        availability: {
          value: false,
          accuracy: 0.7
        },
        price_status: 3,
        created_at: 1721682389515,
        check_interval: 1800000,
        status: 2,
        url: "https://www.rabanne.com/fr/fr/fragrance/c/frag-men-onemillion",
        initial_price: 75.99
      }} />
    </main>
  );
}
