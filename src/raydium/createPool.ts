import { PublicKey } from "@solana/web3.js"
import BN from "bn.js"
import { initSdk, txVersion } from "./config";
import { DEVNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3 } from "@raydium-io/raydium-sdk-v2";

interface CreateAmmPoolParams {
    baseMintInfo: {
        mint: PublicKey;
        decimals: number;
    };
    quoteMintInfo: {
        mint: PublicKey;
        decimals: number;
    };
    baseAmount: BN;
    quoteAmount: BN;
    startTime: BN;
    ownerInfo: {
        useSOLBalance: boolean;
    };
}

export const createAmmPoolDevnet = async ({
    baseMintInfo,
    quoteMintInfo,
    baseAmount,
    quoteAmount,
    startTime
}: CreateAmmPoolParams) => {
    try {
        console.log(`Provider Base Mint (Base58): ${baseMintInfo.mint.toBase58()}`)
        console.log(`Provider Quote Mint (Base58): ${quoteMintInfo.mint.toBase58()}`)

        const raydium = await initSdk()
        const marketId = new PublicKey('HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8')

        const marketBufferInfo =await raydium.connection.getAccountInfo(new PublicKey(marketId));
        console.log(`Market: ${marketBufferInfo}`);
        const { baseMint, quoteMint } = MARKET_STATE_LAYOUT_V3.decode(marketBufferInfo!.data);
        console.log(`basemint: ${baseMint.toBase58()}`);
        const baseMintInfo_1 = await raydium.token.getTokenInfo(baseMint);
        const quoteMintInfo_2 = await raydium.token.getTokenInfo(quoteMint);

        console.log(`basemintinfo1: ${baseMintInfo_1}`)
        console.log(`quotemintinfo2: ${quoteMintInfo_2}`)

        const baseMint_data = await raydium.token.getTokenInfo(baseMintInfo.mint.toBase58());
        console.log(`decimals: ${baseMintInfo.decimals}`);
        const quoteMint_data = await raydium.token.getTokenInfo(quoteMintInfo.mint.toBase58());
        console.log(`Mint Info: ${baseMint_data} \n ${quoteMint_data}`);
        console.log(`AMM Program ID: ${DEVNET_PROGRAM_ID.AmmV4.toBase58()}`);
        console.log(`OpenBook Market Program ID: ${DEVNET_PROGRAM_ID.OPENBOOK_MARKET.toBase58()}`);
        console.log(`Fee Destination ID: ${DEVNET_PROGRAM_ID.FEE_DESTINATION_ID.toBase58()}`);

        //creating a pool
        const {execute, extInfo} = await raydium.liquidity.createPoolV4({
            programId: DEVNET_PROGRAM_ID.AmmV4,
            marketInfo: {
                marketId,
                programId: DEVNET_PROGRAM_ID.OPENBOOK_MARKET,
            },
            baseMintInfo: {
                mint: baseMintInfo.mint,
                decimals: baseMintInfo.decimals,
            },
            quoteMintInfo: {
                mint: quoteMintInfo.mint,
                decimals: quoteMintInfo.decimals,
            }, 
            baseAmount: baseAmount,
            quoteAmount: quoteAmount,
            startTime: startTime,
            ownerInfo: {
                useSOLBalance: true,
            },
            associatedOnly: false,
            txVersion,
            feeDestinationId: DEVNET_PROGRAM_ID.FEE_DESTINATION_ID
        });

        //log success details
        const { txId } = await execute({ sendAndConfirm: true });
        console.log(
            'AMM pool created On Devnet!',
            'Transaction ID:', txId,
            'Pool Keys:',
            Object.keys(extInfo.address).reduce(
                (acc, cur) => ({
                    ...acc,
                    [cur]: extInfo.address[cur as keyof typeof extInfo.address].toBase58(),
                }),
                {}
            )
        )
    } catch (error) {
        console.log(error);
        throw error;
    }
}