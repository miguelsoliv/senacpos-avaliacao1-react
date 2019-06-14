import { combineReducers } from 'redux'
import categoriesReducer from './category'
import productsReducer from './products'

export default combineReducers({
    categoriesReducer,
    productsReducer
})