import {ALLOWED_PROXY_METHODS} from '../const'
import preFlight from './preFlight'
import withQueryParams from './withQueryParams'
import notAllowed from './notAllowed'

export default [
  {methods: ['OPTIONS'], handler: preFlight},
  {methods: ALLOWED_PROXY_METHODS, handler: withQueryParams},
  {handler: notAllowed},
]
