import axios, { AxiosInstance } from 'axios'
import {
  BASE_API_URL,
  BASE_API_TIMEOUT,
} from '../utils'
import solanaModule from './modules/solana'

interface ExtrnodeAPIParams {
  url: string
  timeout?: number
}

export class ExtrnodeApi {
  readonly apiInstance: AxiosInstance
  solana: ReturnType<typeof solanaModule>

  /**
   * Constructor of the ExtrnodeApi class
   *
   *
   * @returns the class instance with methods for api requests.
   * @param props
   */
  constructor(props?: ExtrnodeAPIParams) {
    this.apiInstance = axios.create({
      baseURL: props.url || BASE_API_URL,
      timeout: props?.timeout || BASE_API_TIMEOUT,
    })
    this.solana = solanaModule(this.apiInstance)
  }
}

export default ExtrnodeApi