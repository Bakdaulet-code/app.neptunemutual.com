import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { OptionsPage } from "@/components/pages/options";

export default function Options() {
  return (
    <>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OptionsPage />
    </>
  );
}
