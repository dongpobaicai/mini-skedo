import classes from "./drag-drop.module.less";

import metas from "../object/Metas";
import { Actions } from "../object/editor.types";
import { Editor } from "../object/Editor";

export default ({ editor }: { editor: Editor }) => {
  return (
    <div class={classes["item-list"]}>
      {metas.map((item) => {
        return (
          <div
            draggable={true}
            onDragstart={(e) => {
              editor.dispatch(Actions.StartAddComponent, item);
            }}
            class={classes["item"]}
            key={item.type}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};
