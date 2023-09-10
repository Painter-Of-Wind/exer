<template>
  <div className="react-shape-app">
    <h1>x6-html-shape demo for vue</h1>
    <Provider />
    <div className="app-content" ref="container"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, h, inject } from "vue";
import { Graph } from "@antv/x6";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { register } from "x6-html-shape";
// import { register } from "x6-html-shape/dist/fobject";
import createRender from "x6-html-shape/dist/vue";
import createTeleportRender from "x6-html-shape/dist/teleport";

// import { register } from "./html";
// import createRender from "./vue";
// import createTeleportRender from "./teleport";

const CustomComponent = defineComponent({
  name: "Node",
  props: ["node", "graph"],
  inject: ["getNode"],
  setup({ node, graph }) {
    // console.log("node", node, graph);
    // const node = inject("getNode")();
    return () => {
      return h(
        "div",
        { class: "custom-vue-node" },
        node.prop("label") || "HelloWorld"
      );
    };
  },
});

// 使用Teleport渲染节点
const [render, Provider] = createTeleportRender(CustomComponent);
register({
  shape: "html-shape-for-vue-teleport",
  render: render,
  width: 200,
  height: 40,
});

const render3 = createRender(CustomComponent);
register({
  shape: "html-shape-for-vue",
  render: render3,
  width: 200,
  height: 40,
});

const data = {
  nodes: [
    {
      id: "node1",
      shape: "html-shape-for-vue-teleport",
      x: 40,
      y: 40,
      label: "html shape for vue teleport",
    },
    {
      id: "node3",
      shape: "html-shape-for-vue-teleport",
      x: 280,
      y: 40,
      label: "html shape for vue teleport",
    },
    {
      id: "node2",
      shape: "html-shape-for-vue",
      x: 160,
      y: 180,
      label: "html shape for vue",
    },
  ],
  edges: [
    {
      shape: "edge",
      source: "node1",
      target: "node2",
      label: "x6",
      attrs: {
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ],
};

export default {
  name: "App",
  components: {
    Provider,
  },
  setup() {
    const container = ref();
    const graph = ref();
    onMounted(() => {
      // console.log("container", container.value);
      if (container.value) {
        graph.value = new Graph({
          container: container.value,
          background: {
            color: "#F2F7FA",
          },
          htight: 600,
          grid: true,
          panning: true,
        });
        graph.value
          .use(
            new Transform({
              resizing: true,
              rotating: true,
            })
          )
          .use(
            new Selection({
              rubberband: true,
              showNodeSelectionBox: true,
            })
          )
          .use(new Snapline());

        graph.value.fromJSON(data);
        graph.value.centerContent();
      }
    });
    return {
      container,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-content {
  flex: 1;
  height: 280px;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 5px;
  box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
}
.custom-vue-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  background: #fff;
}
</style>
