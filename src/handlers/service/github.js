import {proxyRequest} from 'utils/http.utils'
import badRequest from 'utils/http.utils/badRequest'

const RAW_BASE_URL = 'https://raw.githubusercontent.com'
const ROOT_PATH = '/github'

export default async function github(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const githubPathname = pathname.replace(ROOT_PATH, '')

  if (githubPathname.split('/').length < 4) {
    return badRequest('Invalid `github` url')
  }

  const urlToFetch = `${RAW_BASE_URL}${githubPathname}`

  return proxyRequest({request, urlToFetch, autoSetContentType: true})
}
