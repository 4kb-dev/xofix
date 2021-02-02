import badRequest from 'utils/http.utils/badRequest'
import github from './github'
import gitlab from './gitlab'

const SERVICES = {
  github,
  gitlab,
}

/**
 * Forwards the request to one of the service handlers.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Promise<Response>} Promise that resolves with the response object
 */
export async function handler(request) {
  const serviceHandler = getServiceHandler(request)
  if (!serviceHandler) {
    return badRequest('Invalid `service` name!')
  }
  return serviceHandler(request)
}

/**
 * Returns a boolean flag indicating whether the current
 * request can be handled by any of the services.
 *
 * @param {Request} request The incoming HTTP request
 * @returns {Boolean} Whether any of the service can handle the request
 */
export function canHandle(request) {
  const requestMethod = request.method
  return requestMethod === 'GET' && !!getServiceHandler(request)
}

function getServiceHandler(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const serviceName = pathname.split('/')[1]
  return SERVICES[serviceName]
}
