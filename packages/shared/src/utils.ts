export function getMiniappContext(): WxMiniApp.Wx | undefined {
  if (window) {
    return
  }

  if (wx?.canIUse) {
    return wx
  }
  // ... expand another Miniapps
}

const miniappContext = getMiniappContext()

interface GetStorageSync {
  (key: string): string | null
}

interface SetStorageSync {
  (key: string, value: string): void
}

interface RemoveStorageSync {
  (key: string): void
}

export let getStorageSync: GetStorageSync | undefined
export let setStorageSync: SetStorageSync | undefined
export let removeStorageSync: RemoveStorageSync | undefined

if (typeof localStorage !== 'undefined') {
  getStorageSync = (key: string): string | null => localStorage.getItem(key)
  setStorageSync = (key: string, value: string) =>
    localStorage.setItem(key, value)
  removeStorageSync = (key: string) => localStorage.removeItem(key)
} else if (miniappContext) {
  getStorageSync = (key: string): string => miniappContext.getStorageSync(key)
  setStorageSync = (key: string, value: string) =>
    miniappContext.setStorageSync(key, value)
  removeStorageSync = (key: string) => miniappContext.removeStorageSync(key)
}
