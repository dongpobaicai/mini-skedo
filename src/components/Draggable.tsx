import { defineComponent, ref } from "vue";
import type { VNode, PropType } from "vue";

import { deepMerge } from "../util/deepMerge";
import DragValue from '../object/DragValue';

function addPropsToVNode(vNode: VNode, props: Record<string, any>): VNode {
  vNode.props = deepMerge(vNode.props, props);
  return vNode;
}

/**
 * 返回拖拽事件和偏移量
 * @param param
 */
function useDrag({ onDragstart, onDragend }: { onDragstart?: () => void; onDragend?: (vec: [number, number]) => void }) {
  const dragValue = new DragValue()
  const diffX = ref(dragValue.getDiffX())
  const diffY = ref(dragValue.getDiffY())
  const handlers = {
    onDragstart: (e: DragEvent) => {
      dragValue.start(e)
      onDragstart && onDragstart()
    },
    onDrag: (e: DragEvent) => {
      dragValue.update(e)
      diffX.value = dragValue.getDiffX()
      diffY.value = dragValue.getDiffY()
    },
    onDragend: (e: DragEvent) => {
      dragValue.update(e)
      onDragend && onDragend([dragValue.getDiffX(), dragValue.getDiffY()])
    }
  }
  return {
    handlers,
    diffX,
    diffY
  }
}

export const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>,
    },
    onDragstart: {
      type: Function as PropType<() => void>,
    },
    onDragend: {
      type: Function as PropType<(vec: [number, number]) => void>,
    },
  },
  setup(props, ctx) {
    const { handlers, diffX, diffY } = useDrag({
      onDragstart: props.onDragstart,
      onDragend: props.onDragend,
    });
    return () => {
      let vNode = ctx.slots.default!()[0];
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        Draggable: true,
        style: {
          position: "absolute",
          left: (props.initialPosition?.[0] || 0) + "px",
          top: (props.initialPosition?.[1] || 0) + "px",
          transform: `translate(${diffX.value}px, ${diffY.value}px)`,
        },
      });
      return vNode;
    };
  },
});
