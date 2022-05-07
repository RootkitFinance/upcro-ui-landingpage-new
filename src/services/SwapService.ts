import { BASE_ADDRESS, EMPIRE_PAIR_ADDRESS, EMPIRE_ROUTER_ADDRESS } from './../constants/index';
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import empireRouterAbi from '../constants/abis/empireRouter.json'
import empirePairAbi from '../constants/abis/empirePair.json'
import { ethers } from "ethers"

export class SwapService {
    private empireRouterContract: Contract;
    // private empireFactoryContract: Contract;
    private empirePairContract: Contract;
    private account: string;

    constructor(library: Web3Provider, account: string) {
        const signer = library.getSigner(account).connectUnchecked()
        this.account = account
        this.empireRouterContract = new Contract(EMPIRE_ROUTER_ADDRESS, empireRouterAbi, account != null ? signer : library);
        this.empirePairContract = new Contract(EMPIRE_PAIR_ADDRESS, empirePairAbi, account != null ? signer : library);
        // this.empireFactoryContract = new Contract(EMPIRE_FACTORY_ADDRESS, empireFactoryAbi, signer)
    }

    public async getAmountOut(amount: string) {
        const reserves = await this.empirePairContract.getReserves();
        return await this.empireRouterContract.getAmountOut(ethers.utils.parseEther(amount), reserves[0].toString(), reserves[1].toString())
    }

    public async getAmountOut2(amount: string) {
        const reserves = await this.empirePairContract.getReserves();
        return await this.empireRouterContract.getAmountOut(ethers.utils.parseEther(amount), reserves[1].toString(), reserves[0].toString())
    }

    public async getAmountIn(amount: string){
        const reserves = await this.empirePairContract.getReserves();
        return await this.empireRouterContract.getAmountIn(ethers.utils.parseEther(amount), reserves[0].toString(), reserves[1].toString())
    }

    public async swap(amountIn: string, amountOut: string, token0: string, token1: string){
        var add_minutes =  function (dt: any, minutes: any) {
            return new Date(dt.getTime() + minutes*60000);
        }

        if(token0 == BASE_ADDRESS){
            let amtIn = amountIn
            let amtOut = (parseFloat(amountOut) - (parseFloat(amountOut) * (4 / 100))).toFixed(18)
            let timeout = ethers.utils.parseEther((add_minutes(new Date(), 20).getTime()/1000).toString()).toString()

            return await this.empireRouterContract.swapETHForExactTokens(
                ethers.utils.parseEther(amtOut.toString()),
                [token0, token1],
                this.account,
                timeout
            , {value: ethers.utils.parseEther(amtIn)})
        }
        else{
            let amtIn = amountIn
            let amtOut = (parseFloat(amountOut) - (parseFloat(amountOut) * (4 / 100))).toFixed(18)
            let timeout = ethers.utils.parseEther((add_minutes(new Date(), 20).getTime()/1000).toString()).toString()
            return await this.empireRouterContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
                ethers.utils.parseEther(amtIn.toString()), 
                ethers.utils.parseEther(amtOut.toString()),
                [token0, token1],
                this.account,
                timeout
            )
        }

        return 0
        // sell
        // example https://cronoscan.com/tx/0xe2c8379265020e38c29d2f3b188d0688e5ef1a7103159d3ab192a2f568a070e8
        // swapExactTokensForETHSupportingFeeOnTransferTokens

        // buy
        // example https://cronoscan.com/tx/0x960d19684b440f67c80d113b18a8f4545bc43cc50f2083940d77c13a529f8a68
        // swapETHForExactTokens
    }
}