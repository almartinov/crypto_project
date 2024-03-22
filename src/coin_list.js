export const coinList = {
    "ARB": {
        id: "arbitrum",
        derivation: "m/44'/60'/0'/",
        name: "Arbitrum",
        provider: "https://go.getblock.io/9236af1438fe4b5c9c16fd682d014356",
        prefix: "0x",
        image: "/coins/arb.png",
        summary: "Arbitrum is a rollup chain designed to improve the scalability of Ethereum. It achieves this by bundling multiple transactions into a single transaction, thereby reducing the load on the Ethereum network.",
        website: "https://arbitrum.foundation/",
        coingecko: "https://www.coingecko.com/en/coins/arbitrum",
        net: "mainnet"    
    },
    "ETH": {
        id: "ethereum",
        derivation: "m/44'/60'/0'/",
        provider: "https://eth.nownodes.io/3b6e162f-9202-418e-90f6-3bbfbcbb5a5f",
        name: "Ethereum",
        website: "https://ethereum.org/en/",
        prefix: "0x",
        image: "/coins/eth.png",
        summary: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
        website: "https://ethereum.org/en/",
        coingecko: "https://www.coingecko.com/en/coins/ethereum",
        net: "mainnet"    
    },
    "wETH": {
        id: "ethereum",
        name: "MTW Ethereum",
        derivation: "m/44'/60'/0'/",
        provider: "https://net.mtw-testnet.com",
        proto: "ETH", 
        website: "https://prev.morethanwallet.com/testnet/about",
        image: "/coins/wETH.png",
        net: "testnet"    
    },
    "sETH": {
        id: "sepolia",
        derivation: "m/44'/60'/0'/",
        provider: "https://eth-sepolia.nownodes.io/3b6e162f-9202-418e-90f6-3bbfbcbb5a5f",
        name: "Sepolia",
        proto: "SepoliaETH", 
        image: "/coins/sepolia.png",
        net: "testnet"    
    }
}