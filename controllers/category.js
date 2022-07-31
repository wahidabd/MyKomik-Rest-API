const {default: Axios} = require('axios');
const cheerio = require('cheerio');
const baseUrl = require('../helpers/url').baseUrl;

exports.genres = async (req, res) => {
    const url = `${baseUrl}komik`;

    try {
        const response = await Axios(url);
        const $ = cheerio.load(response.data);
        const element = $('.row.genres > ul > li')

        let data = [];

        element.each((i, el) => {
            let id = $(el).find('a').attr('href').replace(`${baseUrl}genres/`, '');
            let count = $(el).find('span').text().trim();
            let title = $(el).find('a').text().replace(`${count}`, '').trim();

            data.push({id, title, count});
        })

        
        res.status(200).json({data});
    }catch(e){
        res.json(e);
        console.log(e)
    }

}

exports.genre_list = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const url = `${baseUrl}genres/${id}/page/${page}`;

    try {
        const response = await Axios(url);
        const $ = cheerio.load(response.data);
        try{
            const response = await Axios(url);
            const $ = cheerio.load(response.data);
            const element = $('.page-content-listing.item-default > .page-listing-item')
    
            let data = [];
    
            element.each((i, el) => {
                $(el).find('.row.row-eq-height > .col-12.col-md-6.badge-pos-2').each((idx, ele) => {
                    let id = $(ele).find('.page-item-detail.manga > div > a').attr('href').replace(`${baseUrl}komik/`, '');
                    let cover = $(ele).find('.page-item-detail.manga > div > a > img').attr('src');
                    let title = $(ele).find('.page-item-detail.manga > div > a').attr('title');
                    let rating = $(ele).find('.page-item-detail.manga > .item-summary > .meta-item.rating > .post-total-rating.allow_vote > span').text();
                    let chapter = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').text().trim()
                    let chapter_id = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').attr('href').replace(`${baseUrl}komik/`, '')
                    let update = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(2)').text().replace('\n', '').trim()
    
                    data.push({id, cover, title, rating, chapter, chapter_id, update});
                })
            })
    
            res.status(200).json({data});
    
        }catch(e){
            res.json(e);
            console.log(e);
        }

        
        res.status(200).json({data});
    }catch(e){
        res.json(e);
        console.log(e)
    }

}

exports.releases = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const url = `${baseUrl}releases/${id}/page/${page}`;

    try {
        const response = await Axios(url);
        const $ = cheerio.load(response.data);
        try{
            const response = await Axios(url);
            const $ = cheerio.load(response.data);
            const element = $('.page-content-listing.item-default > .page-listing-item')
    
            let data = [];
    
            element.each((i, el) => {
                $(el).find('.row.row-eq-height > .col-12.col-md-6.badge-pos-2').each((idx, ele) => {
                    let id = $(ele).find('.page-item-detail.manga > div > a').attr('href').replace(`${baseUrl}komik/`, '');
                    let cover = $(ele).find('.page-item-detail.manga > div > a > img').attr('src');
                    let title = $(ele).find('.page-item-detail.manga > div > a').attr('title');
                    let rating = $(ele).find('.page-item-detail.manga > .item-summary > .meta-item.rating > .post-total-rating.allow_vote > span').text();
                    let chapter = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').text().trim()
                    let chapter_id = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').attr('href').replace(`${baseUrl}komik/`, '')
                    let update = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(2)').text().replace('\n', '').trim()
    
                    data.push({id, cover, title, rating, chapter, chapter_id, update});
                })
            })
    
            res.status(200).json({data});
    
        }catch(e){
            res.json(e);
            console.log(e);
        }

        
        res.status(200).json({data});
    }catch(e){
        res.json(e);
        console.log(e)
    }
}