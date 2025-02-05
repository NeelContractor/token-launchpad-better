"use client"
import dynamic from "next/dynamic";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const Launchpad = dynamic(() => import("./components/Launchpad"), { ssr: false });

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
