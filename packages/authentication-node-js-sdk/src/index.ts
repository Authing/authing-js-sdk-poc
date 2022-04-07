import {
  AuthenticationSDKConfig,
  createSDKRunInNode,
  NodeSDK,
  DEFAULT_AUTHENTICATION_CONFIG,
  createAuthenticationIdentityProvider
} from '@authing/shared'

import { HttpNode } from '@authing/http-node'

import { pushSDK } from '@authing/authentication-common-js-sdk'
export * from '@authing/authentication-common-js-sdk'

export function initAuthenticationSDK(
  config: AuthenticationSDKConfig
): NodeSDK {
  const _config = Object.assign({}, DEFAULT_AUTHENTICATION_CONFIG, config)
  const identityProvider = createAuthenticationIdentityProvider(_config)
  const http = new HttpNode(_config, identityProvider)
  const sdk = createSDKRunInNode(_config, http)

  pushSDK(sdk)

  return sdk
}
