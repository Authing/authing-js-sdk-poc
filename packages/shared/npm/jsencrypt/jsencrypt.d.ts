export declare class JSEncrypt {
  constructor(options: Record<string, unknown>)
  setPublicKey(publicKey: string): void
  encrypt(str: string): string | boolean
}
