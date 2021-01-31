/**
 * Default handler for any unsupported method.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Response} The HTTP response object
 */
export default function notAllowed(request) {
  return new Response(null, {
    status: 405,
    statusText: 'Method Not Allowed',
  })
}
