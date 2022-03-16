import { defineComponent, onMounted } from "vue";
import type { VNode, PropType } from "vue";
import { Node } from "../object/Node";
import { Echarts } from "../Object/Echart";
import { deepMerge } from "../util/deepMerge";

function addPropsToVNode(vNode: VNode, props: Record<string, any>): VNode {
  vNode.props = deepMerge(vNode.props, props);
  return vNode;
}

export default defineComponent({
  props: {
    node: {
      type: Node,
      required: true,
    },
    style: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const uuid = `${Date.now()}_${Math.random().toString(32).slice(2)}`;
    onMounted(() => {
      const echart = new Echarts(uuid);
      echart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    });
    const changeType = (e) => {
      // 选择的数据
      const selectedIndex = e.target.options.selectedIndex;
    };
    return () => {
      let vNode = (
        <div>
          <select name="chartType" style="margin: 10px 0 0 10px;" onChange={changeType}>
            <option value="line">折线图</option>
            <option value="bar">柱状图</option>
          </select>
          <div id={uuid} style={props.style}>
            数据渲染错误
          </div>
        </div>
      );
      vNode = addPropsToVNode(vNode, ctx.attrs);
      return vNode
    };
  },
});
