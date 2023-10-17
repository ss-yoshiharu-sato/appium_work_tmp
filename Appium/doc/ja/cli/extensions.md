---
title: 拡張CLI
---

# 拡張CLI

<!-- Appium allows for the flexible installation and management of _drivers_ (which provide Appium with the capability to automate a given platform) and *plugins* (which can augment or alter the way individual Appium commands work). For a conceptual understanding of these entities, please review the [Introduction](../intro/index.md). Management of drivers and plugins is handled by Appium's 拡張CLI. -->
Appiumでは、_drivers_ (与えられたプラットフォームを自動化する機能を Appium に提供する) と *plugins* (個々のAppiumコマンドの動作方法を補強または変更できる) を柔軟にインストールおよび管理できます。これらの概念を理解するために、[導入] (../intro/index.md) をご覧ください。ドライバとプラグインの管理は、Appiumの拡張CLIによって処理されます。

<!-- !!! note -->
<!-- This reference uses placeholders to refer to various options. Anywhere you see one of these placeholders in the reference, ensure you replace it with the correct type of actual content. -->
!!! note
    このリファレンスでは、さまざまなオプションを参照するために代用語（placeholder）を使用しています。リファレンス内でこれらの代用語のいずれかが表示される場合は、実際のコンテンツの正しい語句に置き換えてください。

|代用語|意味|
|--|--|
|`<ext-type>`|「拡張機能タイプ」です。これは `driver` または `plugin` のどちらかであるべきです。すべての拡張CLIコマンドはドライバまたはプラグインで使用できます。|
|`<ext-name>`|"拡張機能名"（Extension name）。これは、`appium <ext-type> list` の呼び出しで見つかった拡張機能の短い名前です。これは、拡張機能の NPM パッケージ名や、一般的に拡張機能の "インストール仕様" とは異なるものです。|
|`<install-spec>`|"インストール仕様"（Install specification）。これは、Appiumがインストールすべき拡張機能を示すために使用される文字列です。|
|`<install-source>`|Appiumが拡張機能をインストールするために使用するメソッドです。|

<!-- ## Commands -->
## コマンド

<!-- All Extension CLI commands begin with `appium <ext-type>`, i.e., either `appium driver` or `appium plugin`. -->
すべての拡張CLIコマンドは `appium <ext-type>` で始まり、`appium driver` または `appium plugin` のどちらかになります。

<!-- All Extension CLI commands can take an optional `--json` argument, which will return the result of the command as a machine-readable JSON string rather than the standard output, which is colourized and tuned for human consumption. -->
すべての 拡張CLI コマンドは、オプションで `--json` 引数を取ることができます。この引数は、コマンドの結果を、標準出力ではなく、機械が読めるJSON文字列として返します。

### `list`

<!-- List installed and available extensions. "Available" extensions include those which are officially recognized by the Appium team, but you are not limited to installing only the extensions displayed in this list. -->
インストールされている拡張機能と利用可能な拡張機能を一覧表示します。"利用可能"な拡張機能には、Appiumチームが公式に認めているものが含まれますが、このリストに表示されている拡張機能のみをインストールするように制限されるわけではありません

<!-- Usage: -->
使用方法：

```
appium <ext-type> list [--installed] [--updates] [--json]
```

<!-- Required arguments: -->
必須引数：

- `<ext-type>`: must be `driver` or `plugin`

<!-- Optional arguments: -->
オプションの引数：

<!-- - `--installed`: show only installed extensions, not installed plus available extensions
- `--updates`: for extensions installed via NPM, display a message if there are any updates
- `--json`: return the result in JSON format -->

- `--installed`: インストールされている拡張機能のみを表示し、インストールされていない拡張機能と利用可能な拡張機能は表示しない。
- `--updates`: NPMを介してインストールされた拡張機能の場合、更新があった場合にメッセージを表示します。
- `--json`: 結果をJSONフォーマットで返します。

### `install`

<!-- Install an extension. If successful, respond with the short name of the extension which can be used in other invocations of the 拡張CLI. If the extension is a driver, also note which platforms may be used with the driver. -->
拡張機能をインストールします。成功した場合は、拡張CLI を呼び出す際に使用できる拡張機能のショートネームを返します。ドライバの場合は、そのドライバで使用可能なプラットフォームも記載します。

<!-- Usage: -->
使用方法：

```
appium <ext-type> install <install-spec> [--source=<install-source>] \
                                         [--package=<package-name>] \
                                         [--json]
```

<!-- Required arguments: -->
必須引数：

<!-- - `<ext-type>`: must be `driver` or `plugin`
- `<install-spec>`: this is the name, location, and/or version of the extension you want to install. Its possible values are dependent on the `<install-source>` (see below). -->

- `<ext-type>`: `driver`または`plugin`でなければならない。
- `<install-spec>`: インストールしたい拡張機能の名前、場所、バージョンです。可能な値は `<install-source>` に依存します（下記参照）。

<!-- Optional arguments: -->
オプションの引数：

<!-- - `--source`: this directs Appium where to find your extension. See below for a table of possible source types and corresponding install specification.
- `--package`: when `<install-source>` is `git` or `github`, `--package` is required. It should be the Node.js package name of the extension. Without this information, Appium will not be able to find the installed package.
- `--json`: return the result in JSON format -->

- `--source`: Appiumにインストールする拡張機能の場所を示します。可能なソースの種類と対応するインストール仕様の表は以下を参照してください。
- `--package`:`<install-source>` が `git` または `github` の場合、`--package` が必要です。拡張機能名が、Node.jsパッケージ名である必要があります。この情報がないと、Appiumはインストールされたパッケージを見つけることができません。
- `--json`: 結果をJSON形式で返します。

<!-- |Install source type|Behaviour|
|--|--|
|None|This is the default behaviour when no `--source` is used. In this case, Appium will look at `<install-spec>` and match it against the name of extensions available when running `appium <ext-type> list`, i.e., against the officially recognized extension names. If found, it will install that extension at the latest version via NPM|
|`npm`|Install an extension based on its NPM package name. Here, `<install-spec>` must be the NPM package name with any additional NPM installation modifiers, like version (see below)|
|`github`|Install an extension via a GitHub spec of the form `<org>/<repo>`|
|`git`|Install an extension via a Git URL (e.g., `git+ssh://git-host.com/repo.git`)|
|`local`|Install an extension via a local path. This must be a path to the directory where the Node.js package information for the driver is located.| -->

|識別子|行動|
|--|--|
|（省略）|これは `--source` が使用されていない場合のデフォルトの動作です。この場合、Appiumは `<install-spec>` を見て、`appium <ext-type> list` を実行したときに利用できる拡張機能名、つまり公式に認識されている拡張機能名と照合することです。もし見つかったら、NPMを経由してその拡張機能を最新バージョンでインストールします。|
|`npm`|NPM パッケージ名に準拠して拡張機能をインストールします。ここで、`<install-spec>` は NPM パッケージ名と、バージョン (下記参照) のような追加のNPMインストール修飾子でなければなりません|
|`github`|GitHub specの `<org>/<repo>` という形式を使って拡張機能をインストールします|
|`git`|Git URL (例: `git+ssh://git-host.com/repo.git`) を使用して拡張機能をインストールする。|
|`local`|ローカルパスでエクステンションをインストールします。これは、ドライバのNode.jsパッケージ情報があるディレクトリへのパスでなければなりません。|

<!-- #### NPM-based `<install-spec>` -->
#### NPMベースの `<install-spec>`

<!-- When Appium is installing an extension via NPM (as is the case when `--source` is either omitted or set to `npm`), the `<install-spec>` can be complex, and can include any kind of information allowed by `npm install`: -->
Appium が NPM 経由で拡張機能をインストールする場合 (`--source` が省略されているか `npm` に設定されている場合)、`<install-spec>` は複雑になり、`npm install`で許可されたあらゆる情報を含むことができます：

- `[@scope]/<name>`
- `[@scope]/<name>@<version>`
- `[@scope]/<name>@<tag>`
- `[@scope]/<name>@<version range>`

<!-- #### Examples -->
#### 例

<!-- - Install the latest XCUITest driver: -->
- 最新のXCUITestドライバをインストールします:

```
appium driver install xcuitest
```

<!-- - Install the XCUITest driver at version 4.11.1: -->
- バージョン4.11.1のXCUITestドライバをインストールします:

```
appium driver install xcuitest@4.11.1
```

<!-- - Install the `beta` version of the `@appium/fake-driver` from NPM: -->
- NPMから `@appium/fake-driver` の `beta` バージョンをインストールします:

```
appium driver install --source=npm @appium/fake-driver@beta
```

<!-- - Install a locally-developed plugin: -->
- ローカルで開発されたプラグインをインストールします:

```
appium plugin install --source=local /path/to/my/plugin
```

### `update`

<!-- Update one or more extensions that have been installed via NPM. By default, Appium will not automatically update any extension that has a revision in its major version, so as to prevent unintended breaking changes. -->
NPM経由でインストールされた1つまたは複数の拡張機能を更新します。デフォルトでは、Appium はメジャーバージョンにリビジョンがある拡張機能を自動的にアップデートしないようになっており、意図しない破壊的変更を防ぐことができます。

<!-- Usage: -->
使用方法：

```
appium <ext-type> update <ext-name> [--unsafe] [--json]
```

<!-- Required arguments: -->
必須引数：

<!-- - `<ext-type>`: must be `driver` or `plugin`
- `<ext-name>`: the name of the extension to update, or the string `installed` (which will update all installed extensions) -->

- `<ext-type>`: 必ず `driver` または `plugin` とします。
- `<ext-name>`: 更新する拡張機能の名前、または文字列 `installed` (インストールされているすべての拡張機能を更新します)

<!-- Optional arguments: -->
オプションの引数：

<!-- - `--unsafe`: direct Appium to go ahead and update passed a major version boundary
- `--json`: return the result in JSON format -->

- `--unsafe`: Appiumのメジャーバージョンの境界を越えてアップデートを行うように指示します。
- `--json`: 結果をJSON形式で返します。

### `uninstall`

<!-- Remove an installed extension. -->
インストールされている拡張機能を削除します。

<!-- Usage: -->
使用方法：

```
appium <ext-type> uninstall <ext-name> [--json]
```

<!-- Required arguments: -->
必須引数：

<!-- - `<ext-type>`: must be `driver` or `plugin`
- `<ext-name>`: the name of the extension to uninstall -->

- `<ext-type>`: 必ず `driver` または `plugin` とします。
- `<ext-name>`: アンインストールする拡張機能の名前です。

<!-- Optional arguments: -->
オプションの引数

<!-- - `--json`: return the result in JSON format -->
- `--json`: 結果をJSON形式で返します。

### `run`

<!-- Run a script included in an extension package. Extension authors can include runnable scripts that assist with setup or perform other tasks. These scripts are given names (called the `<script-name>` in this reference) by extension authors and will generally be documented in extension documentation. -->
拡張機能パッケージに含まれるスクリプトを実行します。拡張機能の作者は、セットアップを支援したり、その他のタスクを実行するための実行可能なスクリプトを含めることができます。これらのスクリプトは、拡張機能の作者によって名前(このリファレンスでは `<script-name>` と呼ばれます)が与えられ、一般的には拡張機能の文書に記載されます。

<!-- Usage: -->
使用方法：

```
appium <ext-type> run <ext-name> [--json] <script-name> [script-args]
```

<!-- Required arguments: -->
必須引数：

<!-- - `<ext-type>`: must be `driver` or `plugin`
- `<ext-name>`: the name of the extension whose script you want to run
- `<script-name>`: the name of the script the extension has published -->

- `<ext-type>`: 必ず `driver` または `plugin` とします。
- `<ext-name>`: スクリプトを実行したい拡張機能の名前。
- `<script-name>`: その拡張機能が公開しているスクリプトの名前。

<!-- Optional arguments: -->
オプションの引数

<!-- * `script-args`: any arguments that Appium does not interpret as belonging to its own set of arguments will be passed along to the extension script
- `--json`: return the result in JSON format -->

* `script-args`: Appiumが自身の引数セットに属すると解釈しない引数は、拡張スクリプトに渡されます。
- `--json`: 結果をJSON形式で返します。

<!-- Example (run the `reset` script included with the UiAutomator2 driver): -->
例（UiAutomator2ドライバに含まれる`reset`スクリプトを実行する）：

```
appium driver run uiautomator2 reset
```
