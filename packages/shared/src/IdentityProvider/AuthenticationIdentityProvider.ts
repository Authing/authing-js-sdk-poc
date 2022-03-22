import { User, AuthenticationSDKConfig } from '../types'
import { getStorageSync, setStorageSync, removeStorageSync } from '../utils'

const tokenKey = '_authing_token'
const userKey = '_authing_user'

function initUser(): User {
  return {
    id: '',
    arn: '',
    userPoolId: ''
  }
}

export interface AuthenticationIdentityProvider {
  config: AuthenticationSDKConfig
  token: string
  user: User
  setToken: (token: string) => void
  getToken: () => string
  getUser: () => User
  setUser: (user: User) => void
  clearUser: () => void
}

export function createAuthenticationIdentityProvider(config: AuthenticationSDKConfig): AuthenticationIdentityProvider {
  return {
    config,
    token: '',
    user: initUser(),
    setToken(token: string) {
      setStorageSync && setStorageSync(tokenKey, token) || (this.token = token)
    },
    getToken(): string {
      return getStorageSync && getStorageSync(tokenKey) || this.token
    },
    getUser(): User {
      try {
        const userValue = getStorageSync && getStorageSync(userKey) || ''
        return JSON.parse(userValue)
      } catch (e) {
        console.error(`getUser error: `, e)
      }
      return this.user
    },
    setUser(user: User) {
      const token = user.token || ''
      if (setStorageSync) {
        setStorageSync(userKey, JSON.stringify(user))
        setStorageSync(tokenKey, token)
      } else {
        this.user = user
        this.token = token
      }
    },
    clearUser() {
      if (removeStorageSync) {
        removeStorageSync(userKey)
        removeStorageSync(tokenKey)
      } else {
        this.user = initUser()
        this.token = ''
      }
    }
  }
}
