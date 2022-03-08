import {
  HttpMiniappBase,
  HttpMiniappConfig,
  MiniappFetch,
  AuthingResponseData,
  getMiniappContext
} from '@authing/shared'

export class HttpMiniappClient implements MiniappFetch {
  public context: WxMiniApp.Wx
  public config: HttpMiniappConfig

  constructor(config: HttpMiniappConfig) {
    this.context = getMiniappContext() as WxMiniApp.Wx
    this.config = config
  }

  public request<D>(
    config: WxMiniApp.WxRequestConfig
  ): Promise<AuthingResponseData<D>> {
    return new Promise((resolve, reject) => {
      this.context.request({
        ...config,
        data: {
          ...config.data,
          ...this.config
        },
        header: {
          ...this.config
        },
        success: res => {
          resolve(res.data as AuthingResponseData<D>)
        },
        fail: error => reject(error)
      })
    })
  }
}

export class HttpMiniapp implements HttpMiniappBase {
  public client: HttpMiniappClient

  constructor(config: HttpMiniappConfig) {
    this.client = new HttpMiniappClient(config)
  }

  public request<D>(
    config: WxMiniApp.WxRequestConfig
  ): Promise<AuthingResponseData<D>> {
    return this.client.request(config)
  }
}
