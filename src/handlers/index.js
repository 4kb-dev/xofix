import {
  canHandle as canHandleNotAllowed,
  handler as notAllowedHandler,
} from './notAllowed'
import {
  canHandle as canHandlePreFlight,
  handler as preFlightHandler,
} from './preFlight'
import {
  canHandle as canHandleWithQueryParams,
  handler as withQueryParamsHandler,
} from './withQueryParams'
import {
  canHandle as canHandleService,
  handler as serviceHandler,
} from './service'

export default [
  {canHandle: canHandlePreFlight, handler: preFlightHandler},
  {canHandle: canHandleService, handler: serviceHandler},
  {canHandle: canHandleWithQueryParams, handler: withQueryParamsHandler},
  {canHandle: canHandleNotAllowed, handler: notAllowedHandler},
]
