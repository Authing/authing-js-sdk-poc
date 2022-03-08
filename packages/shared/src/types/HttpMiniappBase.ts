import { AuthingResponseData } from './Response'

export interface HttpMiniappConfig {
  appId: string
  // ... more
}

export interface MiniappFetch {
  context: WxMiniApp.Wx
  config: HttpMiniappConfig
  request<D>(config: WxMiniApp.WxRequestConfig): Promise<AuthingResponseData<D>>
}

export interface HttpMiniappBase {
  client: MiniappFetch

  request<D>(config: WxMiniApp.WxRequestConfig): Promise<AuthingResponseData<D>>
}
