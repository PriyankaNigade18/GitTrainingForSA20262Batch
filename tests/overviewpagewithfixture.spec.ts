

import { log } from "reporting-labs";
import {test,expect} from "../src/fixtures/pagefixtures.js"
import { jsonUtil } from "../src/utilities/JsonUtil.js";
//precodition
test.beforeEach(async({loginPage,inventoryPage,cartPage,checkoutPage})=>{
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await loginPage.addWait();
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await loginPage.addWait();
    await inventoryPage.gotoCartPage();
    await cartPage.gotoCheckoutPage();
     let data=jsonUtil(0);
    await checkoutPage.doContinueCheckoutProcess(data.firstname,data.lastname,data.postalcode);

})

test("Test for Payment details",async({overviewPage})=>{
let allData=await overviewPage.getAllPaymentDetials();
console.log(allData);
//expect(allData).toContain("Total: $32.39");

})

test("Test for Finish checkout-overview porecss",async({overviewPage})=>{

    await overviewPage.doFinishProcess();
    expect(await overviewPage.getSuccessMessage()).toBe("Thank you for your order!");
    console.log("SuccessMessage: "+await overviewPage.getSuccessMessage());
    
})

test("Test for Overviewpage cancel process",async({overviewPage})=>{
await overviewPage.doCancelProcess();
expect(await overviewPage.getPageUrl()).toContain("inventory");

})