interface GPAParameters {
  pubkey: string
  config?: {
    after?: string
    limit?: number
    filters?: Array<Record<string, unknown>>
    dataSlice?: { offset?: number; length?: number }
    encoding?: 'base58' | 'base64' | 'base64+zstd' | 'jsonParsed'
  }
}

interface GPAResponse {
  jsonrpc: string
  id: number
  result: {
    context: {
      slot: number
    }
    value: Array<{
      account: {
        data: Array<string> | string
        executable: boolean
        lamports: number
        owner: string
      }
      pubkey: string
    }>
  }
}
interface SolanaResult {
  cursor: string
  processed_accounts: number
  value: AccountValue[]
}

interface AccountValue {
  account: AccountDetails
  pubkey: string
}

interface AccountDetails {
  data: AccountData
  executable: boolean
  lamports: number
  owner: string
  rentEpoch: number
  space: number
}

interface AccountData {
  parsed: ParsedData
  program: string
  space: number
}

interface ParsedData {
  info: AccountInfo
  type: string
}

interface AccountInfo {
  closeAuthority: string
  isNative: boolean
  mint: string
  owner: string
  state: string
  tokenAmount: TokenAmount
}

interface TokenAmount {
  amount: string
  decimals: number
  uiAmount: number
  uiAmountString: string
}

export type { GPAParameters, GPAResponse }
