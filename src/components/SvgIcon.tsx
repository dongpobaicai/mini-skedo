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
    className: {
      type: String
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')
    return () => {
      return (
        <svg aria-hidden={true} class={svgClass.value}>
          <use href={symbolId.value} fill={props.color} />
        </svg>
      );
    };
  },
});
