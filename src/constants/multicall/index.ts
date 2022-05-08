import { ChainId } from '../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  // [ChainId.BSC]: '0x2555e2f6C1da67857B32Ebf85409D1A11C99d864',
  [ChainId.CRONOS]: '0xcc1D78C004C4826C06dbC04b147F54583Ea62c27',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
