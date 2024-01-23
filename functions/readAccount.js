const puppeteer = require('puppeteer-extra');
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { log } = require('console');

async function readAccount(){
    try {
        const accountFile =  path.join(__dirname , "..","resources","account.txt");
        const data = await fs.readFile( accountFile, 'utf8');
        // first split out each line.
        const lines = data.split('\n');

        // array for user object
        const userList = [];

        //run a loop to split out each line and assign them by order
        for (const line of lines){
            const [email, password, cvv] = line.split(':');
            const userObj = {
                email, 
                password,
                cvv
            }   
            userList.push(userObj)
        }
        
        return userList;

    } catch(err){
        log("readAccount Error at ", err);
        return null;
    }
}

module.exports = readAccount;