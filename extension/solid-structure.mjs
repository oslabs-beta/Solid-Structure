import { createRoot as A, createRenderEffect as m, sharedConfig as a, createSignal as $, createComponent as h, Show as b } from "solid-js";
function B(i, t, e) {
  let l = e.length, o = t.length, s = l, d = 0, n = 0, f = t[o - 1].nextSibling, c = null;
  for (; d < o || n < s; ) {
    if (t[d] === e[n]) {
      d++, n++;
      continue;
    }
    for (; t[o - 1] === e[s - 1]; )
      o--, s--;
    if (o === d) {
      const r = s < l ? n ? e[n - 1].nextSibling : e[s - n] : f;
      for (; n < s; )
        i.insertBefore(e[n++], r);
    } else if (s === n)
      for (; d < o; )
        (!c || !c.has(t[d])) && t[d].remove(), d++;
    else if (t[d] === e[s - 1] && e[n] === t[o - 1]) {
      const r = t[--o].nextSibling;
      i.insertBefore(e[n++], t[d++].nextSibling), i.insertBefore(e[--s], r), t[o] = e[s];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let g = n;
        for (; g < s; )
          c.set(e[g], g++);
      }
      const r = c.get(t[d]);
      if (r != null)
        if (n < r && r < s) {
          let g = d, v = 1, _;
          for (; ++g < o && g < s && !((_ = c.get(t[g])) == null || _ !== r + v); )
            v++;
          if (v > r - n) {
            const N = t[d];
            for (; n < r; )
              i.insertBefore(e[n++], N);
          } else
            i.replaceChild(e[n++], t[d++]);
        } else
          d++;
      else
        t[d++].remove();
    }
  }
}
const w = "_$DX_DELEGATE";
function L(i, t, e) {
  let l;
  return A((o) => {
    l = o, t === document ? i() : C(t, i(), t.firstChild ? null : void 0, e);
  }), () => {
    l(), t.textContent = "";
  };
}
function p(i, t, e) {
  const l = document.createElement("template");
  if (l.innerHTML = i, t && l.innerHTML.split("<").length - 1 !== t)
    throw `The browser resolved template HTML does not match JSX input:
${l.innerHTML}

${i}. Is your HTML properly formed?`;
  let o = l.content.firstChild;
  return e && (o = o.firstChild), o;
}
function T(i, t = window.document) {
  const e = t[w] || (t[w] = /* @__PURE__ */ new Set());
  for (let l = 0, o = i.length; l < o; l++) {
    const s = i[l];
    e.has(s) || (e.add(s), t.addEventListener(s, I));
  }
}
function C(i, t, e, l) {
  if (e !== void 0 && !l && (l = []), typeof t != "function")
    return y(i, t, l, e);
  m((o) => y(i, t(), o, e), l);
}
function I(i) {
  const t = `$$${i.type}`;
  let e = i.composedPath && i.composedPath()[0] || i.target;
  for (i.target !== e && Object.defineProperty(i, "target", {
    configurable: !0,
    value: e
  }), Object.defineProperty(i, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }), a.registry && !a.done && (a.done = !0, document.querySelectorAll("[id^=pl-]").forEach((l) => l.remove())); e !== null; ) {
    const l = e[t];
    if (l && !e.disabled) {
      const o = e[`${t}Data`];
      if (o !== void 0 ? l.call(e, o, i) : l.call(e, i), i.cancelBubble)
        return;
    }
    e = e.host && e.host !== e && e.host instanceof Node ? e.host : e.parentNode;
  }
}
function y(i, t, e, l, o) {
  for (a.context && !e && (e = [...i.childNodes]); typeof e == "function"; )
    e = e();
  if (t === e)
    return e;
  const s = typeof t, d = l !== void 0;
  if (i = d && e[0] && e[0].parentNode || i, s === "string" || s === "number") {
    if (a.context)
      return e;
    if (s === "number" && (t = t.toString()), d) {
      let n = e[0];
      n && n.nodeType === 3 ? n.data = t : n = document.createTextNode(t), e = u(i, e, l, n);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  } else if (t == null || s === "boolean") {
    if (a.context)
      return e;
    e = u(i, e, l);
  } else {
    if (s === "function")
      return m(() => {
        let n = t();
        for (; typeof n == "function"; )
          n = n();
        e = y(i, n, e, l);
      }), () => e;
    if (Array.isArray(t)) {
      const n = [], f = e && Array.isArray(e);
      if (S(n, t, e, o))
        return m(() => e = y(i, n, e, l, !0)), () => e;
      if (a.context) {
        for (let c = 0; c < n.length; c++)
          if (n[c].parentNode)
            return e = n;
      }
      if (n.length === 0) {
        if (e = u(i, e, l), d)
          return e;
      } else
        f ? e.length === 0 ? x(i, n, l) : B(i, e, n) : (e && u(i), x(i, n));
      e = n;
    } else if (t instanceof Node) {
      if (a.context && t.parentNode)
        return e = d ? [t] : t;
      if (Array.isArray(e)) {
        if (d)
          return e = u(i, e, l, t);
        u(i, e, null, t);
      } else
        e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    } else
      console.warn("Unrecognized value. Skipped inserting", t);
  }
  return e;
}
function S(i, t, e, l) {
  let o = !1;
  for (let s = 0, d = t.length; s < d; s++) {
    let n = t[s], f = e && e[s];
    if (n instanceof Node)
      i.push(n);
    else if (!(n == null || n === !0 || n === !1))
      if (Array.isArray(n))
        o = S(i, n, f) || o;
      else if (typeof n == "function")
        if (l) {
          for (; typeof n == "function"; )
            n = n();
          o = S(i, Array.isArray(n) ? n : [n], f) || o;
        } else
          i.push(n), o = !0;
      else {
        const c = String(n);
        f && f.nodeType === 3 && f.data === c ? i.push(f) : i.push(document.createTextNode(c));
      }
  }
  return o;
}
function x(i, t, e) {
  for (let l = 0, o = t.length; l < o; l++)
    i.insertBefore(t[l], e);
}
function u(i, t, e, l) {
  if (e === void 0)
    return i.textContent = "";
  const o = l || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let d = t.length - 1; d >= 0; d--) {
      const n = t[d];
      if (o !== n) {
        const f = n.parentNode === i;
        !s && !d ? f ? i.replaceChild(o, n) : i.insertBefore(o, e) : f && n.remove();
      } else
        s = !0;
    }
  } else
    i.insertBefore(o, e);
  return [o];
}
const H = /* @__PURE__ */ p('<div id="header"><h2>Solid Structure (SolidJS)</h2><div id="iconbox"><orientationIcon></orientationIcon></div></div>', 8), M = () => H.cloneNode(!0);
const R = /* @__PURE__ */ p('<div id="inspect"><div id="logHead"><button id="recordButton">Record</button><button id="resetButton">Reset</button></div><div id="history"><div id="Update_Location"> </div><div id="Update_Location"> </div></div></div>', 14), D = (i) => {
  const [t, e] = $(!1), [l, o] = $(!1), s = (n) => {
    n.preventDefault(), t() ? e(!1) : e(!0);
  }, d = (n) => {
    l() ? o(!1) : (o(!0), i.setCache((f) => f));
  };
  return (() => {
    const n = R.cloneNode(!0), f = n.firstChild, c = f.firstChild, r = c.nextSibling;
    return c.$$click = s, r.$$click = d, n;
  })();
};
T(["click"]);
const P = /* @__PURE__ */ p('<div id="graphContainer"><div id="containerDep"></div><div id="containerStr"></div></div>', 6), E = () => P.cloneNode(!0);
const O = /* @__PURE__ */ p('<div id="navbar"><div id="navbar-btns"><div class="tab active" id="inspector">Inspector</div><div class="tab" id="graph">Graph</div><div class="tab" id="logmonitor">Log Monitor</div></div></div>', 10), G = (i) => {
  const t = (e) => {
    const l = ["inspector", "graph", "logmonitor"];
    i.setTab((o) => (e.target.id === "inspector" ? o = "inspector" : e.target.id === "graph" ? o = "graph" : e.target.id === "logmonitor" && (o = "logmonitor"), l.forEach((s) => {
      o !== s ? document.getElementById(s).classList.remove("active") : document.getElementById(s).classList.add("active");
    }), o));
  };
  return (() => {
    const e = O.cloneNode(!0), l = e.firstChild, o = l.firstChild, s = o.nextSibling, d = s.nextSibling;
    return o.$$click = t, s.$$click = t, d.$$click = t, e;
  })();
};
T(["click"]);
const U = /* @__PURE__ */ p('<div id="randomContainer"></div>', 2), j = /* @__PURE__ */ p('<div id="display"></div>', 2), q = (i) => {
  const [t, e] = $("inspector"), [l, o] = $({});
  return [h(M, {}), (() => {
    const s = j.cloneNode(!0);
    return C(s, h(b, {
      get when() {
        return t() === "inspector";
      },
      get children() {
        return [h(D, {
          get cache() {
            return l();
          },
          setCache: o
        }), h(E, {})];
      }
    }), null), C(s, h(b, {
      get when() {
        return t() === "graph";
      },
      get children() {
        return [U.cloneNode(!0), h(E, {})];
      }
    }), null), s;
  })(), h(G, {
    setTab: e
  })];
};
L(() => h(q, {}), document.getElementById("root"));
