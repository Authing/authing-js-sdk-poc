import {
  AuthenticationSDKConfig,
  createSDKRunInMiniapp,
  DEFAULT_AUTHENTICATION_CONFIG,
  MiniappSDK
} from '@authing/shared'

import { HttpMiniapp } from '@authing/http-miniapp'

import { pushSDK } from '@authing/authentication-common-js-sdk'
export * from '@authing/authentication-common-js-sdk'

export function initAuthenticationSDK(
  config: AuthenticationSDKConfig
): MiniappSDK {
  const _config = Object.assign({}, DEFAULT_AUTHENTICATION_CONFIG, config)
  const http = new HttpMiniapp(_config)
  const sdk = createSDKRunInMiniapp(_config, http)

  pushSDK(sdk)

  return sdk
}
