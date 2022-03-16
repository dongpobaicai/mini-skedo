export default {
  group: "container",
  name: "article",
  imageUrl: "article",
  title: "章节",
  defaultProps: {},
  style: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  url: "local.article",
  box : {
    width : 1500
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
  intrinsic: true,
};
