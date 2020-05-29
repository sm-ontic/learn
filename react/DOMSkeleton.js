import ReactReconciler from 'react-reconciler';

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  getPublicInstance(instance) {
    return instance;
  },
  prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
    const propKeys = new Set(Object.keys(newProps).concat(Object.keys(oldProps))).values();
    const payload = [];
    for (let key of propKeys) {
      if (
        key !== 'children' && // text children are already handled
        oldProps[key] !== newProps[key]
      ) {
        payload.push({ [key]: newProps[key] });
      }
    }
    return payload;
  },

  shouldDeprioritizeSubtree(type, props) {},

  isPrimaryRenderer: true,
  scheduleDeferredCallback: '',
  cancelDeferredCallback: '',

  // -------------------
  //     Mutation
  // -------------------

  commitMount(domElement, type, newProps, internalInstanceHandle) {},

  resetTextContent(domElement) {},

  insertBefore(parentInstance, child, beforeChild) {},

  insertInContainerBefore(container, child, beforeChild) {},
  unhideInstance(container, props) {},

  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: (...args) => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    const domElement = document.createElement(type);
    console.log(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propName === 'onClick') {
        domElement.addEventListener('click', propValue);
      } else if (propName === 'className') {
        domElement.setAttribute('class', propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }

      domElement.setAttribute('title', rootContainerInstance);

      if (workInProgress._debugOwner && workInProgress._debugOwner.memoizedState) {
        domElement.setAttribute('style', 'border: 1px solid black');
      }
    });
    return domElement;
  },
  createTextInstance: text => {
    return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propName === 'onClick') {
        domElement.removeEventListener('click', oldProps[propName]);
        domElement.addEventListener('click', propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  removeChild(parentInstance, child) {
    try {
      parentInstance.removeChild(child);
    } catch (e) {}
  },
  removeChildFromContainer(parentInstance, child) {
    try {
      parentInstance.removeChild(child);
    } catch (e) {}
  },
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: (reactElement, domElement, callback) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
    callback
  );
  },
};
