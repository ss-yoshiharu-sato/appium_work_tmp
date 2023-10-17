module.exports = {
  title: 'Appium ドキュメント 日本語版', // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: 'neuvecom <neuvecom@gmail.com>', // default to `author` in `package.json` or undefined.
  language: 'ja', // default to undefined.
  size: 'B5', // paper size.
  theme: '@vivliostyle/theme-techbook@^1.0.0', // .css or local dir or npm package. default to undefined.
  entry: [
    'text/cover.md',
    'text/index.md',
    'doc/ja/summary.md',
    'doc/ja/index.md',
    'doc/ja/intro/index.md',
    'doc/ja/intro/drivers.md',
    'doc/ja/intro/clients.md',
    'doc/ja/intro/requirements.md',
    'doc/ja/intro/history.md',
    'doc/ja/quickstart/index.md',
    'doc/ja/quickstart/install.md',
    'doc/ja/quickstart/uiauto2-driver.md',
    'doc/ja/quickstart/test-java.md',
    'doc/ja/quickstart/test-js.md',
    'doc/ja/quickstart/test-py.md',
    'doc/ja/quickstart/test-rb.md',
    'doc/ja/quickstart/next-steps.md',
    'doc/ja/cli/index.md',
    'doc/ja/cli/args.md',
    'doc/ja/cli/extensions.md',
    'doc/ja/guides/migrating-1-to-2.md',
    'doc/ja/guides/managing-exts.md',
    'doc/ja/guides/config.md',
    'doc/ja/guides/security.md',
    'doc/ja/guides/caps.md',
    'doc/ja/guides/context.md',
    'doc/ja/guides/settings.md',
    'doc/ja/guides/execute-methods.md',
    'doc/ja/guides/event-timing.md',
    'doc/ja/guides/log-filters.md',
    'doc/ja/guides/grid.md',
    'doc/ja/guides/caching.md',
    'doc/ja/ecosystem/index.md',
    'doc/ja/ecosystem/build-drivers.md',
    'doc/ja/ecosystem/build-plugins.md',
    'doc/ja/ecosystem/build-docs.md',
    'doc/ja/contributing/index.md',
    'doc/ja/contributing/config-system.md',
    'doc/ja/resources.md',
    'doc/ja/readme.md',

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
