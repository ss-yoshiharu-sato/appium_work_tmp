---
title: The Settings API
---

<!-- Appium has introduced a set of extension APIs that allow you to adjust parameters for a given session during session execution. Called "Settings", these parameters mirror the role of [Capabilities](./caps.md), but Capabilities cannot be adjusted once a session has started. Settings can be adjusted any number of times during the course of a session. -->
Appiumは、セッションの実行中に特定のセッションのパラメータを調整できる拡張APIセットを導入しました。"Settings"というこれらのパラメータは、[Capabilities](./caps.md)の役割を反映していますが、Capabilitiesはセッションが開始されると調整できません。Settingsは、セッションの過程で何度でも調整できます。

<!-- There are 3 important points to the concept of Settings: -->
Settingsの概念には、3つの重要なポイントがあります：

<!-- - Settings are mutable; they can be changed during a session using the Settings API
- Settings are only relevant during the session in which they are set. They are typically reset for each new session, though depending on the driver, some settings may persist between sessions.
- Settings adjust the way the appium server behaves during test automation. They don't refer to settings for the device or app under test -->
- Settingsは変更可能であり、セッション中にSettings APIを使用して変更できます。
- Settingsは変更可能で、Settings APIを使用してセッション中に変更できます。通常、新しいセッションごとにリセットされますが、ドライバによっては、セッション間でいくつかの設定が持続することがあります。
- Settingsは、テスト自動化中のappiumサーバの動作方法を調整します。テスト対象のデバイスやアプリの設定は参照しません。

<!-- An example of a setting would be the `ignoreUnimportantViews` setting recognized by the UiAutomator2 driver. The driver can be instructed to ignore lements in the view hierarchy which it deems irrelevant. Adjusting this setting to have a value of `true` can cause tests to run faster. But if you *want* to access elements which would be ignored under this setting, you could always reset it to `false` later in the session. -->
設定の例としては、UiAutomator2ドライバが認識する`ignoreUnimportantViews`設定があげられます。ドライバが無関係と判断したビュー階層のレメントを無視するように指示できます。この設定の値が `true` になるように調整すると、テストの実行が速くなることがあります。しかし、この設定で無視される要素にアクセスしたい場合は、セッションの後半でいつでも `false` にリセットできます。

<!-- Settings are implemented via the following API endpoints: -->
Settingsは、以下の API エンドポイントを介して実装されます：

<!-- | Command | Method/Route | Params | Description | Returns |
|------|--------|----------|-----|----------|
| `Update Settings` | `POST /session/:id/appium/settings` | `settings` (`Record<string, any>`) | Update setting values. The `settings` object needs to be a set of keys and values, where keys are the name of the settings and values are whatever value is documented as appropriate for that setting. | `null` |
| `Get Settings`    | `GET /session/:id/appium/settings`  |   | Return the current settings.  | `Record<string, any>` | -->

| コマンド | メソッド/ルート | パラメータ | 説明 | リターン |
|------|--------|----------|-----|----------|
| `Update Settings` | `POST /session/:id/appium/settings` | `settings` (`Record<string, any>`) | 設定値を更新する。ここで、キーは設定の名前、値はその設定に適切な値として文書化されているものである。 | `null` |
| `Get Settings`    | `GET /session/:id/appium/settings`  |   | 現在の設定を返します。 | `Record<string, any>` |

<!-- Which settings are available depends on the driver you are using. Refer to the driver's documentation for a list of supported settings. -->
どの設定が利用できるかは、使用しているドライバに依存します。サポートされている設定の一覧は、ドライバの文書を参照してください。

<!-- ## Initializing Settings via Capabilities -->
## CapabilitiesによるSettingsSettingsの初期化

<!-- When you want to start an Appium session with a setting in a certain state, you can do so by including a capability of the form `appium:settings[<name>]` with the appropriate value. So to turn on the `ignoreUnimportantViews` setting mentioned above from the very beginning of a session, you would construct a set of capabilities that includes the following in its JSON representation: -->
Appiumのセッションを、ある設定をした状態で開始したい場合、 `appium:settings[<name>]` という形式のcapabilityに、適切な値を含めることで可能です。つまり、上記の `ignoreUnimportantViews` のSettingsをセッションの最初からオンにするには、JSON表現で以下を含むcapabilityのセットを構築します：

```json
{
    "appium:settings[ignoreUnimportantViews]": true
}
```

<!-- Of course, initializing a setting via capabilities doesn't prevent you from changing it later on via the Settings API. To learn more about how to use the Settings API in the context of your specific client library, visit the documentation for that library. -->
もちろん、capabilitiesで設定を初期化しても、Settings APIで後から変更することを妨げるものではありません。特定のクライアントライブラリのContextでSettings APIを使用する方法の詳細については、そのライブラリの文書を参照してください。
