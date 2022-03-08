import { JSEncrypt } from '../npm'

export interface Encryption {
  type: string
  publicKey: string
}

export async function encrypt(
  plainText: string,
  publicKey: string,
  encryption?: Encryption
): Promise<string | boolean> {
  return new Promise<string | boolean>((resolve, reject) => {
    // 国密支持，动态引入
    // 目前 sm2 只有一个客户在后端用到，这部分代码需要分平台拆开，web 端无需打包
    // 另外需要看下小程序端是否有用到
    if (encryption?.type === 'sm2') {
      if (!encryption.publicKey) {
        throw new Error('未配置: encryption.publicKey')
      }
      const { sm2 } = require('sm-crypto')
      const encrypted = sm2.doEncrypt(plainText, encryption.publicKey)
      resolve(`sm2:${encrypted}`)
    } else {
      const jsencrypt = new JSEncrypt({})
      jsencrypt.setPublicKey(publicKey)

      const encrypted = jsencrypt.encrypt(plainText)
      ;(encrypted && resolve(encrypted)) || reject(encrypted)
    }
  })
}
