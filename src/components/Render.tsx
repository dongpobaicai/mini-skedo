import { defineComponent, inject, ref } from "vue";

import { Node } from "../object/Node";
import { Editor } from "../object/Editor";
import { Actions } from "../object/editor.types";
import { Topics } from "../object/Topics";
import { Draggable } from "./Draggable";

import classes from "./drag-drop.module.less";

type SkedoComponent = {
  node: Node;
};

export const Render = defineComponent({
  props: {
    root: {
      type: Node,
      required: true,
    },
  },
  setup({ root }: { root: Node }) {
    const count = ref(0);
    root.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved]).subscribe(() => {
      count.value++;
    });
    return () => {
      return <Dummy key={count.value} render={() => MainRender(root)} />;
    };
  },
});

function Dummy({ render }: { render: () => JSX.Element }) {
  return render();
}
function MainRender(node: Node) {
  switch (node.getType()) {
    case "root":
      return <Root node={node} />;
    case "article":
      return <ItemRenderForDraggable node={node} />;
    default:
      throw new Error(`unsupported node type:${node.getType()}`);
  }
}

/**
 * 渲染
 * @param param
 * @returns
 */
const Root = ({ node }: SkedoComponent) => {
  const children = node.getChildren();
  return (
    <div data-skedo="root" class={classes['root']}>
      {children.map((node, i) => {
        return <Render key={i} root={node} />;
      })}
    </div>
  );
};

const renderItem = (node: Node) => {
  switch (node.getType()) {
    case "article":
      return (
        <div
          contenteditable="true"
          style={{
            height: node.getH() + "px",
            margin: '10px',
            padding: '10px',
            border: '1px solid #333'
          }}
        />
      );
  }
};

const ItemRenderForDraggable = ({ node }: SkedoComponent) => {
  const editor = inject("editor") as Editor;
  return (
    <Draggable
      onDragstart={() => {
        editor.dispatch(Actions.EvtDragStart, node);
      }}
      onDragend={(vec) => {
        editor.dispatch(Actions.EvtDragEnd, vec);
      }}
    >
      {renderItem(node)}
    </Draggable>
  );
};
