import { parseTokenAccountResp, Raydium, TxVersion } from "@raydium-io/raydium-sdk-v2";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js"
import bs58 from "bs58";

export const owner: Keypair = Keypair.fromSecretKey(bs58.decode('24ZoXx9RPm1nd2TiPnsyb7rVQLxRW23hzhkGzQuTuqMNAZN31XGwEqKX7XAy6tvZs3PdGjLxCAayeedUjzFa94PV'))
export const connection = new Connection(clusterApiUrl("devnet"));
export const txVersion = TxVersion.V0;
const cluster = "devnet";

let raydium: Raydium | undefined;

export const initSdk = async(params?: { loadToken?: boolean }) => {
    if (raydium) return raydium
    console.log(`connect to rpc ${connection.rpcEndpoint} in ${cluster}`);
    raydium = await Raydium.load({
        owner,
        connection,
        cluster,
        disableFeatureCheck: true,
        disableLoadToken: !params?.loadToken,
        blockhashCommitment: "finalized",
    })
    return raydium;
}

export const fetchTokenAccountData = async () => {
    const solAccountResp = await connection.getAccountInfo(owner.publicKey);
    const tokenAccountResp = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_PROGRAM_ID });
    const token2022Req = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_2022_PROGRAM_ID });
    const tokenAccountData = parseTokenAccountResp({
        owner: owner.publicKey,
        solAccountResp,
        tokenAccountResp: {
            context: tokenAccountResp.context,
            value: [...tokenAccountResp.value, ...token2022Req.value],
        },
    })
    return tokenAccountData
}