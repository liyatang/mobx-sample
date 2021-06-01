import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { autorun, configure } from 'mobx'
import todoStore from './store';

// 这份配置应该放在项目的入口文件了。放这里方便看
configure({
  // 强制只能在被 action 包裹的方法里改变数据，否则会报错。
  // 这样数据的变化可控，都收归到 store 里。
  enforceActions: 'always',

  // 默认使用 proxy。 我们兼容性佳，所以不用管。
  // useProxies: "never"
})

// 你可以在 react 之外使用
// 比如操作数据
setTimeout(() => {
todoStore.add('add outside of react')
}, 1000)

// 你可以在 react 之外使用。
// 比如监听数据变化，只要使用的数据变化就会运行
autorun(() => {
  console.log(todoStore.data.slice())
})

// 组件拆的越细，性能越好
const TodoAdd = observer(() => {
  const [text, setText] = useState('');

  useEffect(() => {
    todoStore.fetchData()
  }, []);


  const handleAdd = () => {
    todoStore.add(text);
    setText('');
  };

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={handleAdd}>add</button>
    </div>
  );
});

// 组件拆的越细，性能越好
const TodoSearch = observer(() => {
  return (
    <div>
      搜索
      <input
        type="text"
        value={todoStore.search}
        onChange={e => todoStore.setSearch(e.target.value)}
      />
    </div>
  );
});

// observer 使组件响应 todoStore 的变化
const Todo = observer(() => {

  const handleRemove = (index) => {
    todoStore.remove(index);
  };

  const handleInit = () => {
    todoStore.init();
  };

  return (
    <div>
      <div>
        <button onClick={handleInit}>init</button>
      </div>
      <TodoAdd/>
      <TodoSearch/>
      <div>
        <div>梳理：</div>
        {/* 直接使用 todoStore */}
        {todoStore.filterData.map((item, index) => {
          return (
            <div key={index}>
              {item.text}
              <span style={{ padding: '10px', color: 'red' }} onClick={() => handleRemove(index)}>X</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Todo;
