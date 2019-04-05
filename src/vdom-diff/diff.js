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
function treeWalk(oldTree, newTree, index, patches) {
  let currentPatch = [];
  if (oldTree.type === newTree.type) {
    // 比较属性是否更新
    let attrs = diffAttr(oldTree.props, newTree.props);
    if (Object.keys(attrs).length) {
      currentPatch.push({ type: ATTRS, attrs })
    }
  }
  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}
export default diff;