import {proxyRequest, badRequest} from 'utils/http.utils'

const RAW_BASE_URL = 'https://gitlab.com'
const ROOT_PATH = '/gitlab'

export default async function gitlab(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const gitlabPathname = pathname.replace(ROOT_PATH, '')

  if (gitlabPathname.split('/').length < 4) {
    return badRequest('Invalid `gitlab` url')
  }

  const urlToFetch = `${RAW_BASE_URL}${gitlabPathname}`

  return proxyRequest({request, urlToFetch, autoSetContentType: true})
}
