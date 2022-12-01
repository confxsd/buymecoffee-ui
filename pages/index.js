import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Alchemy, Network } from 'alchemy-sdk';

export default function Home({ bn }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>buy me a cofee onchain</title>
        <meta name="description" content="dapp proj by confxsd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          buy me a cofee onchain
        </h1>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}


export async function getServerSideProps(context) {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key.
    network: Network.ETH_GOERLI // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  const bn = await alchemy.core.getBlockNumber()
  return {
    props: {
      bn
    },
  };
}