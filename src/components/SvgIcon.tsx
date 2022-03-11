import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return () => {
      return (
        <svg aria-hidden={true}>
          <use href={symbolId.value} fill={props.color} />
        </svg>
      );
    };
  },
});
