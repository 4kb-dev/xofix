import {PRE_FLIGHT_HEADERS, ALL_METHODS_STR} from '../const'

/**
 * Handler for responding to the pre-flight check requests.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Response} The HTTP response object
 */
export default function preFlight(request) {
  const headers = request.headers

  // make sure the necessary headers are present
  // for this to be a valid pre-flight request
  if (isPreFlight(headers)) {
    // handle CORS pre-flight request
    const responseHeaders = {
      ...PRE_FLIGHT_HEADERS,
      // allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': headers.get(
        'Access-Control-Request-Headers'
      ),
    }
    return new Response(null, {headers: responseHeaders})
  }

  // handle standard OPTIONS request
  return new Response(null, {headers: {Allow: ALL_METHODS_STR}})
}

/**
 * Check if the given headers qualify for beings a pre-flight request.
 *
 * @param {Headers} headers
 * @returns {Boolean} Whether the headers are for pre-flight check.
 */
function isPreFlight(headers) {
  return (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  )
}
