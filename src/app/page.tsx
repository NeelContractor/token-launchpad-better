"use client"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Launchpad from "./components/Launchpad";
import { useEffect, useState } from "react";
// import CreateCpPool from "./components/CreateCpPool";


export default function Home() {

  // solves hydration error if wallet is already connected
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Return nothing until client renders

  // const launchpadId = "launchpad-id"; // Define launchpadId
  // const tokenPoolId = "token-pool-id";

  // const handlerOnClick = (id: string) => {
  //   const el = document.getElementById(id);
  //   el?.scrollIntoView({ behavior: "smooth" });
  // }

  return (
   <div className="m-10 ">
      <div className="flex justify-between mb-10">
        <WalletDisconnectButton />
        {/* <nav className="flex justify-between gap-5">
            <button onClick={() => handlerOnClick("launchpad-id")} className="text-xl font-bold p-3 rounded-full bg-[#512da8] hover:bg-[#1a1f2e]">Create Token</button>
            <button onClick={() => handlerOnClick("token-pool-id")} className="text-xl font-bold p-3 rounded-full bg-[#512da8] hover:bg-[#1a1f2e]">Create Token Pool</button>
        </nav> */}
        <WalletMultiButton />
      </div>
      <Launchpad />
      {/* <Launchpad launchpadId={launchpadId} /> */}
      {/* <CreateCpPool poolId={tokenPoolId} /> */}
    </div>
  );
}
