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
      child: this._children[name]
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
    if (this._children[name]) {
      console.warn(
        'Only a single Gateway can be rendered at a time into a GatewayDest.' +
        `You rendered multiple into "${name}"`
      );
    }
    this._children[name] = child;
    this._renderContainer(name);
  }

  removeChild(name) {
    this._children[name] = null;
    this._renderContainer(name);
  }
}
