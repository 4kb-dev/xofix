import mime from 'mime-types'

/**
 * For a given url path, it returns the file extension.
 *
 * @param {String} path The url path string
 * @returns {String} The file extension
 */
export function getExtensionFromPath(path) {
  const basename = path.split(/[\\/]/).pop()
  const pos = basename.lastIndexOf('.')

  if (basename === '' || pos < 1) {
    return ''
  }

  return basename.slice(pos + 1)
}

/**
 * For a given url path, it returns the full content-type
 * header information associated with the file.
 *
 * @param {String} path The url path string
 * @returns {String | false} The content from the url path
 */
export function getContentTypeFromPath(path) {
  const type = mime.lookup(path)
  if (!type) return false

  return mime.contentType(type)
}

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
export function setContentType(response, path) {
  const contentType = getContentTypeFromPath(path)

  if (contentType) {
    response.headers.set('Content-Type', contentType)
  }

  return response
}
