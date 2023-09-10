import { Node as c, NodeView as f, View as a, Dom as h } from "@antv/x6";
import { forwardEvent as T } from "./utils.js";
import { getConfig as x, register as C, FOShapeView as w } from "./fobject.js";
const l = "html-shape-view",
  p = "html-shape",
  v = c.define(x(l)),
  b = (s) => C({ inherit: p, ...s });
class S extends w {
  onMounted() {
    (this.onTranslate = this.updateTransform.bind(this)),
      this.graph.on("translate", this.onTranslate),
      this.graph.on("scale", this.onTranslate),
      this.graph.on("node:change:position", this.onTranslate);
  }
  onUnMount() {
    this.graph.off("translate", this.onTranslate),
      this.graph.off("scale", this.onTranslate),
      this.graph.off("node:change:position", this.onTranslate);
  }
  ensureComponentContainer() {
    if (!this.graph.htmlContainer) {
      const e = (this.graph.htmlContainer = a.createElement("div", !1));
      h.css(e, {
        position: "absolute",
        width: 0,
        height: 0,
        "touch-action": "none",
        "user-select": "none",
        // ensure the node under selection and transform tool.
        "z-index": 0
      }),
        e.classList.add("x6-html-shape-container"),
        this.graph.container.append(e);
    }
    if (!this.componentContainer) {
      const e = (this.componentContainer = a.createElement("div", !1));
      e.classList.add("x6-html-shape-node"),
        "click,dblclick,contextmenu,mousedown,mousemove,mouseup,mouseover,mouseout,mouseenter,mouseleave,mousewheel"
          .split(",")
          .forEach((t) => T(t, e, this.container)),
        this.graph.htmlContainer.append(e);
    }
    return this.componentContainer;
  }
  updateTransform(e) {
    super.updateTransform();
    const o = this.ensureComponentContainer(),
      { x: t, y: m } = this.graph.localToGraph(this.cell.getPosition()),
      { width: i, height: r } = this.cell.getSize(),
      n = this.graph.transform.getZoom(),
      g = getComputedStyle(this.container).cursor,
      d = this.cell.getZIndex(),
      u = this.graph.isSelected(this.cell);
    h.css(o, {
      cursor: g,
      height: r + "px",
      width: i + "px",
      top: m + (r * n) / 2 + "px",
      left: t + (i * n) / 2 + "px",
      position: "absolute",
      // set to front when select node.
      "z-index": u ? 1e9 : d,
      "transform-origin": "center",
      transform: `translate(-50%, -50%) rotate(${this.cell.getAngle()}deg) scale(${n})`
    });
  }
}
f.registry.register(l, S, !0);
c.registry.register(p, v, !0);
export {
  v as HTMLShape,
  p as HTMLShapeName,
  S as HTMLShapeView,
  l as HTMLView,
  b as register
};
