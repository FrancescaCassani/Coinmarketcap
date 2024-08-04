/*
    Define api call to fetch data from coinmarketcap API
 */
export default defineEventHandler(async() => {
    const { data } = await $fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': 'c3f841e7-0fff-4d8e-985f-248d29747571'
        }
    })
    return data;
})