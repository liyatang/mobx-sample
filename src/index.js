import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configure } from 'mobx';


// mobx 配置
configure({
  // 强制只能在被 action 包裹的方法里改变数据，否则会报错。
  // 这样数据的变化可控，都收归到 store 里。
  enforceActions: 'always',

  // 默认使用 proxy。 我们兼容性佳，所以不用管。
  // useProxies: "never"
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
