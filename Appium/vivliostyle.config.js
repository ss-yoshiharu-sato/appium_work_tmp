module.exports = {
  title: 'Appium ドキュメント 日本語版PDF', // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: 'neuvecom <neuvecom@gmail.com>', // default to `author` in `package.json` or undefined.
  language: 'ja', // default to undefined.
  size: 'B5', // paper size.
  theme: '@vivliostyle/theme-techbook@^1.0.0', // .css or local dir or npm package. default to undefined.
  entry: [
    'text/cover.md',
    'text/index.md',
    'doc/ja/index.md',
    'doc/ja/intro/index.md',
    // `title` is automatically guessed from the file (frontmatter > first heading).
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set individually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  // entryContext: './manuscripts', // default to '.' (relative to `vivliostyle.config.js`).
  // output: [ // path to generate draft file(s). default to '{title}.pdf'
  //   './output.pdf', // the output format will be inferred from the name.
  //   {
  //     path: './book',
  //     format: 'webpub',
  //   },
  // ],
  workspaceDir: '.vivliostyle', // directory which is saved intermediate files.
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
}
