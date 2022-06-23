import BigNumber from "bignumber.js"

export class VaultStakingInfo {
    public staked: BigNumber
    public rewards: number
    public apy: string

    constructor(staked: BigNumber, rewards: number, apy: string) {        
        this.staked = staked
        this.rewards = rewards;
        this.apy = apy 
    }
}