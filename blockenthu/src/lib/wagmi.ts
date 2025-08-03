import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, bsc } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, bsc],
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // TODO: Get a project ID from WalletConnect Cloud
    }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
  },
})
