import { Lang, EncryptFunction } from './Common'

export interface PrivateKey {
  pkcs8Key: string
  alg: 'RSA-OAEP' | 'ECDH-ES'
  kid?: string
}

export interface AuthenticationSDKConfig {
  /** 应用 ID */
  appId: string
  /** 租户 ID */
  tenantId?: string
  /** 应用完整域名，如 https://sample-app.authing.cn，不带最后的斜线 '/'。 */
  appHost?: string
  /** 应用密钥 */
  secret?: string
  /** 应用身份协议 */
  protocol?: 'oauth' | 'oidc' | 'saml' | 'cas'
  /** 获取 token 端点认证方式 */
  tokenEndPointAuthMethod?:
  | 'client_secret_post'
  | 'client_secret_basic'
  | 'none'
  /** 检查 token 端点认证方式 */
  introspectionEndPointAuthMethod?:
  | 'client_secret_post'
  | 'client_secret_basic'
  | 'none'
  /** 撤回 token 端点认证方式 */
  revocationEndPointAuthMethod?:
  | 'client_secret_post'
  | 'client_secret_basic'
  | 'none'
  /** 应用回调地址 */
  redirectUri?: string
  /** 请求超时时间 **/
  timeout?: number
  /** 错误回调函数, 默认为 (err: Error) => { throw err } 直接抛出报错 **/
  onError?: (code: number, message: string, data?: unknown) => void
  /** Websocket 服务器域名 */
  websocketHost?: string
  /** 请求来源 */
  requestFrom?: string
  /** token */
  token?: string
  /** 加密函数 */
  encryptFunction?: EncryptFunction
  /** 密码传输加密公钥 */
  publicKey?: string
  /** 用于解密 Token 的私钥 */
  privateKeys?: PrivateKey[]
  /**
   * 语言
   */
  lang?: Lang

  /**
   * @deprecated 该参数已经废弃，请使用 appHost
   */
  host?: string
  /**
   * @deprecated 该参数已经废弃，请使用 appHost
   */
  domain?: string

  /**
   * 请求头 key，适用于去 Authing 品牌化场景
   */
  headers?: {
    'userpool-id': string
    'app-id': string
    'tenant-id'?: string
    'sdk-version': string
    'request-from': string
    lang: string
  }
  encryption?: EncryptFunction
  sdkVersion?: string
}
