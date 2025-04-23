My local ikea store organises events and advertises them on their website. This script generates an RSS feed for them.

It's hard coded for the Ikea Malaga store: https://www.ikea.com/es/es/stores/events/ikea-malaga/ - but the structure should be the same for any other location, just change the url.

### Requirements:

```
// install the libs
npm install playwright rss cheerio

// extra stuff for playwright to work
npx playwright install
sudo npx playwright install-deps
// or if that last command doesn't work:
sudo apt-get install libavif16 

```

### Deploying with github actions

... TODO