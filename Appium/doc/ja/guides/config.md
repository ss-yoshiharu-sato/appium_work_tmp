---
title: The Appium Config File
---

<!-- Instead of passing arguments on the command line to Appium, you may add them to a special config file. Appium will read values from this config file when it runs. (Please note that CLI arguments have _precedence_ over configuration files; if a value is set in a config file _and_ via CLI argument, the CLI argument is preferred.) -->
Appiumにコマンドラインで引数を渡す代わりに、特別なconfigファイルで引数を渡せます。Appiumは実行時にこのconfigファイルから値を読み取ります。(CLI引数は設定ファイルより優先されることに注意してください; 設定ファイルに設定された値とCLI引数の両方がある場合、CLI引数の方が優先されます)

<!-- ## Supported Config File Formats -->
## サポートされる設定ファイルの形式

<!-- You can store your config data in the following kinds of files: -->
設定データは、以下の種類のファイルに保存できます：

- JSON
- YAML
- JS (JSオブジェクトをエクスポートしたJavaScriptファイル)
- CJS (上記と同じ。拡張子は共通JS)

<!-- !!! warning -->

<!-- Note: Configuration files in ESM format are not currently supported. -->

!!! warning
    注：ESM形式のコンフィグファイルは現在サポートされていません。

<!-- ## Supported Config File Locations -->
## サポートされるコンフィグファイルの場所

<!-- Configuration files can be named anything, but the following filenames will be automatically discovered and loaded by Appium: -->
設定ファイルの名前は何でも良いですが、以下のファイル名はAppiumによって自動的に検出され、読み込まれます：

- `.appiumrc.json` (推奨)
- `.appiumrc.yaml`
- `.appiumrc.yml`
- `.appiumrc.js`
- `.appiumrc.cjs`
- `appium.config.js`
- `appium.config.cjs`
- `.appiumrc` (これはJSONとみなされます)

<!-- Further, _if your project uses Node.js,_ you can use store the configuration inside an `appium` property in your `package.json` and it will be automatically discovered. -->
また、Node.jsを使用している場合は、`package.json`の`appium`プロパティに設定を格納することで、自動的に検出されるようにできます。

<!-- ### Config File Search -->
### 設定ファイルの検索

<!-- Appium will search _up_ the directory tree from the current working directory for one of these files. If it reaches the current user's home directory or filesystem root, it will stop looking. -->
Appiumは、現在の作業ディレクトリからディレクトリツリーを検索して、これらのファイルのいずれかを探します。もし、現在のユーザのホームディレクトリやファイルシステムのルートに到達した場合は、検索を停止します

<!-- To specify a _custom_ location for your config file, use `appium --config-file /path/to/config/file`. -->
設定ファイルの場所をカスタムで指定するには、`appium --config-file /path/to/config/file` を使用します。

<!-- #### Configuration File Format -->
#### 設定ファイルの形式

<!-- First, you might want to look at some examples: -->
まず、いくつかの例を見てみましょう：

- [Appium Configuration - JSON](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.json)
- [Appium Configuration - YAML](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.yaml)
- [Appium Configuration - JS](https://github.com/appium/appium/blob/master/packages/appium/sample-code/appium.config.sample.js)

<!-- A description of the format is available, as well: -->
フォーマットの説明も公開されています：

- [Appium Configuration File JSON Schema](https://github.com/appium/appium/blob/master/packages/schema/lib/appium-config.schema.json)
- [TypeScript declarations for Appium Configuration](https://github.com/appium/appium/blob/master/packages/types/lib/config.ts)

<!-- To describe in words, the config file will have a root `server` property, and all arguments are child properties. For certain properties which must be supplied on the command-line as comma-delimited lists, JSON strings, and/or external filepaths, these instead will be of their "native" type. For example, `--use-plugins <value>` needs `<value>` to be comma-delimited string or path to a delimited file. However, the config file just wants an array, e.g.,: -->
言葉で説明すると、設定ファイルにはルートの `server` プロパティがあり、すべての引数は子プロパティです。コマンドラインでカンマ区切りリスト、JSON文字列、外部ファイルパスとして提供されなければならない特定のプロパティについては、「ネイティブ」タイプです。例えば、`--use-plugins <value>` は `<value>` をカンマ区切りの文字列または区切りファイルへのパスとする必要があります。   
設定ファイルでは、例えば、以下のような配列が必要です：

```json
{
  "server": {
    "use-plugins": ["my-plugin", "some-other-plugin"]
  }
}
```

<!-- ## Configuring extensions (drivers and plugins) -->
## 拡張機能（ドライバとプラグイン）の設定

<!-- For `driver`-and-`plugin`-specific configuration, these live under the `server.driver` and `server.plugin` properties, respectively. Each driver or plugin will have its own named property, and the values of any specific configuration it provides are under this. 
For example: -->
`ドライバ`と`プラグイン`に固有の設定は、それぞれ `server.driver` と `server.plugin` プロパティの下にあります。各ドライバやプラグインはそれぞれ名前のついたプロパティを持ち、そのプロパティが提供する特定の設定の値は、そのプロパティの下にあります。

例えば:

```json
{
  "server": {
    "driver": {
      "xcuitest": {
        "webkit-debug-proxy-port": 5400
      }
    }
  }
}
```

<!-- !!! note -->

<!-- The above configuration corresponds to the `--driver-xcuitest-webkit-debug-proxy-port` CLI argument. -->
!!! note
    上記の設定は、CLI引数の `--driver-xcuitest-webkit-debug-proxy-port` に対応します。

<!-- All properties are case-sensitive and will be in [kebab-case](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words). For example, `callback-port` is allowed, but `callbackPort` is not. -->
すべてのプロパティは大文字と小文字を区別し、[kebab-case(ケバブケース)](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words)という命名規則で表示されます。例えば、`callback-port`は許可されますが、`callbackPort`は許可されません。
