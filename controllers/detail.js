const {default: Axios} = require('axios');
const cheerio = require('cheerio');
const baseUrl = require('../helpers/url').baseUrl;

exports.detail = async (req, res) => {
    const id = req.params.id;
    const url = `${baseUrl}komik/${id}`

    try {
        const response = await Axios(url);
        const $ = cheerio.load(response.data);
        const genreElement = $('.summary_content > .post-content > div:nth-child(8) > .summary-content > .genres-content')
        const chapterElement = $('.page-content-listing.single-page > .listing-chapters_wrap.cols-2 > ul > li');

        const komik = {}
        let genres = [];
        let chapters = [];

        komik.id = $('.tab-summary > .summary_image > a').attr('href').replace(`${baseUrl}komik/`, '');
        komik.cover = $('.tab-summary > .summary_image > a > img').attr('src')
        komik.title = $('.post-title > h1').text().trim();
        komik.rating = $('.post-content > .post-rating > div:nth-child(1) > span').text().trim();
        komik.rank = $('.summary_content > .post-content > div:nth-child(4) > div:nth-child(2)').text().trim();
        komik.alternative = $('.summary_content > .post-content > div:nth-child(5) > div:nth-child(2)').text().trim();
        komik.autohor = $('.summary_content > .post-content > div:nth-child(6) > div:nth-child(2)').text().trim();
        komik.artist = $('.summary_content > .post-content > div:nth-child(7) > div:nth-child(2)').text().trim();
        komik.type = $('.summary_content > .post-content > div:nth-child(9) > div:nth-child(2)').text().trim();
        komik.release = $('.summary_content > .post-status > div:nth-child(1) > .summary-content > a').text().trim();
        komik.release_id = $('.summary_content > .post-status > div:nth-child(1) > .summary-content > a').attr('href');
        komik.status = $('.summary_content > .post-status > div:nth-child(2) > .summary-content').text().trim();
        komik.synopsis = $('.description-summary > .summary__content').text().trim();

        genreElement.find('a').each((i, el) => {
            let id = $(el).attr('href').replace(`${baseUrl}genres/`, '');
            let title = $(el).text().trim();

            genres.push({id, title});
        })

        chapterElement.each((i, el) => {
            let id = $(el).find('a').attr('href').replace(`${baseUrl}komik/`, '');
            let title = $(el).find('a').text().trim();
            let upload = $(el).find('span').text().trim();

            chapters.push({id, title, upload});
        })

        komik.genres = genres;
        komik.chapters = chapters;
        res.status(200).json(komik);

    }catch(e){
        send.json(e);
        console.log(e);
    }
} 


exports.chapter = async (req, res) => {
    const id = req.params.id;
    const id_chapter = req.params.id_chapter;
    const url = `${baseUrl}komik/${id}/${id_chapter}`

    try{
        const response = await Axios(url);
        const $ = cheerio.load(response.data);
        const element = $('.read-container > .reading-content > div')
        
        const chapter = {};
        let images = [];
        
        const chapter_id = $('.c-breadcrumb > ol > li:nth-child(3) > a').attr('href');
        const nav_next = $('.nav-links > .nav-next > a').attr('href');
        const nav_prev = $('.nav-links > .nav-previous > a').attr('href');
        const title = $('.c-breadcrumb > ol > li:nth-child(3) > a').text().trim();
        const chapter_title = $('.c-breadcrumb > ol > li:nth-child(4)').text().trim();

        chapter.id = chapter_id.replace(`${baseUrl}komik/`, '');
        chapter.title = `${title} ${chapter_title}`;
    
        // Check prev and next chapter
        if(nav_prev == null) chapter.prev = null;
        else chapter.prev = nav_prev.replace(`${baseUrl}komik/`, '');

        if(nav_next == chapter_id) chapter.next = null;
        else chapter.next = nav_next.replace(`${baseUrl}komik/`, '');

        element.each((i, el) => {
            let id = $(el).find('img').attr('id');
            let data = $(el).find('img').attr('src').trim();

            images.push({id, data});
        })

        
        chapter.images = images;
        res.status(200).json(chapter);
    }catch(e){
        res.send(e);
        console.log(e);
    }
}