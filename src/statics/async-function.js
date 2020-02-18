import 'core-js/modules/es6.object.define-properties'
import 'core-js/modules/es7.object.get-own-property-descriptors'
import 'core-js/modules/es6.array.for-each'
import 'core-js/modules/es6.array.filter'
import 'core-js/modules/es6.array.iterator'
import 'core-js/modules/es6.object.keys'
import 'core-js/modules/es6.object.define-property'
import 'core-js/modules/es6.regexp.to-string'
import 'core-js/modules/es6.date.to-string'
import 'core-js/modules/es7.symbol.async-iterator'
import 'core-js/modules/es6.symbol'
import 'core-js/modules/web.dom.iterable'
import 'core-js/modules/es6.array.is-array'
import 'core-js/modules/es6.promise'
import 'core-js/modules/es6.object.to-string'
import 'regenerator-runtime/runtime'

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
      })
    }
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
  } else {
    obj[key] = value
  }
  return obj
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance')
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === '[object Arguments]')) {
    return
  }
  var _arr = []
  var _n = true
  var _d = false
  var _e = undefined
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)
      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }
  return _arr
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}

import { ref, Ref, isRef, watch } from '@vue/composition-api'
/**
 * Async helper function that returns three reactive values:
 * * `isLoading`, a boolean that is true during pending state;
 * * `data`, contains the resolved value in the fulfilled state; and
 * * `error`, contains the exception in the rejected state.
 *
 * It returns the following functions as well:
 * * `abort`, that aborts the current promise
 * * `retry`, that retries the original promise
 *
 * @param {function|Ref} promiseFn (optionally ref to) function that returns a Promise.
 * @param {object|Ref} params (optionally ref to) parameters passed as first argument to the promise function.
 * @returns {object} Object literal containing `isLoading`, `error` and `data` value wrappers and `abort` and `retry`
 * functions.
 */

export function useAsync(promiseFn) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined
  // always wrap arguments
  var wrapPromiseFn = isRef(promiseFn) ? promiseFn : ref(promiseFn)
  var wrapParams = isRef(params) ? params : ref(params) // create empty return values

  var isLoading = ref()
  var error = ref()
  var data = ref() // abort controller

  var controller = null

  function abort() {
    isLoading.value = false

    if (controller !== null) {
      controller.abort()
    }
  }

  function retry() {
    // unwrap the original promise as it is optionally wrapped
    var origPromiseFn = wrapPromiseFn.value // create a new promise and trigger watch

    wrapPromiseFn.value =
      /*#__PURE__*/
      (function() {
        var _ref = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params, signal) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    return _context.abrupt('return', origPromiseFn(params, signal))

                  case 1:
                  case 'end':
                    return _context.stop()
                }
              }
            }, _callee)
          })
        )

        return function(_x, _x2) {
          return _ref.apply(this, arguments)
        }
      })()
  } // watch for change in arguments, which triggers immediately initially

  watch(
    [wrapPromiseFn, wrapParams],
    /*#__PURE__*/
    (function() {
      var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(_ref2) {
          var _ref4, newPromiseFn, newParams, result

          return regeneratorRuntime.wrap(
            function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    ;(_ref4 = _slicedToArray(_ref2, 2)), (newPromiseFn = _ref4[0]), (newParams = _ref4[1])
                    _context2.prev = 1
                    abort()
                    isLoading.value = true
                    controller = new AbortController()
                    _context2.next = 7
                    return newPromiseFn(newParams, controller.signal)

                  case 7:
                    result = _context2.sent
                    error.value = undefined
                    data.value = result
                    _context2.next = 16
                    break

                  case 12:
                    _context2.prev = 12
                    _context2.t0 = _context2['catch'](1)
                    error.value = _context2.t0
                    data.value = undefined

                  case 16:
                    _context2.prev = 16
                    isLoading.value = false
                    return _context2.finish(16)

                  case 19:
                  case 'end':
                    return _context2.stop()
                }
              }
            },
            _callee2,
            null,
            [[1, 12, 16, 19]]
          )
        })
      )

      return function(_x3) {
        return _ref3.apply(this, arguments)
      }
    })()
  )
  return {
    isLoading: isLoading,
    error: error,
    data: data,
    abort: abort,
    retry: retry
  }
}
/**
 * Fetch helper function that accepts the same arguments as `fetch` and returns the same values as `useAsync`.
 * If the `Accept` header is set to `application/json` in the `requestInit` object, the response will be parsed as JSON,
 * else text.
 *
 * @param {string|object|Ref} requestInfo (optionally ref to) URL or request object.
 * @param {object|Ref} requestInit (optionally ref to) init parameters for the request.
 * @returns {object} Object literal containing same return values as `useAsync`.
 */

export function useFetch(requestInfo) {
  var requestInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  // always wrap arguments
  var wrapReqInfo = isRef(requestInfo) ? requestInfo : ref(requestInfo)
  var wrapReqInit = isRef(requestInit) ? requestInit : ref(requestInit)

  function doFetch(_x4, _x5) {
    return _doFetch.apply(this, arguments)
  } // wrap original fetch function in value

  function _doFetch() {
    _doFetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(params, signal) {
        var requestInit, res
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                requestInit = wrapReqInit.value
                _context5.next = 3
                return fetch(
                  wrapReqInfo.value,
                  _objectSpread({}, requestInit, {
                    signal: signal
                  })
                )

              case 3:
                res = _context5.sent

                if (res.ok) {
                  _context5.next = 6
                  break
                }

                throw res

              case 6:
                return _context5.abrupt('return', res.json())

              case 9:
              case 'end':
                return _context5.stop()
            }
          }
        }, _callee5)
      })
    )
    return _doFetch.apply(this, arguments)
  }

  var wrapPromiseFn = ref(doFetch) // watch for change in arguments, which triggers immediately initially

  watch(
    [wrapReqInfo, wrapReqInit],
    /*#__PURE__*/
    _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                // create a new promise and trigger watch
                wrapPromiseFn.value =
                  /*#__PURE__*/
                  (function() {
                    var _ref6 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee3(params, signal) {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch ((_context3.prev = _context3.next)) {
                              case 0:
                                return _context3.abrupt('return', doFetch(params, signal))

                              case 1:
                              case 'end':
                                return _context3.stop()
                            }
                          }
                        }, _callee3)
                      })
                    )

                    return function(_x6, _x7) {
                      return _ref6.apply(this, arguments)
                    }
                  })()

              case 1:
              case 'end':
                return _context4.stop()
            }
          }
        }, _callee4)
      })
    )
  )
  return useAsync(wrapPromiseFn)
}
//# sourceMappingURL=index.js.map