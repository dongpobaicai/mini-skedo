import { ref } from "vue";

import classes from "./drag-drop.module.less";

import { Actions } from "../object/editor.types";
import { Editor } from "../object/Editor";
import SvgIcon from './SvgIcon'

export default ({ editor }: { editor: Editor }) => {
  const metas = ref(editor.getLoader().list);

  return (
    <div class={classes["item-list"]}>
      {metas.value.map((item) => {
        console.log(item)
        return (
          <div
            draggable={true}
            onDragstart={(e) => {
              editor.dispatch(Actions.StartAddComponent, item);
            }}
            class={classes["item"]}
            key={item.name}
          >
            <SvgIcon class={classes["item-icon"]} name={item.imageUrl} color="#c477c9" />
            <span class={classes["item-title"]}>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};
