import { makeAutoObservable, runInAction } from 'mobx';

function fetchFakeData(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        text: 'mobx',
        value: 1
      }, {
        text: 'mobx-react',
        value: 2
      }])
    }, 500)
  })
}

// 声明一个 Store 类
class TodoStore {
  search = ''

  // [{text: 'xxxx', value: 1}]
  data = []

  constructor () {
    // 使用 makeAutoObservable 使 TodoStore 可追踪。
    // 以下代码做了几件事
    // 1 使 search data 可观察
    // 2 含有 get 会是用 computed 标记。类似 reselect
    // 3 会对函数使用 autoBind。
    makeAutoObservable(this, null, { autoBind: true })
  }

  // 衍生数据使用 get。 依赖的 search data 有变化，此函数才会运行
  get filterData(){
    if(!this.search){
      return this.data
    }

    return this.data.filter(item => {
      return item.text.includes(this.search)
    })
  }

  // 常规下设置 search 和 data 两次赋值会触发两次 render。
  // 但是 makeAutoObservable 有设置 autoAction 了，多次赋值只会触发一次 render。
  init(){
    this.search = ''
    this.data = []
  }

  // 异步也是没问题的哦
  async fetchData(){
    const data = await fetchFakeData()
    // 对于 async await，下面代码是异步的。需要包在 action 内
    runInAction(() => {
      this.data = data
    })
  }

  setSearch(value){
    this.search = value
  }

  add(text){
    // 就和平常一样，操作 data 数据
    this.data.push({
      value: +new Date(),
      text
    })
  }

  remove(index){
    // 就和平常一样，操作 data 数据
    this.data.splice(index, 1)
  }
}

export default new TodoStore()
