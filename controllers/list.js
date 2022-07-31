const {default: Axios} = require('axios');
const cheerio = require('cheerio');
const baseUrl = require('../helpers/url').baseUrl;

/**
 * 
 * latest, alphabet
 * rating, trending
 * views, new-manga
 * 
 */
exports.list = async (req, res) => {
    const type = req.params.type;
    const page = req.params.page;
    const url = `${baseUrl}komik/page/${page}/?m_orderby=${type}`;

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
}

exports.project = async (req, res) => {
    const page = req.params.page;
    const url = `${baseUrl}genres/project/page/${page}`;

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
}

exports.completed = async (req, res) => {
    const page = req.params.page
    const url = `${baseUrl}tags/completed/page/${page}`;

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
}