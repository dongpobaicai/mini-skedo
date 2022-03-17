import { defineComponent, inject, ref } from "vue";

import { Node } from "../object/Node";
import { Editor } from "../object/Editor";
import { Actions } from "../object/editor.types";
import { Topics } from "../object/Topics";
import { BoxMeta } from "../object/BoxMeta";
import { Draggable } from "./Draggable";
import EchartRender from "./EchartRender";

import { ComponentsLoader } from "../loader";

import classes from "./drag-drop.module.less";

import { Plus } from "@element-plus/icons-vue";

type SkedoComponent = {
  node: Node;
};

export const Render = defineComponent({
  props: {
    root: {
      type: Node,
      required: true,
    },
    editor: {
      type: Editor
    },
  },
  setup({ root, editor }: { root: Node; editor: Editor }) {
    const count = ref(0);
    root.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved, Topics.NodeChildrenSelected]).subscribe(() => {
      count.value++;
    });
    return () => {
      return <Dummy key={count.value} render={() => MainRender(root, editor)} />;
    };
  },
});

function Dummy({ render }: { render: () => JSX.Element }) {
  return render();
}
function MainRender(node: Node, editor: Editor) {
  switch (node.getType()) {
    case "root":
      return <Root node={node} editor={editor} />;
    case "article":
      return <Article node={node} />;
    case "textarea":
    case "chart":
      return <ItemRenderForDraggable node={node} />;
    default:
      throw new Error(`unsupported node type:${node.getType()}`);
  }
}

/**
 * 添加
 */
const addArticle = (editor: Editor) => {
  if (!editor) {
    throw new Error('编辑器结构异常')
  }
  const article = ComponentsLoader.get().loadByName("container", "article");
  const box = new BoxMeta({
    left: 0,
    top: 0,
    width: article.box.getW(),
    height: article.box.getH(),
  });
  const node = new Node(article, article.createData(editor.createId(), box));
  const root = editor.getRoot()
  root.add(node);
  root.emit(Topics.NodeChildrenUpdated);
  console.log("article", article);
};
/**
 * 根节点空白状态
 */
const RootEmpty = (editor: Editor) => {
  return (
    <div class={classes["root-empty"]}>
      <el-button type="primary" icon={Plus} onClick={() => addArticle(editor)}>
        添加章节
      </el-button>
      <p>快快添加章节，拖拽组件吧</p>
    </div>
  );
};
/**
 * 根节点渲染
 * @param children
 * @returns
 */
const RootRender = (children: Node[], editor: Editor) => {
  return (
    <>
      {children.map((node, i) => {
        return <Render key={i} root={node} editor={editor} />;
      })}
      <el-button type="primary" style="margin-left: 20px;" icon={Plus} onClick={() => addArticle(editor)}>
        添加章节
      </el-button>
    </>
  );
};
/**
 * 渲染
 * @param param
 * @returns
 */
const Root = ({ node, editor }: { node: Node; editor: Editor }) => {
  const children = node.getChildren();
  return (
    <div data-skedo="root" class={classes["root"]}>
      {children.length ? RootRender(children, editor) : RootEmpty(editor)}
    </div>
  );
};

/**
 * 文章组件
 * @param param
 */
const Article = ({ node }: SkedoComponent) => {
  const children = node.getChildren();
  return (
    <div data-skedo="article" class="">
      <h3 style="text-align: center;">这是一段很长的标题</h3>
      <div>
        {children.map((node, i) => {
          return <Render key={i} root={node} />;
        })}
      </div>
    </div>
  );
};

/**
 * 渲染子组件
 * @param node
 * @returns
 */
const renderItem = (node: Node) => {
  switch (node.getType()) {
    case "article":
      return (
        <div
          contenteditable="true"
          style={{
            height: node.getH() + "px",
            margin: "10px",
            padding: "10px",
            border: "1px solid #333",
            backgroundColor: "#fff",
          }}
        />
      );
    case "chart":
      return (
        <EchartRender
          node={node}
          style={{
            height: node.getH() + "px",
            margin: "10px",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        />
      );
  }
};

const ItemRenderForDraggable = ({ node }: SkedoComponent) => {
  const editor = inject("editor") as Editor;
  return (
    <Draggable
      class={node.getSelect() ? classes["component-selected"] : ""}
      onDragstart={() => {
        editor.dispatch(Actions.EvtDragStart, node);
      }}
      onDragend={(vec) => {
        editor.dispatch(Actions.EvtDragEnd, vec);
      }}
      onClick={() => {
        editor.dispatch(Actions.SelectedComponent, node);
      }}
    >
      {renderItem(node)}
    </Draggable>
  );
};
