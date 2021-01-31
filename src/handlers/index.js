import {ALLOWED_PROXY_METHODS} from '../const'
import preFlight from './preFlight'
import proxy from './proxy'
import notAllowed from './notAllowed'

export default [
  {methods: ['OPTIONS'], handler: preFlight},
  {methods: ALLOWED_PROXY_METHODS, handler: proxy},
  {handler: notAllowed},
]
