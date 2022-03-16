import Emiter from "./Emiter";
import { Topics } from "./Topics";
import ComponentMeta from "./ComponentMeta";
import { Map as ImmutableMap } from "immutable";

/**
 * 利用immutable方便高效操作对象 复制
 */
export class Node extends Emiter<Topics> {
  private metaData: ComponentMeta;
  private nodeData: ImmutableMap<string, any>;

  constructor(
    metaData: ComponentMeta,
    nodeData?: ImmutableMap<string, any> // 节点类型
  ) {
    super();
    this.metaData = metaData;
    this.nodeData = nodeData;
  }

  public add(child: Node) {
    this.nodeData = this.nodeData.update("children", (children: Array<Node>) => {
      children.push(child);
      return children;
    });
  }

  public getType() {
    return this.metaData.name;
  }

  public getBox() {
    return this.nodeData.get("box");
  }
  public getSelect() {
    return this.nodeData.get("selected");  
  }

  public getX() {
    return this.getBox().getLeft();
  }

  public getY() {
    return this.getBox().getTop();
  }

  public getW() {
    return this.getBox().getW();
  }

  public getH() {
    return this.getBox().getH();
  }

  public getChildren() {
    return this.nodeData.get("children");
  }

  public setXY(vec: [number, number]) {
    this.nodeData = this.nodeData.set("left", vec[0] + this.nodeData.get("left")).set("top", vec[1] + this.nodeData.get("top"));
  }
  public setSelect(bool: boolean) {
    this.nodeData = this.nodeData.set("selected", bool)
  }
}
