### vdom-diif
vue、react中的vdom和diif算法
#### 虚拟DOM-vdom
```
virtual dom，通过js的Object对象模拟DOM中节点，然后再通过render方法渲染成真实DOM节点，并非内存中操作是来描述dom的
操作引起回流，最终还得操作dom，vdom可以减少dom性能操作
creatElement => {type, props, children}
```
#### diff
```
Diff比较两个虚拟vdom区别，比较两个对象的区别,根据两个虚拟对象创建补丁，描述改变的内容，将这个补丁用来更新dom
Diff是通过js层面的计算，返回一个patch函数，来对比解析对象完成页面的重新渲染
先序深度优先遍历，规则：
1、当节点类型相同，看属性是否相同，产生一个属性补丁包{type: 'ATTRS', attrs: {class: 'list-group'}}
2、新的dom节点不存在{type: 'REMOVE', index: xxx}
3、节点类型不相同直接采用替换模式{type: 'REPLACE', newNode: newNode}
4、文本变化{type: 'TEXT', text: xx}
babel编译jsx模块成creatElement
```