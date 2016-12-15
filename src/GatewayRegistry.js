export default class GatewayRegistry {
  constructor() {
    this._containers = {};
    this._children = {};
  }

  _renderContainer(name) {
    if (!this._containers[name] || !this._children[name]) {
      return;
    }

    this._containers[name].setState({
      children: Object.keys(this._children[name]).sort((a, b) => a < b).map(id => this._children[name][id])
    });
  }

  addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._containers[name] = null;
  }

  addChild(name, gatewayId, child) {
    this._children[name][gatewayId] = child;
    this._renderContainer(name);
  }

  clearChild(name, gatewayId) {
    delete this._children[name][gatewayId];
  }

  register(name, child) {
    this._children[name] = this._children[name] || {};

    const gatewayId = '' + Object.keys(this._children[name]).length;
    this._children[name][gatewayId] = child;
    return gatewayId;
  }

  unregister(name, gatewayId) {
    this.clearChild(name, gatewayId);
    this._renderContainer(name);
  }
}
