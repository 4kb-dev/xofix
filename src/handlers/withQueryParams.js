import {ALLOWED_PROXY_METHODS} from 'const'
import {proxyRequest, badRequest} from 'utils/http.utils'

/**
 * Handler to proxy the provided url requests with the original
 * origin headers and return the response with CORS headers.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} Promise that resolves with the HTTP response object
 */
export async function handler(request) {
  const url = new URL(request.url)
  const urlToFetch = url.searchParams.get('url')

  // `url` query param is needed
  if (!urlToFetch) {
    badRequest('Missing `url` parameter!')
  }

  const autoSetContentType = !!url.searchParams.get('set_content_type')

  return proxyRequest({request, urlToFetch, autoSetContentType})
}

/**
 * Returns a boolean flag indicating whether the current
 * request can be handled by this handler.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Boolean} Whether this handler can handle the request
 */
export function canHandle(request) {
  const requestMethod = request.method
  const url = new URL(request.url)
  const pathname = url.pathname
  return (
    ALLOWED_PROXY_METHODS.includes(requestMethod) &&
    (pathname === '/' || pathname === '')
  )
}
