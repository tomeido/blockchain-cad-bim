import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    hardhat,
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Blockchain CAD/BIM',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
