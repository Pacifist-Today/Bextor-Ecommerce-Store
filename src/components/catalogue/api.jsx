export async function getProductsList () {
    const productListUrl = "https://61f5558a62f1e300173c40f3.mockapi.io/products"
    const response = await fetch(productListUrl)
    const status = response.status

    if (status === 200) {
        return await response.json()
    }

    const errorText = await response.text()
    throw new Error(errorText)
}

export async function getCategoryList () {
    const categoryListUrl = "https://61f5558a62f1e300173c40f3.mockapi.io/categories"
    const response = await fetch(categoryListUrl)
    const status = response.status

    if (status === 200) {
        return await response.json()
    }

    const errorText = await response.text()
    throw new Error(errorText)
}