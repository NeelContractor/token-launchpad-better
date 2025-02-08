"use client"

import { createAmmPoolDevnet } from "@/raydium/createPool";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import React, { useState } from "react";

export default function CreateCpPool({ poolId }: {
    poolId: string
}) {

    // const [createdToken, setCreatedToken] = useState("");
    // const ALT_TOKEN = createdToken;

    const [baseMint, setBaseMint] = useState<string>('');
    const [quoteMint, setQuoteMint] = useState<string>('');
    const [baseAmount, setBaseAmount] = useState<string>('');
    const [quoteAmount, setQuoteAmount] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [useSOLBalance, setUseSOLBalance] = useState<boolean>(true);
    const [status, setStatus] = useState<string>('');

    async function createPool(e: React.FormEvent) {
        e.preventDefault();
        
        console.log(`Base Mint: ${baseMint}`)
        console.log(`Quote Mint: ${quoteMint}`)
        console.log(`Base Amount: ${baseAmount}`)
        console.log(`Quote Amount: ${quoteAmount}`)
        console.log(`Start Time: ${startTime}`)
        console.log(`use Sol Balance: ${useSOLBalance}`)

        try {
            const baseMintPublicKey = new PublicKey(baseMint);
            const quoteMintPublicKey = new PublicKey(quoteMint);
            const baseAmountBN = new BN(baseAmount);
            const quoteAmountBN = new BN(quoteAmount);
            const startTimeBN = new BN(startTime);

            await createAmmPoolDevnet({
                baseMintInfo: {
                    mint: baseMintPublicKey,
                    decimals: 9,
                },
                quoteMintInfo: {
                    mint: quoteMintPublicKey,
                    decimals: 9,
                },
                baseAmount: baseAmountBN,
                quoteAmount: quoteAmountBN,
                startTime: startTimeBN,
                ownerInfo: {
                    useSOLBalance
                }
            })
            setStatus("Pool creation successful");
        } catch (error) {
            console.log(`Error creating pool: ${error}`);
            setStatus(`Error creating pool. please check console for more details.`);
        }
    }

    return (
        <div id={poolId} className="grid justify-center mt-5 gap-4 border rounded-lg border-white p-10 bg-[#0c0c0ca3] mx-48 shadow-[4px_4px_3px_rgb(211,211,211,1)]">
            <h1 className="font-extrabold text-4xl font-sans text-center">Create AMM Pool</h1>
            <div className="grid justify-center">
                <form onSubmit={createPool}>
                    <div>
                        <label htmlFor="baseMint">Base Mint Address:</label>
                        <input 
                            type="text" 
                            id="baseMint"
                            value={baseMint}
                            onChange={(e) => setBaseMint(e.target.value)}
                            placeholder="Enter base mint address"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quoteMint">Quote Mint Address:</label>
                        <input 
                            type="text" 
                            id="quoteMint"
                            value={quoteMint}
                            onChange={(e) => setQuoteMint(e.target.value)}
                            placeholder="Enter quote mint address"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="baseAmount">Base Amount:</label>
                        <input 
                            type="number" 
                            id="baseAmount"
                            value={baseAmount}
                            onChange={(e) => setBaseAmount(e.target.value)}
                            placeholder="Enter base amount"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quoteAmount">Quote Amount:</label>
                        <input 
                            type="number" 
                            id="quoteAmount"
                            value={quoteAmount}
                            onChange={(e) => setQuoteAmount(e.target.value)}
                            placeholder="Enter quote amount"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="startTime">Start Time (in seconds):</label>
                        <input 
                            type="number" 
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="Enter start time"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="useSOLBalance">
                            <input 
                                type="checkbox" 
                                id="useSOLBalance"
                                checked={useSOLBalance}
                                onChange={(e) => setUseSOLBalance(e.target.checked)}
                                className="form-checkbox text-blue-500"
                                required
                            />
                            <span className="ml-2">Use SOL Balance for Fees</span>
                        </label>
                    </div>
                    <button 
                        type="submit"
                        className="flex justify-self-center p-5 rounded-full text-xl font-extrabold border bg-green-600 border-green-800 hover:bg-green-900"
                    >Create pool</button>
                </form>
                {status && (
                    <div className="mt-4 text-center">
                    <p className={`text-lg ${status.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                        {status}
                    </p>
                    </div>
                )}
            </div>
            {/* <div className="flex justify-center">
                <button 
                    onClick={createPool}
                    className="p-5 rounded-full text-xl font-extrabold border bg-green-600 border-green-800 hover:bg-green-900"
                >Create pool</button>
            </div> */}
        </div>
    )
}