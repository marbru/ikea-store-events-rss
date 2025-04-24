My local ikea store organises events and advertises them on their website. This script generates an RSS feed for them.

It's hard coded for the Ikea Malaga store: https://www.ikea.com/es/es/stores/events/ikea-malaga/ - but the structure should be the same for any other location, just change the url.


### Requirements:

Requires nodejs to run.

```
// install the libs
npm install playwright rss cheerio

// extra stuff for playwright to work
npx playwright install
sudo npx playwright install-deps
// or if that last command doesn't work:
sudo apt-get install libavif16 

```

### Running

```node ikea2rss.js```

Generates an rss feed file on `feed/feed.xml`. You can add the [raw file](https://raw.githubusercontent.com/marbru/ikea-store-events-rss/refs/heads/master/feed/feed.xml) to your favorite feed reader.


### Deploying with github actions

There's an included workflow that runs the script once per day with a cronjob, using github actions. The final step is commiting the rss file to the repo. For it to work, on the repo Settings->Actions->General we need:

- Actions permissions: Allow all actions and reusable workflows (automatically on for public repos)
- Workflow permissions: Read and write permissions (need to grant manually)

