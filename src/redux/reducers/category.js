import { getCategories } from '../../services/categories'

const initialState = {
    categories: [],
    selectedCategory: 0,
    isLoading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                selectedCategory: action.payload[0].id,
                isLoading: false
            }
        case 'SET_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload
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

export const loadCategories = () => async dispatch => {
    dispatch(isLoading(true))
    const response = await getCategories()

    await sleep(1000);

    dispatch({
        type: 'LOAD_CATEGORIES',
        payload: response
    })
}

export const setCategory = (id) => {
    return {
        type: 'SET_CATEGORY',
        payload: id
    }
}