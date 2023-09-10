import {
  reactive as s,
  defineComponent as i,
  h as r,
  Fragment as u,
  markRaw as p,
  Teleport as f
} from "vue";
function l(d) {
  const t = s({});
  function c(e, n, m) {
    const o = `${n.view.cid}:${e.id}`;
    return (
      (t[o] = p(
        i({
          render: () => r(f, { to: m }, [r(d, { node: e, graph: n })]),
          provide: () => ({
            getNode: () => e,
            getGraph: () => n
          })
        })
      )),
      () => {
        delete t[o];
      }
    );
  }
  const a = i({
    setup() {
      return () =>
        r(
          u,
          {},
          Object.keys(t).map((e) => r(t[e]))
        );
    }
  });
  return [c, a];
}
export { l as default };
