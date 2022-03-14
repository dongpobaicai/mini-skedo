export default {
  group: "basic",
  name: "chart",
  imageUrl: "chart",
  title: "图表块",
  defaultProps: {},
  style: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  url: "local.Button",
  box : {
    width : 1500,
    height : 300,
  },
  editor: {
    groups: [
      {
        name: "border",
        props: [
          {
            name: "border-color",
            default: "#eee",
          },
        ],
      },
    ],
  },
};
