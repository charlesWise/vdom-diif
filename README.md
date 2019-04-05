### vdom-diif
vue、react中的vdom和diif算法
#### 虚拟DOM-vdom
virtual dom，通过js的Object对象模拟DOM中节点，然后再通过render方法渲染成真实DOM节点
操作引起回流，最终还得操作dom，vdom可以减少dom性能操作
```
creatElement => {type, props, children}
```