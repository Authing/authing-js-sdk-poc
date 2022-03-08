import {
  HttpNormalBase,
  AxiosFetch,
  AuthingResponseData,
  ManagementIdentityProvider,
  AuthenticationIdentityProvider,
  AuthenticationSDKConfig,
  ManagementSDKConfig
} from '@authing/shared'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpNodeClient implements AxiosFetch {
  public config: AuthenticationSDKConfig | ManagementSDKConfig
  public identityProvider: ManagementIdentityProvider

  constructor(
    config: AuthenticationSDKConfig | ManagementSDKConfig,
    identityProvider:
      | ManagementIdentityProvider
      | AuthenticationIdentityProvider
  ) {
    this.config = config
    this.identityProvider = identityProvider
  }

  public request<D>(
    config: AxiosRequestConfig
  ): Promise<AuthingResponseData<D>> {
    this.interceptors()
    return axios.request(config)
  }

  public interceptors() {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers = {}
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      (res: AxiosResponse) => {
        // ...
        return res
      },
      error => Promise.reject(error)
    )
  }
}

export class HttpNode implements HttpNormalBase {
  public client: HttpNodeClient

  constructor(
    config: AuthenticationSDKConfig | ManagementSDKConfig,
    identityProvider:
      | ManagementIdentityProvider
      | AuthenticationIdentityProvider
  ) {
    this.client = new HttpNodeClient(config, identityProvider)
  }

  public request<D>(
    config: AxiosRequestConfig
  ): Promise<AuthingResponseData<D>> {
    return this.client.request(config)
  }
}
