export default {
  group: "basic",
  name: "textarea",
  imageUrl: "font",
  title: "文本框",
  defaultProps: {
    text: "请输入文本内容",
  },
  style: {
    borderWidth: 1,
    backgroundColor: "white",
  },
  url: "local.textarea",
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
