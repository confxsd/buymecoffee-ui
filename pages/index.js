import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Web3 from 'web3';
// import { ethers } from "ethers";


export default function Home({ bn }) {

  const [account, setAccount] = useState()
  const [isMetamask, setIsMetamask] = useState(false)
  const [ethereum, setEthereum] = useState()
  const [isConnected, setIsConnected] = useState()

  useEffect(() => {

    setIsMetamask(window.ethereum && window.ethereum.isMetaMask)
    setIsConnected(window.ethereum && window.ethereum.isConnected())

    if (window.ethereum) {
      try {
        connect()
      } catch {
        setAccount(null)
      }
    }
  }, [isConnected])

  const disconnect = async () => {
    console.log(ethereum)
    setAccount(null)
  }
  const connect = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    // setAccount(new Web3(window.ethereum))
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    setEthereum(window.ethereum)
    setAccount(accounts[0])
    console.log(accounts)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>buy me a cofee onchain</title>
        <meta name="description" content="dapp proj by confxsd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <section style={{
        position: 'absolute',
        right: '2em',
        top: '2em'
      }}>
        {isMetamask ?
          <>{(account) ?
            <div style={{
              display: 'flex',
              justifyContent: 'end',
              flexDirection: 'column'
            }}>
              <button onClick={disconnect}>Disconnect</button>
              <p style={{
                fontSize: '12px',
                textAlign: 'right'
              }}>{account.slice(0, 8)}...</p>
            </div>
            :
            <button onClick={connect}>connect</button>
          }
          </>
          :
          <p>install metamask</p>}
      </section> */}
      <section style={{
        position: 'absolute',
        right: '2em',
        top: '2em'
      }}>
        <ConnectButton />
      </section>

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