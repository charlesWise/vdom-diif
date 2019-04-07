import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch';

let vDom = createElement( // 虚拟dom
  'ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
  ]);
let vDom2 = createElement( // 虚拟dom
  'ul', { class: 'list-ground' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    // createElement('li', { class: 'item' }, ['2']),
    // createElement('div', { class: 'item' }, ['2'])
  ]);

let el = render(vDom); // 真实dom
// console.log(el); 
// 将虚拟dom渲染成真实dom
renderDom(el, window.root);
/**
 * console.warn(vDom);
 * Element对象就是所谓的虚拟dom
  Element {type: "ul", props: {…}, children: Array(3)}
  children: Array(3)
    0: Element {type: "li", props: {…}, children: Array(1)}
    1: Element {type: "li", props: {…}, children: Array(1)}
    2: Element {type: "li", props: {…}, children: Array(1)}
*/

let patches = diff(vDom, vDom2);
// 给元素打补丁，重新更新视图
patch(el, patches);

/**????未实现
 * 如果平级元素有互换，那会导致重新渲染
 * 新增节点也不会呗更新
 * index
 */