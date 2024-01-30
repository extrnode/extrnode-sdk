import axios, { AxiosInstance, AxiosError } from 'axios'
import { GPAParameters, GPAResponse } from '../../../utils/types'

const solanaModule = (apiClient: AxiosInstance) => ({
  getProgramAccounts: async (
    initialProps: GPAParameters,
  ): Promise<{ response: GPAResponse; next: () => Promise<GPAResponse | null> }> => {
    let lastCursor: string | null = null
    let finished = false

    const fetchPage = async (after?: string): Promise<GPAResponse> => {
      if (finished) throw new Error('No more pages to fetch')

      const props = { ...initialProps }
      if (after) {
        props.config = props.config || {}
        props.config.after = after
      }

      const data = {
        jsonrpc: '2.0',
        id: 1,
        method: 'extr_getProgramAccounts',
        params: [props.pubkey, props.config],
      }

      try {
        const response = await apiClient.post('', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(`HTTP error: ${error.response?.status}`, error.message)
        } else {
          console.error('Error fetching program accounts:', error)
        }
        finished = true
        throw error
      }
    }

    const response = await fetchPage()
    lastCursor = response.result?.value[response.result.value.length - 1]?.pubkey || null

    return {
      response,
      next: async (): Promise<GPAResponse | null> => {
        if (finished) return null
        const result = await fetchPage(lastCursor)
        lastCursor = result.result?.value[result.result.value.length - 1]?.pubkey || null
        if (!lastCursor) {
          finished = true
        }
        return result
      },
    }
  },
})

export default solanaModule
