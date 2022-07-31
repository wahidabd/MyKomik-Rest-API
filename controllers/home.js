const {default: Axios} = require('axios');
const cheerio = require('cheerio');
const url = require('../helpers/url');
const baseUrl = url.baseUrl;

exports.home = async (req, res) => {
    try {
        const response = await Axios(baseUrl);
        const $ = cheerio.load(response.data);
        const updateElement = $('.c-blog__content > .page-content-listing.item-small_thumbnail')
        const trendingElement = $('.c-widget-content.style-1.with-button > .widget-content > .popular-item-wrap')
        
        const home = {};
        let new_update = [];
        let trending = [];

        updateElement.find('.page-listing-item').each((i, el) => {
            $(el).find('.row.row-eq-height > .col-12.col-md-6.badge-pos-2').each((idx, ele) => {
                let id = $(ele).find('.page-item-detail.manga > div > a').attr('href').replace(`${baseUrl}komik/`, '');
                let cover = $(ele).find('.page-item-detail.manga > div > a > img').attr('src');
                let title = $(ele).find('.page-item-detail.manga > div > a').attr('title');
                let rating = $(ele).find('.page-item-detail.manga > .item-summary > .meta-item.rating > .post-total-rating.allow_vote > span').text();
                let chapter = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').text().trim()
                let chapter_id = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(1) > a').attr('href').replace(`${baseUrl}komik/`, '')
                let update = $(ele).find('.page-item-detail.manga > .item-summary > .list-chapter > .chapter-item:nth-child(1) > span:nth-child(2)').text().replace('\n', '').trim()

                new_update.push({id, cover, title, rating, chapter, chapter_id, update});
            })
        })

        trendingElement.each((i, el) => {
            let id = $(el).find('.popular-img.widget-thumbnail > a').attr('href').replace(`${baseUrl}komik/`, '');
            let cover = $(el).find('.popular-img.widget-thumbnail > a > img').attr('src');
            let title = $(el).find('.popular-img.widget-thumbnail > a').attr('title');
            let chapter = $(el).find('.popular-content > .list-chapter > div:nth-child(1) > .chapter.font-meta > a').text().trim()
            let chapter_id = $(el).find('.popular-content > .list-chapter > div:nth-child(1) > .chapter.font-meta > a').attr('href').replace(`${baseUrl}komik/`, '')
            let update = $(el).find('.popular-content > .list-chapter > div:nth-child(1) > span:nth-child(2)').text().replace('\n', '').trim()

            trending.push({id, cover, title, chapter, chapter_id, update});
        })


        home.trending = trending;
        home.new_update = new_update;
        res.status(200).json(home);
    }catch(e){
        res.json(e);
        console.log(e)
    }
}