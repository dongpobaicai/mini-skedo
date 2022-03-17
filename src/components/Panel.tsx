import { Editor } from "../object/Editor";
import { Actions } from "../object/editor.types";

import { Render } from "./Render";
import classes from "./drag-drop.module.less";

export const Panel = ({ editor }: { editor: Editor }) => {
  return (
    <div
      class={classes.panel}
      onDragover={(e) => {
        // 阻止默认行为
        e.preventDefault();
        editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY]);
      }}
      onDrop={(e) => {
        e.preventDefault();
        editor.dispatch(Actions.EvtDrop);
      }}
    >
      <Render root={editor.getRoot()} editor={editor} />
    </div>
  );
};
