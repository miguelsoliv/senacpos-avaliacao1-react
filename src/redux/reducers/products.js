import { getProducts, addProduct, deleteProduct } from '../../services/products'

const initialState = {
    products: [],
    isLoading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case 'INSERT_PRODUCT':
            return {
                ...state,
                products: action.payload
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: action.payload
            }
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

const isLoading = flag => {
    return {
        type: 'IS_LOADING',
        payload: flag
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const loadProducts = () => async dispatch => {
    dispatch(isLoading(true))
    const response = await getProducts()

    await sleep(1000);

    dispatch({
        type: 'LOAD_PRODUCTS',
        payload: response
    })
}

export const insertProduct = (name, category) => async dispatch => {
    await addProduct({ name: name, category: category })

    const response = await getProducts()

    dispatch({
        type: 'INSERT_PRODUCT',
        payload: response
    })
}

export const removeProduct = id => async dispatch => {
    await deleteProduct(id)

    const response = await getProducts()

    dispatch({
        type: 'DELETE_PRODUCT',
        payload: response
    })
}