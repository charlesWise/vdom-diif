import { createElement, render, renderDom } from './element';
import diff from './diff';

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
    createElement('li', { class: 'item' }, ['2'])
  ]);

let patchs = diff(vDom, vDom2);
console.log(patchs);
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