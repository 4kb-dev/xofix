/**
 * Handler to proxy the provided url requests with the original
 * origin headers and return the response with CORS headers.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} Promise that resolves with the HTTP response object
 */
export default async function proxy(request) {
  const url = new URL(request.url)
  const urlToFetch = url.searchParams.get('url')

  // a valid `url` query param is needed
  if (!urlToFetch) {
    return new Response('Missing `url` parameter!', {
      status: 400,
      statusText: 'Bad Request',
    })
  }
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

  return proxyResponse
}
