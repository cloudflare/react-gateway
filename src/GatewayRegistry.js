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

  _cleanupContainer(name) {
    this._containers[name].setState({
      children: []
    });
  }

  addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name, container) {
    this._containers[name] = null;
    this._cleanupContainer(name);
  }

  addChild(name, child) {
    if (!this._children[name]) {
      this._children[name] = [];
    }

    this._children[name] = this._children[name].concat(child);
    this._renderContainer(name);
  }

  removeChild(name, child) {
    this._children[name] = this._children[name].filter(c => c !== child);
  }
}
