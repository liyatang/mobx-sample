import React from 'react'
import { observer } from 'mobx-react';
import countStore from './store'

const Count = observer(() => {
  return (
    <div>
      <div>count: {countStore.count}</div>
      <button onClick={() => countStore.plus()}>+</button>
      <button onClick={() => countStore.reduce()}>-</button>
    </div>
  )
})

export default Count
