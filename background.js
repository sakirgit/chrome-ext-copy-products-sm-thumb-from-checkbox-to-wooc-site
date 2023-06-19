const urls = [
  "https://www.nisbets.com.au/jantex-red-bucket-with-handle/ab395",
  "https://www.nisbets.com.au/conical-wringer-red/ab396",
  "https://www.nisbets.com.au/jantex-yellow-bucket-with-handle/ab398",
  "https://www.nisbets.com.au/jantex-green-bucket-with-handle/ab401",
  "https://www.nisbets.com.au/conical-wringer-green/ab402"
];

const getTitles = async () => {
    const titles = [];
    for (const url of urls) {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(text, "text/html");
        const title = html.querySelector("h1").textContent;
        titles.push(title);
    }
    return titles;
};

chrome.browserAction.onClicked.addListener(async () => {
    const titles = await getTitles();
    const text = titles.join("\n");
    navigator.clipboard.writeText(text);
});
