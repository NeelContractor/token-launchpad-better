"use client"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Launchpad from "./components/Launchpad";

export default function Home() {
  return (
   <div className="m-10 ">
    <div className="flex justify-between mb-10">
      <WalletDisconnectButton />
      <WalletMultiButton />
    </div>
    <Launchpad />
    </div>
  );
}
