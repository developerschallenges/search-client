# Search Client

## Introduction

https://devblogs.microsoft.com/azure-sdk/search-app-with-cognitive-search/

## How to run locally?

 - Start `search api` by running `func start`

 - Modify `./src/contexts/AuthContext.js` to use local instance of Search Api
 - Run `npm run start`
 - Open `http://localhost:3000`

## How to add to hexo blog?

 - Modify `./src/contexts/AuthContext.js` to use azure instance of Search Api
 - Run `npm run build`
 - Empty hexo blog root `./source/search/static/js`
 - Copy from `./build/static/js` to hexo blog root `./source/search/static/js`
 - Copy from `./build/index.html` to hexo blog root `./source/search/index.md`
   - Copy from and including `<div id="root"></div>`
   - Remove leading `/` from src attribute in `<script src="/static/js...`