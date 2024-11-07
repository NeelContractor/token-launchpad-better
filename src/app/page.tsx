"use client"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
   <div className="m-10 ">
    <div className="flex justify-between mb-10">
      <WalletDisconnectButton />
      <WalletMultiButton />
    </div>
    <div className="grid justify-center gap-4 border rounded-lg border-white p-10 bg-[#0c0c0ca3] mx-48 shadow-[4px_4px_3px_rgb(211,211,211,1)]"> 
      <div className="grid justify-center pb-5">
        <h1 className="font-extrabold text-4xl font-sans text-center">Solana Token Launchpad</h1>
        <p className="text-center text-xs text-gray-400">Easily create your own Solana SPL-Token in few steps without coding.</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-4 gap-3">
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Name:</p>
          <input type="text" className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the name of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Symbol:</p>
          <input type="text" className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the symbol of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Decimals:</p>
          <input type="text" className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the decimals of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Supply:</p>
          <input type="text" className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the supply of the Token" />
        </div>
        <div className="">
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Image:</p>
          <input type="file" className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 h-16 text-xs row-span-2" placeholder="Enter the image of the Token" />
        </div>
        <div className="">
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Description:</p>
          <textarea  className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 h-16 text-xs row-span-2 " placeholder="Enter the description of the Token" />
        </div>
      </div>
      <div>
        <div className="grid">
          <h1 className="font-extrabold text-2xl font-sans text-left">Revoke any Authority?</h1>
          <div className="flex">
            <p className="text-center text-xs text-gray-400">Solana Token Program has 3 authorities; Freeze, Mint and Update authorities. Revoke them for attracting more investors.</p>
          </div>
        </div>
        <div className="flex justify-between gap-2 ">
          <div className="flex items-center me-4 py-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <input type="checkbox" value="" className="w-4 h-4  bg-gray-100 border-gray-300 rounded" />
            Freeze Authority</label>
          </div>
          <div className="flex items-center me-4 py-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <input type="checkbox" value="" className="w-4 h-4  bg-gray-100 border-gray-300 rounded" />
            Mint Authority</label>
          </div>
          <div className="flex items-center me-4 py-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              <input type="checkbox" value="" className="w-4 h-4  bg-gray-100 border-gray-300 rounded" />
            Update Authority</label>
          </div>
        </div>
        <div className="flex justify-center pt-5">
          <button className="p-5 rounded-full text-xl font-extrabold border bg-green-600 border-green-800">Create Token</button>
        </div>
      </div>
    </div>
   </div>
  );
}
