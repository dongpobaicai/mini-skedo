import { defineComponent, inject, ref } from "vue";

import { Node } from "../object/Node";
import { Editor } from "../object/Editor";
import { Actions } from "../object/editor.types";
import { Topics } from "../object/Topics";
import { Draggable } from "./Draggable";

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
    console.log('main render')
    const count = ref(0);
    root.on([Topics.NodeChildrenUpdated]).subscribe(() => {
      count.value++;
    });
    return () => {
      return <Dummy key={count.value} render={() => MainRender(root)} />
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
    case "text":
    case "rect":
    case "image":
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
    <div data-skedo="root">
      {children.map((node, i) => {
        return <Render key={i} node={node} />;
      })}
    </div>
  );
};

const renderItem = (node: Node) => {
  switch (node.getType()) {
    case "image":
      return <img src={"https://img.kaikeba.com/a/83541110301202sxpe.png"} />;
    case "rect":
      return (
        <div
          style={{
            backgroundColor: "yellow",
          }}
        />
      );
    case "text":
      return <h2>这里是文本</h2>;
  }
};

const ItemRenderForDraggable = ({ node }: SkedoComponent) => {
  const editor = inject("editor") as Editor;
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
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
