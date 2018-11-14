export default function({ store, app: { $axios, $cookies } }) {
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('appid', process.env.appId)
  $axios.setHeader('api-key', process.env.apiKey)
  $axios.setHeader(
    'Authorization',
    `${$cookies.get('tokenType')} ${$cookies.get('accessToken')}`
  )
}
