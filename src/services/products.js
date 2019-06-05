export const getProducts = () => new Promise((resolve) => {
    const items = window.localStorage.getItem('products')

    resolve(JSON.parse(items))
})

export const addProduct = async item => new Promise((resolve) => {
    const items = JSON.parse(window.localStorage.getItem('products'))
    item.id = Date.now()
    items.unshift(item)
    window.localStorage.setItem('products', JSON.stringify(items))

    resolve(item)
})

export const deleteProduct = itemId => new Promise((resolve) => {
    const items = JSON.parse(window.localStorage.getItem('products'))
    const itemsDeleted = items.filter(item => item.id !== itemId)
    window.localStorage.setItem('products', JSON.stringify(itemsDeleted))

    resolve('Deleted')
})