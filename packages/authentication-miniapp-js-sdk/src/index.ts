import {
  AuthenticationSDKConfig,
  createSDKRunInMiniapp,
  MiniappSDK,
  pushSDK
} from '@authing/shared'

import { HttpMiniapp } from '@authing/http-miniapp'

export * from '@authing/authentication-common-js-sdk'

export function initAuthenticationSDK(
  config: AuthenticationSDKConfig
): MiniappSDK {
  const http = new HttpMiniapp({
    appId: ''
  })
  const sdk = createSDKRunInMiniapp(config, http)

  pushSDK(sdk)

  return sdk
}
