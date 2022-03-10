import Emiter from "./Emiter";

/**
 *
 * S => A => S
 *
 */
type StateTransferFunction = (...args: Array<any>) => void;
export default class StateMachine<S extends number | string, A extends number | string, Topic extends number | string> extends Emiter<Topic> {
  private state: S;
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>;
  constructor(initialState: S) {
    super();
    this.state = initialState;
    this.transferTable = new Map();
  }
  private addStateTransfer(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map());
    }
    const subMap = this.transferTable.get(from);
    subMap?.set(action, [fn, to]);
  }
  /**
   * 注册状态事件
   */
  public register(from: S | S[], to: S, action: A, fn: StateTransferFunction) {
    if (Array.isArray(from)) {
      from.forEach((state) => {
        this.addStateTransfer(state, to, action, fn);
      });
    } else {
      this.addStateTransfer(from, to, action, fn);
    }
  }
  /**
   * 触发动作修改状态
   */
  public dispatch(action: A, ...data: Array<any>) {
    const transferTableMap = this.transferTable.get(this.state);
    if (!transferTableMap) {
      return false;
    }
    if (!transferTableMap.has(action)) {
      return false;
    }
    const [fn, nextS] = transferTableMap.get(action)!;
    fn(...data);
    this.state = nextS;
    while (this.dispatch(0 as A, ...data)) while (this.dispatch("<auto>" as A, ...data)) return true;
  }
}
