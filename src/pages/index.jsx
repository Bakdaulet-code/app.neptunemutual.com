import Head from "next/head";

import LandingPage from "@/modules/landing-page";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual Covers</title>
        <meta
          name="description"
          content="Get guaranteed payouts from our parametric cover model. Resolve incidents faster without the need for claims assessment."
        />
      </Head>
      <LandingPage />
    </main>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      noWrappers: true,
    },
  };
};
