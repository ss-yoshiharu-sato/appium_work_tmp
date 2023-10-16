---
title: Managing Appium Drivers and Plugins
---

<!-- To do anything useful with Appium, you need to have at least one [ドライバ](../intro/drivers.md) installed, otherwise Appium won't know how to automate anything. There is an entire [Ecosystem](../ecosystem/index.md) of drivers and plugins out there! -->

Appiumで何か便利なことをするためには、少なくとも1つの[ドライバ](../intro/drivers.md)がインストールされている必要があります。ドライバやプラグインには、[エコシステム](../ecosystem/index.md)という大きな括りが存在します！

<!-- This guide helps explain how to manage these drivers and plugins. There are two basic strategies: using Appium's extension CLI interface, or managing extensions yourself in an npm-based project. -->

このガイドは、これらのドライバやプラグインを管理する方法を説明します。管理方法には基本的な2つの手段として、Appiumの拡張CLIインターフェースを使用するか、npmベースのプロジェクトで拡張機能を自分で管理するかがあります。

<!-- > Note: Alternative package managers are not supported by Appium at the time of this writing. -->

> 注：他のパッケージマネージャーは、この文書の執筆時点ではAppiumにはサポートされていません。

<!-- ## Using Appium's Extension CLI -->
## Appium の拡張機能 CLI を使用する

<!-- With Appium's [Extension CLI](../cli/extensions.md), you let Appium manage drivers and plugins for you.  You will use CLI commands to tell Appium which extensions you would like to install, update, or remove. Here's an example of how you might install a driver using the CLI: -->

Appiumの[拡張CLI](../cli/extensions.md)を使うと、Appiumのドライバやプラグインが管理できます。CLIコマンドを使って、インストール、アップデート、削除したい拡張機能をAppiumに伝えます。以下は、CLIを使用してドライバをインストールする方法の例です：

```bash
appium driver install xcuitest
```

<!-- This command will install the latest version of the [XCUITest Driver](https://github.com/appium/appium-xcuitest-driver). The 拡張CLI comes with a variety of commands and parameters; see the documentation for that command for all the specifics. -->

このコマンドは、最新バージョンの[XCUITest Driver](https://github.com/appium/appium-xcuitest-driver)をインストールします。拡張CLIにはさまざまなコマンドとパラメータが用意されています。詳細については、拡張CLIの文書を参照してください。

<!-- The all-important question when Appium is managing your extensions for you is: where are they installed? Appium manages extensions in a directory specified by the `APPIUM_HOME` environment variable. You can set that variable to anything you like, and Appium will manage its extensions there. You can therefore also use the `APPIUM_HOME` environment variable to manage different sets of extensions, for example if you want to have the same driver installed at conflicting versions: -->

Appiumが拡張機能を管理するときに重要なのは、「どこにインストールされるのか」ということです。Appiumは環境変数 `APPIUM_HOME` で指定されたディレクトリで拡張機能を管理します。この変数は自由に設定でき、Appiumはそこで拡張機能を管理します。そのため、例えば同じドライバを相反するバージョンでインストールしたい場合など、`APPIUM_HOME`環境変数を使って異なる拡張機能のセットを管理できます：

```bash
APPIUM_HOME=/path/to/home1 appium driver install xcuitest@4.11.1
APPIUM_HOME=/path/to/home2 appium driver install xcuitest@4.11.2
```

<!-- Running these commands will result in two separate `APPIUM_HOME` directories being created and populated with the corresponding version of the XCUITest driver. You can then use the same environment variables to direct Appium which version to use on launch: -->

これらのコマンドを実行すると、2つの別々の `APPIUM_HOME` ディレクトリが作成され、対応するバージョンのXCUITestドライバが配置されます。そして、同じ環境変数を使用して、起動時に使用するバージョンを Appium に指示できます：

```bash
APPIUM_HOME=/path/to/home1 appium  # use xcuitest driver 4.11.1
APPIUM_HOME=/path/to/home2 appium  # use xcuitest driver 4.11.2
```

<!-- You don't need to set `APPIUM_HOME` if you don't want to! By default, Appium will set `APPIUM_HOME` to the directory `.appium` in your user home directory. -->

`APPIUM_HOME`は設定したくない場合は設定する必要はありません！デフォルトでは、Appium は `APPIUM_HOME` をユーザーのホームディレクトリにある `.appium` というディレクトリに設定します。

<!-- These installed packages will be managed by `extensions.yaml` in `$APPIUM_HOME/node_modules/.cache/appium/extensions.yaml`. -->

これらのインストールされたパッケージは、`$APPIUM_HOME/node_modules/.cache/appium/extensions.yaml` にある `extensions.yaml` によって管理されます。

<!-- ## Do-It-Yourself with `npm` -->
## `npm`で自己管理

<!-- Because Appium and Appium drivers are Node.js programs, if you are integrating your Appium scripts into your own Node.js project, there is an alternative way to manage drivers and plugins: via `npm`, like any other dependency. Basically, whenever you run Appium, if you have not explicitly set `APPIUM_HOME`, it will: -->

AppiumとAppiumドライバはNode.jsプログラムなので、Appiumスクリプトを自分のNode.jsプロジェクトに統合する場合、ドライバとプラグインを管理する別の方法があります：
他の依存関係と同様に、`npm` を介し、基本的に、Appiumを実行する際に、明示的に `APPIUM_HOME` を設定していない場合、次のようになります：

<!-- 1. Try to determine whether the _current directory_ is inside an `npm` package.
1. If so, it will check whether `appium` is a dependency (dev, prod, or peer) in the project's `package.json`
1. If so, _unless you have specified `APPIUM_HOME` in your environment_, Appium will ignore load drivers and plugins defined in that `package.json` file instead. -->

1. カレントディレクトリが `npm` パッケージの中にあるかどうかを判断します。
1. もしそうなら、プロジェクトの `package.json` で `appium` が依存関係（dev、prod、peer）になっているかどうかをチェックします。
1. もしそうであれば、_あなたの環境_で `APPIUM_HOME` が指定されていない限り、Appiumは `package.json` ファイルに定義されているドライバやプラグインを無視してロードするでしょう。

<!-- This means you are freely able to add Appium drivers and plugins as regular package dependencies or dev dependencies. For example, if your project has a `package.json` which includes the following: -->

つまり、Appiumのドライバやプラグインを、通常のパッケージ依存やdev依存として自由に追加することができます。   
例えば、あなたのプロジェクトに以下のような `package.json` があるとします：

```json
{
  "devDependencies": {
    "appium": "^2.0.0",
    "appium-xcuitest-driver": "^4.11.1"
  }
}
```

<!-- Then, if you run `npx appium` inside your project, Appium will detect that it is a dependency of the project, and will load the XCUITest driver which is also listed as a dev dependency for theproject. -->

プロジェクト内で`npx appium`を実行すると、Appiumはプロジェクトの依存関係であることを検出し、プロジェクトのdev依存関係としてリストされているXCUITestドライバをロードします。

<!-- This strategy is *only* recommended if you are already using `npm` for your project. Otherwise, it is recommended that you use Appium's Extension CLI and, if necessary, adjust `APPIUM_HOME` to change the location of stored extensions. -->

この方法は、すでにプロジェクトで `npm` を使用している場合にのみ推奨されます。   
それ以外の場合は、Appiumの拡張CLIを使用し、必要に応じて `APPIUM_HOME` を調整して、保存されている拡張機能の場所を変更することが推奨されます。
