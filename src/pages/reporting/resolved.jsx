import Head from "next/head";
import { ReportingTabs } from "@/components/pages/reporting/ReportingTabs";
import { ReportingResolvedPage } from "@/components/pages/reporting/resolved";

export default function ReportingResolved() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReportingTabs active="resolved">
        <ReportingResolvedPage />
      </ReportingTabs>
    </main>
  );
}
