---
title: Building Appium Drivers
---

<!-- Appium wants to make it easy for anyone to develop their own automation drivers as part of the Appium ecosystem. This guide will explain what's involved and how you can accomplish various driver development tasks using the tools Appium provides. This guide assumes you (1) are a competent user of Appium, (2) are a competent Node.js developer, and (3) that you have read and understood the [Driver Intro](../intro/drivers.md). -->
Appiumでは、エコシステムの一部として、誰でも簡単に独自のオートメーションドライバを開発できるようにしたいと考えています。この文書では、Appiumが提供するツールを使用して、何が必要で、どのようにさまざまなドライバ開発タスクを達成できるかを説明します。このガイドは、あなたが

（1）Appiumの有能なユーザーであり、   
（2）有能なNode.js開発者であり、   
（3） [Appium Drivers入門](../intro/drivers.md) を読み、理解していること

を前提としています。

<!-- If that describes you, great! This guide will get you started. -->
もしこれらにあなたに当てはまるなら、素晴らしいことです！この文書を読めば、すぐに開発を始められます。

<!-- ## Before you create your driver -->
## ドライバを作る前に

<!-- Before you get to work implementing your driver, it's important to have a few things sorted out. For example, you need to know what your driver will do. Which platform is it trying to expose WebDriver automation for? -->
ドライバの実装に取り掛かる前に、いくつかの重要なことを整理しきます。例えば、ドライバが何をするのかを知っておく必要があります。どのプラットフォームでWebDriverによる自動化を公開しようとしているのか？

<!-- Appium doesn't magically give you the power to automate any platform. All it does is give you a set of convenient tools for implementing the WebDriver Protocol. So if you want to create, for example, a driver for a new app platform, you'll need to know how to automate apps on that platform *without Appium*. -->
Appiumは、魔法のようにどんなプラットフォームでも自動化する力を与えてくれるわけではありません。WebDriverプロトコルを実装するための便利なツール一式を与えるだけです。そのため、例えば新しいアプリプラットフォーム用のドライバを作成したい場合、そのプラットフォーム上のアプリを*Appium*なしで自動化する方法を知っておく必要があります。

<!-- This usually means that you need to be very familiar with app development for a given platform. And it usually means that you will rely on tools or SDKs provided by the platform vendor. -->
これは、特定のプラットフォームのアプリ開発に精通している必要があることを意味します。そして、プラットフォーム開発元が提供するツールやSDKに依存することになります。

<!-- Basically, if you can't answer the question **"how would I launch, remotely trigger behaviours, and read state from an app on this platform?" then you're not quite ready to write an Appium driver**. Make sure you do the research to feel comfortable that there *is* a path forward. Once there is, coding it up and making it available as an Appium driver should be the easy part! -->
基本的には、**「このプラットフォームのアプリをどのように起動し、リモートで動作をトリガーし、状態を読み取るか」**という質問に答えられないのであれば、Appiumドライバを書く準備はまだできいません。前進する道があると確信できるような調査をしてください。そうすれば、それをコーディングしてAppiumドライバとして利用できるようにするのは簡単なことです！

<!-- ## Other drivers to reference -->
## 参考となる他のドライバ

<!-- One of the greatest things about building an Appium driver is that there are already a number of open source Appium drivers which you can look at for reference. There is a [fake-driver](https://github.com/appium/appium/tree/2.0/packages/fake-driver) sample driver which does basically nothing other than showcase some of the things described in this guide. -->
Appiumドライバを作る上で素晴らしいことの1つは、参考にできるオープンソースのAppiumドライバが既に多数存在することです。この文書で説明されていることの一部を紹介するだけで、基本的には何もしないサンプルドライバ[fake-driver](https://github.com/appium/appium/tree/2.0/packages/fake-driver)が存在します。

<!-- And of course, all of Appium's official drivers are open source and available in repositories at the project's GitHub organization. So if you ever find yourself asking, "how does a driver do X?", read the code for these drivers! Also don't be afraid to ask questions of the Appium developers if you get stuck; we're always happy to help make sure the driver development experience is a good one! -->
もちろん、Appiumの公式ドライバはすべてオープンソースで、プロジェクトのGitHubのリポジトリで入手できます。ですから、もしあなたが「ドライバはどのように開発を行うのだろう？」と疑問があれば、これらのドライバのソースコードを読んでみてください！また、もし行き詰まったら、Appiumの開発者に質問することを恐れずに、私たちはドライバの開発が良いものになるように、いつでも喜んでお手伝いします！

<!-- ## Basic requirements for Appium drivers -->
## Appium ドライバの基本要件

<!-- These are the things your driver *must* do (or be), if you want it to be a valid Appium driver. -->
Appiumのドライバとして有効であるためには、ドライバは以下のような条件が必要です（または、そうであることが望ましい）。

<!-- ### Node.js package with Appium extension metadata -->
### Appium拡張メタデータを持つNode.jsパッケージ

<!-- All Appium drivers are fundamentally Node.js packages, and therefore must have a valid `package.json`. Your driver is not _limited_ to Node.js, but it must provide an adapter written in Node.js so it can be loaded by Appium. -->
すべてのAppiumドライバは基本的にNode.jsのパッケージであり、有効な`package.json`を持つ必要があります。ドライバはNode.jsに限定されませんが、Node.jsで書かれたアダプタが提供され、Appiumで読み込むことができるようになっている必要があります。

<!-- Your `package.json` must include `appium` as a `peerDependency`. The requirements for the dependency versions should be as loose as possible (unless you happen to know your driver will only work with certain versions of Appium). For Appium 2.0, for example, this would look something like `^2.0.0`, declaring that your driver works with any version of Appium that starts with 2.x. -->
あなたの`package.json`は`appium`を`peerDependency`として含んでいなければなりません。依存バージョンの要件はできるだけ緩やかであるべきです（あなたのドライバが特定のバージョンのAppiumでしか動作しないことが分かっている場合を除く）。例えばAppium2.0の場合、これは`^2.0.0`のようになり、あなたのドライバは2.xで始まるAppiumのすべてのバージョンで動作すると宣言しましょうd。

<!-- Your `package.json` must contain an `appium` field, like this (we call this the 'Appium extension metadata'): -->
`package.json`には、次のような`appium`フィールドを含める必要があります（これを 'Appium extension metadata' と呼びます

```json
{
  ...,
  "appium": {
    "driverName": "fake",
    "automationName": "Fake",
    "platformNames": [
      "Fake"
    ],
    "mainClass": "FakeDriver"
  },
  ...
}
```

<!-- The required subfields are: -->
必須のサブフィールドは以下の通りです：

<!-- * `driverName`: this should be a short name for your driver.
* `automationName`: this should be the string users will use for their `appium:automationName` capability to tell Appium to use *your* driver.
* `platformNames`: this is an array of one or more platform names considered valid for your driver. When a user sends in the `platformName` capability to start a session, it must be included in this list for your driver to handle the session. Known platform name strings include: `iOS`, `tvOS`, `macOS`, `Windows`, `Android`.
* `mainClass`: this is a named export (in CommonJS style) from your `main` field. It must be a class which extends Appium's `BaseDriver` (see below). -->
* `driverName`: ドライバの短い名前を指定します。
* `automationName`: これは、ユーザーが `appium:automationName` capability で使用する文字列で、Appiumに*your*ドライバを使用するように指示するものであるべきです。
* `platformNames`: これは、あなたのドライバに有効な1つまたは複数のプラットフォーム名の配列です。ユーザーがセッションを開始するために `platformName`capabilityを送信するとき、ドライバがセッションを処理するために、このリストに含まれている必要があります。知られているプラットフォーム名の文字列は以下の通りです： `iOS`, `tvOS`, `macOS`, `Windows`, `Android`
* `mainClass`: `main`フィールドから名前を付けてエクスポートします（CommonJSスタイル）。Appiumの`BaseDriver`を拡張したクラスである必要があります（下記参照）。

<!-- ### Extend Appium's `BaseDriver` class -->
### Appiumの `BaseDriver`クラスを拡張する

<!-- Ultimately, your driver is much easier to write because most of the hard work of implementing the WebDriver protocol and handling certain common logic is taken care of already by Appium. This is all encoded up as a class which Appium exports for you to use, called `BaseDriver`. It is exported from `appium/driver`, so you can use one of these styles to import it and create your *own* class that extends it: -->
最終的には、WebDriverプロトコルの実装や特定の共通ロジックの処理など、大変な作業のほとんどがAppiumによって用意されているため、ドライバを書くのは非常に簡単です。これはすべて、Appiumが`BaseDriver`というクラスとしてエクスポートされ、利用できるようにエンコードされています。`appium/driver`からエクスポートされるので、これらのスタイルの1つを使用してインポートし、それを継承した*独自*クラスを作成できます：

```js
import {BaseDriver} from 'appium/driver';
// or: const {BaseDriver} = require('appium/driver');

export class MyDriver extends BaseDriver {
}
```

<!-- ### Make your driver available -->
### ドライバを利用可能にする

<!-- That's basically it! With a Node.js package exporting a driver class and with correct Appium extension metadata, you've got yourself an Appium driver! Now it doesn't *do* anything, but you can load it up in Appium, start and stop sessions with it, etc... -->
基本はこれで完了です！Node.jsのパッケージがドライバクラスをエクスポートし、Appiumの拡張メタデータが正しく設定されていれば、Appiumドライバが完成します！このドライバは何もしませんが、Appiumでロードしたり、セッションを開始したり停止したりできます。

<!-- To make it available to users, you could publish it via NPM. When you do so, your driver will be installable via the Appium CLI: -->
ユーザーに提供するために、NPM経由で公開できます。そうすると、Appium CLIでドライバをインストールできるようです：

```
appium driver install --source=npm <driver-package-on-npm>
```

<!-- It's a good idea to test your driver first, of course. One way to see how it works within Appium is to install it locally first: -->
もちろん、最初にドライバをテストするのは良いアイデアです。Appiumの中でどのように動作するかを確認する一つの方法は、まずローカルにインストールすることです：

```
appium driver install --source=local /path/to/your/driver
```

<!-- ### Developing your driver -->
### ドライバの開発

<!-- How you develop your driver is up to you. It is convenient, however, to run it from within Appium without having to do lots of publishing and installing. The most straightforward way to do this is to include the most recent version of Appium as a `devDependency`, and then also your own driver, like this: -->
どのようにドライバを配信するか？は、あなた次第です。しかし、発行やインストールを何度もすることなく、Appium内から実行することができれば便利です。最も簡単な方法は、以下のように最新版のAppiumを`devDependency`としてインクルードし、さらに自分のドライバをインクルードすることです：

```json
{
    "devDependencies": {
        ...,
        "appium": "^2.0.0",
        "your-driver": "file:.",
        ...
    }
}
```

<!-- Now, you can run Appium locally (`npm exec appium` or `npx appium`), and because your driver is listed as a dependency alongside it, it will be automatically "installed" and available. You can design your e2e tests this way, or if you're writing them in Node.js, you can simply import Appium's start server methods to handle starting and stopping the Appium server in Node. (TODO: reference an implementation of this in one of the open source drivers when ready). -->
これで、Appiumをローカルで実行（`npm exec appium`または`npx appium`）すると、ドライバが依存関係として一緒にリストアップされているので、自動的に「インストール」されて利用可能です。この方法でe2eテストを設計もできますし、Node.jsで書いている場合は、Appiumのstart serverメソッドをインポートするだけで、NodeでAppiumサーバの起動と停止を処理できます（TODO：準備ができたらオープンソースドライバの1つにあるこの実装を参照してください）。

<!-- Another way to do local development with an existing Appium server install is to simply install your driver locally: -->
既存のAppiumサーバをインストールしてローカル開発を行うもう一つの方法は、単にローカルにドライバをインストールすることです：

```
appium driver install --source=local /path/to/your/driver/dev/dir
```

<!-- ## Standard driver implementation ideas -->
## 標準的なドライバ実装のアイデア

<!-- These are things you will probably find yourself wanting to do when creating a driver. -->
以下は、ドライバを作成する際に、おそらくあなたがやりたいと思うことでしょう。

<!-- ### Set up state in a constructor -->
### コンストラクタで状態をセットアップする

<!-- If you define your own constructor, you'll need to call `super` to make sure all the standard state is set up correctly: -->
独自のコンストラクタを定義する場合、`super`を呼び出して標準的な状態がすべて正しく設定されていることを確認する必要があります：

```js
constructor(...args) {
    super(...args);
    // now do your own thing
}
```

<!-- The `args` parameter here is the object containing all the CLI args used to start the Appium server. -->
ここでの`args`パラメータは、Appiumサーバの起動に使用するすべてのCLI引数を含むオブジェクトです。

<!-- ### Define and validate accepted capabilities -->
### 受け入れ可能なcapabilitiesの定義と検証

<!-- You can define your own capabilities and basic validation for them. Users will always be able to send in capabilities that you don't define, but if they send in capabilities you have explicitly defined, then Appium will validate that they are of the correct type (and will check for the presence of required capabilities). -->
独自のcapabilitiesとそれに対する基本的な検証方法を定義できます。ユーザーは常に、あなたが定義していないcapabilitiesを送信できますが、あなたが明示的に定義したcapabilitiesを送信した場合のみ、Appiumはそれが正しいタイプであることを検証します（そして、必要なcapabilitiesかどうかをチェックします）。

<!-- If you want to turn capability validation off entirely, set `this.shouldValidateCaps` to `false` in your constructor. -->
capabilityの検証を完全にオフにしたい場合は、コンストラクタで`this.shouldValidateCaps`を`false`に設定します。

<!-- To give Appium your validation constraints, set `this.desiredCapConstraints` to a validation object in your constructor. Validation objects can be somewhat complex. Here's an example from the UiAutomator2 driver: -->
Appiumでの検証に制約を与えるには、コンストラクタで`this.desiredCapConstraints`を検証オブジェクトに設定します。バリデーションオブジェクトはやや複雑になることがあります。以下はUiAutomator2ドライバの例です：

```js
{
  app: {
    presence: true,
    isString: true
  },
  automationName: {
    isString: true
  },
  browserName: {
    isString: true
  },
  launchTimeout: {
    isNumber: true
  },
}
```

<!-- ### Start a session and read capabilities -->
### セッションの開始とcapabilitiesの読み込み

<!-- Appium's `BaseDriver` already implements the `createSession` command, so you don't have to. However it's very common to need to perform your own startup actions (launching an app, running some platform code, or doing different things based on capabilities you have defined for your driver). So you'll probably end up overriding `createSession`. You can do so by defining the method in your driver: -->
Appiumの`BaseDriver`は既に`createSession`コマンドを実装しているので、実装する必要はありません。しかし、独自の起動アクション（アプリの起動、プラットフォームコードの実行、ドライバ定義に準拠するさまざまな処理）を実行する必要があることはよくあることです。そのためには、おそらく`createSession`を上書きすることになるでしょう。その場合は、ドライバでメソッドを定義します：

```js
async createSession(jwpCaps, reqCaps, w3cCaps, otherDriverData) {
    const [sessionId, caps] = super.createSession(w3cCaps);
    // do your own stuff here
    return [sessionId, caps];
}
```

<!-- For legacy reasons, your function will receive old-style JSON Wire Protocol desired and required caps as the first two arguments. Given that the old protocol isn't supported anymore and clients have all been updated, you can instead only rely on the `w3cCaps` parameter. (For a discussion about what `otherDriverData` is about, see the section below on concurrent drivers). -->
レガシーな理由から、この関数は最初の2つの引数として旧式のJSON Wire Protocol希望と必須capsを受け取ります。古いプロトコルはもうサポートされておらず、クライアントもすべて更新されているため、代わりに`w3cCaps`パラメータにのみ依存できます。(`otherDriverData`が何であるかについては、以下の同時実行型ドライバに関するセクションを参照してください)。

<!-- You'll want to make sure to call `super.createSession` in order to get the session ID as well as the processed capabilities (note that capabilities are also set on `this.caps`; modifying `caps` locally here would have no effect other than changing what the user sees in the create session response). -->
セッションIDと処理されたcapabilityを取得するために`super.createSession`を必ず呼び出すようにします（capabilitiesは`this.caps`にも設定されていることに注意してください。）

<!-- So that's it! You can fill out the middle section with whatever startup logic your driver requires. -->
というわけで、これで終わりです！ドライバが必要とする起動ロジックで、中間セクションを埋めることができます。

<!-- ### End a session -->
### セッションを終了する

<!-- If your driver requires any cleanup or shutdown logic, it's best to do it as part of overriding the implementation of `deleteSession`: -->
ドライバにクリーンアップやシャットダウンのロジックが必要な場合は、`deleteSession`の実装を上書きを行うのがベストです：

```js
async deleteSession() {
    // do your own cleanup here
    // don't forget to call super!
    await super.deleteSession();
}
```

<!-- It's very important not to throw any errors here if possible so that all parts of session cleanup can succeed! -->
セッションのクリーンアップのすべての部分を成功させるために、可能であればここで**エラーを投げない**ようにすることが非常に重要です！

<!-- ### Access capabilities and CLI args -->
### capabilitiesへのアクセスとCLIの引数

<!-- You'll often want to read parameters the user has set for the session, whether as CLI args or as capabilities. The easiest way to do this is to access `this.opts`, which is a merge of all options, from the CLI or from capabilities. So for example to access the `appium:app` capability, you could simply get the value of `this.opts.app`. -->
ユーザーがセッションに設定したパラメータを、CLIの引数として、あるいはcapabilitiesとして、読みたいことがよくあるでしょう。これを行う最も簡単な方法は、すべてのオプションのマージである`this.opts`にCLIから、またはcapabilityからアクセスすることです。例えば、`appium:app` capabilityにアクセスするには、単純に`this.opts.app`の値を取得します。

<!-- If you care about knowing whether something was sent in as a CLI arg *or* a capability, you can access the `this.cliArgs` and `this.caps` objects explicitly. -->
もし、CLIのargとして送られたのか、それともcapabilityとして送られたのかを知りたい場合は、`this.cliArgs`と`this.caps`オブジェクトに明示的にアクセスできます。

<!-- In all cases, the `appium:` capability prefix will have been stripped away by the time you are accessing values here, for convenience. -->
どのような場合でも、便宜上、ここにアクセスする時点では、`appium:` capability prefix は取り除かれているはずです。

<!-- ### Implement WebDriver commands -->
### WebDriver コマンドの実装

<!-- You handle WebDriver commands by implementing functions in your driver class. Each member of the WebDriver Protocol, plus the various Appium extensions, has a corresponding function that you implement if you want to support that command in your driver. The best way to see which commands Appium supports and which method you need to implement for each command is to look at Appium's [routes.js](https://github.com/appium/appium/blob/2.0/packages/base-driver/lib/protocol/routes.js). Each route object in this file tells you the command name as well as the parameters you'd expect to receive for that command. -->
WebDriverのコマンドは、ドライバクラスに関数を実装することで処理します。WebDriverプロトコルの各メンバーとさまざまなAppium拡張機能には、対応する関数があり、ドライバでそのコマンドをサポートしたい場合は、それを実装します。Appiumがどのコマンドをサポートし、各コマンドに対してどのメソッドを実装する必要があるかを確認する最善の方法は、Appiumの[routes.js](https://github.com/appium/appium/blob/2.0/packages/base-driver/lib/protocol/routes.js) を見ることです。このファイルの各ルートオブジェクトは、コマンド名だけでなく、そのコマンドに対して受け取ることが期待されるパラメータも教えてくれます。

<!-- Let's take this block for example: -->
例えば、このブロックを例にあげてみましょう：

```js
'/session/:sessionId/url': {
    GET: {command: 'getUrl'},
    POST: {command: 'setUrl', payloadParams: {required: ['url']}},
}
```

<!-- Here we see that the route `/session/:sessionId/url` is mapped to two commands, one for a `GET` request and one for a `POST` request. If we want to allow our driver to change the "url" (or whatever that might mean for our driver), we can therefore implement the `setUrl` command, knowing it will take the `url` parameter: -->
ここで、ルート`/session/:sessionId/url`が2つのコマンドにマップされていることがわかります。1つは`GET`リクエスト用、もう1つは`POST`リクエスト用です。もしドライバが "url"(またはドライバにとってそれが何を意味するのか)を変更できるようにしたい場合、`setUrl`コマンドを実装し、それが`url`パラメータを取ることを理解できます：

```js
async setUrl(url) {
    // your implementation here
}
```

<!-- A few notes:
- all command methods should be `async` functions or otherwise return a `Promise`
- you don't need to worry about protocol encoding/decoding. You will get JS objects as params, and can return JSON-serializable objects in response. Appium will take care of wrapping it up in the WebDriver protocol response format, turning it into JSON, etc...
- all session-based commands receive the `sessionId` parameter as the last parameter
- all element-based commands receive the `elementId` parameter as the second-to-last parameter
- if your driver doesn't implement a command, users can still try to access the command, and will get a `501 Not Yet Implemented` response error. -->
いくつか注意点があります：
- すべてのコマンドメソッドは`async`関数であるか、さもなければ`Promise`を返す必要があります。
- プロトコルのエンコード/デコードを気にする必要はありません。パラメータとしてJSオブジェクトを取得し、レスポンスとしてJSONのシリアライズ可能なオブジェクトを返すことができます。AppiumはそれをWebDriverプロトコルのレスポンスフォーマットでラップし、JSONに変換するなどの処理を行います...
- すべてのセッションベースのコマンドは、最後のパラメータとして`sessionId`パラメータを受け取ります。
- すべての要素ベースのコマンドは、2番目から最後のパラメータとして `elementId` パラメータを受け取ります。
- ドライバがコマンドを実装していない場合でも、ユーザーがそのコマンドにアクセスしようとすると、`501 Not Yet Implemented`という応答エラーが発生します。

<!-- ### Implement element finding -->
### 要素探索の実装

<!-- Element finding is a special command implementation case. You don't actually want to override `findElement` or `findElements`, even though those are what are listed in `routes.js`. Appium does a lot of work for you if instead you implement this function: -->
要素検索は、特別なコマンド実装のケースです。`routes.js`に記載されていても、実際には`findElement`や`findElements`を上書きする必要はありません。代わりにこの関数を実装すれば、Appiumはあなたのために多くの仕事をします：

```js
async findElOrEls(strategy, selector, mult, context) {
    // find your element here
}
```

<!-- Here's what gets passed in: -->
以下は、渡されるものです：

<!-- - `strategy` - a string, the locator strategy being used
- `selector` - a string, the selector
- `mult` - boolean, whether the user has requested one element or all elements matching the selector
- `context` - (optional) if defined, will be a W3C Element (i.e., a JS object with the W3C element identifier as the key and the element ID as the value) -->
- `strategy` - 文字列、使用する位置決定の方法/構文（locator strategy）
- `selector` - 文字列、セレクタ
- `mult` - boolean, ユーザーが要求した要素が1つなのか、それともセレクタにマッチするすべての要素なのか
- `context` - (オプション) 定義されている場合、W3C要素 (つまり、W3C要素識別子をキー、要素IDを値とするJSオブジェクト) となる

<!-- And you need to return one of the following: -->
そして、以下のいずれかを返す必要があります：

<!-- - a single W3C element (an object as described above)
- an array of W3C elements -->
- 単一のW3C要素（上記のようなオブジェクト）
- W3C要素の配列

<!-- Note that you can import that W3C web element identifier from `appium/support`: -->
なお、このW3C要素識別子は `appium/support` からインポートできます：

```js
import {util} from 'appium/support';
const { W3C_WEB_ELEMENT_IDENTIFIER } = util;
```

<!-- What you do with elements is up to you! Usually you end up keeping a cache map of IDs to actual element "objects" or whatever the equivalent is for your platform. -->
エレメントをどうするかは、あなた次第です！よくあるのは、実際の要素の"オブジェクト"にIDのキャッシュマップを保持することですが、あなたのプラットフォームで同等のものがあれば、何でも構いません。

<!-- ### Define valid locator strategies -->
### 有効な位置決定の方法/構文（locator strategies）を定義する

<!-- Your driver might only support a subset of the standard WebDriver locator strategies, or it might add its own custom locator strategies. To tell Appium which strategies are considered valid for your driver, create an array of strategies and assign it to `this.locatorStrategies`: -->
あなたのドライバは、標準的なWebDriver locator strategies(位置決定の方法/構文)のサブセットのみをサポートするかもしれませんし、独自の方法/構文を追加するかもしれません。Appiumにどの方法/構文が有効かを伝えるために、方法/構文の配列を作成して `this.locatorStrategies` に代入します：

```js
this.locatorStrategies = ['xpath', 'custom-strategy'];
```

<!-- Appium will throw an error if the user attempts to use any strategies other than the allowed ones, which enables you to keep your element finding code clean and deal with only the strategies you know about. -->
Appiumは、ユーザーが許可された方法/構文以外のものを使用しようとするとエラーを出力するので、要素を見つけるコードをきれいに保ち、自分が知っている方法/構文のみを使うことができます。

<!-- By default, the list of valid strategies is empty, so if your driver isn't simply proxying to another WebDriver endpoint, you'll need to define some. The protocol-standard locator strategies are defined [here](https://www.w3.org/TR/webdriver/#locator-strategies). -->
デフォルトでは、有効な方法/構文のリストは空なので、ドライバが単に別のWebDriverエンドポイントへのプロキシでない場合は、いくつか定義する必要があります。プロトコル標準の位置決定の方法/構文は [こちら](https://www.w3.org/TR/webdriver/#locator-strategies) で定義されています。

<!-- ### Throw WebDriver-specific errors -->
### WebDriver固有のエラーを出力させる

<!-- The WebDriver spec defines a [set of error codes](https://github.com/jlipps/simple-wd-spec#error-codes) to accompany command responses if an error occurred. Appium has created error classes for each of these codes, so you can throw the appropriate error from inside a command, and it will do the right thing in terms of the protocol response to the user. To get access to these error classes, import them from `appium/driver`: -->
WebDriverの仕様では、エラーが発生した場合のコマンドレスポンスに付随する[エラーコードのセット](https://github.com/jlipps/simple-wd-spec#error-codes)を定義しています。Appiumはこれらのコードごとにエラークラスを作成しているので、コマンドの内部から適切なエラーを出力させることができ、ユーザーへのプロトコル応答として正しい処理を行うことができます。これらのエラークラスにアクセスするには、`appium/driver`からインポートします：

```
import {errors} from 'appium/driver';

throw new errors.NoSuchElementError();
```

<!-- ### Log messages to the Appium log -->
### Appiumのログにメッセージを記録する

<!-- You can always use `console.log`, of course, but Appium provides a nice logger for you as `this.log` (it has `.info`, `.debug`, `.log`, `.warn`, `.error` methods on it for differing log levels). If you want to create an Appium logger outside of a driver context (say in a script or helper file), you can always construct your own too: -->
もちろん`console.log`を使うこともできますが、Appiumでは`this.log`というすてきなロガーが用意されています（このロガーには `.info`, `.debug`, `.log`, `.warn`, `.error`というログレベル別のメソッドがあります）。もし、ドライバのContext以外（例えばスクリプトやヘルパーファイル）でAppiumのロガーを作成したい場合は、いつでも自分で作成できます：

```js
import {logging} from 'appium/support';
const log = logging.getLogger('MyDriver');
```

<!-- ## Further possibilities for Appium drivers -->
## Appiumドライバの更なる可能性

<!-- These are things your driver *can* do to take advantage of extra driver features or do its job more conveniently. -->
以下は、ドライバの機能を利用したり、より便利に仕事をするために、ドライバが*できること*です。

<!-- ### Add a schema for custom command line arguments -->
### カスタムコマンドのスキーマを追加する

<!-- You can add custom CLI args if you want your driver to receive data from the command line when the Appium server is started (for example, ports that a server administrator should set that should not be passed in as capabilities. -->
Appiumサーバの起動時に、コマンドラインからドライバがデータを受け取るようにしたい場合、カスタムのCLI argsを追加できます（例えば、サーバ管理者が設定すべきポートで、capabilitiesとして渡すべきものではないものなど）。

<!-- To define CLI arguments (or configuration properties) for the Appium server, your extension must provide a _schema_. In the `appium` property of your extension's `package.json`, add a `schema` property. This will either a) be a schema itself, or b) be a path to a schema file. -->
AppiumサーバのCLI引数（または設定プロパティ）を定義するには、拡張機能で_schema_を提供する必要があります。拡張機能の`package.json`の`appium`プロパティに、`schema`プロパティを追加してください。これは、a) スキーマそのもの、または b) スキーマファイルへのパスのいずれかです。

<!-- The rules for these schemas: -->
スキーマのルール:

<!-- - Schemas must conform to [JSON Schema Draft-07](https://ajv.js.org/json-schema.html#draft-07).
- If the `schema` property is a path to a schema file, the file must be in JSON or JS (CommonJS) format.
- Custom `$id` values are unsupported. To use `$ref`, provide a value relative to the schema root, e.g., `/properties/foo`.
- Known values of the `format` keyword are likely supported, but various other keywords may be unsupported. If you find a keyword that is unsupported which you need to use, please [ask for support](https://github.com/appium/appium/issues/new) or send a PR!
- The schema must be of type `object` (`{"type": "object"}`), containing the arguments in a `properties` keyword. Nested properties are unsupported. -->
- スキーマは[JSON Schema Draft-07](https://ajv.js.org/json-schema.html#draft-07)に準拠する必要があります。
- schema`プロパティがスキーマファイルへのパスである場合、そのファイルはJSONまたはJS（CommonJS）形式でなければならない。
- カスタムの`$id`値はサポートされていません。`ref`を使用する場合は、スキーマルートからの相対値を指定します（例：`/properties/foo`）。
- `format`キーワードの既知の値はサポートされている可能性が高いですが、他のさまざまなキーワードはサポートされていない可能性があります。もし、サポートされていないキーワードで必要なものがあれば、[ask for support](https://github.com/appium/appium/issues/new) またはPRを送ってください！
- スキーマは `object`型 (`{"type": "object"}`)でなければならず、`properties`キーワードの引数を含んでいます。ネストされたプロパティはサポートされていません。

<!-- Example: -->
例： 

```json
{
  "type": "object",
  "properties": {
    "test-web-server-port": {
      "type": "integer",
      "minimum": 1,
      "maximum": 65535,
      "description": "The port to use for the test web server"
    },
    "test-web-server-host": {
      "type": "string",
      "description": "The host to use for the test web server",
      "default": "sillyhost"
    }
  }
}
```

<!-- The above schema defines two properties which can be set via CLI argument or configuration file. If this extension is a _driver_ and its name is "horace", the CLI args would be `--driver-horace-test-web-server-port` and `--driver-horace-test-web-server-host`, respectively. Alternatively, a user could provide a configuration file containing: -->
上記のスキーマは、CLI引数または設定ファイルによって設定できる2つのプロパティを定義しています。この拡張機能が_driver_であり、その名前が "horace"である場合、CLI の引数はそれぞれ`--driver-horace-test-web-server-port`と`--driver-horace-test-web-server-host`です。別の方法として、ユーザーは以下の内容を含む設定ファイルを提供できます：

```json
{
  "server": {
    "driver": {
      "horace": {
        "test-web-server-port": 1234,
        "test-web-server-host": "localhorse"
      }
    }
  }
}
```

<!-- ### Add driver scripts -->
### ドライバスクリプトを追加する

<!-- Sometimes you might want users of your driver to be able to run scripts outside the context of a session (for example, to run a script that pre-builds aspects of your driver). To support this, you can add a map of script names and JS files to the `scripts` field within your Appium extension metadata. So let's say you've created a script in your project that lives in a `scripts` directory in your project, named `driver-prebuild.js`. Then you could add a `scripts` field like this: -->
ドライバのユーザがセッションのContext外でスクリプトを実行できるようにしたい場合があります（例えば、ドライバの側面を事前に構築するスクリプトを実行する場合など）。これをサポートするために、スクリプト名とJSファイルのマップをAppium拡張のメタデータ内の`scripts`フィールドに追加できます。例えば、プロジェクト内の `scripts` ディレクトリに`driver-prebuild.js`という名前のスクリプトを作成したとします。そうすると、次のような`scripts`フィールドを追加できます：

```json
{
    "scripts": {
        "prebuild": "./scripts/driver-prebuild.js"
    }
}
```

<!-- Now, assuming your driver is named `mydriver`, users of your driver can run `appium driver run mydriver prebuild`, and your script will execute. -->
ここで、ドライバの名前を`mydriver`とすると、ユーザが`appium driver run mydriver prebuild`を実行すれば、スクリプトが実行されます。

<!-- ### Proxy commands to another WebDriver implementation -->
### 別のWebDriver実装にコマンドをプロキシする

<!-- A very common design architecture for Appium drivers is to have some kind of platform-specific WebDriver implementation that the Appium driver interfaces with. For example, the Appium UiAutomator2 driver interfaces with a special (Java-based) server running on the Android device. In webview mode, it also interfaces with Chromedriver. -->
Appiumドライバの設計でよくあるのが、Appiumドライバがインターフェースするプラットフォーム固有のWebDriver実装を用意しておくことです。例えば、Appium UiAutomator2ドライバは、Androidデバイス上で動作する特別な（Javaベースの）サーバのインターフェースです。また、Webviewモードでは、Chromedriverのインターフェースです。

<!-- If you find yourself in this situation, it is extremely easy to tell Appium that your driver is just going to be proxying WebDriver commands straight to another endpoint. -->
このような状況に陥った場合、Appiumに、あなたのドライバがWebDriverコマンドを別のエンドポイントに代理するだけであることを伝えるのは、非常に簡単です。

<!-- First, let Appium know that your driver *can* proxy by implementing the `canProxy` method: -->
まず、`canProxy`メソッドを実装することで、あなたのドライバがプロキシできることをAppiumに知らせます：

```js
canProxy() {
    return true;
}
```

<!-- Next, tell Appium which WebDriver routes it should *not* attempt to proxy (there often end up being certain routes that you don't want to forward on): -->
次に、Appiumにプロキシを試みるべきでないWebDriverのルートを伝えます（転送したくないルートがあることはよくあります）：

```js
getProxyAvoidList() {
    return [
        ['POST', new RegExp('^/session/[^/]+/appium')]
    ];
}
```

<!-- The proxy avoidance list should be an array of arrays, where each inner array has an HTTP method as its first member, and a regular expression as its second. If the regular expression matches the route, then the route will not be proxied and instead will be handled by your driver. In this example, we are avoiding proxying all `POST` routes that have the `appium` prefix. -->
プロキシ回避リストは配列の配列である必要があり、各内部配列は最初のメンバーとしてHTTPメソッドを持ち、2番目のメンバーとして正規表現を持っています。正規表現がルートにマッチする場合、ルートはプロキシされず、代わりにドライバによって処理されます。この例では、プレフィックスに `appium` を持つすべての `POST` ルートのプロキシを回避しています。

<!-- Next, we have to set up the proxying itself. The way to do this is to use a special class from Appium called `JWProxy`. (The name means "JSON Wire Proxy" and is related to a legacy implementation of the protocol). You'll want to create a `JWProxy` object using the details required to connect to the remote server: -->
次に、プロキシ自体をセットアップする必要があります。これを行うには、`JWProxy`というAppiumの特別なクラスを使用します。(この名前は「JSON Wire Proxy」という意味で、プロトコルのレガシーな実装に関連しています)。リモートサーバに接続するために必要な情報を使って、`JWProxy`オブジェクトを作成することです：

```js
// import {JWProxy} from 'appium/driver';

const proxy = new JWProxy({
    server: 'remote.server',
    port: 1234,
    base: '/',
});

this.proxyReqRes = proxy.proxyReqRes.bind(proxy);
this.proxyCommand = proxy.command.bind(proxy);
```

<!-- Here we are creating a proxy object and assigning some of its methods to `this` under the names `proxyReqRes` and `proxyCommand`. This is required for Appium to use the proxy, so don't forget this step! The `JWProxy` has a variety of other options which you can check out in the source code, as well. (TODO: publish options as API docs and link here). -->
ここでは、プロキシオブジェクトを作成し、そのメソッドの一部を `proxyReqRes` と `proxyCommand` という名前で `this` に代入しています。これは Appium がプロキシを使用するために必要なことなので、このステップを忘れないようにしましょう！JWProxy`には他にもさまざまなオプションがあり、ソースコードで確認できます。(TODO:オプションをAPI文書として公開し、ここにリンクする)。

<!-- Finally, we need a way to tell Appium when the proxy is active. For your driver it might always be active, or it might only be active when in a certain context. You can define the logic as an implementation of `proxyActive`: -->
最後に、プロキシがいつアクティブになったかをAppiumに伝える方法が必要です。あなたのドライバでは、常にアクティブであるかもしれませんし、特定のContextにあるときだけアクティブになるかもしれません。このロジックは `proxyActive` の実装として定義できます：

```js
proxyActive() {
    return true; // or use custom logic
}
```

<!-- With those pieces in play, you won't have to reimplement anything that's already implemented by the remote endpoint you're proxying to. Appium will take care of all the proxying for you. -->
これらのピースがあれば、プロキシ先のリモートエンドポイントが既に実装しているものを再実装する必要はありません。Appiumがすべてのプロキシ処理を代行してくれます。

<!-- ### Extend the existing protocol with new commands -->
### 新しいコマンドで既存のプロトコルを拡張する

<!-- You may find that the existing commands don't cut it for your driver. If you want to expose behaviours that don't map to any of the existing commands, you can create new commands in one of two ways: -->
既存のコマンドでは、あなたのドライバに対応できないことがあるかもしれません。既存のコマンドに対応しない動作を公開したい場合は、次の2つの方法で新しいコマンドを作成します：

<!-- 1. Extending the WebDriver protocol and creating client-side plugins to access the extensions
1. Overloading the Execute Script command by defining [Execute Methods](../guides/execute-methods.md) -->
1. WebDriverプロトコルを拡張し、拡張にアクセスするためのクライアントサイドプラグインを作成する。
1. [メソッドの実行](../guides/execute-methods.md) を定義することにより、Execute Script コマンドをオーバーロードする。

<!-- If you want to follow the first path, you can direct Appium to recognize new methods and add them to its set of allowed HTTP routes and command names. You do this by assigning the `newMethodMap` static variable in your driver class to an object of the same form as Appium's `routes.js` object. For example, here is the `newMethodMap` for the `FakeDriver` example driver: -->
1.の方法を取る場合、Appiumに新しいメソッドを認識させ、許可されたHTTPルートとコマンド名のセットに追加するよう指示できます。そのためには、ドライバクラスのスタティック変数 `newMethodMap` を、Appium の `routes.js` オブジェクトと同じ形式のオブジェクトに代入します。例えば、以下は `FakeDriver` というサンプルドライバの `newMethodMap` です：

```js
static newMethodMap = {
  '/session/:sessionId/fakedriver': {
    GET: {command: 'getFakeThing'},
    POST: {command: 'setFakeThing', payloadParams: {required: ['thing']}},
  },
  '/session/:sessionId/fakedriverargs': {
    GET: {command: 'getFakeDriverArgs'},
  },
};
```

<!-- In this example we're adding a few new routes and a total of 3 new commands. For more examples of how to define commands in this way, it's best to have a look through `routes.js`. Now all you need to do is implement the command handlers in the same way you'd implement any other Appium command. -->
この例では、いくつかの新しいルートと合計3つの新しいコマンドを追加しています。このようにコマンドを定義する他の例については、`routes.js`を参照するのが一番です。あとは、他のAppiumコマンドと同じようにコマンドハンドラを実装するだけです。

<!-- The downside of this way of adding new commands is that people using the standard Appium clients won't have nice client-side functions designed to target these endpoints. So you would need to create and release client-side plugins for each language you want to support (directions or examples can be found at the relevant client docs). -->
この方法で新しいコマンドを追加することの欠点は、標準のAppiumクライアントを使用している人が、これらのエンドポイントをターゲットに設計されたすてきなクライアントサイド関数を持つことができないことです。そのため、サポートしたい言語ごとにクライアントサイドプラグインを作成し、リリースする必要があります（方向性や例は、関連するクライアントの文書で見つけることができます）。

<!-- An alternative to this way of doing things is to overload a command which all WebDriver clients have access to already: Execute Script. Appium provides some a convenient tool for making this easy. Let's say you are building a driver for stereo system called `soundz`, and you wanted to create a command for playing a song by name. You could expose this to your users in such a way that they call something like: -->
この方法の代替は、すべてのWebDriverクライアントがすでにアクセスできるコマンドをオーバーロードすることです： スクリプトを実行する。Appiumは、これを簡単に行うための便利なツールを提供しています。例えば、`soundz`というステレオシステムのドライバを作っていて、名前を指定して曲を再生するコマンドを作りたかったとします。このコマンドをユーザーに公開するには、以下のような方法で呼び出します：

```js
// webdriverio example. Calling webdriverio's `executeScript` command is what trigger's Appium's
// Execute Script command handler
driver.executeScript('soundz: playSong', [{song: 'Stairway to Heaven', artist: 'Led Zeppelin'}]);
```

<!-- Then in your driver code you can define the static property `executeMethodMap` as a mapping of script names to methods on your driver. It has the same basic form as `newMethodMap`, described above. Once `executeMethodMap` is defined, you'll also need to implement the Execute Script command handler, which according to Appium's routes mapping is called `execute`. The implementation can call a single helper function, `this.executeMethod`, which takes care of looking at the script and arguments the user sent in and routing it to the correct custom handler you've defined. Here's an example: -->
次に、ドライバのコードで、スクリプト名とドライバのメソッドのマッピングとして、静的プロパティ `executeMethodMap` を定義できます。このプロパティは、前述の `newMethodMap` と同じ基本的な形式を持っています。executeMethodMap`を定義したら、スクリプトの実行コマンドハンドラも実装する必要があり、Appiumのルートマッピングでは `execute` と呼ばれています。この実装では、単一のヘルパー関数である `this.executeMethod` を呼び出すことができ、ユーザーが送信したスクリプトと引数を調べて、定義した正しいカスタムハンドラにルーティングする処理を行います。以下はその例です：

```js
static executeMethodMap = {
  'soundz: playSong', {
    command: 'soundzPlaySong',
    params: {required: ['song', 'artist'], optional: []},
  }
}

async soundzPlaySong(song, artist) {
  // play the song based on song and artist details
}

async execute(script, args) {
  return await this.executeMethod(script, args);
}
```

<!-- A couple notes about this system:
1. The arguments array sent via the call to Execute Script must contain only zero or one element(s). The first item in the list is considered to be the parameters object for your method. These parameters will be parsed, validated, and then applied to your overload method in the order specified in `executeMethodMap` (the order specified in the `required` parameters list, followed by the `optional` parameters list). I.e., this framework assumes only a single actual argument sent in via Execute Script (and this argument should be an object with keys/values representing the parameters your execute method expects).
1. Appium does not automatically implement `execute` (the Execute Script handler) for you. You may wish, for example, to only call the `executeMethod` helper function when you're not in proxy mode!
1. The `executeMethod` helper will reject with an error if a script name doesn't match one of the script names defined as a command in `executeMethodMap`, or if there are missing parameters. -->
このシステムに関するいくつかの注意点があります：
1. スクリプト実行の呼び出しによって送信される引数配列には、0個または1個の要素しか含まれていない必要があります。リストの最初の項目は、メソッドのパラメータオブジェクトとみなされます。これらのパラメータは解析、検証され、`executeMethodMap`で指定された順序でオーバーロードメソッドに適用されます（`required`パラメータリストで指定された順序、次に`optional`パラメータリストが続きます）。つまり、このフレームワークでは、Execute Scriptで送られてくる実際の引数を1つだけ想定しています（この引数は、実行メソッドが期待するパラメータを表すキー/値を持つオブジェクトでなければなりません）。
1. Appium は自動的に `execute` (Execute Script ハンドラ) を実装してくれるわけではありません。例えば、プロキシモードでないときにだけ `executeMethod` ヘルパー関数を呼び出すようにしたい場合があります！
1. executeMethod` ヘルパーは、スクリプト名が `executeMethodMap` のコマンドとして定義されているスクリプト名のいずれかと一致しない場合、またはパラメータが不足している場合にエラーで拒否されます。

<!-- ### Implement handling of Appium settings -->
### Appiumの設定の取り扱いを実装

<!-- Appium users can send parameters to your driver via CLI args as well as via capabilities. But these cannot change during the course of a test, and sometimes users want to adjust parameters mid-test. Appium has a [Settings](../guides/settings.md) API for this purpose. -->
Appium ユーザーは、CLI の args だけでなく、ability を介してドライバにパラメータを送ることができます。しかし、これらはテストの途中で変更することはできず、ユーザーはテストの途中でパラメータを調整したいと思うことがあります。Appiumはこの目的のために[Settings](../guides/settings.md)というAPIを用意しています。

<!-- To support settings in your own driver, first of all define `this.settings` to be an instance of the appropriate class, in your constructor: -->
自分のドライバで設定をサポートするには、まずコンストラクタで `this.settings` を適切なクラスのインスタンスとして定義します：

```js
// import {DeviceSettings} from 'appium/driver';

this.settings = new DeviceSettings();
```

<!-- Now, you can read user settings any time simply by calling `this.settings.getSettings()`. This will return a JS object where the settings names are keys and have their corresponding values. -->
これで、いつでも `this.settings.getSettings()` を呼び出すだけで、ユーザー設定を読むことができます。これはJSオブジェクトを返し、設定名はキーであり、対応する値を持ちます。

<!-- If you want to assign some default settings, or run some code on your end whenever settings are updated, you can do both of these things as well. -->
デフォルトの設定を割り当てたい場合や、設定が更新されるたびに自分の側で何らかのコードを実行したい場合は、これらの両方を行うことができます。

```js
constructor() {
  const defaults = {setting1: 'value1'};
  this.settings = new DeviceSettings(defaults, this.onSettingsUpdate.bind(this));
}

async onSettingsUpdate(key, value) {
  // do anything you want here with key and value
}
```

<!-- ### Make itself aware of resources other concurrent drivers are using -->
### 他の同時実行ドライバが使用しているリソースを認識できるようにする

<!-- Let's say your driver uses up some system resources, like ports. There are a few ways to make sure that multiple simultaneous sessions don't use the same resources: -->
あなたのドライバがポートのようなシステムリソースを使用しているとしましょう。複数の同時セッションが同じリソースを使用しないようにするには、いくつかの方法があります：

<!-- 1. Have your users specify resource IDs via capabilities (`appium:driverPort` etc)
1. Just always use free resources (find a new random port for each session)
1. Have each driver express what resources it is using, then examine currently-used resources from other drivers when a new session begins. -->
1. ユーザーにリソースIDをabilityで指定させる（`appium:driverPort`など）。
1. 常に空きリソースを使用する（セッションごとに新しいランダムなポートを見つける）。
1. 各ドライバが使用しているリソースを明示し、新しいセッションが始まったときに、他のドライバから現在使用されているリソースを調査する。

<!-- To support this third strategy, you can implement `get driverData` in your driver to return what sorts of resources your driver is currently using, for example: -->
この3番目の戦略をサポートするために、ドライバに `get driverData` を実装して、例えば、ドライバが現在使用しているリソースの種類を返すようにできます：

```js
get driverData() {
  return {specialPort: 1234, specialFile: /path/to/file}
}
```

<!-- Now, when a new session is started on your driver, the `driverData` response from any other simultaneously running drivers (of the same type) will also be included, as the last parameter of the `createSession` method: -->
これで、あなたのドライバで新しいセッションが開始されると、同時に実行されている他のドライバ（同じタイプ）からの `driverData` 応答も、`createSession` メソッドの最後のパラメーターとして含まれます：

```js
async createSession(jwpCaps, reqCaps, w3cCaps, driverData)
```

<!-- You can dig into this `driverData` array to see what resources other drivers are using to help determine which ones you want to use for this particular session. -->
この `driverData` 配列を調べて、他のドライバが使用しているリソースを確認し、この特定のセッションで使用するリソースを決定するのに役立てることができます。

!!! warning

    <!-- Be careful here, since `driverData` is only passed between sessions of a single running Appium server. There's nothing to stop a user from running multiple Appium servers and requesting your driver simultaneously on each of them. In this case, you won't be able to ensure independence of resources via `driverData`, so you might consider using file-based locking mechanisms or something similar. -->
    ここで注意してほしいのは、`driverData`は単一の実行中のAppiumサーバのセッション間でしか渡されないということです。ユーザーが複数のAppiumサーバを起動し、それぞれのサーバで同時にあなたのドライバを要求することを止めることはできません。この場合、`driverData` を介してリソースの独立性を確保できませんので、ファイルベースのロック機構などを利用することを検討するとよいでしょう。

!!! warning

    <!-- It's also important to note you will only receive `driverData` for other instances of *your* driver. So unrelated drivers also running may still be using some system resources. In general Appium doesn't provide any features for ensuring unrelated drivers don't interfere with one another, so it's up to the drivers to allow users to specify resource locations or addresses to avoid clashes. -->
    また、あなたが受け取る `driverData` は、*あなたの*ドライバの他のインスタンスに対してのみであることに注意することが重要です。そのため、無関係のドライバが動作していても、システムリソースを使用している可能性があります。一般に、Appium は無関係なドライバが互いに干渉しないようにするための機能を提供していないので、衝突を避けるためにユーザがリソースの場所やアドレスを指定できるようにすることはドライバ次第です。

<!-- ### Log events to the Appium event timeline -->
### Appiumのイベントタイムラインにイベントを記録する

<!-- Appium has an [Event Timing API](../guides/event-timing.md) which allows users to get timestamps for certain server-side events (like commands, startup milestones, etc...) and display them on a timeline. The feature basically exists to allow introspection of timing for internal events to help with debugging or running analysis on Appium driver internals. You can add your own events to the event log: -->
Appium には [Event Timing API](../guides/event-timing.md) があり、特定のサーバサイドイベント（コマンドや起動時のマイルストーンなど）のタイムスタンプを取得し、タイムライン上に表示できます。この機能は基本的に、内部イベントのタイミングをイントロスペクションできるようにするために存在し、デバッグやAppiumドライバの内部を分析するのに役立ちます。イベントログに独自のイベントを追加できます：

```js
this.logEvent(name);
```

<!-- Simply provide a name for the event and it will be added at the current time, and made accessible as part of the event log for users. -->
イベント名を指定するだけで、現在時刻に追加され、イベントログの一部としてユーザーからアクセスできるようです。

<!-- ### Hide behaviour behind security flags -->
### セキュリティフラグの後ろに動作を隠す

<!-- Appium has a feature-flag based [security model](../guides/security.md) that allows driver authors to hide certain features behind security flags. What this means is that if you have a feature you deem insecure and want to require server admins to opt in to it, you can require that they enable the feature by adding it to the `--allow-insecure` list or turning off server security entirely. -->
Appiumには、ドライバの作者が特定の機能をセキュリティフラグの後ろに隠すことを可能にする、機能フラグベースの[セキュリティモデル](../guides/security.md)があります。これは何を意味するかというと、もしあなたが安全でないと判断した機能があり、サーバ管理者にそれを選ぶことを要求したい場合、`--allow-insecure`リストにそれを追加するか、サーバセキュリティを完全にオフにすることによって、彼らがその機能を有効にすることを要求できるということです。

<!-- To support the check within your own driver, you can call `this.isFeatureEnabled(featureName)` to determine whether a feature of the given name has been enabled. Or, if you want to simply short-circuit and throw an error if the feature isn't enabled, you can call `this.assertFeatureEnabled(featureName)`. -->
自分のドライバ内でチェックをサポートするには、`this.isFeatureEnabled(featureName)`を呼び出して、与えられた名前の機能が有効になっているかどうかを判断できます。また、単純に短絡的に、その機能が有効でない場合にエラーを投げたい場合は、 `this.assertFeatureEnabled(featureName)` を呼び出すことができます。

<!-- ### Use a temp dir for files -->
### ファイルにテンポラリディレクトリを使用する

<!-- If you want to use a temporary directory for files your driver creates that are not important to keep around between computer or server restarts, you can simply read from `this.opts.tmpDir`. This reads the temporary directory location from `@appium/support`, potentially overridden by a CLI flag. I.e., it's safer than writing to your own temporary directory because the location here plays nicely with possible user configuration. `this.opts.tmpDir` is a string, the path to the dir. -->
ドライバが作成するファイルのうち、コンピュータやサーバの再起動時に保持することが重要でないものについては、単に `this.opts.tmpDir` から読み取ることができます。これは `@appium/support` からテンポラリディレクトリの場所を読み込みますが、CLI フラグによって上書きされる可能性があります。つまり、自分のテンポラリディレクトリに書き込むよりも安全で、ユーザが設定することが可能です。this.opts.tmpDir`は文字列で、ディレクトリへのパスを指定します。

<!-- ### Deal with unexpected shutdowns or crashes -->
### 予期せぬシャットダウンやクラッシュへの対応

<!-- Your driver might run into a situation where it can't continue operating normally. For example, it might detect that some external service has crashed and nothing will work anymore. In this case, it can call `this.startUnexpectedShutdown(err)` with an error object including any details, and Appium will attempt to gracefully handle any remaining requests before shutting down the session. -->
ドライバが正常に動作し続けることができない状況に遭遇することがあります。例えば、外部サービスがクラッシュして何も動かなくなったことを検知することがあります。この場合、任意の詳細を含むエラーオブジェクトを指定して `this.startUnexpectedShutdown(err)` を呼び出すことができ、Appium はセッションをシャットダウンする前に残りのリクエストを優雅に処理することを試みます。

<!-- If you want to perform some of your own cleanup logic when you encounter this condition, you can either do so immediately before calling `this.startUnexpectedShutdown`, or you can attach a handler to the unexpected shutdown event and run your cleanup logic "out of band" so to speak: -->
この状態に遭遇したときに独自のクリーンアップロジックを実行したい場合は、`this.startUnexpectedShutdown`を呼び出す直前に実行するか、予期せぬシャットダウンイベントにハンドラをアタッチして、いわば「アウトオブバンド」でクリーンアップロジックを実行することが可能です：

```js
this.onUnexpectedShutdown(handler)
```

<!-- `handler` should be a function which receives an error object (representing the reason for the unexpected shutdown). -->
`handler`は、エラーオブジェクト（予期せぬシャットダウンの理由を表す）を受け取る関数であるべきです。
