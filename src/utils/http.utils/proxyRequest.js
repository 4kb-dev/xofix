import setContentType from './setContentType'

/**
 * Proxies and fetches the given url and returns a response with CORS header.
 *
 * @param {ProxyRequestOptions} options The options to proxy the request
 * @returns {Promise<Response>} Promise that resolves with the proxy response
 */
export default async function proxyRequest({
  request,
  urlToFetch,
  autoSetContentType = true,
}) {
  // `urlToFetch` needs to be a valid URL
  let urlObjectForUrlToFetch = null
  try {
    urlObjectForUrlToFetch = new URL(urlToFetch)
  } catch (err) {
    return new Response('Invalid `url` parameter!', {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  // rewrite request to point to provided `url`.
  // this also makes the request mutable so we can
  // add the correct `Origin` header to make the server think
  // that this request isn't cross-site.
  const proxyRequest = new Request(urlToFetch, request)
  proxyRequest.headers.set('Origin', urlObjectForUrlToFetch.origin)
  const response = await fetch(proxyRequest)

  // recreate the response so we can modify the headers
  const proxyResponse = new Response(response.body, response)
  // set CORS headers
  proxyResponse.headers.set('Access-Control-Allow-Origin', '*')
  // append to/Add Vary header so browser will cache response correctly
  proxyResponse.headers.append('Vary', 'Origin')

  // force set content type header based on the file extension
  if (autoSetContentType) {
    setContentType(proxyResponse, urlObjectForUrlToFetch.pathname)
  }

  return proxyResponse
}

/**
 * @typedef {Object} ProxyRequestOptions The options for proxy request
 * @property {Request} request The original HTTP request object
 * @property {String} urlToFetch The url to proxy the request
 * @property {Boolean} [autoSetContentType=true] Whether to auto set the content-type header on the response
 */
