import { createElement, render, renderDom } from './element.js';
let vDom = createElement( // 虚拟dom
  'ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
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