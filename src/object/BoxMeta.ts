export type BoxConfig = {
  left: number;
  top: number;
  width: number;
  height: number;
  container?: boolean;
};

export class BoxMeta {
  private left: number;
  private top: number;
  private width: number;
  private height: number;
  private container: boolean;
  constructor(config: BoxConfig) {
    this.left = config.left || 0;
    this.top = config.top || 0;
    this.width = config.width;
    this.height = config.height;
    this.container = config.container;
  }
  getLeft(): number {
    return this.left
  }
  getTop(): number {
    return this.top
  }
  getW(): number {
    return this.width
  }
  getH(): number {
    return this.height
  }
}
