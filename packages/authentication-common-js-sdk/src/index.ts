import { SDK, AuthingResponseData } from '@authing/shared'
import { findSDK } from './sdk-pool'

export * from './sdk-pool'

interface CheckPasswordStrengthResult {
  valid: boolean
  message: string
}

/**
 * 检查密码强度
 */
export function checkPasswordStrength(
  password: string,
  sdk?: SDK
): Promise<AuthingResponseData<CheckPasswordStrengthResult>> {
  const { http } = findSDK(sdk)
  return http.request<CheckPasswordStrengthResult>({
    url: '/api/v2/password/check',
    method: 'POST',
    data: {
      password
    }
  })
}
