---
title: サーバCLIの引数
---

# サーバCLIの引数

<!-- To start the Appium server, you may either run `appium` or `appium server`. The `server` subcommandis considered to be the default, so if you omit it, Appium will interpret this as your request to run the Appium server. (You could run different subcommands, like `appium driver` or `appium plugin`: see the [Extensions CLI](./extensions.md) for more info). -->
Appium サーバを起動するには、`appium` または `appium server` のどちらかを実行します。`server`サブコマンドはデフォルトとされているため、省略した場合はAppiumがAppiumサーバの起動を要求していると解釈されます。(`appium driver` や `appium plugin` など、別のサブコマンドを実行もできます。詳しくは [拡張CLI](./extensions.md) を参照してください)

<!-- The invocation of `appium` (or `appium server`) takes a number of arguments, which are detailed below. -->
`appium` (または `appium server`) の起動には、いくつかの引数を取りますが、その詳細は以下の通りです。

<!-- !!! note -->

<!-- All of these arguments can be set via a [Configuration File](../guides/config.md) instead if you want. Any arguments set on the command line will override any arguments found in a configuration file. -->

!!! note
    これらの引数はすべて、[Settings API](../guides/config.md) を使って設定できます。"コマンドラインで設定された引数は、設定ファイルにある引数より優先"されます

<!-- WARNING: anything between the AUTOGEN-START and AUTOGEN-STOP tags will get replaced by
automatic docs generation tooling! Do not edit by hand! -->
<!-- 警告: AUTOGEN-STARTタグとAUTOGEN-STOPタグの間にあるものは、自動文書生成ツールに置き換えられます。
自動文書生成ツールによって置き換えられます！手作業で編集しないでください！-->
<!-- AUTOGEN-START -->
<!-- |Argument|Description|Type|Default|Aliases|
|--|--|--|--|--|
|`--address`|IP address to listen on|string|`0.0.0.0`|`-a`|
|`--allow-cors`|Whether the Appium server should allow web browser connections from any host|boolean|`false`||
|`--allow-insecure`|Set which insecure features are allowed to run in this server's sessions. Features are defined on a driver level; see documentation for more details. Note that features defined via "deny-insecure" will be disabled, even if also listed here. If string, a path to a text file containing policy or a comma-delimited list.|array<string>|`[]`||
|`--base-path`|Base path to use as the prefix for all webdriver routes running on the server|string|`""`|`-pa`|
|`--callback-address`|Callback IP address (default: same as "address")|string||`-ca`|
|`--callback-port`|Callback port (default: same as "port") (Value must be between `1` and `65535`)|integer|`4723`|`-cp`|
|`--debug-log-spacing`|Add exaggerated spacing in logs to help with visual inspection|boolean|`false`||
|`--default-capabilities`|Set the default desired capabilities, which will be set on each session unless overridden by received capabilities. If a string, a path to a JSON file containing the capabilities, or raw JSON.|object||`-dc`|
|`--deny-insecure`|Set which insecure features are not allowed to run in this server's sessions. Features are defined on a driver level; see documentation for more details. Features listed here will not be enabled even if also listed in "allow-insecure", and even if "relaxed-security" is enabled. If string, a path to a text file containing policy or a comma-delimited list.|array<string>|`[]`||
|`--driver`|Driver-specific configuration. Keys should correspond to driver package names|object|||
|`--keep-alive-timeout`|Number of seconds the Appium server should apply as both the keep-alive timeout and the connection timeout for all requests. A value of 0 disables the timeout.|integer|`600`|`-ka`|
|`--local-timezone`|Use local timezone for timestamps|boolean|`false`||
|`--log`|Also send log output to this file|string||`-g`|
|`--log-filters`|One or more log filtering rules|array|||
|`--log-level`|Log level (console[:file]) (Value must be one of: `info`, `info:debug`, `info:info`, `info:warn`, `info:error`, `warn`, `warn:debug`, `warn:info`, `warn:warn`, `warn:error`, `error`, `error:debug`, `error:info`, `error:warn`, `error:error`, `debug`, `debug:debug`, `debug:info`, `debug:warn`, `debug:error`)|string|`debug`||
|`--log-no-colors`|Do not use color in console output|boolean|`false`||
|`--log-timestamp`|Show timestamps in console output|boolean|`false`||
|`--long-stacktrace`|Add long stack traces to log entries. Recommended for debugging only.|boolean|`false`||
|`--no-perms-check`|Do not check that needed files are readable and/or writable|boolean|`false`||
|`--nodeconfig`|Path to configuration JSON file to register Appium as a node with Selenium Grid 3; otherwise the configuration itself|object|||
|`--plugin`|Plugin-specific configuration. Keys should correspond to plugin package names|object|||
|`--port`|Port to listen on (Value must be between `1` and `65535`)|integer|`4723`|`-p`|
|`--relaxed-security`|Disable additional security checks, so it is possible to use some advanced features, provided by drivers supporting this option. Only enable it if all the clients are in the trusted network and it's not the case if a client could potentially break out of the session sandbox. Specific features can be overridden by using "deny-insecure"|boolean|`false`||
|`--session-override`|Enables session override (clobbering)|boolean|`false`||
|`--strict-caps`|Cause sessions to fail if desired caps are sent in that Appium does not recognize as valid for the selected device|boolean|`false`||
|`--tmp`|Absolute path to directory Appium can use to manage temp files. Defaults to C:\Windows\Temp on Windows and /tmp otherwise.|string|||
|`--trace-dir`|Absolute path to directory Appium can use to save iOS instrument traces; defaults to <tmp>/appium-instruments|string|||
|`--use-drivers`|A list of drivers to activate. By default, all installed drivers will be activated.|array<string>|`[]`||
|`--use-plugins`|A list of plugins to activate. To activate all plugins, the value should be an array with a single item "all".|array<string>|`[]`||
|`--webhook`|Also send log output to this http listener|string||`-G`| -->
<!-- AUTOGEN-STOP -->
|引数|説明|タイプ|デフォルト|エイリアス(別名)|
|--|--|--|--|--|
|`--address`|待機するIPアドレス|string|`0.0.0.0`|`-a`|
|`--allow-cors`|Appium サーバが任意のホストからの Web ブラウザ接続を許可するかどうか|boolean|`false`||
|`--allow-insecure`|このセッションでどの安全でない機能の実行を許可するかを設定します。詳細は[文書](../guides/security.md)を参照してください。`--deny-insecure`で定義された機能は、ここに記載されていても無効化されます。文字列の場合、ポリシーを含むテキストファイルへのパス、またはカンマで区切られたリストを使用します。|array<string>|`[]`||
|`--base-path`|サーバ上で動作する全てのウェブドライバルートのプレフィックスとして使用するベースパス|`""`|`-pa`|
|`--callback-address`|Callback IPアドレス（デフォルト："address "と同じ）|string||`-ca`|
|`--callback-port`|Callback port (default: "port" と同じ) (値は `1` から `65535` までの間でなければなりません。)|integer|`4723`|`-cp`|
|`--debug-log-spacing`|ログの間隔を拡張して視覚的に確認しやすくする|boolean|`false`||
|`--default-capabilities`|デフォルトのcapabilitiesを設定します。これは、受け取ったcapabilitiesによって上書きされない限り、各セッションで設定されます。文字列の場合、capabilitiesを含むJSONファイルへのパス、または生のJSONを指定します。|object||`-dc`|
|`--deny-insecure`|このセッションで実行することを許可しない安全でない機能を設定します。機能はドライバレベルで定義されます。詳しくは[文書](../guides/security.md)を参照してください。ここにリストアップされた機能は、"allow-insecure" にリストアップされていても、また "relaxed-security" が有効になっていても、有効になりません。文字列の場合は、ポリシーを含むテキストファイルへのパス、またはカンマで区切られたリストを使用します。|array<string>|`[]`||
|`--driver`|ドライバ固有の設定です。キーはドライバパッケージ名に対応する必要があります|object|||
|`--keep-alive-timeout`|サーバがすべてのリクエストに対してキープアライブタイムアウトと接続タイムアウトの両方を適用すべき秒数です。0を指定すると、タイムアウトを無効にします。|integer|`600`|`-ka`|
|`--local-timezone`|タイムスタンプにローカルタイムゾーンを使用する|boolean|`false`||
|`--log`|ログ出力をこのファイルにも送信する|string||`-g`|
|`--log-filters`|1つまたは複数のログフィルタリングルール|array|||
|`--log-level`|ログレベル(console[:file])(値は以下のいずれかでなければならない：`info`, `info:debug`, `info:info`, `info:warn`, `info:error`, `warn`, `warn:debug`, `warn:info`, `warn:warn`, `warn:error`, `error`, `error:debug`, `error:info`, `error:warn`, `error:error`, `debug`, `debug:debug`, `debug:info`, `debug:warn`, `debug:error`)|string|`debug`||
|`--log-no-colors`|コンソール出力に色を使用しない|boolean|`false`||
|`--log-timestamp`|コンソール出力にタイムスタンプを表示する|boolean|`false`||
|`--long-stacktrace`|ログエントリーに長いスタックトレースを追加します。デバッグ時のみ推奨|boolean|`false`||
|`--no-perms-check`|必要なファイルが読み取り可能か書き込み可能かをチェックしない|boolean|`false`||
|`--nodeconfig`|Selenium Grid 3でAppiumをノードとして登録するための設定JSONファイルへのパス; それ以外は設定そのもの|object|||
|`--plugin`|プラグイン固有の設定。キーはプラグインパッケージ名に対応する必要がある|object|||
|`--port`|待機するポート(値は `1` と `65535` である必要があります)|integer|`4723`|`-p`|
|`--relaxed-security`|追加のセキュリティチェックを無効にして、このオプションをサポートしているドライバが提供するいくつかの高度な機能を使うことができるようにします。すべてのクライアントが信頼できるネットワーク内にあり、クライアントがセッションサンドボックスから抜け出す可能性がある場合のみ、これを有効にしてください。特定の機能は、`deny-insecure`によって上書きされます。|boolean|`false`||
|`--session-override`|セッションの上書き（clobbering:不注意な上書きによるファイルの消失）を有効にする |boolean|`false`||
|`--strict-caps`|Appiumが選択したデバイスで有効であると認識しないcapabilitiesが送信された場合、セッションを失敗させる|boolean|`false`||
|`--tmp`|Appiumがテンポラリファイルを管理するために使用できるディレクトリへの絶対的なパス。Windowsの場合はC:\Windows\Temp。それ以外の場合は/tmpがデフォルト。|string|||
|`--trace-dir`|iOSのインストゥルメントトレースを保存するディレクトリの絶対パス； デフォルトは <tmp>/appium-instruments|string|||
|`--use-drivers`|有効化するドライバのリスト。デフォルトでは、インストールされているすべてのドライバがアクティブ化されます。|array<string>|`[]`||
|`--use-plugins`|アクティブにするプラグインのリスト。すべてのプラグインを有効にするには、"all"を1つの項目とする配列を指定する必要があります。|array<string>|`[]`||
|`--webhook`|ログ出力はこのhttpリスナーに送信されます。|string||`-G`|
