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
    projectId: 'YOUR_PROJECT_ID', // TODO: Get a project ID from WalletConnect
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
