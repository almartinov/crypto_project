import { ethers } from 'ethers'
import { coinList } from './coin_list'
import axios from 'axios'

const testeeng = true

export const CreateMnemonic = async () => {
    const randomWallet = ethers.Wallet.createRandom()
    return randomWallet.mnemonic.phrase
}

const CreateWallet = async (coin, mnemonic) => {
    const provider = new ethers.providers.JsonRpcProvider(coinList[coin].provider)
    const path = coinList[coin].derivation + "0/0"
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path).connect(provider);
    const privateKey = wallet.privateKey
    const address = wallet.address
    const coinInfo = coinList[coin]
    return { coinInfo, address, privateKey}
}

export const InitWallets = async (name, mnemonic) => {
    const ARB = await CreateWallet("ARB",mnemonic)
    const ETH = await CreateWallet("ETH", mnemonic)
    const wETH = await CreateWallet("wETH", mnemonic)
    const sETH = await CreateWallet("sETH", mnemonic)
    return {
        mnemonic,
        name: name,
        mainnet: {
            "ARB": ARB,
            "ETH": ETH,
        },
        testnet: {
            "wETH": wETH,
            "sETH": sETH,
        },
    }
}

export const getBalance = async (wallet) =>
{
    if(testeeng){
        return{
            ETH: 40.612,
            sETH: 11324.11,
            wETH: 1.3,
            ARB: 90200
        }
    }
    const providerETH = new ethers.providers.JsonRpcProvider(coinList["ETH"].provider)
    const providersETH = new ethers.providers.JsonRpcProvider(coinList["sETH"].provider)
    const providerwETH = new ethers.providers.JsonRpcProvider(coinList["wETH"].provider)
    const providerARB = new ethers.providers.JsonRpcProvider(coinList["ARB"].provider)

    const balanceETH = await providerETH.getBalance(wallet.mainnet["ETH"].address)
    const balancesETH = await providersETH.getBalance(wallet.testnet["sETH"].address)
    const balancewETH = await providerwETH.getBalance(wallet.testnet["wETH"].address)
    const balanceARB = await providerARB.getBalance(wallet.mainnet["ARB"].address)
    return {
        ETH: parseFloat(ethers.utils.formatEther(balanceETH)),
        sETH: parseFloat(ethers.utils.formatEther(balancesETH)),
        wETH: parseFloat(ethers.utils.formatEther(balancewETH)),
        ARB: parseFloat(ethers.utils.formatEther(balanceARB))
    }
}

export const getPrice = async () =>
{
    if(testeeng){
        return{
            ETH: 3323.012323,
            sETH: 9.2323,
            wETH: 9232.23,
            ARB: 1.59232
        }
    }
    let ETHp;
    let ARBp=0;
    const resETH = await axios.get(
        'https://rest.coinapi.io/v1/exchangerate/ETH/USD',{
        headers: {
            "X-CoinAPI-Key": "2CD20AD1-B514-493B-B4D5-EFFD33D250BD" 
            }
        }
    ).then(({data}) => {
        console.log(data);
        ETHp=data["rate"]
    })
    const resARB = await axios.get(
        'https://rest.coinapi.io/v1/exchangerate/ARB/USD',{
        headers: {
            "X-CoinAPI-Key": "2CD20AD1-B514-493B-B4D5-EFFD33D250BD" 
            }
        }
    ).then(({data}) => {
        console.log(data);
        ARBp=data["rate"]
    })
    return {
        ETH: ETHp,
        sETH: 0.0,
        wETH: 0.0,
        ARB: ARBp
    }
}

export const gen_new = async() => {
    const providersETH = new ethers.providers.JsonRpcProvider(coinList["sETH"].provider)
    const path = coinList["sETH"].derivation + "0/1"
    const wallet = ethers.Wallet.fromMnemonic("cloth finish fire talent twin crop glimpse mean middle inform theory success", path).connect(providersETH);
    console.log(wallet)
}