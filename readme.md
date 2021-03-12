# Search Client

https://devblogs.microsoft.com/azure-sdk/search-app-with-cognitive-search/

## How to run locally?

 * Modify `./src/contexts/AuthContext.js` to use local instance of Search Api
* Run `npm run start`

## How to add to hexo blog?

 * Run `npm run build`
 * Empty hexo blog root `./source/search/static/js`
 * Copy from `./build/static/js` to hexo blog root `./source/search/static/js`
 * Copy from `./build/index.html` to hexo blog root `./source/search/index.md`
   * Copy from and including `<div id="root"></div>`
   * Remove leading `/` from src attribute in `<script src="/static/js...`