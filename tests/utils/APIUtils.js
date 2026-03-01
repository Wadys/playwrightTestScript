class ApiUtils{
    constructor(apiContext, loginpayload){
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;
    }
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data: this.loginpayload});
        const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
    async createOrder(orderPayload){
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers: {
                "Authorization": await this.getToken(),
                "Content-Type": "application/json"
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson); 
        const orderId = orderResponseJson.orders[0]
        console.log(orderId);
        return orderId;
    }
}

module.exports = {ApiUtils};