"use client"

import type React from "react"
import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  AlphaWalletAdapter,
  CloverWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css"

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const network =
    process.env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet" ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet

  const endpoint = useMemo(() => {
    // Try to use custom RPC URL from environment first
    if (process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
      return process.env.NEXT_PUBLIC_SOLANA_RPC_URL
    }

    const devnetEndpoints = [
      "https://api.devnet.solana.com",
      "https://devnet.helius-rpc.com",
      clusterApiUrl(WalletAdapterNetwork.Devnet),
    ]

    const mainnetEndpoints = [
      "https://api.mainnet-beta.solana.com",
      "https://solana-api.projectserum.com",
      "https://rpc.ankr.com/solana",
      clusterApiUrl(WalletAdapterNetwork.Mainnet),
    ]

    const endpoints = network === WalletAdapterNetwork.Devnet ? devnetEndpoints : mainnetEndpoints
    return endpoints[0] // Use the first reliable endpoint
  }, [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    [network],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
