# grjs

You can check the project at [grjs.smutnyleszek.com](http://grjs.smutnyleszek.com) or build it yourself.


## Building

Building requirements:

- [Jekyll](https://jekyllrb.com/) - install with `gem install jekyll`
- [NodeJS](https://nodejs.org/en/download/) for `npm`

And to actually build the project, you have to run:

```
npm install
grunt build_assets
jekyll serve --watch --baseurl ''
```

The project will be served at [http://127.0.0.1:4000/](127.0.0.1:4000) (and the local version will be available in `_site` directory). Alternatively you could just go with `jekyll build` and open `_site/index.html` in the browser.
