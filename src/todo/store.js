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

// 声明一个 Store 类。类更强大点，比如 共有私有 等。
class Store {
  search = ''

  // [{text: 'xxxx', value: 1}]
  data = []

  constructor () {
    // 使用 makeAutoObservable，它会推断类的字段和方法
    // 1 对字段 search data，使可观察。
    // 2 含有 get ter 使用 computed 标记。（类似 reselect）
    // 3 会对函数使用 autoAction。
    // 4 autoBind 对函数绑定 this
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
  // 但是 constructor makeAutoObservable 有自动设置 autoAction 了，多次赋值只会触发一次 render，提高性能。
  init(){
    this.search = ''
    this.data = []
  }

  // 异步也是没问题的哦
  async fetchData(){
    const data = await fetchFakeData()
    // 对于 await 后面的代码是异步的。需要包在 runInAction 内
    runInAction(() => {
      this.data = data
    })
  }

  // constructor makeAutoObservable 有自动设置 autoAction，且 bing this。
  setSearch(value){
    this.search = value
  }

  add(text){
    // 就和平常一样，操作 data 数据，用你想用的姿势。
    this.data.push({
      value: +new Date(),
      text
    })
  }

  remove(index){
    // 就和平常一样，操作 data 数据，用你想用的姿势
    this.data.splice(index, 1)
  }
}

// 通常单例暴露出去。根据场景可导出 export，让调用方多实例使用。
export default new Store()
