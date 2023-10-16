---
title: Appium Server Security
---

<!-- The Appium team makes every effort to ensure the security of the Appium server. This is especially important when Appium is run in a multitenant environment, or when multiple users are running sessions on the same Appium server. In general, you can only safely enable all Appium's features if all the following are true: -->
Appiumチームは、Appiumサーバのセキュリティを確保するためにあらゆる努力を行っています。これは、Appiumがマルチテナント環境で実行されている場合、または複数のユーザーが同じAppiumサーバ上でセッションを実行している場合に特に重要です。一般的に、Appiumのすべての機能を安全に有効にできるのは、次のすべてが当てはまる場合のみです：

<!-- - You're running your own Appium server locally or within a protected internal network
- You're not sharing it with any untrusted parties
- You don't expose Appium's port(s) to the wider internet -->
- ローカルまたは保護された内部ネットワーク内で自分自身のAppiumサーバを実行している。
- 信頼できない相手と共有しない
- Appiumのポートを広くインターネットに公開していない。

<!-- But because many Appium users might not be able to guarantee such a safe environment, the Appium team puts many features behind a security protection mechanism which forces system admins (the people that are in charge of starting the Appium server) to _explicitly opt-in_ to these features. (Third-party driver and plugin authors can also [hide behaviour behind security flags](../ecosystem/build-drivers.md).) -->
しかし、多くのAppiumユーザーがこのような安全な環境を保証できないかもしれないので、Appiumチームは多くの機能をセキュリティ保護機構の背後に置き、システム管理者（Appiumサーバの起動を担当する人）にこれらの機能へのオプトインを明示的に強制しています。(サードパーティのドライバやプラグインの作者も、[セキュリティフラグの後ろに動作を隠す](../ecosystem/build-drivers.md)ことができます).

<!-- For security reasons, Appium client sessions can _not_ request feature enablement via capabilities; this is the responsibility of the server admin who configures and launches the Appium server. -->
セキュリティ上の理由から、Appiumクライアントセッションは、capabilitiesを介して機能の有効化を要求できません; これは、Appiumサーバを設定し起動するサーバ管理者の責任です。

<!-- ## Security Server Args -->
## セキュリティサーバの引数

<!-- The [Server CLI Args](../cli/args.md) doc outlines three relevant arguments which may be passed to Appium when starting it from the command line: -->
[サーバCLIの引数](../cli/args.md)では、コマンドラインからAppiumを起動する際に渡すことができる3つの関連引数の概要を説明しています：

<!-- |Parameter|Description|
|----|----|
|`--relaxed-security`|Setting this flag turns on _all_ insecure features (unless blocked by `--deny-insecure`; see below)|
|`--allow-insecure`|Setting this flag to a comma-separated list of feature names or a path to a file containing a feature list (each name on a separate line) will allow _only_ the features listed. For example, `--allow-insecure=adb_shell` will cause _only_ the ADB shell execution feature to be enabled. This is true _unless_ `--relaxed-security` is also used, in which case all features will still be enabled. It makes no sense to combine this flag with `--relaxed-security`.|
|`--deny-insecure`|This flag can likewise be set to a comma-separated list of feature names, or a path to a feature file. Any features listed here will be _disabled_, regardless of whether `--relaxed-security` is set and regardless of whether the names are also listed with `--allow-insecure`.| -->

|パラメータ|説明|
|----|----|
|`--relaxed-security`|このフラグを設定すると、(`--deny-insecure`によってブロックされない限り)すべて（の_安全でない_機能含む）が有効になります; 詳しくは下記を参照してください。|
|`--allow-insecure`|このフラグにカンマで区切られた機能名のリスト、ファイルへのパス（各名が別々の行にある）を設定すると、明示された機能のみを許可します。例えば、`--allow-insecure=adb_shell`とすると、ADBシェル実行機能を有効にします。このフラグは（すべての機能を有効にする）`--relaxed-security`と組み合わせても意味がありません。|
|`--deny-insecure`|このフラグには、同様にカンマで区切られた機能名のリスト、ファイルへのパスを設定できます。ここにリストアップされた機能は、`--relaxed-security`が設定されているかどうかや、`--allow-insecure`と一緒にリストアップされているかどうかに関わらず、_無効_です。|

<!-- ## Insecure Features -->
## 安全でない機能

<!-- Each Appium driver is responsible for its own security, and can create its own feature names. Thus you should read through the documentation for a particular driver to know which feature names it might use. Here is an incomplete list of examples from some of Appium's official drivers: -->
各Appiumドライバは独自にセキュリティの責任を持ち、独自の機能名を作成できます。そのため、特定のドライバがどのような機能名を使用するかは、そのドライバの文書を読んで確認する必要があります。以下は、Appiumの公式ドライバのいくつかの例で、不完全なリストです：

<!-- |Feature Name|Description|Supported Extension(s)|
|------------|-----------|-------|
|`get_server_logs`|Allows retrieving of Appium server logs via the Webdriver log interface|IOS, XCUITest, Android, UiAutomator2, Espresso|
|`adb_shell`|Allows execution of arbitrary shell commands via ADB, using the `mobile: shell` command|Android, UiAutomator2, Espresso|
|`record_audio`|Allow recording of host machine audio inputs|XCUITest|
|`execute_driver_script`| Allows to send a request which has multiple Appium commands.|Execute Driver Plugin| -->

|機能名|説明|サポートされる拡張機能(s)|
|------------|-----------|-------|
|`get_server_logs`|Webdriver log interface経由でAppiumサーバのログを取得できる|IOS、XCUITest、Android、UiAutomator2、Espresso|
|`adb_shell`|`mobile: shell`コマンドを使用して、ADB経由で任意のシェルコマンドを実行できる|Android, UiAutomator2, Espresso|
|`record_audio`|ホストマシンの音声入力を録音できるようにする|XCUITest|
|`execute_driver_script`|複数のAppiumコマンドを持つリクエストを送信できるようにする。|Execute Driver Plugin|

<!-- ## Examples -->
## 例

<!-- To turn on the `get_server_logs` feature for my Appium server, I could start it like this: -->
Appiumサーバの `get_server_logs` 機能をオンにするには、次のように起動します：

```bash
appium --allow-insecure=get_server_logs
```

<!-- To turn on multiple features: -->
複数の機能をオンにする場合：

```bash
appium --allow-insecure=get_server_logs,record_audio
```

<!-- To allow all features except one: -->
1つの機能を除いてすべての機能を許可するには、次のようにします：

```bash
appium --relaxed-security --deny-insecure=adb_shell
```
