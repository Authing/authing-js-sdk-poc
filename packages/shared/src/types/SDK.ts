import { AuthenticationSDKConfig } from './AuthenticationSDKConfig'
import { ManagementSDKConfig } from './ManagementSDKConfig'

import { HttpMiniappBase } from './HttpMiniappBase'
import { HttpNormalBase } from './HttpNormalBase'

export interface BaseSDK<C, H> {
  config: C
  http: H
}

export interface WebSDK
  extends BaseSDK<AuthenticationSDKConfig, HttpNormalBase> {}

export interface NodeSDK extends BaseSDK<ManagementSDKConfig, HttpNormalBase> {}

export interface MiniappSDK
  extends BaseSDK<AuthenticationSDKConfig, HttpMiniappBase> {}

export type SDK = WebSDK | NodeSDK | MiniappSDK
