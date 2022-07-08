import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const baseURL ="https://slides.com";

async function getSlidesInformation(){
    try{
        const response = await fetch(baseURL+"/explore");
        const body = await response.text();
        const $ = cheerio.load(body);
        const infoList=[];
        $('.sl-deck-thumbnail').map((i,el)=>{
            const slideInfo = {
                id: i+1,
                title:$(el).find('.title').text(),
                URL: baseURL + $(el).find('.deck-link').attr('href')
            }
            // const slideTitle = $(el).find('.title').text();
            // const slideURL = baseURL + $(el).find('.deck-link').text();
            infoList.push(slideInfo);
        });

        console.table(infoList);

    }catch(error){
        console.log(error);
    }
}

getSlidesInformation();
