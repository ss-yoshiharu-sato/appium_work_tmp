---
title: Capabilities（機能・能力）
---

# Capabilities（機能・能力）

<!-- "Capabilities" is the name given to the set of parameters used to start an Appium session. The information in the set is used to describe what sort of "capabilities" you want your session to have, for example, a certain mobile operating system or a certain version of a device. When you start your Appium session, your Appium client will include the set of capabilities you've defined as an object in the JSON-formatted body of the request. Capabilities are represented as key-value pairs, with values allowed to be any valid JSON type, including other objects. Appium will then examine the capabilities and make sure that it can satisfy them before proceeding to start the session and return an ID representing the session to your client library. -->

"Capabilities"は、Appiumセッションを開始するために使用されるパラメータのセットに与えられた名前です。このセットの情報は、例えば、特定のモバイルオペレーティングシステムやデバイスの特定のバージョンなど、セッションにどのような「capabilities（機能・能力またはパラメータ）」を持たせたいかを記述するために使用します。Appiumセッションを開始すると、Appiumクライアントは、リクエストのJSON本体に定義したCapabilitiesのセットをオブジェクトとして含めます。capabilitiesはキーと値のペアとして表現され、値は他のオブジェクトを含む有効なJSONタイプです。Appiumは、セッションを開始し、セッションを表すIDをクライアントライブラリに返す前に、capabilitiesを調べ、それを満たすことができるかどうかを確認します。

<!-- The W3C WebDriver spec's [section on Capabilities](https://w3c.github.io/webdriver/#capabilities) identifies a small set of 10 standard capabilities, including the following: -->

W3C WebDriver仕様の[section on Capabilities](https://w3c.github.io/webdriver/#capabilities)では、以下のような10個の標準的なCapabilityの小さなセットを識別しています：

<!-- | Capability Name  | Type     | Description                                    |
|------------------|----------|------------------------------------------------|
| `browserName`    | `string` | The name of the browser to launch and automate |
| `browserVersion` | `string` | The specific version of the browser            |
| `platformName`   | `string` | The type of platform hosting the browser       | -->

| Capability名 |  タイプ   |  説明                                   |
|------------------|----------|----------------------------------------|
| `browserName`    | `string` | 起動して自動化するブラウザの名前            |
| `browserVersion` | `string` | ブラウザの具体的なバージョン                |
| `platformName`   | `string` | ブラウザをホストしているプラットフォームの種類 |

<!-- ## Appium capabilities -->
## Appiumの機能(Appium capabilities)

<!-- Appium understands these browser-focused capabilities, but introduces a number of additional capabilities. According to the WebDriver spec, any non-standard "extension capabilities" must include a namespace prefix (signifying the vendor introducing the capability), ending in a `:`. Appium's vendor prefix is `appium:`, and so any Appium-specific capabilities must include this prefix. Depending on which client you are using, the prefix may be added automatically or in conjunction with certain interfaces, but it is always a good practice to explicitly include it for clarity. -->

Appiumは、ブラウザ特化のcapabilitiesを理解していますが、いくつかの追加capabilitiesも導入しています。WebDriverの仕様によると、非標準の「拡張機能」は、名前空間の接頭辞（機能を導入する開発元を示す）を含み、最後に`:`を付ける必要があります。Appiumの開発元プレフィックスは `appium:` であり、Appium固有のcapabilityはこのプレフィックスを含む必要があります。使用しているクライアントによっては、このプレフィックスは自動的に追加されたり、特定のインターフェースに付随して追加されたりしますが、明確にするために常に明示的に追加するのが良い習慣とされます。

<!-- Here is a list of all the globally-recognized Appium capabilities. Notes: -->
以下は、グローバルに認識されているすべてのAppiumのcapabilitiesのリストです。

注意事項：

<!-- - Individual drivers and plugins can support other capabilities, so refer to their documentation for lists of extension-specific capability names.
- Some drivers might not implement support for all of these capabilities
- A few Appium extension capabilities are required to start any Appium session; these are noted below as "Required" -->

- 個々のドライバやプラグインは、他のcapabilitiesをサポートできますので、各固有のcapabilitiesの名前のリストについては、各文書を参照してください。
- ドライバによっては、これらのcapabilityのすべてのサポートを実装していない場合もあります。
- いくつかのAppium拡張capabilitiesは、Appiumのセッションを開始するために必要です; これらは"必須"として以下に記載されています。

<!-- | Capability | Type      | Required? | Description    |
|------------|-----------|-----------|----------------|
| `platformName` | `string`  | Required  | The type of platform hosting the app or browser|
| `appium:automationName`  | `string`  | Required  | The name of the Appium driver to use    |
| `browserName`  | `string`  |   | The name of the browser to launch and automate, if the driver supports web browsers as a special case     |
| `appium:app`  | `string`  |    | The path to an installable application     |
| `appium:deviceName` | `string`  |      | The name of a particular device to automate, e.g., `iPhone 14` (currently only actually useful for specifying iOS simulators, since in other situations it's typically recommended to use a specific device id via the `appium:udid` capability). |
| `appium:platformVersion`  | `string`  |           | The version of a platform, e.g., for iOS, `16.0`    |
| `appium:newCommandTimeout`  | `number`  |           | The number of seconds the Appium server should wait for clients to send commands before deciding that the client has gone away and the session should shut down    |
| `appium:noReset` | `boolean` |      | If true, instruct an Appium driver to avoid its usual reset logic during session start and cleanup (default `false`)     |
| `appium:fullReset`  | `boolean` |    | If true, instruct an Appium driver to augment its usual reset logic with additional steps to ensure maximum environmental reproducibility (default `false`)   |
| `appium:eventTimings` | `boolean` |    | If true, instruct an Appium driver to collect [Event Timings](./event-timing.md) (default `false`)      |
| `appium:printPageSourceOnFindFailure` | `boolean` |    | If true, collect the page source and print it to the Appium log whenever a request to find an element fails (default `false`)   | -->

| Capability | タイプ | 必須? | 説明 |
|------------|-----------|-----------|----------------|
| `platformName` | `string` | 必須 | アプリやブラウザをホストしているプラットフォームのタイプ
| `appium:automationName` | `string` | 必須 | 使用するAppiumドライバの名前
| `browserName` | `string` |   | ドライバが特別なケースとしてウェブブラウザをサポートする場合、起動および自動化するブラウザの名前
| `appium:app` | `string` |   | インストール可能なアプリケーションへのパス
| `appium:deviceName` | `string` |   | 自動化する特定のデバイスの名前
| `appium:platformVersion` | `string` |   | プラットフォームのバージョン
| `appium:newCommandTimeout` | `number` |   | Appiumサーバがクライアントがコマンドの待機状態になってから、クライアントがいなくなったと判断してセッションをシャットダウンするまでの秒数
| `appium:noReset` | `boolean` |   | trueの場合、セッションの開始とクリーンアップ時に通常のリセットロジックを避けるようAppiumドライバに指示
| `appium:fullReset` | `boolean` |  | trueの場合、Appiumドライバに、環境再現性を最大限に確保するための追加ステップで通常のリセットロジックを補強するように指示 (デフォルト `false`)
| `appium:eventTimings` | `boolean` | | trueの場合、Appiumドライバに[Event Timings](./event-timing.md)を収集するように指示します (デフォルト `false`)
| `appium:printPageSourceOnFindFailure` | `boolean` | | もしtrueなら、要素を見つけるためのリクエストが失敗したときに、ページソースを収集してAppiumログに出力する（デフォルトは`false`）

<!-- Some drivers place more complex constraints on capabilities as a group. For example, while the `appium:app` and `browserName` capabilities are listed above as optional, if you want to launch a session with a specific app, the XCUITest driver requires that at least one of `appium:app`, `browserName`, or `appium:bundleId` are included in the capabilities (otherwise it will not know what app to install and/or launch and will simply open a session on the home screen). Each driver will document how it interprets these capabilities and any other platform-specific requirements. -->

ドライバによっては、グループとしてのcapabilityにもっと複雑な制約をかけるものもあります。例えば、`appium:app` と `browserName` のcapabilityはオプションとして上記に記載されていますが、特定のアプリでセッションを起動したい場合、XCUITest ドライバは `appium:app`、`browserName` または `appium:bundleId` が少なくとも一つcapabilityに含まれていることを要求します（さもないとどのアプリをインストールして起動すれば良いかがわからず、単にホーム画面でセッションが開いてしまいます）。各ドライバは、これらの機能をどのように解釈するか、また、その他のプラットフォーム固有の要件について文書化します。

<!-- !!! note -->

<!-- Capabilities are like parameters used when starting a session. After the capabilities are sent and the session is started, they cannot be changed. If a driver supports updating aspects of its behaviour in the course of a session, it will provide a [Setting](./settings.md) for this purpose instead of, or in addition to, a capability. -->

!!! note
    capabilitiesは、セッションを開始するときに使用されるパラメータのようなものです。capabilitiesが送信され、セッションが開始された後は、変更できません。もしドライバがセッションの過程でその動作を更新することをサポートするならば、capabilitiesの代わりに、あるい加えて、[設定ファイル](./settings.md)を用意します。

<!-- Each Appium client has its own way of constructing capabilities and starting a session. For examples of doing this in each client library, head to the [Ecosystem](../ecosystem/index.md) page and click through to the appropriate client documentation. -->

各Appiumクライアントは、capabilitiesを構築し、セッションを開始する独自の方法を持っています。各クライアントライブラリでこれを行う例については、[エコシステム](../ecosystem/index.md)で適切なクライアント文書をご確認ください。

## `appium:options`

<!-- If you use a lot of `appium:` capabilities in your tests, it can get a little repetitive. You can combine all capabilities as an object value of a single `appium:options` capability instead, in which case you don't need to use prefixes on the capabilities inside the object. For example: -->

テストに多くの`appium:`capabilityを使用する場合、同じ接頭辞の繰り返しになることがあります。この場合、オブジェクトの中のcapabilitiesに接頭辞を付ける必要はありません。例えば、以下のようにです：

```json
{
    "platformName": "iOS",
    "appium:options": {
        "automationName": "XCUITest",
        "platformVersion": "16.0",
        "app": "/path/to/your.app",
        "deviceName": "iPhone 12",
        "noReset": true
    }
}
```

<!-- Note that constructing a capability value which is itself an object differs by language; refer to your client documentation for further examples on how to achieve this. -->

メモ: それ自体がオブジェクトであるcapability値の構築は、言語によって異なることに注意してください; これを実現する方法についての詳細な例については、クライアントの文書を参照してください。

<!-- !!! warning -->

<!-- If you include the same capabilities both inside and outside of `appium:options`, the values inside of `appium:options` take precedence. -->

!!! warning
    同じcapabilityを`appium:options`の内側と外側の両方に含めると、`appium:options`の内側の値が優先されます。

<!-- ## Always-match and first-match capabilities -->
## Always-matchとfirst-matchのcapabilities

<!-- The W3C spec allows clients to give the Appium server some flexibility in the kind of session it creates in response to a new session request. This is through the concept of "always-match" and "first-match" capabilities: -->
W3C仕様では、クライアントがAppiumサーバに対して、新しいセッションのリクエストに応答して作成するセッションの種類に柔軟性を持たせることができます。これは、"always-match"と"first-match"capabilitiesの概念によるものです：

<!-- - Always-match capabilities consist of a single set of capabilities, every member of which must be satisfied by the server in order for the new session request to proceed.
- First-match capabilities consist of an array of capability sets. Each set is merged with the always-match capabilities, and the first set that the server knows how to handle will be the set that is used to start the session. -->

- Always-match capabilitiesは、1つのcapabilitiesのセットで構成され、新しいセッション要求をするためには、サーバで要求されるすべての項目を満たす必要があります。
- First-match capabilitiesは、capabilityセットの配列で構成されまず。各セットはalways-match capabilityとマージされ、サーバが処理方法を知っている最初のセットが、セッションを開始するために使用されます。

<!-- !!! note -->

<!-- Check out the [spec itself](https://w3c.github.io/webdriver/#processing-capabilities) or a [summarized version](https://github.com/jlipps/simple-wd-spec#processing-capabilities) for a more in-depth description of how capabilities are processed. -->

!!! note
    capabilitiesがどのように処理されるかについてのより詳細な説明については、[仕様](https://w3c.github.io/webdriver/#processing-capabilities)や[要約版](https://github.com/jlipps/simple-wd-spec#processing-capabilities)を参照してください。

<!-- In practice, use of first-match capabilities is not necessary or recommended for use with Appium. Instead, we recommend that you define the explicit set of capabilities you want the Appium server to handle. These will be encoded as the always-match capabilities, and the array of first-match capabilities will be empty. -->

実際には、First-match capabilitiesの使用は、Appiumでの使用には必要なく、推奨されません。その代わりに、Appiumサーバに扱わせたい明示的なcapabilitiesのセットを定義することをお勧めします。これらはalways-match capabilityとしてエンコードされ、first-match capabilityの配列は空になります。

<!-- That being said, Appium _does_ understand always-match and first-match capabilities as defined in the W3C spec, so if you use these features, Appium will work as expected. The process of defining always-match and first-match capabilities is unique to each client library, so refer to the documentation for your client library to see examples of how it works. -->

とはいえ、AppiumはW3C仕様で定義されているalways-matchとfirst-match capabilityを理解しているので、これらの機能を使用すれば、Appiumは期待通りに動作します。always-matchとfirst-match capabilityを定義するプロセスは、各クライアントライブラリに固有なので、クライアントライブラリの文書を参照し、その動作例を確認してください。

<!-- ## Special notes for cloud providers -->
## クラウドプロバイダー向けの特別な注意事項

<!-- !!! warning -->

<!-- This section is not intended for end-users of Appium; it is intended for developers building Appium-compatible cloud services. -->

!!! warning
    このセクションはAppiumのエンドユーザーを対象としたものではなく、Appium対応のクラウドサービスを構築する開発者を対象としたものです。

<!-- When managing an Appium cloud, your users may wish to target various independent versions of Appium drivers and plugins. It is of course up to each service provider how they wish to implement the discovery, installation, and availability of any official or third party drivers or plugins. _But the Appium team makes the following recommendations in terms of the *capabilities* service providers support, for consistency across the industry._ This is a recommendation only, and not a standard, but adopting it will help users to navigate the increased complexity that working with Appium 2.0 in a cloud environment may bring. -->
Appiumのクラウドを管理する場合、ユーザーはさまざまな独立したバージョンのAppiumドライバやプラグインを使用したいと思うかもしれません。もちろん、公式またはサードパーティのドライバやプラグインの検出、インストール、および利用可能性をどのように実装するかは、各サービスプロバイダに任されています。しかし、Appiumチームは、全体の一貫性のために、サービスプロバイダーがサポートする*能力*の観点から、以下を推奨します。 これはあくまで推奨であり、標準ではありませんが、これを採用することは、クラウド環境でのAppium2.0がもたらすかもしれない複雑さの増加に対処でき、ユーザーを助けます。

<!-- ### Suggested capabilities -->
### 推奨されるcapabilities

<!-- In addition to the standard `platformName`, `appium:deviceName`, `appium:automationName`, and `appium:platformVersion`, we recommend adopting the capability `$cloud:appiumOptions`, where the label `$cloud` is not meant to be interpreted literally but instead should be replaced by your vendor prefix (so for HeadSpin it would be `headspin`, Sauce Labs it would be `sauce`, and BrowserStack it would be `browserstack`, to name just a few examples). The `$cloud:appiumOptions` capability would itself be a JSON object, with the following internal keys: -->
標準の `platformName`、`appium:deviceName`、`appium:automationName`、 `appium:platformVersion` に加えて、 `$cloud:appiumOptions` というcapabilityを採用することをお勧めします。ここで `$cloud` は文字通りではなく、開発元プレフィックスに置換える必要があります（例えば HeadSpin なら `headspin` 、Sauce Labs なら `sauce`、BrowserStackなら `browserstack` というように、いくつかの例があげられます）。`$cloud:appiumOptions`capabilityは、それ自体がJSONオブジェクトで、以下の内部キーを持ちます：

<!-- | Capability | Used for | Example |
| ---------- | ------------------ | -------------------- |
| `version`  | Designating which version of the Appium server is used to host and manage drivers. If ommitted, behavior left up to the provider, but the recommendation would be to provide the latest official version. | `2.0.0` |
| `automationVersion` | Designating which version of the specified driver should be used. | `1.55.2` |
| `automation`        | Designating a custom driver to use (see below for more info). This would override `appium:automationName` and `$cloud:automationVersion` | `{"name": "@org/custom-driver", "source": "github", "package": "custom-driver"}` |
| `plugins`  | Designating the list of plugins (and potentially versions of plugins) to be activated (see below for more info). | `["images", "universal-xml"]` | -->

| Capability | 使用用途 | 例 |
| ---------- | ------------------ | -------------------- |
| `version`  | ドライバをホストし管理するために使用されるAppiumサーバのバージョンを指定する。省略した場合、動作はプロバイダに任されますが、最新の公式バージョンを提供することが推奨されます。 | `2.0.0` |
| `automationVersion` | 指定されたドライバのどのバージョンを使用するかを指定する。 | `1.55.2` |
| `automation`        | 使用するカスタムドライバを指定する（詳細は以下を参照）。これは `appium:automationName` と `$cloud:automationVersion` を上書きすることになります | `{"name": "@org/custom-driver", "source": "github", "package": "custom-driver"}` |
| `plugins`  | 有効化するプラグイン（およびプラグインのバージョンもあり得る）のリストを指定する（詳細は以下を参照）。 | `["images", "universal-xml"]` |


<!-- ### Basic example -->
### 基本的な例

<!-- Appium extensions (drivers and plugins) have a set of properties that specify where they can be installed from. Cloud providers are obviously under no obligation to provide support for arbitrarily specified extensions, seeing as these may represent untrusted code running in a managed environment. In the case where arbitrary extensions are not supported, the `appium:automationName`, `$cloud:automationVersion`, and `$cloud:appiumPlugins` capabilities should be sufficient. See the following JSON object representing capabilities for a session: -->
Appiumの拡張機能（ドライバとプラグイン）には、どこからインストールできるかを指定するプロパティセットがあります。クラウドプロバイダーに、任意に指定された拡張機能のサポートを提供する義務はありません。なぜなら、これらは管理された環境で動作する信頼できないコードであるからです。任意の拡張機能がサポートされていない場合、`appium:automationName`, `$cloud:automationVersion`, `$cloud:appiumPlugins`capabilityで十分であるはずです。セッションのcapabilityを表す以下の JSONオブジェクトを参照してください：

```json
{
  "platformName": "iOS",
  "appium:platformVersion": "14.4",
  "appium:deviceName": "iPhone 11",
  "appium:app": "Some-App.app.zip",
  "appium:automationName": "XCUITest",
  "$cloud:appiumOptions": {
    "version": "2.0.0",
    "automationVersion": "3.52.0",
    "plugins": ["images"]
  }
}
```

<!-- This set of capabilities requests an Appium 2+ server supporting the XCUITest driver at version `3.52.0`, and the `images` plugin active. This set is easy for a cloud provider to verify. The cloud provider can obviously do anything it wants in response to these capabilities, including downloading Appium and driver and plugin packages on the fly, or erroring out if the versions requested are not in a supported set, or if the plugin is not supported, etc... -->
このセットでは、XCUITestドライバのバージョン`3.52.0`をサポートし、`images`プラグインが有効な Appium 2+ サーバを要求します。
このセットは、クラウドプロバイダーが簡単に確認できます。
当然ながらクラウドプロバイダーは、これらのcapabilityに対応して、何でもできます。 
Appiumやドライバ、プラグインパッケージをその場でダウンロードすることも可能です・ 
または、要求されたバージョンがサポートされているセットに含まれていない場合はエラーにする、 
あるいはプラグインがサポートされていない場合も、エラーにする、 
などなど...。

<!-- ### Basic example with `appium:options` -->
### `appium:options`を使った基本的な例

<!-- The previous example still looks a bit disorganized, so of course we also recommend that cloud providers support the `appium:options` capability as detailed above, which could turn the previous set of capabilities into the following: -->
先ほどの例では、まだ少し乱雑な印象があります、 
ですので、クラウドプロバイダーは `appium:options`capabilityをサポートすることをお勧めします、 
このようにすると、先ほどの一連のケイパビリティを次のようにできます：

```json
{
  "platformName": "iOS",
  "appium:options": {
    "platformVersion": "14.4",
    "deviceName": "iPhone 11",
    "app": "Some-App.app.zip",
    "automationName": "XCUITest"
  },
  "$cloud:appiumOptions": {
    "version": "2.0.0",
    "automationVersion": "3.52.0",
    "plugins": ["images"]
  }
}
```

<!-- ### Extension objects -->
### 拡張オブジェクト（Extension objects）

<!-- Some service providers may wish to dynamically allow access to all of the features of the Appium 2.0 CLI, including downloading arbitrary drivers and plugins. To represent these extensions, we can define special JSON "extension objects", with the following keys: -->
サービスプロバイダによっては、任意のドライバやプラグインのダウンロードを含め、Appium 2.0 CLIのすべての機能へのアクセスを動的に許可したい場合があります。このような拡張を実現するために、以下のキーを持つ特別なJSON"拡張オブジェクト"を定義できます：

<!-- - `name`: the name of the extension. This would be an NPM package name (if downloading from NPM), or a git or GitHub spec (if downloading from a git server or GitHub).
- `version`: the version of the extension, e.g., the NPM package version or Git SHA.
- (optional) `source`: a denotation of where the extension can be downloaded from. Recommended to support the following values: `appium`, `npm`, `git`, `github`. Here, `appium` means "Appium's own official list", and should be the default value if this key is not included.
- (optional) `package`: when downloading extensions from git or github, the NPM package name of the extension must also be provided. This is optional for non-git sources. -->
- `name`: 拡張機能の名前です。これはNPMパッケージ名(NPM からダウンロードする場合)か、gitまたはGitHubの仕様(gitサーバやGitHubからダウンロードする場合)です。
- `version`: 拡張機能のバージョン、例えばNPMパッケージのバージョンやGit SHAなど。
- (optional)`source`: 拡張機能をどこからダウンロードできるかを表します。以下の値をサポートすることを推奨します： `appium`、`npm`、`git`、`github` (
`appium`は「Appium独自の公式リスト」を意味し、このキーが含まれていない場合はデフォルト値となります)
- (optional)`package`: gitやgithubから拡張機能をダウンロードする場合、拡張機能のNPMパッケージ名も指定する必要があります。git以外のソースの場合は省略可能です。

<!-- Since each session is handled by a single driver, the `$cloud:appiumOptions`/`$automation` capability could be used with an extension object value to denote this driver, for example: -->
各セッションは1つのドライバで処理されるので、`$cloud:appiumOptions`/`$automation`capabilityは、このドライバを示す拡張オブジェクトの値とともに、例えば次のように使用できます：

```json
{
    "$cloud:appiumOptions": {
        "automation": {
            "name": "git+https://some-git-host.com/custom-driver-project.git",
            "version": "some-git-sha",
            "source": "git",
            "package": "driver-npm-package-name"
        }
    }
}
```

<!-- And since sessions can handle multiple plugins, each value in the list of `$cloud:appiumPlugins` could also be an extension object rather than a string, so that specific versions could be requested: -->
また、セッションは複数のプラグインを扱えるので、`$cloud:appiumPlugins`のリストの各値も文字列ではなく、拡張オブジェクトにすることで、特定のバージョンを要求できます：

```json
{
    "$cloud:appiumOptions": {
        "plugins": [{
            "name": "images",
            "version": "1.1.0"
        }, {
            "name": "my-github-org/my-custom-plugin",
            "version": "a83f2e",
            "source": "github",
            "package": "custom-plugin"
        }]
    }
}
```

<!-- These serve as illustrative examples for the recommendations here. Of course it is up to the service providers to implement the handling of these capabilities at their front end / load balancer, to perform any error checking, or to actually run any of the `appium driver` or `appium plugin` CLI commands that support the end user's request. This section is merely a suggestion as to how service providers might design their user-facing capabilities API in a way which in principle supports all of the capabilities Appium itself would provide to the end user if they were running Appium on their own. -->
以上、推奨事項を説明するための例です。もちろん、フロントエンドやロードバランサーでこれらのcapabilitiesを実装したり、エラーチェックを行ったり、エンドユーザーのリクエストをサポートする `appium driver` や `appium plugin` のCLIコマンドを実際に実行するのはサービスプロバイダー次第です。このセクションは、サービスプロバイダが、Appiumを自分自身で実行している場合、Appium自体がエンドユーザーに提供するすべてのcapabilitiesを原則的にサポートする方法で、ユーザー向けのcapabilities APIを設計する方法としての単なる提案です。
