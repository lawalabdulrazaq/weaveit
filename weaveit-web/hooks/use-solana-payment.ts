"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useCallback, useState } from "react"

const PAYMENT_WALLET = new PublicKey("8SBLkHEM1df3TTXpaZGoY14f5xxQAwskEKEoTuHbCzKP") // Ragnar address

export function useSolanaPayment() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [isProcessing, setIsProcessing] = useState(false)

  const sendPayment = useCallback(
    async (amountUSD = 0.5) => {
      if (!publicKey || !sendTransaction) {
        throw new Error("Wallet not connected")
      }

      setIsProcessing(true)

      try {
        // Get current SOL price in USD (you might want to use a real price API)
        // For now, using a placeholder conversion rate
        const solPriceUSD = 100 // Replace with actual SOL price fetching
        const solAmount = amountUSD / solPriceUSD
        const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL)

        // Create transaction
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: PAYMENT_WALLET,
            lamports,
          }),
        )

        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = publicKey

        // Send transaction
        const signature = await sendTransaction(transaction, connection)

        // Wait for confirmation
        await connection.confirmTransaction(signature, "confirmed")

        console.log("[v0] Payment successful:", signature)
        return { success: true, signature, amount: solAmount }
      } catch (error) {
        console.error("[v0] Payment failed:", error)
        throw error
      } finally {
        setIsProcessing(false)
      }
    },
    [connection, publicKey, sendTransaction],
  )

  const getSolPrice = useCallback(async () => {
    try {
      // Fetch current SOL price from CoinGecko API
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      const data = await response.json()
      return data.solana.usd
    } catch (error) {
      console.error("[v0] Failed to fetch SOL price:", error)
      return 100 // Fallback price
    }
  }, [])

  return {
    sendPayment,
    getSolPrice,
    isProcessing,
    isConnected: !!publicKey,
    walletAddress: publicKey?.toString(),
  }
}
