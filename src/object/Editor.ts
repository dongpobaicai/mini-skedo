import { Actions, Meta, States } from "./editor.types";
import { Node } from "./Node";
import StateMachine from "./StateMachine";
import { Topics } from "./Topics";


export class Editor extends StateMachine<States, Actions, Topics> {
  private root: Node;

  constructor() {
    // 设置状态机开始状态
    super(States.Start);
    this.root = new Node("root", 0, 0, 800, 800);

    this.describeAddComponent();
    this.describeDrag();
  }

  private describeDrag() {
    let dragNode: Node;
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, (node: Node) => {
      dragNode = node;
    });

    this.register(States.DragStart, States.Stoped, Actions.EvtDragEnd, (vec: [number, number]) => {
      dragNode!.setXY(vec);
      dragNode!.emit(Topics.NodePositionMoved);
    });

    this.register(States.Stoped, States.Start, Actions.AUTO, () => {});
  }

  /**
   * 描述添加组件过程
   */
  private describeAddComponent() {
    let componentToPlace: Meta | null = null;
    let addVector: [number, number] = [0, 0];
    // Start => StartAddComponent => PlacingComponent

    // 开始拖拽动作
    this.register(States.Start, States.PlacingComponent, Actions.StartAddComponent, (meta) => {
      componentToPlace = meta;
    });
    // 拖拽平移操作
    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (vec: [number, number]) => {
      addVector = vec;
    });
    // 拖拽结束
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, () => {
      if (!componentToPlace) {
        throw new Error("no component to create");
      }
      const node = new Node(componentToPlace.type, addVector[0] - componentToPlace.w / 2 - 100, addVector[1] - componentToPlace.h / 2, componentToPlace.w, componentToPlace.h);

      this.root.add(node);
      this.root.emit(Topics.NodeChildrenUpdated);
    });

    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log("auto reset state");
    });
  }
  public getRoot() {
    return this.root;
  }
}
