const puppeteer = require('puppeteer-extra');
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { log } = require('console');

async function selectProduct(){

    try {
        const setupFile =  path.join(__dirname , "..","resources","setUp.txt");
        const data = await fs.readFile( setupFile, 'utf8');
        // first split out each line.
        const lines = data.split('\n');

        // array for user object
        const productList = [];

        //run a loop to split out each line and assign them by order
        for (const line of lines){
            const [SKU, size] = line.split(':');
            const userObj = {
                SKU, 
                size
            }   
            productList.push(userObj)
        }
        
        return productList;

    } catch(err){
        log("seclectProduct Error at ", err);
        return null;
    }

    
}

module.exports = selectProduct;