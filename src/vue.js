import { createApp as u, h as d } from "vue";
function c(r) {
  return function (t, n, o) {
    const e = u({
      render() {
        return d(r);
      },
      provide() {
        return {
          getNode: () => t,
          getGraph: () => n
        };
      }
    });
    return e.mount(o), () => e.unmount();
  };
}
export { c as default };
