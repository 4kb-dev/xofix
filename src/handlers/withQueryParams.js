import proxyRequest from 'utils/http.utils/proxyRequest'

/**
 * Handler to proxy the provided url requests with the original
 * origin headers and return the response with CORS headers.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} Promise that resolves with the HTTP response object
 */
export default async function withQueryParams(request) {
  const url = new URL(request.url)
  const urlToFetch = url.searchParams.get('url')

  // `url` query param is needed
  if (!urlToFetch) {
    return new Response('Missing `url` parameter!', {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  const autoSetContentType = !!url.searchParams.get('set_content_type')

  return proxyRequest({request, urlToFetch, autoSetContentType})
}
