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
import CircleLink from "../components/CircleLink";

export default function Showcase() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => { }}>S'inscrire</Button>
      <Button type="contrast" onClick={() => { }}>Retour</Button>
      <Button type="primary" defaultCursor onClick={() => { }}>Liste de souhaits</Button>
      <Button type="contrast" defaultCursor onClick={() => { }}>Historique</Button>
      <ShopTrackerLogo />
      <Title className="text-primary text-3xl text-left">Choisis ton abonnement et profite dès<br /><span className="text-secondary">maintenant de nos services</span> !</Title>
      <Input labelText="Adresse email" type="email" placeholder="xyz@mail.com" value={input} onChange={(e) => { setInput(e.target.value) }} />
      <Checkbox labelText="Traquer le restockage" checked={checked} onChange={(e) => { setChecked(!checked) }} />
      <Switch checked={checked} onChange={(e) => { setChecked(!checked) }} />
      <TextLink href="/register">S'inscrire</TextLink>
      <Input type="text" placeholder="0.00€" value={input} onChange={(e) => { setInput(e.target.value) }} />
      <TextNormal>Tu n'as pas de compte ?</TextNormal>
      <NavLink href="/contact">Contact</NavLink>
      <Separator />
      <Subtitle className="text-lg">Gratuit</Subtitle>
      <Breadcrumb href="/subscribe">⇽ Retour aux abonnements</Breadcrumb>
      <TextImportant>Parfait pour un suivi régulier <br /><span className="text-secondary">et fiable de tes produits.</span> <br />N'attends plus !</TextImportant>
      <FooterLink href="cgv">CGV</FooterLink>
      <CircleLink href="/login"><img src="assets/svg/icons/google-logo.svg" /></CircleLink>
    </>
  );
}
