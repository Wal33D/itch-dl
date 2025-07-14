import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

export const ITCH_API = 'https://api.itch.io';

export class ItchApiClient {
  readonly baseUrl: string;
  readonly apiKey?: string;
  readonly client: AxiosInstance;

  constructor(apiKey?: string, userAgent?: string, baseUrl: string = ITCH_API) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = axios.create({
      headers: {
        'User-Agent': userAgent ?? 'itch-dl',
      },
    });

    axiosRetry(this.client, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        const status = error.response?.status;
        const retryStatuses = [429, 500, 502, 503, 504];
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (status !== undefined && retryStatuses.includes(status));
      },
    });
  }

  async get(
    endpoint: string,
    appendApiKey: boolean = true,
    _guessEncoding: boolean = false,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const url = endpoint.startsWith('http') ? endpoint : this.baseUrl + endpoint;
    if (appendApiKey && this.apiKey) {
      const params = { ...(config.params as Record<string, unknown> || {}) };
      if (!('api_key' in params)) {
        params['api_key'] = this.apiKey;
      }
      config.params = params;
    }
    return this.client.get(url, config);
  }
}

export default ItchApiClient;
