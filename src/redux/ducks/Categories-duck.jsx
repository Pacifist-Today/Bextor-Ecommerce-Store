export const namespace = 'categories'

let categories = []

const SET_CATEGORIES = `${namespace}/SET_CATEGORIES`

export function setCategoriesList(categoriesList) {
    return {
        type: SET_CATEGORIES,
        payload: {
            categoriesList
        }
    }
}

export function categoriesReducer(state = categories, action) {
    if (action.type === SET_CATEGORIES) {
        categories = action.payload.categoriesList
        return categories
    }
    return categories
}