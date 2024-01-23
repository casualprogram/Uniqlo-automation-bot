const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { log } = require('console');

async function addToCart(page, SKU, size){
    
    url = "https://www.uniqlo.com/us/en/products/"+ SKU + "/00?colorDisplayCode=02&sizeDisplayCode=" + size;

    log("Go to product page");
    await page.goto(url);



    // Click the "Add to cart" button

    await page.click(".fr-ec-content-alignment");
    
    //   // Wait for the button to appear
    await page.waitForSelector('.fr-ec-button--variant-transactional');
    await page.click('.fr-ec-button--variant-transactional');
    await page.click('.fr-ec-button--variant-transactional');
    
    log("Succesfully added to cart");
    

}

module.exports = addToCart;

// fr-ec-content-alignment fr-ec-content-alignment--direction-row fr-ec-content-alignment--content-space-between fr-ec-content-alignment--alignment-center