---
title: JavaScriptでのテスト
---

# JavaScriptでのテスト

<!-- To write an Appium test in JavaScript (Node.js), we need to choose an Appium-compatible client
library. The best-maintained library and the one the Appium team recommends using is
[WebdriverIO](https://webdriver.io), so let's use that. Since we already have Appium installed we
know our Node and NPM requirements are already satisfied. So just create a new project directory
somewhere on your computer and then initialize a new Node.js project in it: -->

JavaScript（Node.js）でAppiumのテストを書くには、Appiumに対応したクライアントライブラリを選択する必要があります。最も保守が行き届いていて、Appiumチームが使用を推奨しているライブラリは [WebdriverIO](https://webdriver.io)なので、これを使うことにしましょう。すでにAppiumがインストールされているので NodeとNPMの要件はすでに満たされていることになります。そこで、新しいプロジェクトディレクトリを作成し、その中に新しいNode.jsプロジェクトを初期化します：

```bash
npm init
```

<!-- It doesn't really matter what you put in the prompts, just so long as you end up with a valid
`package.json`. -->

プロンプトに何を入れてもかまいませんが、最終的に有効な `package.json`が生成されます。

<!-- Now, install the `webdriverio` package via NPM: -->
では、NPM経由で `webdriverio` パッケージをインストールします：

```bash
npm i --save-dev webdriverio
```

<!-- Once this is done, your `package.json` file should include a section like the following: -->
これが完了すると、`package.json`ファイルには、以下のようなセクションが追加されます：

```json
{
  "devDependencies": {
    "webdriverio": "7.31.1"
  }
}
```

<!-- Now it's time to type up the test itself. Create a new file called `test.js` with the following
contents: -->

さて、いよいよテストそのものを記述します。`test.js`という新しいファイルを作成し、以下のように記述します。：

```js
const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.Android.settings',
  'appium:appActivity': '.Settings',
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
```

<!-- !!! note -->

<!-- It's not within the scope of this guide to give a complete run-down on the WebdriverIO client
    library or everything that's happening here, so we'll leave the code itself unexplained in
    detail for now. You may want to read up particularly on Appium
    [Capabilities](../guides/caps.md) in addition to familiarizing yourself with the excellent
    [WebdriverIO documentation](https://webdriver.io/docs/gettingstarted) for a fuller explanation
    of the various API commands you see and what their purpose is. -->

!!! note
    このガイドでは、WebdriverIOのクライアントライブラリや、ここで起こっていることのすべてを完全に説明できません。ライブラリやここで起こっていることすべてを完全に説明することはこのガイドの目的の範囲ではありませんので、コード自体の説明は省きます。  
    コード自体の詳細については、以下を読んでおくとよいかもしれません。
    
    - [Capabilities](../guides/caps.md) より詳細な知見を得られます
    - [WebdriverIO documentation](https://webdriver.io/docs/gettingstarted) まざまなAPIコマンドとその目的が何であるかについての完全な説明があります。

<!-- Basically, this code is doing the following: -->
基本的に、上記コードは以下のようなことをしています：

<!-- 1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows whatkind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Battery" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session. -->

1. Appiumサーバに送信する「Capabilities」（パラメータ）のセットを定義して、Appiumが自動化したいものを把握できるようにします。
1. Androidの「設定」アプリでAppiumのセッションを開始します。
1. 「Battery」をリスト項目から探し、クリックします。
1. 視覚的な効果を得るために、一瞬だけポーズをとる。
1. Appiumのセッションを終了する。

<!-- That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server running in another terminal session, otherwise you'll get an error about not being able to connect to one. Then, you can execute the script: -->

いい感じです！試しにやってみましょう。テストを実行する前に、別のターミナルセッションでAppiumサーバが動作していることを確認してください。
そうしないと、接続できないというエラーが表示されます。
準備ができたら以下のスクリプトを実行します：

```bash
node test.js
```

<!-- If all goes well, you'll see the Settings app open up and navigate to the "Battery" view before the app closes again.

Congratulations, you've started your Appium journey! Read on for some next steps to explore. -->

うまくいけば、アプリが再び閉じる前に、設定アプリが開き、「バッテリー」ビューに移動するのがわかるでしょう。

おめでとうございます、あなたはAppiumの旅を始めました！次のステップに進むために[次の段階へ](next-steps.md)を読んでみてください。

