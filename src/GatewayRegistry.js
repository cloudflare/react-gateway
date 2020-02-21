// @flow

export default class GatewayRegistry {

  constructor() {
    this._setContainerChildrenFns = {};
    this._children = {};

    // Unique key for children of a gateway
    this._currentId = 0;
  }

  _renderContainer(name) {
    const self = this;
    if (!self._setContainerChildrenFns[name]) {
      return;
    }
    console.log(self._children);
    self._setContainerChildrenFns[name](
      self.getChildrenByDestName(name)
    );
  }

  getChildrenByDestName(destNameToMap) {
    console.log(this._children);
    const children = Object.keys(this._children)
      .map(gatewayId => {
        const [destName] = getDestNameAndChildId(gatewayId);
        if (destName != destNameToMap) {
          return null;
        }
        console.log(gatewayId);
        return this._children[gatewayId];
      });
    return children;
  }

  addContainer(name, containerOpts) {
    this._setContainerChildrenFns[name] = containerOpts.setChildren;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._setContainerChildrenFns[name] = null;
  }

  updateGateway(gatewayId, child) {
    const [destName] = getDestNameAndChildId(gatewayId);
    this._children[gatewayId] = child;
    this._renderContainer(destName);
  }

  clearChild(gatewayId) {
    console.log('not called');
    delete this._children[gatewayId];
  }

  registerGateway(destName, child) {
    verifyDestNameValid(destName);

    const gatewayId = `${destName}##${this._currentId}`;
    this._children[gatewayId] = child;
    this._currentId += 1;

    this._renderContainer(destName);

    return gatewayId;
  }

  childCount(destName) {
    return Object.keys(this._children[destName]).length;
  }

  unregisterGateway(gatewayId) {
    const [destName] = getDestNameAndChildId(gatewayId);
    this.clearChild(gatewayId);
    this._renderContainer(destName);
  }
}

function getDestNameAndChildId(gatewayId) {
  return gatewayId.split('##');
}

function verifyDestNameValid(destName) {
  if (destName.indexOf('##') != -1) {
    throw new Error('into should not have ##');
  }
}
