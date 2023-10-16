---
title: Migrating from Appium 1.x to Appium 2.x
---

<!---
This document is a guide for those who are using Appium 1.x and wish to migrate to Appium 2.x. It contains a list of breaking changes and how to migrate your environments or test suites to ensure compatibility with Appium 2.0.
--->
この文書は既にAppium 1.xを利用している人がAppium 2.xに移行するための手引きです。   
破壊的変更（breaking changes）の一覧や、実行環境・テストコードをAppium 2.0互換にするための方法が含まれます。

<!---
## Overview of Appium 2.0
--->

## Appium 2.0の概要

<!---
Appium 2.0 is the most major new release of Appium in over 5 years. The changes in Appium 2.0 are _not_ primarily related to changes in automation behaviors for specific platforms. Instead, Appium 2.0 reenvisions Appium as a _platform_ where "drivers" (code projects that introduce support for automation of a given platform) and "plugins" (code projects that allow for overriding, altering, extending, or adding behaviors to Appium) can be easily created and shared.
--->

Appium 2.0は過去5年間におけるAppiumのリリースの中で最も大きなリリースです。Appium 2.0の主要な変更は特定のプラットフォームに対する自動化された動作に関するものでは**ありません**。Appium 2.0はAppiumをドライバ（drivers）（あるプラットフォームに対する自動化を支援するためのプロジェクト）とプラグイン（plugins）（Appiumの動作を上書き、代替、拡張、もしくは追加するためのプロジェクト）が容易に実装、共有できる**仕組みを提供するプラットフォーム**として再設計されています。

<!---
At the same time, the Appium project is taking the opportunity to remove many old and deprecated bits of functionality.
--->

同時に、Appiumプロジェクトは多くの古くなったり非推奨となっている機能や依存を取り除こうとしています。

<!---
Together these do introduce a few breaking changes to how Appium is installed, how drivers and various features are managed, and protocol support. These are detailed below.
--->

これらに合わせて、Appiumのインストール方法、ドライバやフィーチャーの管理、プロトコルサポートに関していくつかの破壊的変更をが導入されます。   
詳細は以下です。

<!---
## Breaking Changes
--->

## 破壊的変更

<!---
Here we call out the breaking changes and what you need to do to account for them.
--->

以下では破壊的変更と、何をする必要があるのかを示します。

<!---
### :bangbang: Installing drivers during setup
### :bangbang: Default server base path
--->

### :bangbang: 初期設定のbase path

<!---
With Appium 1.x, the server would accept commands by default on `http://localhost:4723/wd/hub`. The
`/wd/hub` base path was a legacy convention from the days of migrating from Selenium 1 to Selenium
2, and is no longer relevant. As such the default base path for the server is now `/`. If you want
to retain the old behaviour, you can set the base path via a command line argument as follows:
--->

Appium 1.xでは、AppiumサーバのURLは`http://localhost:4723/wd/hub`でした。この`/wd/hub`であるbase pathはSelenium 1からSelenium 2へ移行した時の名残であり、今となっては何ら意味を持ちません。そのため、初期設定のbase pathは`/`です。もしあたなが以前の挙動を保持したいのであれば、以下の通りにAppiumサーバを起動してください。

```
appium --base-path=/wd/hub
```

<!---
You can also set server arguments as [Config file](./config.md) properties.
--->

この設定は[Appium設定ファイル](./config.md)からでも可能です。

<!-- ### :bangbang: Installing drivers during setup -->

### :bangbang: ドライバのインストール

<!---
When you installed Appium 1.x, all available drivers would be installed at the same time as the main Appium server. This is no longer the case. Simply installing Appium 2.0 (e.g., by `npm install -g appium@next`), will install the Appium server only, but no drivers. To install drivers, you must instead use the new [Appium extension CLI](../cli/extensions.md). For example, to install the latest versions of the XCUITest and UiAutomator2 drivers, after installing Appium you would run the following commands:
--->

Appium 1.xをインストールしたとき、全ての入手可能なドライバは主となるAppiumサーバと合わせてインストールされていました。Appium 2.0ではそうではありません。   Appium 2.0のインストール（例えば `npm install -g appium@next`）は単にAppiumサーバのみをインストールし、ドライバはインストールしません。   
ドライバをインストールするためには新しい[拡張CLI](../cli/extensions.md)を使わなければいけません。   
例えば、最新のXCUITestとUiAutomator2ドライバをインストールする場合、Appiumをインストールしたのちに次のコマンドを実行する必要があります。

```bash
appium driver install uiautomator2     # installs the latest driver version
appium driver install xcuitest@4.12.2  # installs a specific driver version
```

<!---
At this point, your drivers are installed and ready. There's a lot more you can do with this CLI so be sure to check out the docs on it. If you're running in a CI environment or want to install Appium along with some drivers all in one step, you can do so using some special flags during install, for example:
--->

これにより、ドライバはインストールされ、利用可能です。このCLIはいろいろな機能を提供しているので、CLIの[文書](../cli/index.md)を確認してみてください。もしCI上であったり、いくつかのドライバをAppiumと一緒にインストールしたい場合、以下のようなフラグを利用することで実現可能です。

```bash
npm install --global appium --drivers=xcuitest,uiautomator2
```

<!---
This will install Appium and the two drivers for you in one go. Please uninstall any existing Appium 1.x npm packages (with `npm uninstall -g appium`) if you get an installation or startup error. 
--->

上記はAppiumと2つのドライバを一つのコマンドでインストールします。もしセットアップで何らかの問題が発生した場合、既存のAppium 1.xを`npm uninstall -g appium`で削除してみてください。

<!-- ### :bangbang: Drivers installation path -->
### :bangbang: ドライバのインストールパス

<!-- When you installed Appium 1.x, all available drivers would be installed at the same time as the main Appium server.
The path was `/path/to/appium/node_modules`.
For example, `appium-webdriveragent` to build WebDriverAgent manually was `/path/to/appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent`.

Appium 2.0 installs such dependencies in `APPIUM_HOME` environment variable. The default path is `~/.appium`.
So, the path to  `appium-webdriveragent` could be `$APPIUM_HOME/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent` after installing the XCUITest driver package. -->

Appium1.xをインストールすると、利用可能なすべてのドライバがメインのAppiumサーバと同時にインストールされます。そのパスは `/path/to/appium/node_modules` でした。例えば、WebDriverAgentを手動でビルドするための `appium-webdriveragent` は `/path/to/appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent` でした。

Appium2.0では、このような依存関係を環境変数 `APPIUM_HOME` にインストールします。デフォルトのパスは `~/.appium` です。つまり、XCUITestのドライバパッケージをインストールすると、`appium-webdriveragent`へのパスは `$APPIUM_HOME/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent` となる可能性があります。

<!-- ### :bangbang: Chromedriver installation flags -->
### :bangbang: Chromeドライバインストールフラグ

<!-- In Appium 1.x it was possible to customize the way Chromedriver was installed (as part of the UiAutomator2 driver for example), using the following command line flags: -->
Appium1.xでは、以下のコマンドラインフラグを使用して、Chromedriverのインストール方法（例えばUiAutomator2ドライバの一部として）をカスタマイズすることが可能でした：

* `--chromedriver-skip-install`
* `--chromedriver-version`
* `--chromedriver-cdnurl`

<!-- Because Appium 2.0 now installs drivers for you, and because these flags were implemented as NPM config flags, they will no longer work. Instead, use the following environment variables during driver installation: -->

Appium2.0ではドライバをインストールしてくれるようになったためとフラグはNPMの設定フラグとして実装されため、もはや機能しません。   
代わりに、ドライバのインストール時に以下の環境変数を使用します：

* `APPIUM_SKIP_CHROMEDRIVER_INSTALL`
* `CHROMEDRIVER_VERSION`
* `CHROMEDRIVER_CDNURL`

<!-- For example: -->
例：

```bash
APPIUM_SKIP_CHROMEDRIVER_INSTALL=1 appium driver install uiautomator2
```

<!-- ### :bangbang: Driver-specific command line options -->

### :bangbang: ドライバ固有のコマンドラインオプション

<!-- With Appium 1.x, command-line options specific to particular drivers were all hosted on the main Appium server. So, for example, `--chromedriver-executable` was a CLI parameter you could use with Appium to set the location of a specific Chromedriver version for use with, say, the UiAutomator2 driver. -->

Appium1.xでは、特定のドライバに特化したコマンドラインオプションは、すべてAppiumのメインサーバにホストされていました。例えば、`--chromedriver-executable`は、UiAutomator2ドライバで使用する特定のChromedriverバージョンの場所を設定するためにAppiumで使用できるCLIパラメータでした。

<!-- With Appium 2.x, all driver- and platform-specific CLI params have been moved to the drivers themselves. To access them, you'll now need to prepend the argument with the extension type (either `driver` or `plugin`) and the name of the extension. For example, `--chromedriver-executable` becomes `--driver-uiautomator2-chromedriver-executable`. -->

Appium2.xでは、ドライバやプラットフォーム固有のCLIパラメータは、すべてドライバ自体に移動されました。これらにアクセスするには、引数の前に拡張機能タイプ（`driver`または`plugin`）と拡張機能の名前を付ける必要があります。例えば、`--chromedriver-executable` は `--driver-uiautomator2-chromedriver-executable` です。

<!-- ### :bangbang: Driver-specific automation commands -->

### :bangbang: ドライバ固有の自動化コマンド

<!-- The definition of certain commands that pertain only to specific drivers has been moved to those
drivers' implementations. For example, `pressKeyCode` is specific to the UiAutomator2 driver and is
now understood only by that driver. In practice, the only breaking change here is the kind of error
you would encounter if the appropriate driver is not installed. Previously, you would get a `501
Not Yet Implemented` error if using a driver that didn't implement the command. Now, you will get
a `404 Not Found` error because if a driver that doesn't know about the command is not active, the
main Appium server will not define the route corresponding to the command. -->

特定のドライバにのみ関連するコマンドの定義は、それらのドライバの実装に移されました。例えば、`pressKeyCode`はUiAutomator2ドライバに固有のもので、現在ではそのドライバによってのみ利用されています。現実には適切なドライバがインストールされていない場合に、どのようなエラーが発生するかという点だけが変化します。以前は、コマンドを実装していないドライバを使用すると、`501 Not Yet Implemented`というエラーが発生しました。コマンドを知らないドライバがアクティブでない場合、メインのAppiumサーバはコマンドに対応するルートを定義しないため、今は `404 Not Found` エラーが発生します。

<!-- ### :bangbang: Driver updates -->

### :bangbang: ドライバの更新

<!-- In the past, to get updates to your iOS or Android drivers, you'd simply wait for those updates to be rolled into a new release of Appium, and then update your Appium version. With Appium 2.x, the Appium server and the Appium drivers are versioned and released separately. This means that drivers can be on their own release cadence and that you can get driver updates as they happen, rather than waiting for a new Appium server release. The way to check for driver updates is with the CLI: -->

以前は、iOSやAndroidのドライバのアップデートを得るために、それらのアップデートがAppiumの新しいリリースに組み込まれるのを待ち、Appiumのバージョンを更新するだけでした。Appium2.xでは、AppiumサーバとAppiumドライバは別々にバージョン管理され、リリースされています。これは、ドライバが独自の公表タイミングを持つことができ、新しいAppiumサーバのリリースを待つのではなく、その都度ドライバの更新を受けることができることを意味します。ドライバのアップデートを確認する方法は、CLIを使用します：

```bash
appium driver list --updates
```

<!-- If any updates are available, you can then run the `update` command for any given driver: -->

もしアップデートがあれば、任意のドライバに対して`update`コマンドを実行できます：

```bash
appium driver update xcuitest
```

<!-- (For a complete description of the update command, check out the [拡張CLI](../cli/extensions.md) doc)

To update the Appium server itself, you do the same thing as in the past: `npm install -g appium`. Now, installing new versions of the Appium server will leave your drivers intact, so the whole process will be much more quick.

If you would like to update to a specific version, not the latest, please uninstall the driver and install the desired version using the `install` subcommand instead of `update`. -->

(updateコマンドの完全な説明は、[拡張CLI](../cli/extensions.md) を参照してください)

Appiumサーバ自体をアップデートするには、従来と同じように `npm install -g appium` を実行します。Appium サーバの新バージョンをインストールしても、ドライバはそのままなので、すべてのプロセスがより迅速です。

もし、最新版ではなく、特定のバージョンにアップデートしたい場合は、`update`ではなく、`install`サブコマンドを使用して、ドライバをアンインストールし、目的のバージョンをインストールしてください。

```bash
appium driver uninstall xcuitest
appium driver install xcuitest@4.11.1
```

<!-- ### :bangbang: Protocol changes -->

### :bangbang: プロトコルの変更

<!-- Appium's API is based on the [W3C WebDriver Protocol](https://www.w3.org/TR/webdriver/), and it has supported this protocol for years. Before the W3C WebDriver Protocol was designed as a web standard, several other protocols were used for both Selenium and Appium. These protocols were the "JSONWP" (JSON Wire Protocol) and "MJSONWP" (Mobile JSON Wire Protocol). The W3C Protocol differs from the (M)JSONWP protocols in a few small ways.

Up until Appium 2.0, Appium supported both protocols, so that older Selenium/Appium clients could still communicate with newer Appium servers. Moving forward, support for older protocols will be removed. -->

AppiumのAPIは[W3C WebDriver Protocol](https://www.w3.org/TR/webdriver/)をベースにしており、何年も前からこのプロトコルをサポートしています。W3C WebDriver ProtocolがWeb標準として設計される以前は、SeleniumとAppiumの両方で、他のプロトコルが使用されていました。そのプロトコルは、「JSONWP」（JSON Wire Protocol）と「MJSONWP」（Mobile JSON Wire Protocol）でした。W3Cプロトコルと（M）JSONWPプロトコルは、小さな点で異なっています。

Appium2.0まで、Appiumは両方のプロトコルをサポートしており、古いSelenium/Appiumクライアントが新しいAppiumサーバと通信できるようになっていました。今後、古いプロトコルのサポートは削除される予定です。

### :bangbang: _Capabilities_

<!-- One significant difference between old and new protocols is in the format of capabilities. Previously called "desired capabilities", and now called simply "capabilities", there is now a requirement for a so-called "vendor prefix" on any non-standard capabilities. The list of standard capabilities is given in the [WebDriver Protocol spec](https://www.w3.org/TR/webdriver/#capabilities), and includes a few commonly used capabilities such as `browserName` and `platformName`.

These standard capabilities continue to be used as-is. All other capabilities must include a "vendor prefix" in their name. A vendor prefix is a string followed by a colon, such as `appium:`. Most of Appium's capabilities go beyond the standard W3C capabilities and must therefore include vendor prefixes (we recommend that you use `appium:` unless directed otherwise by documentation). For example: -->

新旧プロトコルの大きな違いのひとつに、Capabilitiesの形式があります。以前は「desired capabilities」と呼ばれ、現在は単に「capabilities」と呼ばれていますが、非標準のcapabilitiesには「vendor prefix」が要求されるようになりました。標準的なcapabilityのリストは [WebDriver Protocol spec](https://www.w3.org/TR/webdriver/#capabilities) に記載されており、`browserName` や `platformName` など、よく使われるcapabilityが含まれています。

これらの標準的なcapabilityは、そのまま使用を続けることができます。それ以外のcapabilityは、その名前に「vendor prefix」を含める必要があります。vendor prefixは、`appium:`のように、コロンが続く文字列です。Appiumのcapabilitiesのほとんどは、W3Cの標準的なcapabilitesを超えているため、vendor prefixを含める必要があります（文書で特に指示がない限り、`appium:`を使用することをお勧めします）。例えば、以下のような感じです：

- `appium:app`
- `appium:noReset`
- `appium:deviceName`

<!-- This requirement may or may not be a breaking change for your test suites when targeting Appium 2.0. If you're using an updated Appium client (at least one maintained by the Appium team), the client will add the `appium:` prefix for you on all necessary capabilities automatically. New versions of [Appium Inspector](https://github.com/appium/appium-inspector) will also do this. Cloud-based Appium providers may also do this. So simply be aware that if you get any messages to the effect that your capabilities lack a vendor prefix, this is how you solve that problem.

On a related note, it will no longer be possible to start Appium sessions using WebDriver clients that don't support the W3C protocol (see below for a comment to this effect for the WD library).

To make everyone's lives a bit easier, we've also introduced the option of wrapping up all Appium-related capabilities into one object capability, `appium:options`. You can bundle together anything that you would normally put an `appium:` prefix on into this one capability. Here's an example (in raw JSON) of how you might start an iOS session on the Safari browser using `appium:options`: -->

この要件は、Appium2.0をターゲットとする場合、あなたのテストスイートに破壊的な変更になるかもしれませんし、ならないかもしれません。最新のAppiumクライアント（少なくともAppiumチームによって保守されているもの）を使用している場合、クライアントは自動的にすべての必要なcapabilityに `appium:` プレフィックスを追加します。[Appium Inspector](https://github.com/appium/appium-inspector)の新しいバージョンでも、同様です。クラウドベースのAppiumプロバイダーも同様かもしれません。そのため、もしあなたのテストにvendor prefixが足りないという旨のメッセージが表示された場合、この方法でその問題を解決することができることを認識しておいてください。

関連して、W3CプロトコルをサポートしていないWebDriverクライアントを使用してAppiumセッションを開始することはできなくなります（WDライブラリに対するこの趣旨のコメントは以下を参照してください）。

みんなを少し楽にするために、Appiumに関連するすべての機能を1つの Object Capabilityである `appium:options` にまとめるオプションも導入されました。通常、`appium:`という接頭辞を付けるものを、この1つの capability に束ねることができます。以下は、Safariブラウザで `appium:options` を使ってiOSのセッションを開始する例です：

```json
{
  "platformName": "iOS",
  "browserName": "Safari",
  "appium:options": {
    "platformVersion": "14.4",
    "deviceName": "iPhone 11",
    "automationName": "XCUITest"
  }
}
```

<!-- (Of course, each client will have a different way of creating structured capabilities like `appium:options` or other ones that you might have seen such as `goog:chromeOptions`). NB: capabilities that show up in `appium:options` will overwrite capabilities of the same name that show up at the top level of the object. (The new `appium:options` syntax support by cloud providers may vary.)

For more information on capabilities, have a look at the [Capabilities Guide](caps.md). -->

(もちろん、各クライアントでは `appium:options` や、`goog:chromeOptions` のような構造化されたcapabilityの作成方法が異なるでしょう)。注意：`appium:options`で表示されるcapabilityは、オブジェクトのトップレベルに表示される同名のcapacityを上書きします。(クラウドプロバイダーによる新しい `appium:options` 構文のサポートは異なる場合があります)。

capabilityの詳細については、[ガイド>Capabilities（機能・能力）](caps.md) を参照してください。

### :bangbang: _Removed Commands_

<!-- In addition to commands which have been moved to driver implementations, commands which were a part of the old JSON Wire Protocol and not a part of the W3C Protocol are no longer available: -->

ドライバに移行したコマンドに加え、旧JSON Wire Protocolの一部であり、W3C Protocolの一部ではないコマンドは使用できなくなりました：

<!-- - TODO (these commands are being identified and removed and will be updated here when complete) -->

- TODO（これらのコマンドは特定・削除中で、完了したらここで更新されます）

<!-- If you use a modern Appium or Selenium client, you should no longer have access to these anyway, so any breaking changes should appear on the client side first and foremost. -->

いずれにせよ、最新のAppiumやSeleniumクライアントを使用している場合は、これらにアクセスする必要はないはずなので、壊れるような変更は、何よりもまずクライアント側に現れるはずです。

<!-- ### :bangbang: Image analysis features moved to plugin -->

### :bangbang: 画像解析機能はプラグインに移行

<!-- One of the design goals for Appium 2.0 is to migrate non-core features into special extensions called [plugins](../ecosystem/index.md). This allows people to opt into features which require extra time to download or extra system setup. The various image-related features of Appium (image comparison, finding elements by image, etc...) have been moved into an officially supported plugin called [images](https://github.com/appium/appium/tree/master/packages/images-plugin).

If you use these image-related methods, to continue accessing them you will need to do two things. -->

Appium2.0の設計目標の1つは、非コア機能を[プラグイン](../ecosystem/index.md)という特別な拡張機能へ移行することです。これにより、ダウンロードに時間がかかったり、システムのセットアップが必要な機能を選択することができるようになります。Appiumのさまざまな画像関連機能（画像比較、画像による要素の検索など）は、[images](https://github.com/appium/appium/tree/master/packages/images-plugin)という公式サポートのプラグインに移動されました。

これらの画像関連メソッドを使用している場合、引き続きアクセスするためには、次の2つのことを行う必要があります。

<!-- 1. Install the plugin: `appium plugin install images`
2. Ensure you start the Appium server with access to run the plugin by including it in the list of plugins designated on the command line, e.g., `appium --use-plugins=images` -->

1. プラグインをインストールします： `appium plugin install images`
2. コマンドラインで指定したプラグインリストにプラグインを含めることで、プラグインを実行できる状態でAppiumサーバを起動することを確認します（例：`appium --use-plugins=images`）。

<!-- Image-related commands will also be removed on the client side of things, which means you will need to follow the instructions on the plugin README for installing client-side plugins to access these features. -->

画像関連のコマンドもクライアント側で削除されるため、これらの機能を利用するには、プラグインのREADMEに記載されているクライアント側プラグインのインストール方法に従っていただく必要があります。

<!-- ### :bangbang: Execute Driver Script command moved to plugin -->

### :bangbang: 「ドライバスクリプトの実行」コマンドをプラグインに移動しました

<!-- If you use the advanced Execute Driver Script feature (which allows you to send in a WebdriverIO script to have it executed completely on the server instead of command-by-command from the client), this functionality has been moved to a plugin. Here's what to do to keep using it: -->

ドライバスクリプトの実行機能（WebdriverIOのスクリプトを送信すると、クライアントからコマンドごとに実行するのではなく、サーバ上で完全に実行できます。）をご利用の場合、この機能はプラグインに移行されました。この機能を使い続けるにはどうしたらよいかを説明します：

<!-- 1. Install the plugin: `appium plugin install execute-driver`
2. Ensure you start the Appium server with access to run the plugin by including it in the list of plugins designated on the command line, e.g., `appium --use-plugins=execute-driver` -->

1. プラグインをインストールします： `appium plugin install execute-driver`
2. コマンドラインで指定するプラグインリストにプラグインを含めることで、プラグインを実行できる状態でAppiumサーバを起動することを確認します。（例：`appium --use-plugins=execute-driver`）

<!-- ### :bangbang: External Files No Longer Supported for `--nodeconfig`, `--default-capabilities`, `--allow-insecure` and `--deny-insecure` -->

### :bangbang: `--nodeconfig`, `--default-capabilities`, `--allow-insecure` と `--deny-insecure` のための外部ファイルのサポートが終了しました。

<!-- These options can be provided as strings on the command line (a JSON string for `--nodeconfig` and a comma-separated list of strings for `--allow-insecure` and `--deny-insecure`). Arguments provided on the command line will likely need to be quoted or escaped.

The recommended method to provide these options is now via a [configuration file](#tada-configuration-files).

In summary, if you are using a JSON Appium config file, you can simply cut-and-paste the contents of your "nodeconfig" JSON file into the value of the `server.nodeconfig` property.  Any CSV-like files you had previously provided for `--allow-insecure` and `--deny-insecure` become the values of the `server.allow-insecure` and `server.deny-insecure` properties in the Appium config files (respectively); both are arrays of strings. -->

これらのオプションはコマンドラインで文字列として指定できます（`--nodeconfig`はJSON文字列、`--allow-insecure` と `--deny-insecure` はカンマ区切りの文字列リスト）。コマンドラインで提供される引数は、おそらく引用符で囲むかエスケープする必要があります。

これらのオプションを提供するための推奨される方法は、[設定ファイル](#tada-configuration-files)を介して行われるようになりました。

まとめると、JSONのAppium設定ファイルを使用している場合、「nodeconfig」JSONファイルの内容を`server.nodeconfig`プロパティの値にカット＆ペーストするだけです。 また、`--allow-insecure` と `--deny-insecure` に指定した CSV のようなファイルは、Appium の設定ファイルの `server.allow-insecure` と `server.deny-insecure` プロパティの値です（それぞれ文字列の配列です）。

<!-- ### :bangbang: Old drivers removed -->

### :bangbang: 古いドライバを削除

<!-- The old iOS and Android (UiAutomator 1) drivers and related tools (e.g., `authorize-ios`) have been removed. They haven't been relevant for many years anyway. -->

古いiOSとAndroid（UiAutomator1）のドライバと関連ツール（例：`authorize-ios`）は削除されました。いずれにせよ、これらは何年も前から関係ありません。

<!-- ### :bangbang: Server can no longer be started with `--port 0` -->

### :bangbang: サーバは `--port 0` で起動できません。

<!-- In Appium 1.x, it was possible to specify `--port 0` during server startup. This had the effect of
starting Appium on a random free port. In Appium 2.0, port values must be `1` or higher. The random
port assignment was never an intentional feature of Appium 1.x, but a consequence of how Node's
HTTP servers work and the fact that there was no port input validation in Appium 1.x. If you want
to find a random free port to start Appium on, you must now take care of this on your own prior to
starting Appium. Starting Appium on an explicit and known port is the correct practice moving
forward. -->

Appium1.xでは、サーバ起動時に`--port 0`を指定できた。これは、ランダムな空きポートでAppiumを起動する効果がありました。Appium 2.0では、ポート値は `1` 以上でなければなりません。ランダムなポートの指定はAppium 1.x の意図的な機能ではなく、NodeのHTTPサーバの仕組みと、Appium 1.xでポート入力のバリデーションがなかったという事実の結果です。明示的で既知のポートでAppiumを起動することが、今後の正しいやり方です。

<!-- ### :warning: Internal packages renamed -->

### :warning: 内部パッケージの名称を変更

<!-- Some Appium-internal NPM packages have been renamed (for example, `appium-base-driver` is now `@appium/base-driver`). This is not a breaking change for Appium users, only for people who have built software that directly incorporates Appium's code. -->

一部のAppiumのNPMパッケージの名前が変更されました（例えば `appium-base-driver` は `@appium/base-driver` になりました）。これは、Appiumのコードを直接組み込んだソフトウェアを構築した人だけのための変更であり、壊れるものではありません。

<!-- ### :warning: "WD" JavaScript client library no longer supported -->

### :warning: "WD" JavaScriptクライアントライブラリがサポート終了

<!-- For many years, some of Appium's authors maintained the [WD](https://github.com/admc/wd) client library. This library has been deprecated and has not been updated for use with the W3C WebDriver protocol. As such, if you're using this library you'll need to move to a more modern one. We recommend [WebdriverIO](https://webdriver.io). -->

長年にわたり、Appiumの作者の一部は[WD](https://github.com/admc/wd)クライアントライブラリを維持していました。このライブラリは非推奨であり、W3C WebDriverプロトコルで使用するための更新はされていません。そのため、このライブラリを使用している場合は、より最新のものに移行する必要があります。[WebdriverIO](https://webdriver.io)をお勧めします。

<!-- ### :warning: Appium Inspector split out from Appium Desktop -->

### :warning: Appium InspectorがAppium Desktopから分割された

<!-- The inspecting portion of Appium Desktop has been moved to its own app, Appium Inspector: [github.com/appium/appium-inspector](https://github.com/appium/appium-inspector). It's fully compatible with Appium 2.0 servers. Simply download it and run it on its own. You no longer need the GUI Appium Desktop server to inspect apps. The Appium Desktop server will continue to be supported at its original site: [github.com/appium/appium-desktop](https://github.com/appium/appium-desktop). It will simply no longer bundle the Inspector with it. Note that Appium Desktop 1.21 and lower versions depend on the deprecated [WD](https://github.com/admc/wd) client, and are not compatible with Appium 2.0. There is currently no Appium 2.0 support for Appium Desktop planned, now that the Inspector is a standalone app.

You can also now use the Appium Inspector without downloading anything, by visiting the [web version of Appium Inspector](https://inspector.appiumpro.com). Note that to test against local servers, you'll need to start the server with `--allow-cors` so that the browser-based version of Appium Inspector can access your Appium server to start sessions. -->

Appium Desktopの検査ツールは、専用のアプリ「Appium Inspector」に移動しました： [github.com/appium/appium-inspector](https://github.com/appium/appium-inspector) 
Appium2.0 サーバと完全に互換性があり、ダウンロードして単独で実行するだけです。アプリを検査するためにGUIのAppium Desktopサーバはもう必要ありません。Appium Desktopサーバは、元のサイトで引き続きサポートされます： [github.com/appium/appium-desktop] (https://github.com/appium/appium-desktop)
単にInspectorがバンドルされなくなるだけです。なお、Appium Desktop1.21以下のバージョンは、非推奨の[WD](https://github.com/admc/wd)クライアントに依存しており、Appium2.0と互換性がありません。現在、Appium DesktopのAppium2.0サポートは予定されておらず、Inspectorがスタンドアロンアプリとなった現在、その予定はありません。

また、[Web版Appium Inspector](https://inspector.appiumpro.com)にアクセスすることで、何もダウンロードせずにAppium Inspectorを使用できるようになりました。なお、ローカルサーバに対してテストを行う場合は、ブラウザベースのAppium InspectorがAppiumサーバにアクセスしてセッションを開始できるように、サーバを`--allow-cors`で起動する必要があります。

<!-- ## Major New Features -->
## 主な新機能

<!-- Apart from the breaking changes mentioned above, in this section is a list of some of the major new features you may wish to take advantage of with Appium 2.0. -->
上記の変更点とは別に、このセクションでは、Appium 2.0で活用したい主要な新機能の一覧を紹介します。

<!-- ### Plugins -->
### プラグイン

#### :tada: _Server Plugins_

<!-- Appium extension authors can now develop their own server plugins, which can intercept and modify
any Appium command, or even adjust the way the underlying Appium HTTP server itself works. To learn
more about plugins, read the new [Appium Introduction](../intro/index.md). Interested in building
a plugin? Check out the [Building Plugins](../ecosystem/build-plugins.md) guide. -->

Appium拡張の作者は、独自のサーバプラグインを開発できるようになり、任意のAppiumコマンドを傍受して変更したり、基盤となるAppium HTTPサーバ自体の動作方法を調整したりできます。プラグインの詳細については、[はじめに](../intro/index.md) を読んでください。プラグインを構築することに興味がありますか？[プラグインの構築ガイド](../ecosystem/build-plugins.md)を参照してください。

#### :tada: _Client Plugins_

TODO

<!-- ### :tada: Install drivers and plugins from anywhere -->
### :tada: どこからでもドライバやプラグインをインストールできる

<!-- You're no longer limited to the drivers that come with Appium, or that the Appium team even knows
about! Appium extension authors can now develop custom drivers, which can be downloaded or
installed via Appium's [Extension CLI](../cli/extensions.md) from NPM, Git, GitHub, or even the
local filesystem. Interested in building a driver? Check out the [Building
Drivers](../ecosystem/build-drivers.md) guide. -->

もはやAppiumに付属する、あるいはAppiumチームが知っているドライバに限定されることはありません！Appiumの拡張機能作者はカスタムドライバを開発できるようになり、Appiumの[拡張CLI](../cli/extensions.md)からNPM、Git、GitHub、またはローカルファイルシステムからダウンロードまたはインストールすることができるようになりました。ドライバを構築することに興味がありますか？[ドライバの構築ガイド](../ecosystem/build-drivers.md) を参照してください。

<!-- ### :tada: Configuration Files -->
### :tada: 設定ファイル

<!-- Appium now supports _configuration files_ in addition to command-line arguments. In a nutshell, nearly all arguments which Appium 1.x required to be provided on the CLI are now able to be expressed via a configuration file. Configuration files may be in JSON, JS, or YAML format. See the [Config Guide](config.md) for a full explanation. -->

Appiumは、コマンドライン引数に加え、_configuration files_をサポートするようになりました。簡単に言うと、Appium 1.xではCLIで提供する必要があったほぼすべての引数が、設定ファイルによって表現できるようになりました。設定ファイルは、JSON、JS、YAMLのいずれかの形式で指定できます。詳しい説明は[Appium設定ファイル](config.md)を参照してください。

<!-- ## Special Notes for Cloud Providers -->
## クラウドプロバイダー様向け特記事項

<!-- The rest of this document has applied to Appium generally, but some of the architectural changes in Appium 2.0 will constitute breaking changes for Appium-related service providers, whether a cloud-based Appium host or an internal service. At the end of the day, the maintainer of the Appium server is responsible for installing and making available the various Appium drivers and plugins that end users may wish to use. -->

この文書の残りの部分は、一般的にAppiumに適用されています。Appium 2.0のアーキテクチャの変更の一部は、クラウドベースのAppiumホストまたは内部サービスにかかわらず、Appium関連のサービスプロバイダにとって破壊的な変更をもたらします。Appiumサーバのメンテナには、エンドユーザーが使いたいであろうさまざまなAppiumドライバやプラグインをインストールし、利用可能にする責任があります。

<!-- We encourage cloud providers to thoroughly read and understand our [recommendation for cloud
provider capabilities](caps.md#special-notes-for-cloud-providers) in order to support user needs in
an industry-compatible way! -->

クラウド事業者の皆様には、互換性のある方法でユーザーのニーズをサポートするために、[クラウド事業者の能力に関する推奨事項](caps.md#special-notes-for-cloud-providers)を十分に読み、理解することをお勧めいたします！
