---
title: Appium Pluginの構築
---

# Appium Pluginの構築

<!-- This is a high-level guide for developing Appium plugins, which is not something most Appium users need to know or care about. If you are not familiar with Appium plugins yet from a user perspective, check out the [list of plugins](./index.md#plugins) to play around with some and get an idea of the sorts of things that plugins can do. Plugins are a powerful system for augmenting Appium's functionality or changing the way Appium works. They can be distributed to other Appium users and can extend Appium's ecosystem in all kinds of interesting ways! (There is also a significant amount of overlap here with developing Appium drivers, so you may also want to check out the [building drivers](./build-drivers.md) guide for further inspiration.) -->
これはAppiumプラグインを開発するためのハイレベルなガイドであり、ほとんどのAppiumユーザーが知る必要もなければ、気にする必要もない。Appium のプラグインをまだよく知らないという方は、[list of plugins](./index.md#plugins) を見て、いくつか遊んでみて、プラグインでできることの種類を知ることができます。プラグインは、Appiumの機能を拡張したり、Appiumの動作方法を変更したりするための強力なシステムです。プラグインは他のAppiumユーザーに配布することができ、Appiumのエコシステムをあらゆる種類の興味深い方法で拡張できます！(Appiumのドライバの開発と重なる部分も多いので、[building drivers](./build-drivers.md) ガイドもチェックしておくと、さらにインスピレーションを得られるかもしれません)

<!-- ## Before you create your plugin -->
## プラグインを作る前に

<!-- Before creating your plugin, it's good to have a general idea of what you want your plugin to accomplish and whether it will be possible to implement it given the restrictions of the Appium platform. Reading through this guide will help you understand what's possible. In general, Appium's plugin system is extremely powerful and no attempts have been made to artificially limit what's possible with them (which is a main reason that all plugins are opt-in by the system administrator responsible for starting the Appium server---plugins are powerful and should only be used when explicitly trusted!). -->
プラグインを作成する前に、プラグインで何を実現したいのか、そしてAppiumプラットフォームの制約の中でそれを実装することが可能かどうか、大まかに考えておくとよいでしょう。このガイドを読むことで、何が可能かを理解できます。一般的に、Appiumのプラグインシステムは非常に強力で、プラグインで可能なことを人為的に制限する試みは行われていません（これは、すべてのプラグインがAppiumサーバの起動に責任を持つシステム管理者によってオプトインされる主な理由です-プラグインは強力なので、明示的に信頼できる場合にのみ使用すべき！）。

<!-- ## Other plugins to reference -->
## 参考となる他のプラグイン

<!-- There are a wide variety of open source Appium plugins available for perusal. It's definitely recommended to explore the code for some other plugins before embarking on writing your own. The Appium team maintains a set of official plugins in the [Appium GitHub repo](https://github.com/appium/appium). Links to other open source plugins can be found in the [Plugin list](./index.md#plugins) -->
オープンソースのAppiumプラグインは、多種多様に存在しています。自分のプラグインを書く前に、他のプラグインのコードを調べることをお勧めします。Appiumチームは、公式プラグインのセットを[Appium GitHub repo](https://github.com/appium/appium)で管理しています。他のオープンソースプラグインへのリンクは、[Plugin list](./index.md#plugins) で見つけることができます。

<!-- ## Basic requirements for plugins -->
## プラグインの基本要件

<!-- These are the things your plugin *must* do (or be), if you want it to be a valid Appium plugin. -->
Appiumのプラグインとして成立させるためには、以下のようなことが必要です。

<!-- ### Node.js package with Appium extension metadata -->
### Appium拡張メタデータを持つNode.jsパッケージ

<!-- All Appium plugins are fundamentally Node.js packages, and therefore must have a valid `package.json`. Your driver is not _limited_ to Node.js, but it must provide an adapter written in Node.js so it can be loaded by Appium. -->
すべての Appium プラグインは基本的に Node.js パッケージであり、有効な `package.json` を持つ必要があります。ドライバは Node.js に限定されませんが、Node.js で書かれたアダプタを提供し、Appium で読み込めるようにする必要があります。

<!-- Your `package.json` must include `appium` as a `peerDependency`. The requirements for the dependency versions should be as loose as possible (unless you happen to know your plugin will only work with certain versions of Appium). For Appium 2.0, for example, this would look something like `^2.0.0`, declaring that your plugin works with any version of Appium that starts with 2.x. -->
あなたの `package.json` は `appium` を `peerDependency` として含んでいなければなりません。依存バージョンの要件は、できるだけ緩やかであるべきです（あなたのプラグインが特定のバージョンの Appium でしか動作しないことが分かっている場合を除く）。例えば Appium 2.0 の場合、これは `^2.0.0` のようになり、あなたのプラグインは 2.x で始まる Appium のすべてのバージョンで動作すると宣言します。

<!-- Your `package.json` must contain an `appium` field, like this (we call this the 'Appium extension metadata'): -->
また、`package.json`には、次のような`appium`フィールドが必要です（これを「Appium extension metadata」と呼びます）：

```json
{
  ...,
  "appium": {
    "pluginName": "fake",
    "mainClass": "FakePlugin"
  },
  ...
}
```

<!-- The required subfields are: -->
必須のサブフィールドは以下の通りです：

<!-- * `pluginName`: this should be a short name for your plugin.
* `mainClass`: this is a named export (in CommonJS style) from your `main` field. It must be a class which extends Appium's `BasePlugin` (see below). -->
* `pluginName`: あなたのプラグインの短い名前です。
* `mainClass`: `main` フィールドから名前付きでエクスポートします（CommonJS スタイル）。Appium の `BasePlugin` を拡張したクラスである必要があります（下記参照）。

<!-- ### Extend Appium's `BasePlugin` class -->
### Appium の `BasePlugin` クラスを拡張する。

<!-- Ultimately, your plugin is much easier to write because most of the hard work of defining patterns for overriding commands is done for you. This is all encoded up as a class which Appium exports for you to use, called `BasePlugin`. It is exported from `appium/plugin`, so you can use one of these styles to import it and create your *own* class that extends it: -->
最終的には、コマンドを上書きするためのパターンを定義するという大変な作業のほとんどがあなたのために行われるため、プラグインを書くのが非常に簡単です。これはすべて、Appium が `BasePlugin` というクラスとしてエクスポートしてくれるからです。これは `appium/plugin` からエクスポートされるので、これらのスタイルの1つを使ってインポートし、それを継承した *自分の* クラスを作成できます：

```js
import {BasePlugin} from 'appium/plugin';
// or: const {BasePlugin} = require('appium/plugin');

export class MyPlugin extends BasePlugin {
  // class methods here
}
```

!!! note

    <!-- In all the code samples below, whenever we reference an example method, it is assumed that it is defined _within_ the class, though this is not explicitly written, for the sake of clarity and space. -->
    以下のすべてのコードサンプルにおいて、メソッドの例を参照するときは、そのメソッドがクラス内で定義されていると仮定しています。

<!-- ### Make your plugin available -->
### プラグインを利用可能にする

<!-- That's basically it! With a Node.js package exporting a plugin class and with correct Appium extension metadata, you've got yourself an Appium plugin! Now it doesn't *do* anything, but you can load it up in Appium, activate it, etc... -->
基本的にはこれで終わりです！Node.jsパッケージがプラグインクラスをエクスポートし、正しいAppium拡張メタデータを持つことで、あなたはAppiumプラグインを手に入れることができます！このプラグインは何もしませんが、Appiumで読み込んだり、有効化したりできます。

<!-- To make it available to users, you could publish it via NPM. When you do so, your plugin will be installable via the Appium CLI: -->
これをユーザに公開するには、NPM経由で公開します。そうすると、Appium CLIからプラグインをインストールできるようです：

```
appium plugin install --source=npm <plugin-package-on-npm>
```

<!-- It's a good idea to test your plugin first, of course. One way to see how it works within Appium is to install it locally first: -->
もちろん、最初にプラグインをテストするのは良いアイデアです。Appiumの中でどのように動作するかを確認する一つの方法として、まずローカルにインストールできます：

```
appium plugin install --source=local /path/to/your/plugin
```

<!-- And of course, plugins must be "activated" during Appium server start, so make sure you direct your users to do so: -->
そしてもちろん、プラグインはAppiumのサーバ起動時に「有効化」する必要があるので、ユーザーにそのように指示するようにしてください：

```
appium --use-plugins=plugin-name
```

<!-- ### Developing your plugin -->
### プラグインを開発する

<!-- How you develop your plugin is up to you. It is convenient, however, to run it from within Appium without having to do lots of publishing and installing. The most straightforward way to do this is to include the most recent version of Appium as a `devDependency` (although its being already included as a `peerDependency` is sufficient in newer versions of NPM), and then also your own plugin, like this: -->
プラグインをどのように開発するかは、あなた次第です。しかし、多くの公開やインストールをすることなく、Appiumの中から実行することができるのは便利です。最も簡単な方法は、最新版の Appium を `devDependency` としてインクルードし（NPM の新しいバージョンでは `peerDependency` としてインクルードされていれば十分ですが）、さらに以下のように自分のプラグインをインクルードすることです：

```json
{
    "devDependencies": {
        ...,
        "appium": "^2.0.0",
        "your-plugin": "file:.",
        ...
    }
}
```

<!-- Now, you can run Appium locally (`npm exec appium` or `npx appium`), and because your plugin is listed as a dependency alongside it, it will be automatically "installed" and available. You can design your e2e tests this way, or if you're writing them in Node.js, you can simply import Appium's start server methods to handle starting and stopping the Appium server in Node. -->
これで、Appiumをローカルで実行（`npm exec appium`または`npx appium`）すると、プラグインが依存関係として一緒にリストアップされているので、自動的に「インストール」されて利用可能です。この方法でe2eテストを設計もできますし、Node.jsで書いている場合は、Appiumのstart serverメソッドをインポートするだけで、NodeでAppiumサーバの起動と停止を処理できます。

<!-- Of course, you can always install it locally as described above as well. -->
もちろん、上記のように常にローカルにインストールすることも可能です。

<!-- Anytime you make changes to your plugin code, you'll need to restart the Appium server to make sure it picks up the latest code. -->
プラグインのコードに変更を加えた場合は、Appiumサーバを再起動して最新のコードを取り込む必要があります。

<!-- ## Standard plugin implementation ideas -->
## 標準的なプラグイン実装のアイデア

<!-- These are things you will probably find yourself wanting to do when creating a plugin. -->
これらは、プラグインを作成する際に、おそらくあなたがやりたいと思うことでしょう。

<!-- ### Set up state in a constructor -->
### コンストラクタで状態をセットアップする

<!-- If you define your own constructor, you'll need to call `super` to make sure all the standard state is set up correctly: -->
独自のコンストラクタを定義する場合は、`super`を呼び出して、標準的な状態がすべて正しく設定されていることを確認する必要があります：

```js
constructor(...args) {
    super(...args);
    // now do your own thing
}
```

<!-- The `args` parameter here is the object containing all the CLI args used to start the Appium server. -->
ここでの `args` パラメータは、Appium サーバの起動に使用するすべての CLI 引数を含むオブジェクトです。

<!-- ### Intercept and handle specific Appium commands -->
### 特定のAppiumコマンドをインターセプトして処理する

<!-- This is the most normal behavior for Appium plugins -- to modify or replace the execution of one or more commands that would normally be handled by the active driver. To override the default command handling, you need to implement `async` methods in your class with the same name as the Appium commands to be handled (just exactly how [drivers themselves are implemented](./build-drivers.md#implement-webdriver-commands)). Curious what command names there are? They are defined in the Appium base driver' [routes.js](https://github.com/appium/appium-base-driver/blob/master/lib/protocol/routes.js) file, and of course you can add more as defined in the next section. -->
これは Appium プラグインの最も一般的な動作です -- 通常はアクティブなドライバによって処理される 1 つ以上のコマンドの実行を変更または置き換えることです。デフォルトのコマンド処理を上書きするには、処理したい Appium コマンドと同じ名前の `async` メソッドをクラス内に実装する必要があります（まさに [ドライバ自体の実装方法](./build-drivers.md#implement-webdriver-commands))。どんなコマンド名があるのか気ですよね？これらはAppium base driverの[routes.js](https://github.com/appium/appium-base-driver/blob/master/lib/protocol/routes.js)ファイルに定義されています。もちろん、次のセクションで定義されているように、さらに追加できます。

<!-- Each command method is sent the following arguments: -->
各コマンドメソッドには、以下の引数が送られます：

<!-- 1. `next`: This is a reference to an `async` function which encapsulates the chain of behaviors which would take place if this plugin were not handling the command. You can choose to call the next behavior in the chain at any point in your logic (by making sure to include `await next()` somewhere), or not. If you don't, it means the default behavior (or any plugins registered after this one) won't be run.
1. `driver`: This is the object representing the driver handling the current session. You have access to it for any work you need to do, for example calling other driver methods, checking capabilities or settings, etc...
1. `...args`: A spread array with any arguments that have been applied to the command by the user. -->
1. `next`： これは、このプラグインがコマンドを処理しない場合に起こる一連の動作をカプセル化した `async` 関数への参照です。ロジックのどの時点でも（どこかに `await next() ` を含めることで）チェーンの次の動作を呼び出すかどうかを選択できます。もしそうしなければ、デフォルトのビヘイビア（またはこれ以降に登録されたプラグイン）は実行されないということです。
1. ドライバ`： これは、現在のセッションを扱うドライバを表すオブジェクトです。例えば、他のドライバメソッドを呼び出したり、abilityやsettingをチェックしたりなど、必要な作業のためにこのオブジェクトにアクセスできます。
1. ...args`： ユーザーによってコマンドに適用されたすべての引数を含むスプレッド配列です。

<!-- For example, if we wanted to override the `setUrl` command to simply add some extra logging on top, we would implement as follows: -->
例えば、`setUrl`コマンドをオーバーライドして、単純にロギングを追加したい場合、以下のように実装します：

```js
async setUrl(next, driver, url) {
  this.log(`Let's get the page source for some reason before navigating to '${url}'!`);
  await driver.getPageSource();
  const result = await next();
  this.log(`We can also log after the original behaviour`);
  return result;
}
```

<!-- ### Intercept and handle _all_ Appium commands -->
### Appiumのコマンドをすべて受信して処理する

<!-- You might find yourself in a position where you want to handle *all* commands, in order to inspect payloads to determine whether or not to act in some way. If so, you can implement `async handle`, and any command that is not handled by one of your named methods will be handled by this method instead. It takes the following parameters (with all the same semantics as above): -->
ペイロードを調べて、何らかのアクションを起こすかどうかを判断するために、*すべての*コマンドを処理したい立場になるかもしれません。その場合、`async handle` を実装することで、名前付きのメソッドで処理されないコマンドは、代わりにこのメソッドで処理されます。このメソッドは次のようなパラメータを受け取ります（セマンティクスはすべて上記と同じです）：

1. `next`
1. `driver`
1. `cmdName` - <!--string representing the command being run -->実行されるコマンドを表す文字列
1. `...args`

<!-- For example, let's say we want to log timing for all Appium commands as part of a plugin. We could do this by implementing `handle` in our plugin class as follows: -->
例えば、プラグインの一部として、すべてのAppiumコマンドのタイミングを記録したいとします。この場合、以下のようにプラグインクラスに `handle` を実装することで実現できます：

```js
async handle(next, driver, cmdName, ...args) {
  const start = Date.now();
  try {
    const result = await next();
  } finally {
    const elapsedMs = Date.now() - start;
    this.log(`Command '${cmdName}' took ${elapsedMs}`);
  }
  return result;
}
```

<!-- ### Work around driver proxies -->
### ドライバプロキシーを回避する

<!-- There is a bit of a gotcha with handling Appium commands. Appium drivers have the ability to turn on a special 'proxy' mode, wherein the Appium server process takes a look at incoming URLs, and decides whether to forward them on to some upstream WebDriver server. It could happen that a command which a plugin wants to handle is designated as a command which is being proxied to an upstream server. In this case, we run into a problem, because the plugin never gets a chance to handle that command! For this reason, plugins can implement a special member function called `shouldAvoidProxy`, which takes the following parameters: -->
Appiumのコマンドを処理する際に、少し困ったことがあります。Appium ドライバには、特別な「プロキシ」モードをオンにする機能があり、Appium サーバプロセスが受信した URL を見て、上流の WebDriver サーバに転送するかどうかを決定します。プラグインが処理したいコマンドが、上流のサーバにプロキシされるコマンドとして指定されることもあり得ます。この場合、プラグインがそのコマンドを処理する機会がないため、問題が発生します！このため、プラグインは `shouldAvoidProxy` という特別なメンバ関数を実装することができ、この関数は以下のパラメータを受け取ります：

<!-- 1. `method` - string denoting HTTP method (`GET`, `POST`, etc...)
2. `route` - string denoting the requested resource, for example `/session/8b3d9aa8-a0ca-47b9-9ab7-446e818ec4fc/source`
3. `body` - optional value of any type representing the WebDriver request body -->
1. `method` - HTTP メソッドを表す文字列 (`GET`、`POST` など)。
2. `route` - リクエストされたリソースを表す文字列。例えば `/session/8b3d9aa8-a0ca-47b9-9ab7-446e818ec4fc/source` など。
3. body` - WebDriver のリクエストボディを表す任意の型のオプション値です

<!-- These parameters define an incoming request. If you want to handle a command in your plugin which would normally be proxied directly through a driver, you could disable or 'avoid' proxying the request, and instead have the request fall into the typical Appium command execution flow (and thereby your own command function). To avoid proxying a request, just return `true` from `shouldAvoidProxy`. Some examples of how this method is used are in the [Universal XML plugin](https://github.com/appium/appium/blob/master/packages/universal-xml/lib/plugin.js) (where we want to avoid proxying the `getPageSource` command, or in the [Images plugin](https://github.com/appium/appium/blob/master/packages/images-plugin/lib/plugin.js) (where we want to conditionally avoid proxying any command if it looks like it contains an image element). -->
これらのパラメータは、受信するリクエストを定義します。プラグインでコマンドを処理する場合、通常はドライバを経由して直接プロキシされますが、リクエストのプロキシを無効化または「回避」して、代わりにリクエストは通常の Appium コマンド実行フロー（そして独自のコマンド関数）に落ちます。リクエストのプロキシを回避するには、`shouldAvoidProxy`から `true` を返せばよいのです。このメソッドの使用例としては、[Universal XML plugin](https://github.com/appium/appium/blob/master/packages/universal-xml/lib/plugin.js) (`getPageSource` コマンドのプロキシを回避したい場合) や [Images plugin](https://github.com/appium/appium/blob/master/packages/images-plugin/lib/plugin.js) (画像要素を含むように見えるコマンドであれば、条件付きでプロキシを回避したい場合) などがあります。

<!-- ### Throw WebDriver-specific errors -->
### WebDriver 固有のエラーを投げる

<!-- The WebDriver spec defines a [set of error codes](https://github.com/jlipps/simple-wd-spec#error-codes) to accompany command responses if an error occurred. Appium has created error classes for each of these codes, so you can throw the appropriate error from inside a command, and it will do the right thing in terms of the protocol response to the user. To get access to these error classes, import them from `appium/driver`: -->
WebDriverの仕様では、エラーが発生した場合にコマンドレスポンスに付随する[エラーコードのセット](https://github.com/jlipps/simple-wd-spec#error-codes)を定義しています。Appiumはこれらのコードごとにエラークラスを作成しているので、コマンドの内部から適切なエラーを投げることができ、ユーザーへのプロトコル応答として適切な処理を行うことができます。これらのエラークラスにアクセスするには、`appium/driver`からインポートします：

```js
import {errors} from 'appium/driver';

throw new errors.NoSuchElementError();
```

<!-- ### Log messages to the Appium log -->
### Appiumのログにメッセージを記録する

<!-- You can always use `console.log`, of course, but Appium provides a nice logger for you as `this.logger` (it has `.info`, `.debug`, `.log`, `.warn`, `.error` methods on it for differing log levels). If you want to create an Appium logger outside of a plugin context (say in a script or helper file), you can always construct your own too: -->
もちろん `console.log` を使うこともできますが、Appium では `this.logger` というすてきなロガーが用意されています（このロガーには `.info`, `.debug`, `.log`, `.warn`, `.error` というログレベル別のメソッドがあります）。プラグインのContext以外（例えばスクリプトやヘルパーファイル）でAppiumロガーを作成したい場合は、常に独自のものを構築もできます：

```js
import {logging} from 'appium/support';
const log = logging.getLogger('MyPlugin');
```

<!-- ## Further possibilities for Appium plugins -->
## Appiumプラグインの更なる可能性

<!-- These are things your plugin *can* do to take advantage of extra plugin features or do its job more conveniently. -->
これらは、プラグインの機能を利用したり、より便利に仕事をするために、プラグインが*できること*です。

<!-- ### Add a schema for custom command line arguments -->
### カスタムコマンド引数のスキーマを追加する

<!-- You can add custom CLI args if you want your plugin to receive data from the command line when the Appium server is started (for example, ports that a server administrator should set that should not be passed in as capabilities). -->
Appiumサーバの起動時にプラグインがコマンドラインからデータを受け取るようにしたい場合、カスタムCLIアーギュメントを追加できます（例えば、サーバ管理者が設定すべきポートで、ケイパビリティとして渡されるべきものではないものなど）。

<!-- This works largely the same for plugins as it does for drivers, so for more details have a look at [the equivalent section in the building drivers doc](./build-drivers.md#add-a-schema-for-custom-command-line-arguments). -->
これはプラグインでもドライバと同じように動作しますので、詳しくは [building drivers doc の同等のセクション](./build-drivers.md#add-a-schema-for-custom-command-line-arguments ) をご覧ください。

<!-- The only difference is that to construct the CLI argument name, you prefix it with `--plugin-<name>`. So for example, if you have a plugin named `pluggo` and a CLI arg defined with the name `electro-port`, you can set it when starting Appium via `--plugin-pluggo-electro-port`. -->
唯一の違いは、CLIの引数名を構築するために、`--plugin-<name>`というプレフィックスを付けることです。例えば、`pluggo`というプラグインがあり、`electro-port`という名前のCLI引数が定義されている場合、Appiumの起動時に `--plugin-pluggo-electro-port` で設定できます。

<!-- Setting args via a configuration file is also supported, as it is for drivers, but under the `plugin` field instead. For example: -->
設定ファイルによる arg の設定も、ドライバと同様にサポートされていますが、代わりに `plugin` フィールドで設定します。例えば、以下のようです：

```json
{
  "server": {
    "plugin": {
      "pluggo": {
        "electro-port": 1234
      }
    }
  }
}
```

<!-- ### Add plugin scripts -->
### プラグインのスクリプトを追加する

<!-- Sometimes you might want users of your plugin to be able to run scripts outside the context of a session (for example, to run a script that pre-builds aspects of your plugin). To support this, you can add a map of script names and JS files to the `scripts` field within your Appium extension metadata. So let's say you've created a script in your project that lives in a `scripts` directory in your project, named `plugin-prebuild.js`. Then you could add a `scripts` field like this: -->
プラグインのユーザーがセッションのContext外でスクリプトを実行できるようにしたい場合があります（たとえば、プラグインの側面を事前に構築するスクリプトを実行する場合など）。これをサポートするために、スクリプト名とJSファイルのマップをAppium拡張のメタデータ内の`scripts`フィールドに追加できます。例えば、プロジェクト内の `scripts` ディレクトリに `plugin-prebuild.js` という名前のスクリプトを作成したとします。そうすると、次のような `scripts` フィールドを追加できます：

```json
{
    "scripts": {
        "prebuild": "./scripts/plugin-prebuild.js"
    }
}
```

<!-- Now, assuming your plugin is named `myplugin`, users of your plugin can run `appium plugin run myplugin prebuild`, and your script will execute. -->
これで、プラグインの名前が `myplugin` であるとして、プラグインのユーザーが `appium plugin run myplugin prebuild` を実行すると、スクリプトが実行されます。

<!-- ### Add new Appium commands -->
### 新しいAppiumコマンドを追加する

<!-- If you want to offer functionality that doesn't map to any of the existing commands supported by drivers, you can create new commands in one of two ways, just as is possible for drivers: -->
ドライバでサポートされている既存のコマンドに対応しない機能を提供したい場合、ドライバで可能なのと同様に、次の2つの方法で新しいコマンドを作成できます：

1. Extending the WebDriver protocol and creating client-side plugins to access the extensions
<!-- 1. Overloading the Execute Script command by defining [Execute Methods](../guides/execute-methods.md) -->
1. WebDriverプロトコルを拡張し、拡張機能にアクセスするためのクライアントサイドプラグインを作成する。
1. [メソッドの実行](../guides/execute-methods.md) を定義することにより、Execute Script コマンドをオーバーロードする。

<!-- If you want to follow the first path, you can direct Appium to recognize new methods and add them to its set of allowed HTTP routes and command names. You do this by assigning the `newMethodMap` static variable in your driver class to an object of the same form as Appium's `routes.js` object. For example, here is part of the `newMethodMap` for the `FakePlugin` example driver: -->
1.の方法を取る場合、Appiumに新しいメソッドを認識させ、許可されたHTTPルートとコマンド名のセットに追加するよう指示できます。そのためには、ドライバクラスのスタティック変数 `newMethodMap` を、Appium の `routes.js` オブジェクトと同じ形式のオブジェクトに代入します。例えば、`FakePlugin`のサンプルドライバの `newMethodMap` の一部を以下に示します：

```js
static newMethodMap = {
  '/session/:sessionId/fake_data': {
    GET: {command: 'getFakeSessionData', neverProxy: true},
    POST: {
      command: 'setFakeSessionData',
      payloadParams: {required: ['data']},
      neverProxy: true,
    },
  },
  '/session/:sessionId/fakepluginargs': {
    GET: {command: 'getFakePluginArgs', neverProxy: true},
  },
};
```

!!! note

    <!-- If you're using TypeScript, static member objects like these should be defined `as const`. -->
    TypeScriptを使用している場合、これらのような静的メンバーオブジェクトは、`const`として定義する必要があります。

<!-- In this example we're adding a few new routes and a total of 3 new commands. For more examples of how to define commands in this way, it's best to have a look through `routes.js`. Now all you need to do is implement the command handlers in the same way you'd implement any other Appium command. -->
この例では、いくつかの新しいルートと合計3つの新しいコマンドを追加しています。このようにコマンドを定義する他の例については、`routes.js`を参照するのが一番です。あとは、他のAppiumコマンドと同じようにコマンドハンドラを実装するだけです。

<!-- Note also the special `neverProxy` key for commands; this is generally a good idea to set to `true` for plugins, since your plugin might be active for a driver that is put into proxy mode but hasn't bothered to decline proxying for these (new and therefore unknown) commands. Setting `neverProxy` to `true` here will cause Appium to never proxy these routes and therefore ensure your plugin handles them, even if a driver is in proxy mode. -->
これは一般的にプラグインの `neverProxy` キーに設定することをお勧めします。なぜなら、あなたのプラグインはプロキシモードに設定されたドライバに対してアクティブですが、これらの（新しい、したがって未知の）コマンドに対するプロキシをわざわざ拒否していないかもしれないからです。ここで `neverProxy` を `true` に設定すると、Appium はこれらのルートを決してプロキシしないので、ドライバがプロキシモードであっても、あなたのプラグインは確実にこれらのルートを処理します。

<!-- The downside of adding new commands via `newMethodMap` is that people using the standard Appium clients won't have nice client-side functions designed to target these endpoints. So you would need to create and release client-side plugins for each language you want to support (directions or examples can be found at the relevant client docs). -->
newMethodMap`で新しいコマンドを追加することの欠点は、標準のAppiumクライアントを使用している人が、これらのエンドポイントをターゲットに設計された素晴らしいクライアントサイド関数を持てないということです。そのため、サポートしたい言語ごとにクライアントサイドプラグインを作成し、リリースする必要があります（方向性や例は、関連するクライアントの文書にあります）。

<!-- An alternative to this way of doing things is to overload a command which all WebDriver clients have access to already: Execute Script. Make sure to read the section on [adding new commands](./build-drivers.md#extend-the-existing-protocol-with-new-commands) in the Building Drivers guide to understand the way this works in general. The way it works with plugins is only slightly different. Let's look at an example taken from Appium's `fake-plugin`: -->
この方法の代替は、すべてのWebDriverクライアントがすでにアクセスできるコマンドをオーバーロードすることです： スクリプトを実行する。ドライバの構築ガイドの[新しいコマンドの追加](./build-drivers.md#extend the-existing-protocol-with-new-commands) のセクションを読んで、一般的にこの方法を理解するようにしてください。プラグインで動作する方法は、ほんの少し異なります。Appiumの`fake-plugin`から抜粋した例を見てみましょう：

```js
static executeMethodMap = {
  'fake: plugMeIn': {
    command: 'plugMeIn',
    params: {required: ['socket']},
  },
};

async plugMeIn(next, driver, socket) {
  return `Plugged in to ${socket}`;
}

async execute(next, driver, script, args) {
  return await this.executeMethod(next, driver, script, args);
}
```

<!-- We have three important components shown here which make this system work, all of which are defined inside the plugin class: -->
このシステムを動作させるために、ここに示す3つの重要なコンポーネントがあり、これらはすべてプラグインクラスの内部で定義されています：

<!-- 1. The `executeMethodMap`, defined in just the same way as for drivers
1. The implementation of the command method as defined in `executeMethodMap` (in this case, `plugMeIn`)
1. The overriding/handling of the `execute` command. Just like any plugin command handlers, the first two arguments are `next` and `driver`, followed by the script name and args. `BasePlugin` implements a helper method which we can simply call with all of these arguments. -->
1. `executeMethodMap`: ドライバと同じように定義します。
1. `executeMethodMap`で定義されたコマンドメソッドの実装（この場合、`plugMeIn`）。
1. `execute`コマンドのオーバーライド/ハンドリング。他のプラグインのコマンドハンドラと同様に、最初の2つの引数は `next` と `driver` で、その後にスクリプト名とアーギュメントが続く。BasePlugin` はヘルパーメソッドを実装しており、これらの引数をすべて指定して呼び出すことができます。

<!-- Overriding Execute Methods from drivers works as you'd expect: if your plugin defines an Execute Method with the same name as that of a driver, your command (in this case `plugMeIn`) will be called first. You can choose to run the driver's original behaviour via `next` if you want. -->
プラグインがドライバと同じ名前の Execute Method を定義している場合、あなたのコマンド（この場合は `plugMeIn` ）が最初に呼ばれます。必要であれば、`next`でドライバの元の動作を実行もできます。

<!-- ### Update the Appium server object -->
### Appiumサーバオブジェクトを更新する

<!-- You probably don't normally need to update the Appium server object (which is an [Express](https://expressjs.com/) server having already been [configured](https://github.com/appium/appium/blob/master/packages/base-driver/lib/express/server.js) in a variety of ways). But, for example, you could add new Express middleware to the server to support your plugin's requirements. To update the server you must implement the `static async updateServer` method in your class. This method takes three parameters: -->
通常、Appiumサーバオブジェクトを更新する必要はないでしょう（すでにさまざまな方法で[設定](https://github.com/appium/appium/blob/master/packages/base-driver/lib/express/server.js)されている[Express](https://expressjs.com/)サーバです）。しかし、例えば、プラグインの要件をサポートするために、サーバに新しいExpressミドルウェアを追加できます。サーバを更新するには、クラスで `static async updateServer` メソッドを実装する必要があります。このメソッドは3つのパラメータを受け取ります：

<!-- * `expressApp`: the Express app object
* `httpServer`: the Node HTTP server object
* `cliArgs`: a map of the CLI args used to start the Appium server -->
* `expressApp`: Express アプリオブジェクト
* `httpServer`: Node HTTP サーバオブジェクト
* `cliArgs`: Appium サーバの起動に使用する CLI 引数のマップ

<!-- You can do whatever you want with them inside the `updateServer` method. You might want to reference how these objects are created and worked with in the BaseDriver code, so that you know you're not undoing or overriding anything standard and important. But if you insist, you can, with results you'll need to test! Warning: this should be considered an advanced feature and requires knowledge of Express, as well as the care not to do anything that could affect the operation of other parts of the Appium server! -->
これらのオブジェクトは `updateServer` メソッドの中で好きなように使うことができます。これらのオブジェクトがどのように作成され、BaseDriver のコードで扱われるかを参照することで、標準的で重要なものを元に戻したり上書きしたりすることがないようにしたいかもしれません。しかし、どうしてもと言うのであれば、テストが必要な結果で、できます！警告: これは高度な機能と見なされるべきで、Expressの知識と、Appiumサーバの他の部分の動作に影響を与える可能性がある何かをしないように注意することが必要です！

<!-- ### Handle unexpected session shutdown -->
### 予期せぬセッションのシャットダウンを処理する

<!-- When developing a plugin you may want to add some cleanup logic for when a session ends. You would naturally do this by adding a handler for `deleteSession`. This works in most cases, except when the session does not finish cleanly. Appium sometimes determines that a session has finished unexpectedly, and in these situations, Appium will look for a method called `onUnexpectedShutdown` in your plugin class, which will be called (passing the current session driver as the first parameter, and the error object representing the cause of the shutdown as the second), giving you an opportunity to take any steps that might be necessary to clean up from the session. For example, keeping in mind that the function is not `await`ed you could implement something like this: -->
プラグインを開発する際に、セッション終了時のクリーンアップロジックを追加したい場合があります。この場合、当然ながら `deleteSession` のハンドラを追加することです。これはほとんどの場合うまくいきますが、セッションがきれいに終了しない場合は別です。Appium はセッションが予期せず終了したと判断することがあります。このような状況では、Appium はプラグインクラスで `onUnexpectedShutdown` というメソッドを探し、それが呼ばれます（最初のパラメータとして現在のセッションドライバを渡し、2番目として終了の原因を表すエラーオブジェクトを渡す）ので、セッションをクリーンアップするために必要な手順を踏む機会が与えられます。例えば、この関数が `await` されないことを念頭に置いて、次のような実装をできます：

```js
async onUnexpectedShutdown(driver, cause) {
  try {
    // do some cleanup
  } catch (e) {
    // log any errors; don't allow anything to be thrown as they will be unhandled rejections
  }
}
```
