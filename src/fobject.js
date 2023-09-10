import { Node as c, NodeView as h, Graph as a, Markup as d } from "@antv/x6";
const i = "fo-shape-view",
  u = "fo-shape";
function f(n = "rect", e = !0) {
  return [
    {
      tagName: n,
      selector: "body"
    },
    e ? d.getForeignObjectMarkup() : null,
    {
      tagName: "text",
      selector: "label"
    }
  ].filter((t) => t);
}
function m(n) {
  return {
    view: n,
    markup: f("rect", n === i),
    attrs: {
      body: {
        // fill: "none",
        // 这里很奇怪，none的时候不能触发节点移动，改成transparent可以触发
        fill: "transparent",
        stroke: "none",
        refWidth: "100%",
        refHeight: "100%"
      },
      label: {
        fontSize: 14,
        fill: "#333",
        refX: "50%",
        refY: "50%",
        textAnchor: "middle",
        textVerticalAnchor: "middle"
      },
      fo: {
        refWidth: "100%",
        refHeight: "100%"
      }
    },
    propHooks(e) {
      if (e.markup == null) {
        const { primer: t, view: o } = e;
        if (t && t !== "rect") {
          e.markup = f(t, o === i);
          let r = {};
          t === "circle"
            ? (r = {
                refCx: "50%",
                refCy: "50%",
                refR: "50%"
              })
            : t === "ellipse" &&
              (r = {
                refCx: "50%",
                refCy: "50%",
                refRx: "50%",
                refRy: "50%"
              }),
            (e.attrs = ObjectExt.merge(
              {},
              {
                body: {
                  refWidth: null,
                  refHeight: null,
                  ...r
                }
              },
              e.attrs || {}
            ));
        }
      }
      return e;
    }
  };
}
const g = c.define(m(i)),
  l = {};
function y(n) {
  const { shape: e, render: t, inherit: o = u, ...r } = n;
  if (!e) throw new Error("should specify shape in config");
  (l[e] = t),
    a.registerNode(
      e,
      {
        inherit: o,
        ...r
      },
      !0
    );
}
const s = "html";
class p extends h {
  confirmUpdate(e) {
    const t = super.confirmUpdate(e);
    return this.handleAction(t, s, () => {
      if (!this.mounted) {
        const o = l[this.cell.shape],
          r = this.ensureComponentContainer();
        o &&
          r &&
          ((this.mounted = o(this.cell, this.graph, r) || !0),
          this.onMounted());
      }
    });
  }
  ensureComponentContainer() {
    return this.selectors.foContent;
  }
  onMounted() {}
  onUnMount() {}
  unmount() {
    return (
      typeof this.mounted == "function" && this.mounted(),
      this.componentContainer && this.componentContainer.remove(),
      this.onUnMount(),
      this
    );
  }
}
p.config({
  bootstrap: [s],
  actions: {
    component: s
  }
});
h.registry.register(i, p, !0);
c.registry.register(u, g, !0);
export {
  g as FOShape,
  u as FOShapeName,
  p as FOShapeView,
  i as FOView,
  s as action,
  m as getConfig,
  y as register
};
