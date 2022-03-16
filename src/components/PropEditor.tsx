import { defineComponent, ref } from "vue";
import { Editor } from "../object/Editor";
import { Node } from "../object/Node";

import classes from "./drag-drop.module.less";
import propClasses from './prop-editor.module.less'
import themeConfig from '../config/theme'

import SvgIcon from "./SvgIcon";


const emptyRender = () => {
  return (
    <div class={propClasses["empty"]}>
      <SvgIcon class={propClasses["icon"]} name="empty" color={themeConfig.color} />
      <p class={propClasses["desc"]}>请点击组件进行属性配置</p>
    </div>
  );
};
const propsRender = (curNode: Node) => {
  return (<div>这是渲染属性面板</div>)
};
export default defineComponent({
  props: {
    editor: {
      type: Editor,
      required: true,
    },
  },
  setup({ editor }) {
    const count = ref(0);
    const curNode = editor.getSelectNode();
    return () => (
      <div key={count.value} class={classes["prop-editor"]}>
        <div class={classes["prop-editor-inner"]}>{curNode ? propsRender(curNode) : emptyRender()}</div>
      </div>
    );
  },
});
