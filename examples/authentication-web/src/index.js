import { initAuthenticationSDK, checkPasswordStrength } from '../../../packages/authentication-web-js-sdk/dist/authentication-web-js-sdk.esm-bundler'


const sdk1 = initAuthenticationSDK({
  appId: 'appId1'
})

checkPasswordStrength('123', sdk1)
  .catch(error => {
    console.log('error: ', error)
  })
  .then(res => {
    console.log('sdk1 res: ', res)
  })




const sdk2 = initAuthenticationSDK({
  appId: 'appId2'
})

checkPasswordStrength('', sdk2)
  .catch(error => {
    console.log('error: ', error)
  })
  .then(res => {
    console.log('sdk2 res: ', res)
  })