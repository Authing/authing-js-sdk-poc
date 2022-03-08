import { AxiosRequestConfig, AxiosInstance } from 'axios'
import { AuthingResponseData } from './Response'
import { AuthenticationIdentityProvider, ManagementIdentityProvider } from '../TokenProvider'
import { AuthenticationSDKConfig, ManagementSDKConfig } from '.'
export interface AxiosFetch {
  config: AuthenticationSDKConfig | ManagementSDKConfig
  identityProvider: AuthenticationIdentityProvider | ManagementIdentityProvider
  request<D>(config: AxiosRequestConfig): Promise<AuthingResponseData<D>>
  interceptors(instance: AxiosInstance): void
}

export interface HttpNormalBase {
  client: AxiosFetch

  request<D>(config: AxiosRequestConfig): Promise<AuthingResponseData<D>>
}
