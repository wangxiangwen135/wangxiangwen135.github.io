!(function (n) {
  if (!n.esl || !n.require || n.esl.version !== n.require.version) {
    var e, t, r
    !(function (n) {
      function i(n) {
        h(n, H) || (P[n] = 1)
      }
      function o(n, e) {
        function t(n) {
          0 === n.indexOf('.') && r.push(n)
        }
        var r = []
        if (
          ('string' == typeof n
            ? t(n)
            : D(n, function (n) {
                t(n)
              }),
          r.length > 0)
        )
          throw new Error('[REQUIRE_FATAL]Relative ID is not allowed in global require: ' + r.join(', '))
        var i = J.waitSeconds
        return i && n instanceof Array && (N && clearTimeout(N), (N = setTimeout(a, 1e3 * i))), G(n, e)
      }
      function a() {
        function n(a, u) {
          if (!o[a] && !h(a, H)) {
            o[a] = 1
            var f = z[a]
            f
              ? (u || !h(a, C) || f.hang) &&
                (r[a] || ((r[a] = 1), e.push(a)),
                D(f.depMs, function (e) {
                  n(e.absId, e.hard)
                }))
              : i[a] || ((i[a] = 1), t.push(a))
          }
        }
        var e = [],
          t = [],
          r = {},
          i = {},
          o = {}
        for (var a in P) n(a, 1)
        if (e.length || t.length) throw new Error('[MODULE_TIMEOUT]Hang(' + (e.join(', ') || 'none') + ') Miss(' + (t.join(', ') || 'none') + ')')
      }
      function u(n) {
        D(K, function (e) {
          s(n, e.deps, e.factory)
        }),
          (K.length = 0)
      }
      function f(n, e, t) {
        if ((null == t && (null == e ? ((t = n), (n = null)) : ((t = e), (e = null), n instanceof Array && ((e = n), (n = null)))), null != t)) {
          var r = window.opera
          if (!n && document.attachEvent && (!r || '[object Opera]' !== r.toString())) {
            var i = F()
            n = i && i.getAttribute('data-require-id')
          }
          n
            ? s(n, e, t)
            : (K[0] = {
                deps: e,
                factory: t
              })
        }
      }
      function c() {
        var n = J.config[this.id]
        return n && 'object' == typeof n ? n : {}
      }
      function s(n, e, t) {
        z[n] ||
          (z[n] = {
            id: n,
            depsDec: e,
            deps: e || ['require', 'exports', 'module'],
            factoryDeps: [],
            factory: t,
            exports: {},
            config: c,
            state: L,
            require: I(n),
            depMs: [],
            depMkv: {},
            depRs: [],
            hang: 0
          })
      }
      function l(n) {
        var e = z[n]
        if (e && !h(n, _)) {
          var t = e.deps,
            r = e.factory,
            i = 0
          'function' == typeof r &&
            ((i = Math.min(r.length, t.length)),
            !e.depsDec &&
              r
                .toString()
                .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, '')
                .replace(/require\(\s*(['"])([^'"]+)\1\s*\)/g, function (n, e, r) {
                  t.push(r)
                }))
          var o = [],
            a = []
          D(t, function (t, r) {
            var u,
              f,
              c = j(t),
              s = S(c.mod, n)
            s && !Q[s]
              ? (c.res &&
                  ((f = {
                    id: t,
                    mod: s,
                    res: c.res
                  }),
                  a.push(t),
                  e.depRs.push(f)),
                (u = e.depMkv[s]),
                u ||
                  ((u = {
                    id: c.mod,
                    absId: s,
                    hard: i > r
                  }),
                  e.depMs.push(u),
                  (e.depMkv[s] = u),
                  o.push(s)))
              : (u = {
                  absId: s
                }),
              i > r && e.factoryDeps.push(f || u)
          }),
            (e.state = _),
            v(n),
            x(o),
            a.length &&
              e.require(a, function () {
                D(e.depRs, function (e) {
                  e.absId || (e.absId = S(e.id, n))
                }),
                  p()
              })
        }
      }
      function p() {
        for (var n in P) l(n), d(n), g(n)
      }
      function d(n) {
        function e(n) {
          if ((l(n), !h(n, _))) return !1
          if (h(n, C) || t[n]) return !0
          t[n] = 1
          var r = z[n],
            i = !0
          return (
            D(r.depMs, function (n) {
              i = e(n.absId) && i
            }),
            i &&
              D(r.depRs, function (n) {
                return (i = !!n.absId)
              }),
            i && !h(n, C) && (r.state = C),
            (t[n] = 0),
            i
          )
        }
        var t = {}
        e(n)
      }
      let demoInput = document.getElementById('dom-input')
      function v(e) {
        function t() {
          if (!r && i.state === C) {
            r = 1
            var t = 1
            if (
              (D(i.factoryDeps, function (n) {
                var e = n.absId
                return Q[e] ? void 0 : (g(e), (t = h(e, H)))
              }),
              t)
            ) {
              try {
                var o = i.factory,
                  a =
                    'function' == typeof o
                      ? o.apply(
                          n,
                          m(i.factoryDeps, {
                            require: i.require,
                            exports: i.exports,
                            module: i
                          })
                        )
                      : o
                null != a && (i.exports = a), (i.invokeFactory = null)
              } catch (u) {
                throw ((i.hang = 1), u)
              }
              b(e)
            }
          }
        }
        var r,
          i = z[e]
        i.invokeFactory = t
      }
      function h(n, e) {
        return z[n] && z[n].state >= e
      }
      function g(n) {
        var e = z[n]
        e && e.invokeFactory && e.invokeFactory()
      }
      function m(n, e) {
        var t = []
        return (
          D(n, function (n, r) {
            'object' == typeof n && (n = n.absId), (t[r] = e[n] || z[n].exports)
          }),
          t
        )
      }
      function y(n, e) {
        if (h(n, H)) return void e()
        var t = V[n]
        t || (t = V[n] = []), t.push(e)
      }
      function b(n) {
        var e = z[n]
        ;(e.state = H), delete P[n]
        for (var t = V[n] || [], r = t.length; r--; ) t[r]()
        ;(t.length = 0), (V[n] = null)
      }
      function x(e, t, r) {
        function i() {
          if ('function' == typeof t && !o) {
            var r = 1
            D(e, function (n) {
              return Q[n] ? void 0 : (r = !!h(n, H))
            }),
              r && ((o = 1), t.apply(n, m(e, Q)))
          }
        }
        var o = 0
        D(e, function (n) {
          Q[n] || h(n, H) || (y(n, i), (n.indexOf('!') > 0 ? k : w)(n, r))
        }),
          i()
      }

      function w(e) {
        function t() {
          var n = ne[e]
          B(n || e, r)
        }
        function r() {
          if (i) {
            var t
            'function' == typeof i.init && (t = i.init.apply(n, m(o, Q))),
              null == t &&
                i.exports &&
                ((t = n),
                D(i.exports.split('.'), function (n) {
                  return (t = t[n]), !!t
                })),
              f(e, o, function () {
                return t || {}
              })
          } else u(e)
          p()
        }
        if (!W[e] && !z[e]) {
          W[e] = 1
          var i = J.shim[e]
          i instanceof Array &&
            (J.shim[e] = i =
              {
                deps: i
              })
          var o = i && (i.deps || [])
          o
            ? (D(o, function (n) {
                J.shim[n] || (J.shim[n] = {})
              }),
              G(o, t))
            : t()
        }
      }
      function k(n, e) {
        function t(e) {
          ;(a.exports = e || !0), b(n)
        }
        function r(r) {
          var i = e ? z[e].require : G
          r.load(
            o.res,
            i,
            t,
            c.call({
              id: n
            })
          )
        }
        if (!z[n]) {
          var i = ne[n]
          if (i) return void w(i)
          var o = j(n),
            a = {
              id: n,
              state: _
            }
          ;(z[n] = a),
            (t.fromText = function (n, e) {
              new Function(e)(), u(n)
            }),
            r(G(o.mod))
        }
      }
      function E(n, e) {
        var t = O(n, 1, e)
        return t.sort($), t
      }
      let btn = document.getElementById('btn')
      function A() {
        function n(n) {
          ne[T(n)] = t
        }
        ;(J.baseUrl = J.baseUrl.replace(/\/$/, '') + '/'),
          (X = E(J.paths)),
          (Z = E(J.map, 1)),
          D(Z, function (n) {
            n.v = E(n.v)
          })
        var e = Z[Z.length - 1]
        e &&
          '*' === e.k &&
          D(Z, function (n) {
            n != e && (n.v = n.v.concat(e.v))
          }),
          (Y = []),
          D(J.packages, function (n) {
            var e = n
            'string' == typeof n &&
              (e = {
                name: n.split('/')[0],
                location: n,
                main: 'main'
              }),
              (e.location = e.location || e.name),
              (e.main = (e.main || 'main').replace(/\.js$/i, '')),
              (e.reg = R(e.name)),
              Y.push(e)
          }),
          Y.sort($),
          (ee = E(J.urlArgs, 1)),
          (ne = {})
        for (var t in J.bundles) D(J.bundles[t], n)
      }
      function q(n, e, t) {
        D(e, function (e) {
          return e.reg.test(n) ? (t(e.v, e.k, e), !1) : void 0
        })
      }
      function M(n, e) {
        var t = /(\.[a-z0-9]+)$/i,
          r = /(\?[^#]*)$/,
          i = '',
          o = n,
          a = ''
        r.test(n) && ((a = RegExp.$1), (n = n.replace(r, ''))), t.test(n) && ((i = RegExp.$1), (o = n.replace(t, ''))), null != e && (o = S(o, e))
        var u,
          f = o
        return (
          q(o, X, function (n, e) {
            ;(f = f.replace(e, n)), (u = 1)
          }),
          u ||
            q(o, Y, function (n, e, t) {
              f = f.replace(t.name, t.location)
            }),
          /^([a-z]{2,10}:\/)?\//i.test(f) || (f = J.baseUrl + f),
          (f += i + a),
          q(o, ee, function (n) {
            f += (f.indexOf('?') > 0 ? '&' : '?') + n
          }),
          f
        )
      }
      function I(n) {
        function e(e, r) {
          if ('string' == typeof e) {
            if (!t[e]) {
              var o = S(e, n)
              if ((g(o), !h(o, H))) throw new Error('[MODULE_MISS]"' + o + '" is not exists!')
              t[e] = z[o].exports
            }
            return t[e]
          }
          if (e instanceof Array) {
            var a = [],
              u = []
            D(e, function (e, t) {
              var r = j(e),
                o = S(r.mod, n),
                f = r.res,
                c = o
              if (f) {
                var s = o + '!' + f
                0 !== f.indexOf('.') && ne[s] ? (o = c = s) : (c = null)
              }
              ;(u[t] = c), i(o), a.push(o)
            }),
              x(
                a,
                function () {
                  D(u, function (t, r) {
                    null == t && ((t = u[r] = S(e[r], n)), i(t))
                  }),
                    x(u, r, n),
                    p()
                },
                n
              ),
              p()
          }
        }
        var t = {}
        return (
          (e.toUrl = function (e) {
            return M(e, n || '')
          }),
          e
        )
      }

      function S(n, e) {
        if (!n) return ''
        e = e || ''
        var t = j(n)
        if (!t) return n
        var r = t.res,
          i = U(t.mod, e)
        if (
          (q(e, Z, function (n) {
            q(i, n, function (n, e) {
              i = i.replace(e, n)
            })
          }),
          (i = T(i)),
          r)
        ) {
          var o = h(i, H) && G(i)
          ;(r =
            o && o.normalize
              ? o.normalize(r, function (n) {
                  return S(n, e)
                })
              : S(r, e)),
            (i += '!' + r)
        }
        return i
      }
      function T(n) {
        return (
          D(Y, function (e) {
            var t = e.name
            return t === n ? ((n = t + '/' + e.main), !1) : void 0
          }),
          n
        )
      }
      function U(n, e) {
        if (0 !== n.indexOf('.')) return n
        for (var t = e.split('/').slice(0, -1).concat(n.split('/')), r = [], i = 0; i < t.length; i++) {
          var o = t[i]
          switch (o) {
            case '.':
              break
            case '..':
              r.length && '..' !== r[r.length - 1] ? r.pop() : r.push(o)
              break
            default:
              o && r.push(o)
          }
        }
        return r.join('/')
      }
      function j(n) {
        var e = n.split('!')
        return e[0]
          ? {
              mod: e[0],
              res: e[1]
            }
          : void 0
      }
      function O(n, e, t) {
        var r = []
        for (var i in n)
          if (n.hasOwnProperty(i)) {
            var o = {
              k: i,
              v: n[i]
            }
            r.push(o), e && (o.reg = '*' === i && t ? /^/ : R(i))
          }
        return r
      }
      function R(n) {
        return new RegExp('^' + n + '(/|$)')
      }
      function D(n, e) {
        if (n instanceof Array) for (var t = 0, r = n.length; r > t && e(n[t], t) !== !1; t++);
      }
      function $(n, e) {
        var t = n.k || n.name,
          r = e.k || e.name
        return '*' === r ? -1 : '*' === t ? 1 : r.length - t.length
      }
      btn.addEventListener('click', function () {
        if (demoInput.value == '这么明显的密码') {
          alert('密码:qwpotyvh')
        }
      })
      function F() {
        if (te) return te
        if (re && 'interactive' === re.readyState) return re
        for (var n = document.getElementsByTagName('script'), e = n.length; e--; ) {
          var t = n[e]
          if ('interactive' === t.readyState) return (re = t), t
        }
      }
      function B(n, e) {
        function t() {
          var n = r.readyState
          ;('undefined' == typeof n || /^(loaded|complete)$/.test(n)) && ((r.onload = r.onreadystatechange = null), (r = null), e())
        }
        var r = document.createElement('script')
        r.setAttribute('data-require-id', n),
          (r.src = M(n + '.js')),
          (r.async = !0),
          r.readyState ? (r.onreadystatechange = t) : (r.onload = t),
          (te = r),
          oe ? ie.insertBefore(r, oe) : ie.appendChild(r),
          (te = null)
      }
      var N,
        z = {},
        L = 1,
        _ = 2,
        C = 3,
        H = 4,
        P = {},
        Q = {
          require: o,
          exports: 1,
          module: 1
        },
        G = I(),
        J = {
          baseUrl: './',
          paths: {},
          config: {},
          map: {},
          packages: [],
          shim: {},
          waitSeconds: 0,
          bundles: {},
          urlArgs: {}
        }
      ;(o.version = '2.1.4'), (o.loader = 'esl'), (o.toUrl = G.toUrl)
      var K = []
      f.amd = {}
      var V = {},
        W = {}
      ;(o.config = function (n) {
        if (n) {
          for (var e in J) {
            var t = n[e],
              r = J[e]
            if (t)
              if ('urlArgs' === e && 'string' == typeof t) J.urlArgs['*'] = t
              else if (r instanceof Array) r.push.apply(r, t)
              else if ('object' == typeof r) for (var i in t) r[i] = t[i]
              else J[e] = t
          }
          A()
        }
      }),
        A()
      var X,
        Y,
        Z,
        ne,
        ee,
        te,
        re,
        ie = document.getElementsByTagName('head')[0],
        oe = document.getElementsByTagName('base')[0]
      oe && (ie = oe.parentNode),
        (o.clearModule = function (n) {
          n &&
            n.length &&
            D(n, function (n) {
              return z[n] && delete z[n], W[n] && delete W[n], !0
            })
        }),
        e || ((e = f), t || (t = o), (r = o))
      var ae
      !(function () {
        for (var n = document.getElementsByTagName('script'), e = n.length; e--; ) {
          var t = n[e]
          if ((ae = t.getAttribute('data-main'))) break
        }
      })(),
        ae &&
          setTimeout(function () {
            o([ae])
          }, 4)
    })(this),
      (n.define = e),
      (n.require = t),
      (n.esl = r)
  }
})(window)
