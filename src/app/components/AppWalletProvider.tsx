"use client";
 
import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
 
import "@solana/wallet-adapter-react-ui/styles.css";
 
export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
   
    return (
      <ConnectionProvider endpoint={"https://api.solana.devnet.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }