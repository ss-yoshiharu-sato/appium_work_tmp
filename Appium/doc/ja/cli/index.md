---
title: CLI Intro
---

<!-- When you install Appium globally via `npm`, an executable shell script named `appium` is placed in your global Node `bin` folder, often also symlinked to places like `/usr/local/bin`. If your `PATH` is set up to look for programs in appropriate directory, then you will be able to run `appium` from the command line of your terminal, like any other executable. The `appium` program has three main subcommands, each of which has its own set of documentation: -->
Appium を `npm` 経由でグローバルにインストールすると、グローバル Node の `bin` フォルダに `appium` という名前の実行可能なシェルスクリプトが置かれ、しばしば `/usr/local/bin` といった場所にシンボリックリンクされます。`PATH` が適切なディレクトリにあるプログラムを探すように設定されていれば、他と同様にターミナルのコマンドラインから `appium` を実行することができます。appium`プログラムには3つの主要なサブコマンドがあり、それぞれのサブコマンドには独自の文書が用意されています：

<!-- 1. The [`server`](./args.md) subcommand starts an Appium server listening for new session requests, and takes a variety of parameters related to the operation of the server and also those consumed by active drivers or plugins.
2. The [Extension](./extensions) (`driver` and `plugin`) subcommands assist in managing Appium drivers and plugins. -->
1. [`server`](./args.md) サブコマンドは、新しいセッション要求を聞く Appium サーバを起動し、サーバの動作に関連するさまざまなパラメータと、アクティブなドライバやプラグインによって消費されるパラメータを受け取ります。
1. [Extension](./extensions) (`driver` と `plugin`) サブコマンドは、Appiumのドライバとプラグインの管理を支援します。
