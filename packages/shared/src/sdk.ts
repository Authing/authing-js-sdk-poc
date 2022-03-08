import {
  SDK,
  BaseSDK,
  AuthenticationSDKConfig,
  ManagementSDKConfig,
  HttpNormalBase,
  HttpMiniappBase
} from './types'
import { encrypt } from './encrypt'

// Here, Array is more suitable than Map
const cachedSDK: SDK[] = []

export function pushSDK(sdk: SDK): void {
  cachedSDK.push(sdk)
}

export function findSDK(sdk?: SDK): SDK {
  return cachedSDK.find(item => item === sdk) || cachedSDK[0]
}

function createSDK<C, H>(config: C, http: H): BaseSDK<C, H> {
  const sdk: BaseSDK<C, H> = {
    config,
    http
  }

  return sdk
}

export function createSDKRunInWeb(
  config: AuthenticationSDKConfig,
  http: HttpNormalBase
) {
  return createSDK(config, http)
}

export function createSDKRunInNode(
  config: AuthenticationSDKConfig | ManagementSDKConfig,
  http: HttpNormalBase
) {
  return createSDK(config, http)
}

export function createSDKRunInMiniapp(
  config: AuthenticationSDKConfig,
  http: HttpMiniappBase
) {
  return createSDK(config, http)
}

export const DEFAULT_AUTHENTICATION_CONFIG: AuthenticationSDKConfig = {
  appId: '',
  protocol: 'oidc',
  tokenEndPointAuthMethod: 'client_secret_post',
  introspectionEndPointAuthMethod: 'client_secret_post',
  revocationEndPointAuthMethod: 'client_secret_post',
  timeout: 10000,
  onError: (code: number, message: string, data: unknown) => {
    throw { code, message, data }
  },
  requestFrom: 'sdk',
  encryptFunction: encrypt,
  host: 'https://core.authing.cn',
  headers: {
    'userpool-id': 'x-authing-userpool-id',
    'app-id': 'x-authing-app-id',
    'request-from': 'x-authing-request-from',
    'sdk-version': 'x-authing-sdk-version',
    'tenant-id': 'x-authing-app-tenant-id',
    lang: 'x-authing-lang'
  },
  lang: 'zh-CN'
}

export const DEFAULT_MANAGEMENT_CONFIG: ManagementSDKConfig = {
  timeout: 10000,
  onError: (code: number, message: string) => {
    throw { code, message }
  },
  host: 'https://core.authing.cn',
  requestFrom: 'sdk',
  encryptFunction: encrypt,
  headers: {
    'userpool-id': 'x-authing-userpool-id',
    'app-id': 'x-authing-app-id',
    'tenant-id': 'x-authing-app-tenant-id',
    'request-from': 'x-authing-request-from',
    'sdk-version': 'x-authing-sdk-version',
    lang: 'x-authing-lang'
  },
  lang: 'zh-CN'
}
