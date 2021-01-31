import {getContentTypeFromPath} from 'utils/path.utils'

/**
 * Sets the `content-type` header to the given response
 * based on the provided url path.
 *
 * Note: The methods returns the response as is when
 * the mime type cannot be determined from the url path
 *
 * @param {Response} response The HTTP response object
 * @param {String} path The url path string
 * @returns {Response} The HTTP response with content-type header
 */
export default function setContentType(response, path) {
  const contentType = getContentTypeFromPath(path)

  if (contentType) {
    response.headers.set('Content-Type', contentType)
  }

  return response
}
