import handlers from './handlers'

/**
 * Checks the given request and executes the appropriate
 * handler based on the request's http method.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Response | Promise<Response>} The HTTP response object
 */
export default function handleRequest(request) {
  const requestMethod = request.method
  const toExecute = handlers.find(
    ({methods}) => !methods || methods.includes(requestMethod)
  )
  return toExecute.handler(request)
}
