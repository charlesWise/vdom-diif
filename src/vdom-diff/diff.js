function diff(oldTree, newTree) {
  let patches = {}
  let index = 0;
  // 递归树，比较后的结果放到补丁包中
  treeWalk(oldTree, newTree, index, patches);
  return patches;
}
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 判断老的属性中和新的属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可以能是undefined
    }
  }
  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, inx) => {
    treeWalk(child, newChildren[inx], ++Index, patches)
  })
}
// 判断是否是字符串
function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}
function treeWalk(oldTree, newTree, index, patches) {
  let currentPatch = [];
  if (!newTree) {
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldTree) && isString(newTree)) {
    if (oldTree !== newTree) {
      currentPatch.push({ type: TEXT, text: newTree })
    }
  } else if (oldTree.type === newTree.type) {
    // 比较属性是否更新
    let attrs = diffAttr(oldTree.props, newTree.props);
    if (Object.keys(attrs).length) {
      currentPatch.push({ type: ATTRS, attrs })
    }
    // 如果有儿子节点再去递归
    diffChildren(oldTree.children, newTree.children, patches);
  } else {
    // 节点被替换
    currentPatch.push({ type: REPLACE, newTree });
  }
  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}
export default diff;