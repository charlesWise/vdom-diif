import { Element, render } from './element';

let allPathes;
let index = 0; // 默认那个需要打补丁
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
function patch(el, patches) {
  allPathes = patches;
  // 给某个元素打补丁
  treeWalk(el);
}
function treeWalk(node) {
  let currentPatch = allPathes[index + 1];
  let childNodes = node.childNodes;
  childNodes.forEach(child => treeWalk(child));
  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}
function doPatch(node, patchers) {
  patchers.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        for (let key in patch.attrs) {
          let value = patch.attrs[key];
          if(value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        node.textContent = patch.text;
        break;
      case REMOVE:
        node.parentNode.replaceChild(node);
        break;
      case REPLACE:
        let newNode = (patch.newTree instanceof Element) ? render(patch.newTree) : document.createTextNode(patch.newTree);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  })
}
// 设置属性
function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;

    default:
      node.setAttribute(key, value);
      break;
  }
}
export default patch;