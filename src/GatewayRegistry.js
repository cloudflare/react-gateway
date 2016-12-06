export default class GatewayRegistry {
  constructor() {
    this._containers = {};
    this._children = {};
  }

  _renderContainer(name) {
    if (!this._containers[name]) {
      return;
    }

    this._containers[name].setState({
      children: this._children[name]
    });
  }

  addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._containers[name] = null;
  }

  addChild(name, child) {
    this._children[name] = this._children[name] || [];
    this._children[name].push(child);
    this._renderContainer(name);
  }

  clearChild(name, child) {
    this._children[name] = this._children[name].filter(item => item !== child);
  }

  removeChild(name, child) {
    this.clearChild(name, child);
    this._renderContainer(name);
  }
}
