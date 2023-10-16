module.exports = {
  title: 'Appium ドキュメント 日本語版PDF', // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
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
    'doc/a/guides/security.md',
    'doc/ja/guides/caps.md',
    - Context（文脈・状況） API: ja/guides/context.md
    - Settings API: ja/guides/settings.md
    - メソッドの実行: ja/guides/execute-methods.md
    - イベントタイミングAPI: ja/guides/event-timing.md
    - ログフィルタリング: ja/guides/log-filters.md
    - AppiumとSelenium Grid: ja/guides/grid.md
    - アプリケーションバンドル・キャッシングロジック: ja/guides/caching.md
  - デベロッパリファレンス（外部リンク[英語]）:
    - xxx_ベースドライバ: https://appium.io/docs/en/2.0/reference/commands/base-driver/
    - xxx_フェイクドライバ: https://appium.io/docs/en/2.0/reference/commands/fake-driver/
  - エコシステム:
    - Appiumのエコシステム: ja/ecosystem/index.md
    - Appium ドライバの構築: ja/ecosystem/build-drivers.md
    - Appium Pluginの構築: ja/ecosystem/build-plugins.md
    - Appium 拡張の文書作成: ja/ecosystem/build-docs.md
  - 貢献:
    - Appiumに貢献する: ja/contributing/index.md
    - Appiumの設定システム: ja/contributing/config-system.md
  - 資料: ja/resources.md
  - issue（外部リンク[英語]）: https://github.com/appium/appium/issues
  - リファレンス（外部リンク[英語]）:
    - appium/base-driver Commands: https://appium.io/docs/en/2.0/reference/commands/base-driver/
    - Plugin execute-driver: https://appium.io/docs/en/2.0/reference/commands/execute-driver-plugin/
    - Driver fake: https://appium.io/docs/en/2.0/reference/commands/fake-driver/
    - Plugin images: https://appium.io/docs/en/2.0/reference/commands/images-plugin/
    - Plugin relaxed-caps: https://appium.io/docs/en/2.0/reference/commands/relaxed-caps-plugin/
    - Plugin universal-xml: https://appium.io/docs/en/2.0/reference/commands/universal-xml-plugin/
  - 'doc/ja/readme.md',

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
