export default {
  group: "basic",
  name: "article",
  imageUrl: "article",
  title: "章节",
  defaultProps: {
    text: "点我",
  },
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
