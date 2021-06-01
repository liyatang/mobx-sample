import { makeAutoObservable } from 'mobx';

class Store {
  count = 0;

  constructor () {
    makeAutoObservable(this, null, { autoBind: true });
  }

  plus () {
    this.count++;
  }

  reduce () {
    this.count--;
  }
}

export default new Store();
