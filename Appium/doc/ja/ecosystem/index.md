---
title: Appiumのエコシステム
---

# Appiumのエコシステム

<!-- Appium has an ecosystem of related software and tools. In this guide we'll discuss important officially-supported and community-supported projects. -->
Appiumには、関連するソフトウェアやツールのエコシステムがあります。この文書では、公式にサポートされている重要なプロジェクトとコミュニティでサポートされているプロジェクトについて説明します。

<!-- ## Appium Inspector -->
## Appiumインスペクタ

<!-- Appium has a graphical client which can be used to manually perform Appium commands, inspect app hierarchies, view screenshots, and more. It's very useful for Appium test development. You can learn more about the inspector here: [Appium Inspector](https://github.com/appium/appium-inspector) -->
Appiumにはグラフィカルなクライアントがあり、Appiumコマンドの手動実行、アプリ階層の検査、スクリーンショットの表示などに使用できます。Appiumのテスト開発に非常に便利です。インスペクターについては、こちらで詳しく解説しています： [Appium Inspector](https://github.com/appium/appium-inspector)

<!-- ## Drivers -->
## ドライバ

<!-- You can't use Appium without at least one driver! Here are the drivers that are currently maintained by the Appium team. Click on the link for each driver to see the specific installation instructions and documentation for that driver. -->
少なくとも1つのドライバがなければ、Appiumを使うことはできません！ここでは、現在Appiumチームによって保守されているドライバを紹介します。各ドライバのリンクをクリックすると、そのドライバの具体的なインストール手順や文書を見ることができます。

<!-- To learn more about what drivers are and how they work, check out the [Driver Intro](../intro/drivers.md) -->
ドライバとは何か、どのように動作するのかについて詳しく知りたい方は、[Appium Drivers入門](../intro/drivers.md) を参照してください。

<!-- |Driver|Installation Key|Platform(s)|Mode(s)| -->

|ドライバ|インストールキー|プラットフォーム|モード|
|--|--|--|--|
|[Chromium](https://github.com/appium/appium-chromium-driver)|`chromium`|macOS, Windows, Linux|Web|
|[Espresso](https://github.com/appium/appium-espresso-driver)|`espresso`|Android|Native|
|[Gecko](https://github.com/appium/appium-geckodriver)|`gecko`|macOS, Windows, Linux, Android|Web|
|[Mac2](https://github.com/appium/appium-mac2-driver)|`mac2`|macOS|Native|
|[Safari](https://github.com/appium/appium-safari-driver)|`safari`|macOS, iOS|Web|
|[UiAutomator2](https://github.com/appium/appium-uiautomator2-driver)|`uiautomator2`|Android|Native, Hybrid, Web|
|[XCUITest](https://github.com/appium/appium-xcuitest-driver)|`xcuitest`|iOS|Native, Hybrid, Web|

<!-- And of course, you can install any other drivers you find out there by using the Appium driver CLI. -->
もちろん、Appium driver CLIを使って、他のどようなドライバをインストールすることも可能です。

<!-- ### Other drivers -->
### その他のドライバ

<!-- These drivers are not maintained by the Appium team and can be used to target additional platforms. -->
これらのドライバはAppiumチームによって保守されておらず、追加のプラットフォームをターゲットにするために使用します。

<!-- |Driver|Installation Key|Platform(s)|Mode(s)|Supported By| -->

|ドライバ|インストールキー|プラットフォーム|モード|開発元|
|--|--|--|--|--|
|[Flutter](https://github.com/appium-userland/appium-flutter-driver)|`--source=npm appium-flutter-driver`|iOS, Android|Native|Community|
|[LG WebOS](https://github.com/headspinio/appium-lg-webos-driver)|`--source=npm appium-lg-webos-driver`|LG TV|Web|HeadSpin|
|[Linux](https://github.com/fantonglang/appium-linux-driver)|`--source=npm @stdspa/appium-linux-driver`|Linux|Native|`@fantonglang`|
|[Roku](https://github.com/headspinio/appium-roku-driver)|`--source=npm @headspinio/appium-roku-driver`|Roku|Native|HeadSpin|
|[Tizen](https://github.com/Samsung/appium-tizen-driver)|`--source=npm appium-tizen-driver`|Android|Native|Community / Samsung|
|[TizenTV](https://github.com/headspinio/appium-tizen-tv-driver)|`--source=npm appium-tizen-tv-driver`|Samsung TV|Web|HeadSpin|
|[Windows](https://github.com/appium/appium-windows-driver)|`--source=npm appium-windows-driver`|Windows|Native|Community / Microsoft|
|[Youi](https://github.com/YOU-i-Labs/appium-youiengine-driver)|`--source=npm appium-youiengine-driver`|iOS, Android, macOS, Linux, tvOS|Native|Community / You.i|

<!-- !!! note -->

<!-- If you maintain an Appium driver that you would like to be listed in the Appium docs, feel free to make a PR to add it to this section with a link to the driver documentation. -->
!!! note
    もし、あなたがAppiumの文書に掲載したいと思う、Appiumドライバを保守している場合、ドライバの文書へのリンクを添えて、このセクションに追加するPRを自由に作成してください。

<!-- ## Clients -->
## クライアント

<!-- You need clients to write and run Appium scripts. To learn more about clients, read our [Client Intro](../intro/clients.md). Here is the list of known Appium clients. You'll want to become very familiar with your client documentation (as well as the documentation of any Selenium client that the Appium client depends on) since that is what you will use as your primary interface to Appium. -->
Appiumのスクリプトを書いたり実行したりするためには、クライアントが必要です。クライアントについて詳しく知るには、[Appium Clients入門](../intro/clients.md) を読んでください。以下は、既知のAppiumクライアントのリストです。Appiumへの主要なインターフェースとして使用するものなので、クライアントの文書（Appiumクライアントが依存するSeleniumクライアントの文書も同様）に熟読しておくとよいでしょう。

<!-- |Client|Language|Supported By| -->

|クライアント|言語|開発元|
|-|-|-|
|[Appium Java client](https://github.com/appium/java-client)|Java|Appium Team|
|[Appium Python client](https://github.com/appium/python-client)|Python|Appium Team|
|[Appium Ruby Core client](https://github.com/appium/ruby_lib_core) (Recommended)<br>[Appium Ruby client](https://github.com/appium/ruby_lib)|Ruby|Appium Team|
|[WebDriverIO](https://webdriver.io)<br>[Nightwatch](https://nightwatchjs.org/)|Node.js|Community|
|[Appium .NET client](https://github.com/appium/dotnet-client)|C#|Appium Team*|
|[RobotFramework](https://github.com/serhatbolsu/robotframework-appiumlibrary)|DSL|Community|

<!-- In general, any W3C WebDriver spec-compatible client will also integrate well with Appium, though some Appium-specific commands may not be implemented in other clients. -->
一般的に、W3C WebDriver仕様と互換性のあるクライアントであれば、Appiumともうまく連携できますが、Appium固有のコマンドは他のクライアントでは実装されていない場合があります。

<!-- ## Plugins -->
## プラグイン

<!-- Appium Plugins offer ways to extend or modify Appium's behaviour. This is the list of plugins that are currently maintained by the Appium Team: -->
プラグインは、Appiumの動作を拡張したり変更したりする方法を提供します。以下は、Appiumチームによって保守されているプラグインのリストです：

<!-- |Plugin|Installation Key|Description|Supported By|
|---|---|---|---|
|[Execute Driver](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)|`execute-driver`|Run entire batches of commands in a single call to the Appium server|Appium Team|
|[Images](https://github.com/appium/appium/tree/master/packages/images-plugin)|`images`|Image matching and comparison features|Appium Team|
|[Relaxed Caps](https://github.com/appium/appium/tree/master/packages/relaxed-caps-plugin)|`relaxed-caps`|Relax Appium's requirement for vendor prefixes on capabilities|Appium Team|
|[Universal XML](https://github.com/appium/appium/tree/master/packages/universal-xml-plugin)|`universal-xml`|Instead of the standard XML format for iOS and Android, use an XML definition that is the same across both platforms|Appium Team| -->

|プラグイン|インストールキー|説明|開発元|
|---|---|---|---|
|[Execute Driver](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)|`execute-driver`|Appiumサーバへの1回の呼び出しでコマンドのバッチ全体を実行|Appium Team|
|[Images](https://github.com/appium/appium/tree/master/packages/images-plugin)|`images`|画像のマッチングと比較の機能|Appium Team|
|[Relaxed Caps](https://github.com/appium/appium/tree/master/packages/relaxed-caps-plugin)|`relaxed-caps`|Appiumが要求するcapabilitiyの開発元プレフィックスを緩和|Appium Team|
|[Universal XML](https://github.com/appium/appium/tree/master/packages/universal-xml-plugin)|`universal-xml`|iOSとAndroidの標準XMLフォーマットの代わりに、両方のプラットフォームで共通のXML定義を使用|Appium Team|

<!-- ### Other plugins -->
### その他のプラグイン

<!-- |Plugin|Installation Key|Description|Supported By|
|---|---|---|---|
|[AltUnity](https://github.com/headspinio/appium-altunity-plugin)|`--source=npm appium-altunity-plugin`|Target Unity games and apps for automation with a new context, via the AltUnityTester framework|HeadSpin|
|[Device Farm](https://github.com/AppiumTestDistribution/appium-device-farm)|`--source=npm appium-device-farm`|Manage and create driver session on connected Android devices and iOS Simulators.|`@AppiumTestDistribution`|
|[OCR](https://github.com/jlipps/appium-ocr-plugin)|`--source=npm appium-ocr-plugin`|Find elements via OCR text|`@jlipps`|
|[Reporter](https://github.com/AppiumTestDistribution/appium-reporter-plugin)|`--source=npm appium-reporter-plugin`|Generates standalone consolidated html report with screenshots. Reports can be fetched from appium server, without worrying about heavy lifting such as screenshot capturing, report generation etc.|`@AppiumTestDistribution`| -->

|プラグイン|インストールキー|説明|開発元|
|---|---|---|---|
|[AltUnity](https://github.com/headspinio/appium-altunity-plugin)|`--source=npm appium-altunity-plugin`|AltUnityTesterフレームワークを介して、新しいContextで自動化のためのUnityゲームやアプリをターゲットにします。|HeadSpin|
|[Device Farm](https://github.com/AppiumTestDistribution/appium-device-farm)|`--source=npm appium-device-farm`|接続されたAndroidデバイスとiOSシミュレータのドライバセッションを管理し、作成します。|`@AppiumTestDistribution`|
|[OCR](https://github.com/jlipps/appium-ocr-plugin)|`--source=npm appium-ocr-plugin`|OCRテキストによる要素の検索|`@jlipps`|
|[Reporter](https://github.com/AppiumTestDistribution/appium-reporter-plugin)|`--source=npm appium-reporter-plugin`|スクリーンショットを含むスタンドアロンな統合htmlレポートを生成します。レポートは、スクリーンショットのキャプチャ、レポート生成などの重労働を心配することなく、appiumサーバからフェッチできます。|`@AppiumTestDistribution`|

<!-- !!! note -->

<!-- If you maintain an Appium plugin that you would like to be listed in the Appium docs, feel free to make a PR to add it to this section with a link to the documentation for the plugin. -->

!!! note
    もし、あなたがAppiumの文書に掲載したいと思う、Appiumプラグインを保守している場合、プラグインの文書へのリンクを添えて、このセクションに追加するPRを自由に作成してください。

<!-- ## Helper tools -->
## ヘルパーツール

<!-- The following tools might also be useful for Appium users: -->
以下のツールもAppiumユーザーにとって有用かもしれません：

<!-- |Name|Description|Supported By|
|---|---|---|
|[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)|Help set up an Appium environment for Android and iOS|`@AppiumTestDistribution`| -->

|名前|説明|開発元|
|---|---|---|
|[appium-installer](https://github.com/AppiumTestDistribution/appium-installer)|AndroidとiOSのAppium環境のセットアップを支援します。|`@AppiumTestDistribution`|
