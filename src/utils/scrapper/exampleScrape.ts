import { load } from 'cheerio';

async function scrape() {
  const url = 'https://otakudesu.cloud';
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);

  const elements = $('.venz li .jdlflm');

  elements.each((i, el) => {
    const text = $(el).text();
    console.log(i, text);
  });
}

scrape();