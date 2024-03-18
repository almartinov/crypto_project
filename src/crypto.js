import { ethers } from 'ethers'

export const CreateMnemonic = async () => {
    const randomWallet = ethers.Wallet.createRandom()
    console.log(randomWallet.mnemonic.phrase)
    return randomWallet.mnemonic.phrase
}
