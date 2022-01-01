import Head from "next/head";
import { PoliciesTabs } from "@/components/pages/my-policies/PoliciesTabs";
import { PoliciesActivePage } from "@/components/pages/my-policies/PoliciesActivePage";

export default function MyPoliciesActive() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PoliciesTabs active="active">
        <PoliciesActivePage />
      </PoliciesTabs>
    </main>
  );
}
