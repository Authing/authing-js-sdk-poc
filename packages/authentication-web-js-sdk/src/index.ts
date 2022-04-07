import {
  AuthenticationSDKConfig,
  createSDKRunInWeb,
  WebSDK,
  DEFAULT_AUTHENTICATION_CONFIG,
  createAuthenticationIdentityProvider
} from '@authing/shared'

import { HttpWeb } from '@authing/http-web'

import { pushSDK } from '@authing/authentication-common-js-sdk'
export * from '@authing/authentication-common-js-sdk'

export function initAuthenticationSDK(config: AuthenticationSDKConfig): WebSDK {
  const _config = Object.assign({}, DEFAULT_AUTHENTICATION_CONFIG, config)
  const identityProvider = createAuthenticationIdentityProvider(_config)
  const http = new HttpWeb(_config, identityProvider)
  const sdk = createSDKRunInWeb(_config, http)

  pushSDK(sdk)

  return sdk
}
