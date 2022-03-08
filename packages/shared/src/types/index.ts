import { AuthenticationSDKConfig } from './AuthenticationSDKConfig'
import { HttpMiniappConfig } from './HttpMiniappBase'
import { ManagementSDKConfig } from './ManagementSDKConfig'

export * from './HttpMiniappBase'
export * from './HttpNormalBase'
export * from './Response'
export * from './AuthenticationSDKConfig'
export * from './ManagementSDKConfig'
export * from './SDK'
export * from './Common'

export type HttpConfig = HttpMiniappConfig | AuthenticationSDKConfig | ManagementSDKConfig
