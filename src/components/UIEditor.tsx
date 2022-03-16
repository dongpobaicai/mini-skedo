import { defineComponent, provide } from "vue";
import classes from "./drag-drop.module.less";
import ItemList from "./ItemList";
import { Panel } from './Panel'
import PropEditor from './PropEditor'
import { Editor } from '../object/Editor'
import { ComponentsLoader } from "../loader";

export default defineComponent({
  setup() {
    const editor = new Editor(ComponentsLoader.get())
    provide('editor', editor)
    return () => {
      return (
        <div class={classes.page}>
          <ItemList editor={editor} />
          <Panel editor={editor} />
          <PropEditor editor={editor} />
        </div>
      );
    };
  },
});
