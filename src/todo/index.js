import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { autorun, runInAction } from 'mobx';
import todoStore from './store';

// 你可以在 react 之外使用
// 比如操作数据
// 实际上这回报错，因为
setTimeout(() => {
  todoStore.add('add outside of react');
}, 1000);
// 比如监听数据变化，只要使用的数据变化就会运行
autorun(() => {
  console.log(todoStore.data.slice());
});

// 组件拆的越细，性能越好
const TodoAdd = observer(() => {
  const [text, setText] = useState('');

  useEffect(() => {
    todoStore.fetchData();
  }, []);

  const handleAdd = () => {
    runInAction(() => {
      todoStore.data = [];
    });
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
