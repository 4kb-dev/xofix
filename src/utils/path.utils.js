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
