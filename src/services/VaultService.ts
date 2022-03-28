import { Contract } from "@ethersproject/contracts";
import vaultAbi from "../constants/abis/vault.json";
import { Web3Provider } from "@ethersproject/providers";
import { VAULT_ADDRESS, VAULT_START_TIME } from "../constants";
import { parseEther } from "@ethersproject/units";
import { getBalanceNumber } from "../utils/formatBalance";
import { VaultStakingInfo } from "../dtos/VaultStakingInfo";
import BigNumber from "bignumber.js";

export class VaultService {
	private contract: Contract;
	private account: string;

	constructor(library: Web3Provider, account: string) {
		const signer = library.getSigner(account).connectUnchecked();
		this.contract = new Contract(VAULT_ADDRESS, vaultAbi, signer);
		this.account = account;
	}

	public async deposit(amount: string) {
		return await this.contract.deposit(parseEther(amount));
	}

	public async withdraw(amount: string) {
		return await this.contract.withdraw(parseEther(amount));
	}

	public async harvest() {
		return await this.contract.harvest();
	}

	public async compound() {
		return await this.contract.compound();
	}

	public async getInfo() {
		const staker = "0xc27c10ABf2fD6B39Cda4c5478BB2BF1E12919c99";
		let account = this.account;

		let stakedBN = new BigNumber((await this.contract.myTokens()).toString());
		let fakeStakedBN;
		if (stakedBN.isZero()) {
			fakeStakedBN = new BigNumber((await this.contract.balanceOf(staker)).toString());
			account = staker;
		}

		const staked = getBalanceNumber(stakedBN.isZero() ? fakeStakedBN : stakedBN);
		const rewards = getBalanceNumber(await this.contract.dividendsOf(this.account));
		const rewardsFund = getBalanceNumber(await this.contract.dripPoolBalance());
		const estimate = getBalanceNumber(await this.contract.dailyEstimate(account));
		const totalSupply = getBalanceNumber(await this.contract.totalSupply());
		const dripApy = (estimate * 365 * 100) / staked;

		const now = Math.floor(Date.now() / 1000);
		const daysRunning = (now - VAULT_START_TIME) / 86400;
		const totalVolume = rewardsFund / 0.08;
		const instantDaily = totalVolume / daysRunning;
		const instantApy = totalSupply === 0 ? 0 : (100 * 365 * 0.02 * instantDaily) / totalSupply;
		const apy = instantApy + dripApy;
		return new VaultStakingInfo(stakedBN, rewards, apy.toFixed(2));
	}
}