var be = { value: () => {
} };
function Ut() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Q(n);
}
function Q(t) {
  this._ = t;
}
function Ae(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Q.prototype = Ut.prototype = {
  constructor: Q,
  on: function(t, e) {
    var n = this._, r = Ae(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; )
        if ((i = (t = r[o]).type) && (i = Ne(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type)
        n[i] = Rt(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = Rt(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new Q(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function Ne(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Rt(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = be, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var _t = "http://www.w3.org/1999/xhtml";
const Tt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: _t,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ut(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Tt.hasOwnProperty(e) ? { space: Tt[e], local: t } : t;
}
function ke(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === _t && e.documentElement.namespaceURI === _t ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function $e(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Kt(t) {
  var e = ut(t);
  return (e.local ? $e : ke)(e);
}
function Se() {
}
function bt(t) {
  return t == null ? Se : function() {
    return this.querySelector(t);
  };
}
function Ee(t) {
  typeof t != "function" && (t = bt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = new Array(a), l, s, f = 0; f < a; ++f)
      (l = o[f]) && (s = t.call(l, l.__data__, f, o)) && ("__data__" in l && (s.__data__ = l.__data__), u[f] = s);
  return new x(r, this._parents);
}
function Ce(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Re() {
  return [];
}
function Wt(t) {
  return t == null ? Re : function() {
    return this.querySelectorAll(t);
  };
}
function Te(t) {
  return function() {
    return Ce(t.apply(this, arguments));
  };
}
function Me(t) {
  typeof t == "function" ? t = Te(t) : t = Wt(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], u = a.length, l, s = 0; s < u; ++s)
      (l = a[s]) && (r.push(t.call(l, l.__data__, s, a)), i.push(l));
  return new x(r, i);
}
function Gt(t) {
  return function() {
    return this.matches(t);
  };
}
function Jt(t) {
  return function(e) {
    return e.matches(t);
  };
}
var ze = Array.prototype.find;
function Ie(t) {
  return function() {
    return ze.call(this.children, t);
  };
}
function Fe() {
  return this.firstElementChild;
}
function He(t) {
  return this.select(t == null ? Fe : Ie(typeof t == "function" ? t : Jt(t)));
}
var qe = Array.prototype.filter;
function De() {
  return Array.from(this.children);
}
function Xe(t) {
  return function() {
    return qe.call(this.children, t);
  };
}
function Be(t) {
  return this.selectAll(t == null ? De : Xe(typeof t == "function" ? t : Jt(t)));
}
function Oe(t) {
  typeof t != "function" && (t = Gt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], l, s = 0; s < a; ++s)
      (l = o[s]) && t.call(l, l.__data__, s, o) && u.push(l);
  return new x(r, this._parents);
}
function Qt(t) {
  return new Array(t.length);
}
function Pe() {
  return new x(this._enter || this._groups.map(Qt), this._parents);
}
function et(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
et.prototype = {
  constructor: et,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Le(t) {
  return function() {
    return t;
  };
}
function Ve(t, e, n, r, i, o) {
  for (var a = 0, u, l = e.length, s = o.length; a < s; ++a)
    (u = e[a]) ? (u.__data__ = o[a], r[a] = u) : n[a] = new et(t, o[a]);
  for (; a < l; ++a)
    (u = e[a]) && (i[a] = u);
}
function Ye(t, e, n, r, i, o, a) {
  var u, l, s = /* @__PURE__ */ new Map(), f = e.length, h = o.length, c = new Array(f), p;
  for (u = 0; u < f; ++u)
    (l = e[u]) && (c[u] = p = a.call(l, l.__data__, u, e) + "", s.has(p) ? i[u] = l : s.set(p, l));
  for (u = 0; u < h; ++u)
    p = a.call(t, o[u], u, o) + "", (l = s.get(p)) ? (r[u] = l, l.__data__ = o[u], s.delete(p)) : n[u] = new et(t, o[u]);
  for (u = 0; u < f; ++u)
    (l = e[u]) && s.get(c[u]) === l && (i[u] = l);
}
function Ue(t) {
  return t.__data__;
}
function Ke(t, e) {
  if (!arguments.length)
    return Array.from(this, Ue);
  var n = e ? Ye : Ve, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Le(t));
  for (var o = i.length, a = new Array(o), u = new Array(o), l = new Array(o), s = 0; s < o; ++s) {
    var f = r[s], h = i[s], c = h.length, p = We(t.call(f, f && f.__data__, s, r)), d = p.length, _ = u[s] = new Array(d), y = a[s] = new Array(d), C = l[s] = new Array(c);
    n(f, h, _, y, C, p, e);
    for (var g = 0, R = 0, S, Ct; g < d; ++g)
      if (S = _[g]) {
        for (g >= R && (R = g + 1); !(Ct = y[R]) && ++R < d; )
          ;
        S._next = Ct || null;
      }
  }
  return a = new x(a, r), a._enter = u, a._exit = l, a;
}
function We(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ge() {
  return new x(this._exit || this._groups.map(Qt), this._parents);
}
function Je(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Qe(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), u = new Array(i), l = 0; l < a; ++l)
    for (var s = n[l], f = r[l], h = s.length, c = u[l] = new Array(h), p, d = 0; d < h; ++d)
      (p = s[d] || f[d]) && (c[d] = p);
  for (; l < i; ++l)
    u[l] = n[l];
  return new x(u, this._parents);
}
function Ze() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function je(t) {
  t || (t = tn);
  function e(h, c) {
    return h && c ? t(h.__data__, c.__data__) : !h - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], u = a.length, l = i[o] = new Array(u), s, f = 0; f < u; ++f)
      (s = a[f]) && (l[f] = s);
    l.sort(e);
  }
  return new x(i, this._parents).order();
}
function tn(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function en() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function nn() {
  return Array.from(this);
}
function rn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a)
        return a;
    }
  return null;
}
function on() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function an() {
  return !this.node();
}
function sn(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, u; o < a; ++o)
      (u = i[o]) && t.call(u, u.__data__, o, i);
  return this;
}
function un(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ln(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fn(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function cn(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function pn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function dn(t, e) {
  var n = ut(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ln : un : typeof e == "function" ? n.local ? pn : hn : n.local ? cn : fn)(n, e));
}
function Zt(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _n(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gn(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function yn(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function wn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _n : typeof e == "function" ? yn : gn)(t, e, n == null ? "" : n)) : H(this.node(), t);
}
function H(t, e) {
  return t.style.getPropertyValue(e) || Zt(t).getComputedStyle(t, null).getPropertyValue(e);
}
function xn(t) {
  return function() {
    delete this[t];
  };
}
function mn(t, e) {
  return function() {
    this[t] = e;
  };
}
function vn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function bn(t, e) {
  return arguments.length > 1 ? this.each((e == null ? xn : typeof e == "function" ? vn : mn)(t, e)) : this.node()[t];
}
function jt(t) {
  return t.trim().split(/^|\s+/);
}
function At(t) {
  return t.classList || new te(t);
}
function te(t) {
  this._node = t, this._names = jt(t.getAttribute("class") || "");
}
te.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function ee(t, e) {
  for (var n = At(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function ne(t, e) {
  for (var n = At(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function An(t) {
  return function() {
    ee(this, t);
  };
}
function Nn(t) {
  return function() {
    ne(this, t);
  };
}
function kn(t, e) {
  return function() {
    (e.apply(this, arguments) ? ee : ne)(this, t);
  };
}
function $n(t, e) {
  var n = jt(t + "");
  if (arguments.length < 2) {
    for (var r = At(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? kn : e ? An : Nn)(n, e));
}
function Sn() {
  this.textContent = "";
}
function En(t) {
  return function() {
    this.textContent = t;
  };
}
function Cn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e == null ? "" : e;
  };
}
function Rn(t) {
  return arguments.length ? this.each(t == null ? Sn : (typeof t == "function" ? Cn : En)(t)) : this.node().textContent;
}
function Tn() {
  this.innerHTML = "";
}
function Mn(t) {
  return function() {
    this.innerHTML = t;
  };
}
function zn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e == null ? "" : e;
  };
}
function In(t) {
  return arguments.length ? this.each(t == null ? Tn : (typeof t == "function" ? zn : Mn)(t)) : this.node().innerHTML;
}
function Fn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Hn() {
  return this.each(Fn);
}
function qn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Dn() {
  return this.each(qn);
}
function Xn(t) {
  var e = typeof t == "function" ? t : Kt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Bn() {
  return null;
}
function On(t, e) {
  var n = typeof t == "function" ? t : Kt(t), r = e == null ? Bn : typeof e == "function" ? e : bt(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Pn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ln() {
  return this.each(Pn);
}
function Vn() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Yn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Un(t) {
  return this.select(t ? Yn : Vn);
}
function Kn(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Wn(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Gn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Jn(t) {
  return function() {
    var e = this.__on;
    if (!!e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Qn(t, e, n) {
  return function() {
    var r = this.__on, i, o = Wn(e);
    if (r) {
      for (var a = 0, u = r.length; a < u; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Zn(t, e, n) {
  var r = Gn(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var l = 0, s = u.length, f; l < s; ++l)
        for (i = 0, f = u[l]; i < o; ++i)
          if ((a = r[i]).type === f.type && a.name === f.name)
            return f.value;
    }
    return;
  }
  for (u = e ? Qn : Jn, i = 0; i < o; ++i)
    this.each(u(r[i], e, n));
  return this;
}
function re(t, e, n) {
  var r = Zt(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function jn(t, e) {
  return function() {
    return re(this, t, e);
  };
}
function tr(t, e) {
  return function() {
    return re(this, t, e.apply(this, arguments));
  };
}
function er(t, e) {
  return this.each((typeof e == "function" ? tr : jn)(t, e));
}
function* nr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var ie = [null];
function x(t, e) {
  this._groups = t, this._parents = e;
}
function U() {
  return new x([[document.documentElement]], ie);
}
function rr() {
  return this;
}
x.prototype = U.prototype = {
  constructor: x,
  select: Ee,
  selectAll: Me,
  selectChild: He,
  selectChildren: Be,
  filter: Oe,
  data: Ke,
  enter: Pe,
  exit: Ge,
  join: Je,
  merge: Qe,
  selection: rr,
  order: Ze,
  sort: je,
  call: en,
  nodes: nn,
  node: rn,
  size: on,
  empty: an,
  each: sn,
  attr: dn,
  style: wn,
  property: bn,
  classed: $n,
  text: Rn,
  html: In,
  raise: Hn,
  lower: Dn,
  append: Xn,
  insert: On,
  remove: Ln,
  clone: Un,
  datum: Kn,
  on: Zn,
  dispatch: er,
  [Symbol.iterator]: nr
};
function ir(t) {
  return typeof t == "string" ? new x([[document.querySelector(t)]], [document.documentElement]) : new x([[t]], ie);
}
function Nt(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function oe(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function K() {
}
var O = 0.7, nt = 1 / O, F = "\\s*([+-]?\\d+)\\s*", P = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", A = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", or = /^#([0-9a-f]{3,8})$/, ar = new RegExp(`^rgb\\(${F},${F},${F}\\)$`), sr = new RegExp(`^rgb\\(${A},${A},${A}\\)$`), ur = new RegExp(`^rgba\\(${F},${F},${F},${P}\\)$`), lr = new RegExp(`^rgba\\(${A},${A},${A},${P}\\)$`), fr = new RegExp(`^hsl\\(${P},${A},${A}\\)$`), cr = new RegExp(`^hsla\\(${P},${A},${A},${P}\\)$`), Mt = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Nt(K, L, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zt,
  formatHex: zt,
  formatHex8: hr,
  formatHsl: pr,
  formatRgb: It,
  toString: It
});
function zt() {
  return this.rgb().formatHex();
}
function hr() {
  return this.rgb().formatHex8();
}
function pr() {
  return ae(this).formatHsl();
}
function It() {
  return this.rgb().formatRgb();
}
function L(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = or.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Ft(e) : n === 3 ? new w(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? W(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? W(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ar.exec(t)) ? new w(e[1], e[2], e[3], 1) : (e = sr.exec(t)) ? new w(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ur.exec(t)) ? W(e[1], e[2], e[3], e[4]) : (e = lr.exec(t)) ? W(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = fr.exec(t)) ? Dt(e[1], e[2] / 100, e[3] / 100, 1) : (e = cr.exec(t)) ? Dt(e[1], e[2] / 100, e[3] / 100, e[4]) : Mt.hasOwnProperty(t) ? Ft(Mt[t]) : t === "transparent" ? new w(NaN, NaN, NaN, 0) : null;
}
function Ft(t) {
  return new w(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function W(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new w(t, e, n, r);
}
function dr(t) {
  return t instanceof K || (t = L(t)), t ? (t = t.rgb(), new w(t.r, t.g, t.b, t.opacity)) : new w();
}
function gt(t, e, n, r) {
  return arguments.length === 1 ? dr(t) : new w(t, e, n, r == null ? 1 : r);
}
function w(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Nt(w, gt, oe(K, {
  brighter(t) {
    return t = t == null ? nt : Math.pow(nt, t), new w(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? O : Math.pow(O, t), new w(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new w(M(this.r), M(this.g), M(this.b), rt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ht,
  formatHex: Ht,
  formatHex8: _r,
  formatRgb: qt,
  toString: qt
}));
function Ht() {
  return `#${T(this.r)}${T(this.g)}${T(this.b)}`;
}
function _r() {
  return `#${T(this.r)}${T(this.g)}${T(this.b)}${T((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function qt() {
  const t = rt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${M(this.r)}, ${M(this.g)}, ${M(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function rt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function M(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function T(t) {
  return t = M(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Dt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new m(t, e, n, r);
}
function ae(t) {
  if (t instanceof m)
    return new m(t.h, t.s, t.l, t.opacity);
  if (t instanceof K || (t = L(t)), !t)
    return new m();
  if (t instanceof m)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, u = o - i, l = (o + i) / 2;
  return u ? (e === o ? a = (n - r) / u + (n < r) * 6 : n === o ? a = (r - e) / u + 2 : a = (e - n) / u + 4, u /= l < 0.5 ? o + i : 2 - o - i, a *= 60) : u = l > 0 && l < 1 ? 0 : a, new m(a, u, l, t.opacity);
}
function gr(t, e, n, r) {
  return arguments.length === 1 ? ae(t) : new m(t, e, n, r == null ? 1 : r);
}
function m(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Nt(m, gr, oe(K, {
  brighter(t) {
    return t = t == null ? nt : Math.pow(nt, t), new m(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? O : Math.pow(O, t), new m(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new w(ct(t >= 240 ? t - 240 : t + 120, i, r), ct(t, i, r), ct(t < 120 ? t + 240 : t - 120, i, r), this.opacity);
  },
  clamp() {
    return new m(Xt(this.h), G(this.s), G(this.l), rt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = rt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Xt(this.h)}, ${G(this.s) * 100}%, ${G(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Xt(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function G(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ct(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const se = (t) => () => t;
function yr(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function wr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function xr(t) {
  return (t = +t) == 1 ? ue : function(e, n) {
    return n - e ? wr(e, n, t) : se(isNaN(e) ? n : e);
  };
}
function ue(t, e) {
  var n = e - t;
  return n ? yr(t, n) : se(isNaN(t) ? e : t);
}
const Bt = function t(e) {
  var n = xr(e);
  function r(i, o) {
    var a = n((i = gt(i)).r, (o = gt(o)).r), u = n(i.g, o.g), l = n(i.b, o.b), s = ue(i.opacity, o.opacity);
    return function(f) {
      return i.r = a(f), i.g = u(f), i.b = l(f), i.opacity = s(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function E(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var yt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ht = new RegExp(yt.source, "g");
function mr(t) {
  return function() {
    return t;
  };
}
function vr(t) {
  return function(e) {
    return t(e) + "";
  };
}
function br(t, e) {
  var n = yt.lastIndex = ht.lastIndex = 0, r, i, o, a = -1, u = [], l = [];
  for (t = t + "", e = e + ""; (r = yt.exec(t)) && (i = ht.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), u[a] ? u[a] += o : u[++a] = o), (r = r[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, l.push({ i: a, x: E(r, i) })), n = ht.lastIndex;
  return n < e.length && (o = e.slice(n), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? l[0] ? vr(l[0].x) : mr(e) : (e = l.length, function(s) {
    for (var f = 0, h; f < e; ++f)
      u[(h = l[f]).i] = h.x(s);
    return u.join("");
  });
}
var Ot = 180 / Math.PI, wt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function le(t, e, n, r, i, o) {
  var a, u, l;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (l = t * n + e * r) && (n -= t * l, r -= e * l), (u = Math.sqrt(n * n + r * r)) && (n /= u, r /= u, l /= u), t * r < e * n && (t = -t, e = -e, l = -l, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Ot,
    skewX: Math.atan(l) * Ot,
    scaleX: a,
    scaleY: u
  };
}
var J;
function Ar(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? wt : le(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Nr(t) {
  return t == null || (J || (J = document.createElementNS("http://www.w3.org/2000/svg", "g")), J.setAttribute("transform", t), !(t = J.transform.baseVal.consolidate())) ? wt : (t = t.matrix, le(t.a, t.b, t.c, t.d, t.e, t.f));
}
function fe(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, f, h, c, p, d) {
    if (s !== h || f !== c) {
      var _ = p.push("translate(", null, e, null, n);
      d.push({ i: _ - 4, x: E(s, h) }, { i: _ - 2, x: E(f, c) });
    } else
      (h || c) && p.push("translate(" + h + e + c + n);
  }
  function a(s, f, h, c) {
    s !== f ? (s - f > 180 ? f += 360 : f - s > 180 && (s += 360), c.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: E(s, f) })) : f && h.push(i(h) + "rotate(" + f + r);
  }
  function u(s, f, h, c) {
    s !== f ? c.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: E(s, f) }) : f && h.push(i(h) + "skewX(" + f + r);
  }
  function l(s, f, h, c, p, d) {
    if (s !== h || f !== c) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      d.push({ i: _ - 4, x: E(s, h) }, { i: _ - 2, x: E(f, c) });
    } else
      (h !== 1 || c !== 1) && p.push(i(p) + "scale(" + h + "," + c + ")");
  }
  return function(s, f) {
    var h = [], c = [];
    return s = t(s), f = t(f), o(s.translateX, s.translateY, f.translateX, f.translateY, h, c), a(s.rotate, f.rotate, h, c), u(s.skewX, f.skewX, h, c), l(s.scaleX, s.scaleY, f.scaleX, f.scaleY, h, c), s = f = null, function(p) {
      for (var d = -1, _ = c.length, y; ++d < _; )
        h[(y = c[d]).i] = y.x(p);
      return h.join("");
    };
  };
}
var kr = fe(Ar, "px, ", "px)", "deg)"), $r = fe(Nr, ", ", ")", ")"), q = 0, X = 0, D = 0, ce = 1e3, it, B, ot = 0, z = 0, lt = 0, V = typeof performance == "object" && performance.now ? performance : Date, he = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function kt() {
  return z || (he(Sr), z = V.now() + lt);
}
function Sr() {
  z = 0;
}
function at() {
  this._call = this._time = this._next = null;
}
at.prototype = pe.prototype = {
  constructor: at,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? kt() : +n) + (e == null ? 0 : +e), !this._next && B !== this && (B ? B._next = this : it = this, B = this), this._call = t, this._time = n, xt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xt());
  }
};
function pe(t, e, n) {
  var r = new at();
  return r.restart(t, e, n), r;
}
function Er() {
  kt(), ++q;
  for (var t = it, e; t; )
    (e = z - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --q;
}
function Pt() {
  z = (ot = V.now()) + lt, q = X = 0;
  try {
    Er();
  } finally {
    q = 0, Rr(), z = 0;
  }
}
function Cr() {
  var t = V.now(), e = t - ot;
  e > ce && (lt -= e, ot = t);
}
function Rr() {
  for (var t, e = it, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : it = n);
  B = t, xt(r);
}
function xt(t) {
  if (!q) {
    X && (X = clearTimeout(X));
    var e = t - z;
    e > 24 ? (t < 1 / 0 && (X = setTimeout(Pt, t - V.now() - lt)), D && (D = clearInterval(D))) : (D || (ot = V.now(), D = setInterval(Cr, ce)), q = 1, he(Pt));
  }
}
function Lt(t, e, n) {
  var r = new at();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Tr = Ut("start", "end", "cancel", "interrupt"), Mr = [], de = 0, Vt = 1, mt = 2, Z = 3, Yt = 4, vt = 5, j = 6;
function ft(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a)
    t.__transition = {};
  else if (n in a)
    return;
  zr(t, n, {
    name: e,
    index: r,
    group: i,
    on: Tr,
    tween: Mr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: de
  });
}
function $t(t, e) {
  var n = v(t, e);
  if (n.state > de)
    throw new Error("too late; already scheduled");
  return n;
}
function N(t, e) {
  var n = v(t, e);
  if (n.state > Z)
    throw new Error("too late; already running");
  return n;
}
function v(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function zr(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = pe(o, 0, n.time);
  function o(s) {
    n.state = Vt, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var f, h, c, p;
    if (n.state !== Vt)
      return l();
    for (f in r)
      if (p = r[f], p.name === n.name) {
        if (p.state === Z)
          return Lt(a);
        p.state === Yt ? (p.state = j, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete r[f]) : +f < e && (p.state = j, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete r[f]);
      }
    if (Lt(function() {
      n.state === Z && (n.state = Yt, n.timer.restart(u, n.delay, n.time), u(s));
    }), n.state = mt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === mt) {
      for (n.state = Z, i = new Array(c = n.tween.length), f = 0, h = -1; f < c; ++f)
        (p = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++h] = p);
      i.length = h + 1;
    }
  }
  function u(s) {
    for (var f = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(l), n.state = vt, 1), h = -1, c = i.length; ++h < c; )
      i[h].call(t, f);
    n.state === vt && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = j, n.timer.stop(), delete r[e];
    for (var s in r)
      return;
    delete t.__transition;
  }
}
function Ir(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (!!n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > mt && r.state < vt, r.state = j, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function Fr(t) {
  return this.each(function() {
    Ir(this, t);
  });
}
function Hr(t, e) {
  var n, r;
  return function() {
    var i = N(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, u = r.length; a < u; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function qr(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = N(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var u = { name: e, value: n }, l = 0, s = i.length; l < s; ++l)
        if (i[l].name === e) {
          i[l] = u;
          break;
        }
      l === s && i.push(u);
    }
    o.tween = i;
  };
}
function Dr(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = v(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Hr : qr)(n, t, e));
}
function St(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = N(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return v(i, r).value[e];
  };
}
function _e(t, e) {
  var n;
  return (typeof e == "number" ? E : e instanceof L ? Bt : (n = L(e)) ? (e = n, Bt) : br)(t, e);
}
function Xr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Br(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Or(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Pr(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Lr(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), l;
    return u == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), l = u + "", a === l ? null : a === r && l === i ? o : (i = l, o = e(r = a, u)));
  };
}
function Vr(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), l;
    return u == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), l = u + "", a === l ? null : a === r && l === i ? o : (i = l, o = e(r = a, u)));
  };
}
function Yr(t, e) {
  var n = ut(t), r = n === "transform" ? $r : _e;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Vr : Lr)(n, r, St(this, "attr." + t, e)) : e == null ? (n.local ? Br : Xr)(n) : (n.local ? Pr : Or)(n, r, e));
}
function Ur(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Kr(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Wr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Kr(t, o)), n;
  }
  return i._value = e, i;
}
function Gr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Ur(t, o)), n;
  }
  return i._value = e, i;
}
function Jr(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = ut(t);
  return this.tween(n, (r.local ? Wr : Gr)(r, e));
}
function Qr(t, e) {
  return function() {
    $t(this, t).delay = +e.apply(this, arguments);
  };
}
function Zr(t, e) {
  return e = +e, function() {
    $t(this, t).delay = e;
  };
}
function jr(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qr : Zr)(e, t)) : v(this.node(), e).delay;
}
function ti(t, e) {
  return function() {
    N(this, t).duration = +e.apply(this, arguments);
  };
}
function ei(t, e) {
  return e = +e, function() {
    N(this, t).duration = e;
  };
}
function ni(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ti : ei)(e, t)) : v(this.node(), e).duration;
}
function ri(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    N(this, t).ease = e;
  };
}
function ii(t) {
  var e = this._id;
  return arguments.length ? this.each(ri(e, t)) : v(this.node(), e).ease;
}
function oi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    N(this, t).ease = n;
  };
}
function ai(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(oi(this._id, t));
}
function si(t) {
  typeof t != "function" && (t = Gt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], l, s = 0; s < a; ++s)
      (l = o[s]) && t.call(l, l.__data__, s, o) && u.push(l);
  return new $(r, this._parents, this._name, this._id);
}
function ui(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
    for (var l = e[u], s = n[u], f = l.length, h = a[u] = new Array(f), c, p = 0; p < f; ++p)
      (c = l[p] || s[p]) && (h[p] = c);
  for (; u < r; ++u)
    a[u] = e[u];
  return new $(a, this._parents, this._name, this._id);
}
function li(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function fi(t, e, n) {
  var r, i, o = li(e) ? $t : N;
  return function() {
    var a = o(this, t), u = a.on;
    u !== r && (i = (r = u).copy()).on(e, n), a.on = i;
  };
}
function ci(t, e) {
  var n = this._id;
  return arguments.length < 2 ? v(this.node(), n).on.on(t) : this.each(fi(n, t, e));
}
function hi(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function pi() {
  return this.on("end.remove", hi(this._id));
}
function di(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = bt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var u = r[a], l = u.length, s = o[a] = new Array(l), f, h, c = 0; c < l; ++c)
      (f = u[c]) && (h = t.call(f, f.__data__, c, u)) && ("__data__" in f && (h.__data__ = f.__data__), s[c] = h, ft(s[c], e, n, c, s, v(f, n)));
  return new $(o, this._parents, e, n);
}
function _i(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Wt(t));
  for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
    for (var l = r[u], s = l.length, f, h = 0; h < s; ++h)
      if (f = l[h]) {
        for (var c = t.call(f, f.__data__, h, l), p, d = v(f, n), _ = 0, y = c.length; _ < y; ++_)
          (p = c[_]) && ft(p, e, n, _, c, d);
        o.push(c), a.push(f);
      }
  return new $(o, a, e, n);
}
var gi = U.prototype.constructor;
function yi() {
  return new gi(this._groups, this._parents);
}
function wi(t, e) {
  var n, r, i;
  return function() {
    var o = H(this, t), a = (this.style.removeProperty(t), H(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function ge(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = H(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function mi(t, e, n) {
  var r, i, o;
  return function() {
    var a = H(this, t), u = n(this), l = u + "";
    return u == null && (l = u = (this.style.removeProperty(t), H(this, t))), a === l ? null : a === r && l === i ? o : (i = l, o = e(r = a, u));
  };
}
function vi(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, u;
  return function() {
    var l = N(this, t), s = l.on, f = l.value[o] == null ? u || (u = ge(e)) : void 0;
    (s !== n || i !== f) && (r = (n = s).copy()).on(a, i = f), l.on = r;
  };
}
function bi(t, e, n) {
  var r = (t += "") == "transform" ? kr : _e;
  return e == null ? this.styleTween(t, wi(t, r)).on("end.style." + t, ge(t)) : typeof e == "function" ? this.styleTween(t, mi(t, r, St(this, "style." + t, e))).each(vi(this._id, t)) : this.styleTween(t, xi(t, r, e), n).on("end.style." + t, null);
}
function Ai(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ni(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && Ai(t, a, n)), r;
  }
  return o._value = e, o;
}
function ki(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Ni(t, e, n == null ? "" : n));
}
function $i(t) {
  return function() {
    this.textContent = t;
  };
}
function Si(t) {
  return function() {
    var e = t(this);
    this.textContent = e == null ? "" : e;
  };
}
function Ei(t) {
  return this.tween("text", typeof t == "function" ? Si(St(this, "text", t)) : $i(t == null ? "" : t + ""));
}
function Ci(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ri(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ci(i)), e;
  }
  return r._value = t, r;
}
function Ti(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ri(t));
}
function Mi() {
  for (var t = this._name, e = this._id, n = ye(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, l, s = 0; s < u; ++s)
      if (l = a[s]) {
        var f = v(l, e);
        ft(l, t, n, s, a, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new $(r, this._parents, t, n);
}
function zi() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var u = { value: a }, l = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = N(this, r), f = s.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(l)), s.on = e;
    }), i === 0 && o();
  });
}
var Ii = 0;
function $(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function ye() {
  return ++Ii;
}
var k = U.prototype;
$.prototype = {
  constructor: $,
  select: di,
  selectAll: _i,
  selectChild: k.selectChild,
  selectChildren: k.selectChildren,
  filter: si,
  merge: ui,
  selection: yi,
  transition: Mi,
  call: k.call,
  nodes: k.nodes,
  node: k.node,
  size: k.size,
  empty: k.empty,
  each: k.each,
  on: ci,
  attr: Yr,
  attrTween: Jr,
  style: bi,
  styleTween: ki,
  text: Ei,
  textTween: Ti,
  remove: pi,
  tween: Dr,
  delay: jr,
  duration: ni,
  ease: ii,
  easeVarying: ai,
  end: zi,
  [Symbol.iterator]: k[Symbol.iterator]
};
function Fi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Hi = {
  time: null,
  delay: 0,
  duration: 250,
  ease: Fi
};
function qi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Di(t) {
  var e, n;
  t instanceof $ ? (e = t._id, t = t._name) : (e = ye(), (n = Hi).time = kt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, l, s = 0; s < u; ++s)
      (l = a[s]) && ft(l, t, e, s, a, n || qi(l, e));
  return new $(r, this._parents, t, e);
}
U.prototype.interrupt = Fr;
U.prototype.transition = Di;
function Xi(t) {
  var e = 0, n = t.children, r = n && n.length;
  if (!r)
    e = 1;
  else
    for (; --r >= 0; )
      e += n[r].value;
  t.value = e;
}
function Bi() {
  return this.eachAfter(Xi);
}
function Oi(t, e) {
  let n = -1;
  for (const r of this)
    t.call(e, r, ++n, this);
  return this;
}
function Pi(t, e) {
  for (var n = this, r = [n], i, o, a = -1; n = r.pop(); )
    if (t.call(e, n, ++a, this), i = n.children)
      for (o = i.length - 1; o >= 0; --o)
        r.push(i[o]);
  return this;
}
function Li(t, e) {
  for (var n = this, r = [n], i = [], o, a, u, l = -1; n = r.pop(); )
    if (i.push(n), o = n.children)
      for (a = 0, u = o.length; a < u; ++a)
        r.push(o[a]);
  for (; n = i.pop(); )
    t.call(e, n, ++l, this);
  return this;
}
function Vi(t, e) {
  let n = -1;
  for (const r of this)
    if (t.call(e, r, ++n, this))
      return r;
}
function Yi(t) {
  return this.eachAfter(function(e) {
    for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0; )
      n += r[i].value;
    e.value = n;
  });
}
function Ui(t) {
  return this.eachBefore(function(e) {
    e.children && e.children.sort(t);
  });
}
function Ki(t) {
  for (var e = this, n = Wi(e, t), r = [e]; e !== n; )
    e = e.parent, r.push(e);
  for (var i = r.length; t !== n; )
    r.splice(i, 0, t), t = t.parent;
  return r;
}
function Wi(t, e) {
  if (t === e)
    return t;
  var n = t.ancestors(), r = e.ancestors(), i = null;
  for (t = n.pop(), e = r.pop(); t === e; )
    i = t, t = n.pop(), e = r.pop();
  return i;
}
function Gi() {
  for (var t = this, e = [t]; t = t.parent; )
    e.push(t);
  return e;
}
function Ji() {
  return Array.from(this);
}
function Qi() {
  var t = [];
  return this.eachBefore(function(e) {
    e.children || t.push(e);
  }), t;
}
function Zi() {
  var t = this, e = [];
  return t.each(function(n) {
    n !== t && e.push({ source: n.parent, target: n });
  }), e;
}
function* ji() {
  var t = this, e, n = [t], r, i, o;
  do
    for (e = n.reverse(), n = []; t = e.pop(); )
      if (yield t, r = t.children)
        for (i = 0, o = r.length; i < o; ++i)
          n.push(r[i]);
  while (n.length);
}
function Et(t, e) {
  t instanceof Map ? (t = [void 0, t], e === void 0 && (e = no)) : e === void 0 && (e = eo);
  for (var n = new Y(t), r, i = [n], o, a, u, l; r = i.pop(); )
    if ((a = e(r.data)) && (l = (a = Array.from(a)).length))
      for (r.children = a, u = l - 1; u >= 0; --u)
        i.push(o = a[u] = new Y(a[u])), o.parent = r, o.depth = r.depth + 1;
  return n.eachBefore(io);
}
function to() {
  return Et(this).eachBefore(ro);
}
function eo(t) {
  return t.children;
}
function no(t) {
  return Array.isArray(t) ? t[1] : null;
}
function ro(t) {
  t.data.value !== void 0 && (t.value = t.data.value), t.data = t.data.data;
}
function io(t) {
  var e = 0;
  do
    t.height = e;
  while ((t = t.parent) && t.height < ++e);
}
function Y(t) {
  this.data = t, this.depth = this.height = 0, this.parent = null;
}
Y.prototype = Et.prototype = {
  constructor: Y,
  count: Bi,
  each: Oi,
  eachAfter: Li,
  eachBefore: Pi,
  find: Vi,
  sum: Yi,
  sort: Ui,
  path: Ki,
  ancestors: Gi,
  descendants: Ji,
  leaves: Qi,
  links: Zi,
  copy: to,
  [Symbol.iterator]: ji
};
function oo(t, e) {
  return t.parent === e.parent ? 1 : 2;
}
function pt(t) {
  var e = t.children;
  return e ? e[0] : t.t;
}
function dt(t) {
  var e = t.children;
  return e ? e[e.length - 1] : t.t;
}
function ao(t, e, n) {
  var r = n / (e.i - t.i);
  e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n;
}
function so(t) {
  for (var e = 0, n = 0, r = t.children, i = r.length, o; --i >= 0; )
    o = r[i], o.z += e, o.m += e, e += o.s + (n += o.c);
}
function uo(t, e, n) {
  return t.a.parent === e.parent ? t.a : n;
}
function tt(t, e) {
  this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e;
}
tt.prototype = Object.create(Y.prototype);
function lo(t) {
  for (var e = new tt(t, 0), n, r = [e], i, o, a, u; n = r.pop(); )
    if (o = n._.children)
      for (n.children = new Array(u = o.length), a = u - 1; a >= 0; --a)
        r.push(i = n.children[a] = new tt(o[a], a)), i.parent = n;
  return (e.parent = new tt(null, 0)).children = [e], e;
}
function fo() {
  var t = oo, e = 1, n = 1, r = null;
  function i(s) {
    var f = lo(s);
    if (f.eachAfter(o), f.parent.m = -f.z, f.eachBefore(a), r)
      s.eachBefore(l);
    else {
      var h = s, c = s, p = s;
      s.eachBefore(function(g) {
        g.x < h.x && (h = g), g.x > c.x && (c = g), g.depth > p.depth && (p = g);
      });
      var d = h === c ? 1 : t(h, c) / 2, _ = d - h.x, y = e / (c.x + d + _), C = n / (p.depth || 1);
      s.eachBefore(function(g) {
        g.x = (g.x + _) * y, g.y = g.depth * C;
      });
    }
    return s;
  }
  function o(s) {
    var f = s.children, h = s.parent.children, c = s.i ? h[s.i - 1] : null;
    if (f) {
      so(s);
      var p = (f[0].z + f[f.length - 1].z) / 2;
      c ? (s.z = c.z + t(s._, c._), s.m = s.z - p) : s.z = p;
    } else
      c && (s.z = c.z + t(s._, c._));
    s.parent.A = u(s, c, s.parent.A || h[0]);
  }
  function a(s) {
    s._.x = s.z + s.parent.m, s.m += s.parent.m;
  }
  function u(s, f, h) {
    if (f) {
      for (var c = s, p = s, d = f, _ = c.parent.children[0], y = c.m, C = p.m, g = d.m, R = _.m, S; d = dt(d), c = pt(c), d && c; )
        _ = pt(_), p = dt(p), p.a = s, S = d.z + g - c.z - y + t(d._, c._), S > 0 && (ao(uo(d, s, h), s, S), y += S, C += S), g += d.m, y += c.m, R += _.m, C += p.m;
      d && !dt(p) && (p.t = d, p.m += g - C), c && !pt(_) && (_.t = c, _.m += y - R, h = s);
    }
    return h;
  }
  function l(s) {
    s.x *= e, s.y = s.depth * n;
  }
  return i.separation = function(s) {
    return arguments.length ? (t = s, i) : t;
  }, i.size = function(s) {
    return arguments.length ? (r = !1, e = +s[0], n = +s[1], i) : r ? null : [e, n];
  }, i.nodeSize = function(s) {
    return arguments.length ? (r = !0, e = +s[0], n = +s[1], i) : r ? [e, n] : null;
  }, i;
}
function I(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
I.prototype = {
  constructor: I,
  scale: function(t) {
    return t === 1 ? this : new I(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new I(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
new I(1, 0, 0);
I.prototype;
const co = {
  name: "Sig",
  value: 10,
  type: "yellow",
  level: "yellow",
  children: [
    {
      name: "Cain",
      value: 10,
      type: "grey",
      level: "red"
    },
    {
      name: "Seth",
      value: 10,
      type: "grey",
      level: "red",
      children: [
        {
          name: "Enos",
          value: 7.5,
          type: "grey",
          level: "purple"
        },
        {
          name: "Noam",
          value: 7.5,
          type: "grey"
        }
      ]
    },
    {
      name: "Abel",
      value: 10,
      type: "grey",
      level: "blue"
    },
    {
      name: "Awan",
      value: 10,
      type: "grey",
      level: "green",
      children: [
        {
          name: "Enoch",
          value: 7.5,
          type: "grey",
          level: "orange"
        }
      ]
    },
    {
      name: "Azura",
      value: 10,
      type: "grey",
      level: "green"
    }
  ]
}, b = { top: 20, right: 90, bottom: 30, left: 90 }, we = 660 - b.left - b.right, xe = 500 - b.top - b.bottom, ho = fo().size([xe, we]);
let st = Et(co, (t) => t.children);
st = ho(st);
const po = ir("body").append("svg").attr("width", we + b.left + b.right).attr("height", xe + b.top + b.bottom), me = po.append("g").attr("transform", "translate(" + b.left + "," + b.top + ")");
me.selectAll(".link").data(st.descendants().slice(1)).enter().append("path").attr("class", "link").style("stroke", (t) => t.data.level).attr("d", (t) => "M" + t.y + "," + t.x + "C" + (t.y + t.parent.y) / 2 + "," + t.x + " " + (t.y + t.parent.y) / 2 + "," + t.parent.x + " " + t.parent.y + "," + t.parent.x);
const ve = me.selectAll(".node").data(st.descendants()).enter().append("g").attr("class", (t) => "node" + (t.children ? " node--internal" : " node--leaf")).attr("transform", (t) => "translate(" + t.y + "," + t.x + ")");
ve.append("circle").attr("r", (t) => t.data.value).style("stroke", (t) => t.data.type).style("fill", (t) => t.data.level);
ve.append("text").attr("dy", ".35em").attr("x", (t) => t.children ? (t.data.value + 5) * -1 : t.data.value + 5).attr("y", (t) => t.children && t.depth !== 0 ? -(t.data.value + 5) : t).style("text-anchor", (t) => t.children ? "end" : "start").text((t) => t.data.name);
