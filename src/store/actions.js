import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
const actions={
  addCart(context,info){
      //查看是否添加过
      const oldInfo =context.state.cartList.find(item =>item.iid===info.iid)

      //增加数量或新添加
      if (oldInfo){
        context.commit(ADD_COUNTER,oldInfo)
      }else {
        info.count =1
        info.checked =true
        context.commit(ADD_TO_CART,info)
      }
  }
}

export default actions
