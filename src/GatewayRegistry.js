export default class GatewayRegistry {
  constructor() {
    this._setContainerChildrenFns = {};
    this._children = {};

    // Unique key for children of a gateway
    this._currentId = 0;
  }

  _renderContainer(name) {
    if (!this._setContainerChildrenFns[name] || !this._children[name]) {
      return;
    }

    this._setContainerChildrenFns[name](
      Object.keys(this._children[name])
        .sort()
        .map(gatewayId => this._children[name][gatewayId])
    );
  }

  addContainer(name, container) {
    this._setContainerChildrenFns[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._setContainerChildrenFns[name] = null;
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

    const gatewayId = `${name}_${this._currentId}`;
    this._children[name][gatewayId] = child;
    this._currentId += 1;

    return gatewayId;
  }

  unregister(name, gatewayId) {
    this.clearChild(name, gatewayId);
    this._renderContainer(name);
  }
}
