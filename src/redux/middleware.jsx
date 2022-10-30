export const loggerMiddleware = (store) => (next) => (action) => {
    console.log('will dispatch', action);
    const returnValue = next(action); // вызовем следующий middleware в цепочке
    console.log('state after dispatch', store.getState());
    return returnValue; // вернем результат вызова предыдущему middleware
}