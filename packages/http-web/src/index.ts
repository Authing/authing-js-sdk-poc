import {
  HttpNormalBase,
  AxiosFetch,
  AuthingResponseData,
  AuthenticationIdentityProvider,
  AuthenticationSDKConfig,
  ManagementSDKConfig
  // DEFAULT_AUTHENTICATION_CONFIG
} from '@authing/shared'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class HttpWebClient implements AxiosFetch {
  public config: AuthenticationSDKConfig | ManagementSDKConfig
  public identityProvider: AuthenticationIdentityProvider

  constructor(
    config: AuthenticationSDKConfig | ManagementSDKConfig,
    identityProvider: AuthenticationIdentityProvider
  ) {
    this.config = config
    this.identityProvider = identityProvider
  }

  public request<D>(
    config: AxiosRequestConfig
  ): Promise<AuthingResponseData<D>> {
    const instance: AxiosInstance = axios.create({
      withCredentials: true
    })
    this.interceptors<D>(instance)
    return instance.request<D, AuthingResponseData<D>>(config)
  }

  public interceptors<D>(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // const appId =
        //   this.config?.headers?.['app-id'] ||
        //   DEFAULT_AUTHENTICATION_CONFIG.headers
        config.baseURL = 'http://console.authing.localhost:3000'
        config.headers = {
          // 'x-authing-userpool-id': '61b95d6c96d42670da568408',
          // Authorization:
          //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMi0wMi0xNVQwNjoyNDoxMy4xMjFaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IjEzMTI2OTE5MjUxIiwibG9jYWxlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwiYmlydGhkYXRlIjpudWxsLCJnZW5kZXIiOiJNIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsIjoiMTA0NzgzMjQ3NUBxcS5jb20iLCJ3ZWJzaXRlIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9maWxlcy5hdXRoaW5nLmNvL2F1dGhpbmctY29uc29sZS9kZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByb2ZpbGUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjFiOTVkNWVhMTRiNWM4YjZhN2I3NmUzIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOm51bGwsInVzZXJuYW1lIjoiMTIxMjEyMSIsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNTlmODZiNDgzMmViMjgwNzFiZGQ5MjE0IiwiYXBwSWQiOiI2MWI5NWQzNTk4ZDk0ODg1OTA1ZjhlNjMiLCJpZCI6IjYxYjk1ZDVlYTE0YjVjOGI2YTdiNzZlMyIsInVzZXJJZCI6IjYxYjk1ZDVlYTE0YjVjOGI2YTdiNzZlMyIsIl9pZCI6IjYxYjk1ZDVlYTE0YjVjOGI2YTdiNzZlMyIsInBob25lIjoiMTMxMjY5MTkyNTEiLCJlbWFpbCI6IjEwNDc4MzI0NzVAcXEuY29tIiwidXNlcm5hbWUiOiIxMjEyMTIxIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCJ9LCJ1c2VycG9vbF9pZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCIsImF1ZCI6IjYxYjk1ZDM1OThkOTQ4ODU5MDVmOGU2MyIsImV4cCI6MTY0NzY3ODEzNSwiaWF0IjoxNjQ2NDY4NTM1LCJpc3MiOiJodHRwOi8vY29uc29sZS5hdXRoaW5nLmxvY2FsaG9zdDozMDAwL29pZGMifQ.2-MZfdKftXXHc7mLnMCoWE_OBYBiyXQosWLXAj-hKek'
          [this.config?.headers?.['app-id'] as string]: this.config.appId || '',
          [this.config?.headers?.['tenant-id'] as string]:
            this.config.tenantId || ''
        }
        return config
      },
      error => Promise.reject(error)
    )

    instance.interceptors.response.use(
      (res: AxiosResponse<AuthingResponseData<D>>) => {
        // ... expand res
        return res.data
      },
      error => Promise.reject(error)
    )
  }
}

export class HttpWeb implements HttpNormalBase {
  public client: HttpWebClient

  constructor(
    config: AuthenticationSDKConfig | ManagementSDKConfig,
    identityProvider: AuthenticationIdentityProvider
  ) {
    this.client = new HttpWebClient(config, identityProvider)
  }

  public request<D>(
    config: AxiosRequestConfig
  ): Promise<AuthingResponseData<D>> {
    return this.client.request(config)
  }
}
