const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { log } = require('console');

puppeteer.use(StealthPlugin());

const selectProduct = require("./functions/selectProduct");
const readAccount = require("./functions/readAccount");
const addToCart = require("./functions/addToCart")


async function main(){

        const browser = await puppeteer.launch({
            headless: false
            });
            


        const page = await browser.newPage();
        await page.setViewport({ width: 1020, height: 800, isMobile: false });

        const profile = await readAccount();
        

        email = profile[0].email;
        password = profile[0].password;
        cvv = profile[0].cvv;

        log(email + password + cvv);
        log("\n")



            //--LOGIN IN
        log("-->LOGIN IN\n");
        await page.goto("https://www.uniqlo.com/us/en/wishlist");

        await page.type("#email-input", email);
        await page.type("#password-input", password);    

        const button = await page.$('.fr-ec-button--large');

        if (button) {await button.click();}
        else {console.error('Button not found');}
        log("\nDONE")


        const tasks = await selectProduct();

        log(tasks);


        await page.waitForTimeout(1500);

            //ADD TO CART
        for (const task in tasks){
            let SKU = (tasks[task].SKU);
            let size = (tasks[task].size);
            await addToCart(page, SKU, size)
        }

        log("GO TO CART")
        await page.goto("https://www.uniqlo.com/us/en/checkout/payment")
        log("SELECT CART")
        await page.click("fr-ec-cursor-pointer");
        await page.click("fr-ec-button fr-ec-button--large")


        await page.waitForSelector("#encryptedSecurityCode")
        log("Fill IN CVV")
        await page.type("js-iframe-input input-field", cvv);
        await page.click("fr-ec-button fr-ec-button--large");


    }



main();
