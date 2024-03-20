import { ethers } from 'ethers'
import { coinList } from './coin_list'

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.nownodes.io/3b6e162f-9202-418e-90f6-3bbfbcbb5a5f')

export const CreateMnemonic = async () => {
    const randomWallet = ethers.Wallet.createRandom()
    return randomWallet.mnemonic.phrase
}

const CreateWallet = async (coin, mnemonic) => {
    const path = coinList[coin].derivation + "0/0"
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path).connect(provider);
    const privateKey = wallet.privateKey
    const address = wallet.address
    const coinInfo = coinList[coin]
    return { coinInfo, address, privateKey}
}

export const InitWallets = async (name, mnemonic) => {
    const BTC = await CreateWallet("BTC", mnemonic)
    const ETH = await CreateWallet("ETH", mnemonic)

    const wBTC = {
        coinInfo: coinList["wBTC"],
        address: BTC.address,
        privateKey: BTC.privateKey
    }
    const sETH = {
        coinInfo: "sETH",
        address: ETH.address,
        privateKey: ETH.privateKey
    }    
    return {
        mnemonic,
        name: name,
        mainnet: {
            "BTC": BTC,
            "ETH": ETH,
        },
        testnet: {
            "wBTC": wBTC,
            "sETH": sETH,
        },
    }
}

export const getBalance = async (wallet) =>
{
    const balance = await provider.getBalance(wallet.testnet["sETH"].address)
    return ethers.utils.formatEther(balance)
}