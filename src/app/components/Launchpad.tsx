"use client"
import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";


export default function Launchpad() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");
    const [tokenDecimal, setTokenDecimal] = useState<number>(9);
    const [tokenSupply, setTokenSupply] = useState<number>(1);
    const [tokenImage, setTokenImage] = useState<string>("");
    const [tokenDes, setTokenDes] = useState<string | null>(null);
    const [mintAuth, setMintAuth] = useState<PublicKey | null>(null);
    const [FreezeAuth, setFreezeAuth] = useState<PublicKey | null>(null);
    const [updateAuth, setUpdateAuth] = useState<PublicKey | null>(null);
    const [link, setLink] = useState<string | null>(null);

    
    // https://app.ardrive.io/#/drives/461a88ab-8808-42ff-a7a2-ff47030a89b9?name=TokenLaunchpad
    
    
    
    async function createToken() {
        
        if (!wallet.publicKey) {
            console.log("Connect Wallet");
            return
        }
        

        try {
            const mintKeypair = Keypair.generate();
            console.log(`Mint generated keypair: ${mintKeypair.publicKey.toBase58()}`);

            const metadata = {
                mint: mintKeypair.publicKey,
                name: tokenName,
                symbol: tokenSymbol,
                uri: tokenImage,
                description: tokenDes,
                additionalMetadata: []
            }

            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

            const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: mintLen,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
                createInitializeMintInstruction(mintKeypair.publicKey, tokenDecimal, wallet.publicKey, FreezeAuth, TOKEN_2022_PROGRAM_ID),
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    mint: mintKeypair.publicKey,
                    metadata: mintKeypair.publicKey,
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                })
            )
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);

            await wallet.sendTransaction(transaction, connection);
            console.log(`Token Mint created at ${mintKeypair.publicKey.toBase58()}`);

            const associatedToken = getAssociatedTokenAddressSync(
                mintKeypair.publicKey,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID,
            )

            setLink(associatedToken.toBase58());
            console.log(`ATA: ${associatedToken.toBase58()}`);

            const transaction2 = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    mintKeypair.publicKey,
                    TOKEN_2022_PROGRAM_ID,
                )
            );

            await wallet.sendTransaction(transaction2, connection);

            const transaction3 = new Transaction().add(
                createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, tokenSupply * tokenDecimal, [], TOKEN_2022_PROGRAM_ID)
            );

            await wallet.sendTransaction(transaction3, connection);
        } catch (error) {
            console.error(`Error while creating token: ${error}`);
        }
    }

    return <div>
        <div className="grid justify-center gap-4 border rounded-lg border-white p-10 bg-[#0c0c0ca3] mx-48 shadow-[4px_4px_3px_rgb(211,211,211,1)]"> 
            <div className="grid justify-center pb-5">
                <h1 className="font-extrabold text-4xl font-sans text-center">Solana Token Launchpad</h1>
                <p className="text-center text-xs text-gray-400">Easily create your own Solana SPL-Token in few steps without coding.</p>
            </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-3">
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Name:</p>
          <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value)} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the name of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Symbol:</p>
          <input type="text" value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the symbol of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Decimals:</p>
          <input type="text" value={tokenDecimal} onChange={(e) => setTokenDecimal(Number(e.target.value))} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the decimals of the Token" />
        </div>
        <div>
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Supply:</p>
          <input type="text" value={tokenSupply} onChange={(e) => setTokenSupply(Number(e.target.value))} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 text-xs" placeholder="Enter the supply of the Token" />
        </div>
        <div className="">
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Image:</p>
          <input type="file" value={tokenImage} onChange={(e) => setTokenImage(e.target.value)} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 h-16 text-xs row-span-2" placeholder="Enter the image of the Token" />
        </div>
        <div className="">
          <p className="text-sm text-gray-400"><span className="text-red-600">*</span>Description:</p>
          <textarea onChange={(e) => setTokenDes(e.target.value)} className="border border-gray-400 rounded-md bg-[#0c0c0cb5] outline-none p-2 w-80 h-16 text-xs row-span-2 " placeholder="Enter the description of the Token" />
        </div>
      </div>
      <div>
        {/* <div className="grid">
          <h1 className="font-extrabold text-2xl font-sans text-left">Revoke any Authority?</h1>
          <div className="flex">
            <p className="text-center text-xs text-gray-400">Solana Token Program has 3 authorities; Freeze, Mint and Update authorities. Revoke them for attracting more investors.</p>
          </div>
        </div>
        <div className="flex justify-between gap-2 ">
          <div className="flex items-center me-4 py-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <input type="checkbox" value="" onClick={setFreezeAuth(wallet.publicKey ?? null)} className="w-4 h-4  bg-gray-100 border-gray-300 rounded" />
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
        </div> */}
        <div className="flex justify-center pt-5">
          <button onClick={createToken} className="p-5 rounded-full text-xl font-extrabold border bg-green-600 border-green-800">Create Token</button>
        </div>
      </div>
    </div>
    <div className="flex justify-center">
        {link === null ? null : <p className="text-xl font-semibold">Associated Token Address: {link}</p>}
    </div>
    </div>
}