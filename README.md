# ChillAy: A web application to manage food orders for both customers and businesses

> The customer once logged in sees a list of eateries registered clicking on which directs them to their menu and on they can select the items and quantity and place orders
> In your orders section for the customer a list of orders is shown. As information about the order being served is given from the business side, the item is removed from this your orders section
> The businesses can be logged in and registered similarly as user and then can edit thier menu and view the orders dashboard where the customers' detail and orders' detail are aslo visible
> Once the order is served the order is removed from the list.
> The react component of orders' list updates every 2 minutes, so there can be a delay of 2 minutes between customer sending order and the it appearing in the business's dashboard

☑️ Modifications needed
> Better UI
> Removing the option to register business directly and replacing it by the option to send request to get their business registered to prevent anybody from registering any business
> Shops should have an open and closed button So that customers can order only when the shop is open and not anytime. In the database, in shopSchema there is a feild of shopStatus which is currently false for every shop. This can be used for the issue 
