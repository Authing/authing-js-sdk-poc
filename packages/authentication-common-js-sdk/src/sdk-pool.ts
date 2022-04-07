import { SDK } from '@authing/shared'

// Here, Array is more suitable than Map
const cachedSDK: SDK[] = []

export function pushSDK(sdk: SDK): void {
  cachedSDK.push(sdk)
}

export function findSDK(sdk?: SDK): SDK {
  return cachedSDK.find(item => item === sdk) || cachedSDK[0]
}
