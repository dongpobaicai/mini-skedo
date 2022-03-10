import Emiter from "./Emiter";
import { Topics } from "./Topics";
import {Map as ImmutableMap, List} from 'immutable'

/**
 * 利用immutable方便高效操作对象 复制
 */
export class Node extends Emiter<Topics> {
  private nodeData: ImmutableMap<string, any>

  constructor(
    type: string, // 节点类型
    x: number, // 坐标
    y: number,
    w: number,
    h: number
  ) {
    super()
    this.nodeData = ImmutableMap({
      type,
      x,
      y,
      w,
      h,
      children : List<Node>() 
    })
  }

  public add(child : Node) {
    this.nodeData = this.nodeData.update('children', (children: Array<Node>) => {
      return children.push(child)
    })
  }

  public getType() {
		return this.nodeData.get('type')
	}

	public getX(){
		return this.nodeData.get('x')
	}

	public getY(){
		return this.nodeData.get('y')
	}

	// public getW(){
	// 	return this.nodeData.get('w')
	// }

	// public getH() {
	// 	return this.nodeData.get('h')
	// }

  public getChildren() {
		return this.nodeData.get('children').toJS() as Node[]
	}

  // public setXY(vec : [number, number]) {
  //   this.nodeData = this.nodeData
  //     .set("x", vec[0] + this.nodeData.get("x"))
  //     .set("y", vec[1] + this.nodeData.get("y"))
  // }
}