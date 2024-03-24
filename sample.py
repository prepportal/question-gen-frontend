import requests
import json

data = [
    {
   "text":"blockchain",
   "value":3
},
{
   "text":"cybersecurity",
   "value":3
},
{
   "text":"Linux",
   "value":3
},
{
   "text":"hacking",
   "value":3
},
{
   "text":"malwares",
   "value":3
},
{
   "text":"hacking",
   "value":3
},
{
   "text":"politics",
   "value":3
},
{
   "text":"world affairs",
   "value":3
},
{
   "text":"politics",
   "value":3
},
{
   "text":"India",
   "value":3
},
{
   "text":"finance",
   "value":3
},
{
   "text":"business",
   "value":3
},
{
   "text":"history",
   "value":3
},
{
   "text":"science",
   "value":3
},
{
   "text":"technology",
   "value":3
},
{
   "text":"programming",
   "value":3
},
{
   "text":"computer science",
   "value":3
},
{
   "text":"mathematics",
   "value":3
},
{
   "text":"physics",
   "value":3
},
{
   "text":"quantum physics",
   "value":3
},
{
   "text":"astronomy",
   "value":3
},
{
   "text":"cosmology",
   "value":3
},
{
   "text":"astrophysics",
   "value":3
},
{
   "text":"cryptocurrencies",
   "value":3
},
{
   "text":"artificial intelligence",
   "value":3
},
{
   "text":"machine learning",
   "value":3
},
{
   "text":"deep learning",
   "value":3
},
{
   "text":"neural networks",
   "value":3
},
{
   "text":"data science",
   "value":3
},
{
   "text":"big data",
   "value":3
},
{
   "text":"world war 2",
   "value":3
},
{
   "text":"astronomy",
   "value":3
},
{
   "text":"space",
   "value":3
},
{
   "text":"nasa",
   "value":3
},
{
   "text":"web3",
   "value":3
},
{
   "text":"NFTs",
   "value":3
}
]

def check_wikipedia_page_exists(title):
        S = requests.Session()
        print(title)

        URL = "https://en.wikipedia.org/w/api.php"

        SEARCHPAGE = title

        PARAMS = {
                "action": "query",
                "format": "json",
                "list": "search",
                "srsearch": SEARCHPAGE
        }

        R = S.get(url=URL, params=PARAMS)
        DATA = R.json()

        # If the search query has results, the page exists
        return bool(DATA.get("query", None))

# Filter the data to only include items that have a corresponding page on Wikipedia
filtered_data = [item for item in data if check_wikipedia_page_exists(item['text'])]
print(filtered_data)