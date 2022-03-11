# mini-skedo

通过拖拽搭建页面
亮点：

1. 业务模型高度抽象，每一块升级后都可以抽成单独包进行管理
2. 使用 jsx 语法，写起来更加丝滑
3. 使用 typescript，提高项目健壮性和可读性

### 类似 VirtualDOM，代表页面上的一个节点 Node

1. 当前只包含如下属性

```js
{
  type: string, // 节点类型
  x: number, // 坐标
  y: number,
  w: number,
  h: number
}
```

2. 抽象之后

```js
{
  meta: ComponentMeta, // 组件描述配置
  data : NodeData  // 节点实例化之后相关数据
}
```

###  属性编辑器

- 通过ym文件描述一个组件

```
A[拉取组件描述] -->B
B --> {本地的ym资源} --> C[生成ComponentMeta]
B --> {远程的ym资源} --> C[生成ComponentMeta]

[ComponentMeta] + [NodeData] --> D[最终的Node数据]
```

### 节点渲染，通过消息机制实现

- 项目里实现事件监听基类 `Emiter`
- 节点Node继承该基类

```
属性值修改，组件拖拽发布消息      =>    节点Node收到消息，触发render
```

### 对于拖拽，以及后面的选中行为，抽离出来

- 被Draggable包装对象的具有拖拽行为
- 提供状态器 `StateMachine` 描述拖拽过程中节点的状态行为      S --> A --> S  状态通过行为A变成另一个状态
- 增加某些状态自动触发，确保拖拽完成后数据重置
- 增加 `DragValue` 描述拖拽值