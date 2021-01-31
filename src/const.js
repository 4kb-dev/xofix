export const ALLOWED_PROXY_METHODS = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
]

export const ALL_METHODS = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH',
]

export const ALL_METHODS_STR = ALL_METHODS.join(',')

export const PRE_FLIGHT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': ALL_METHODS_STR,
  'Access-Control-Max-Age': '86400',
}
