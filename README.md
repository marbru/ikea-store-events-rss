My local ikea store organises events and advertises them on their website. This script generates an RSS feed for them.

It's hard coded for the Ikea Malaga store: https://www.ikea.com/es/es/stores/events/ikea-malaga/ - but the structure should be the same for any other location, just change the url.


### Requirements:

Requires nodejs to run.

```
// install the dependencies
npm install 

// extra stuff for playwright to work
npx playwright install
npx playwright install-deps

// or if that last command doesn't work:
sudo apt-get install libavif16 

```

### Running

```node ikea2rss.js```

Generates an rss feed file on `feed/feed.xml`. You can add the [raw file](https://raw.githubusercontent.com/marbru/ikea-store-events-rss/refs/heads/master/feed/feed.xml) to your favorite feed reader.


### Troubleshooting when it breaks

Due to the nature of the scraper, it will break oftenly whenever ikea changes the design of their website. To troubleshoot, run in debugger mode:

```
NODE_INSPECT_RESUME_ON_START=1 node inspect ikea2rss.js
```

The debugger will stop at `debugger;` statements. There's one in the code, you can add more at convenience. Then inspect variables and expressions with `exec [...]`. Eg:

```
< 
break in ikea2rss.js:35
 33 
 34     $(ikeaEventCSSSelector).each((index, element) => {
>35       debugger;
 36       const title = $(element).find("h3").text().trim();
 37       const link = "https://www.ikea.com" + $(element).attr("href");
debug> exec element
{ parent: Element,
  prev: null,
  next: null,
  startIndex: null,
  endIndex: null,
  ... }
debug>exec $(element).find("h3")
...
```


### Deploying with github actions

There's an included workflow that runs the script once per day with a cronjob, using github actions. The final step is commiting the rss file to the repo. For it to work, on the repo Settings->Actions->General we need:

- Actions permissions: Allow all actions and reusable workflows (automatically on for public repos)
- Workflow permissions: Read and write permissions (need to grant manually)

