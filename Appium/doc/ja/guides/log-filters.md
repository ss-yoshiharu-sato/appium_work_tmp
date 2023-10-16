---
title: Log Filtering
---

<!-- Sometimes it might be necessary to hide sensitive information, like passwords, device identifiers, hashes, etc..., from the server log. Appium makes it possible to ensure such information is redacted in logs via the `--log-filters` command line argument. This argument allows you to provide the path to a special config file, containing one or more log obfuscation rules. -->
パスワード、デバイス識別子、ハッシュなど、機密性の高い情報をサーバログから隠す必要がある場合があります。Appiumでは、`--log-filters`コマンドライン引数により、そのような情報を確実にログに反映できます。この引数は、1つ以上のログ難読化ルールを含む特別な設定ファイルへのパスを提供することを可能にします。

<!-- ## Config Format -->
## 設定フォーマット

<!-- The filtering config must be one of: -->
フィルタリング設定には、以下のいずれかを指定します：

<!-- - a path to a valid JSON file containing an array of filtering rules
- a `log-filters` entry in an [Appium Config](./config.md) file, with the rules array inline -->
- フィルタリングルールの配列を含む有効なJSONファイルへのパス
- [Appium Config](./config.md) ファイルの `log-filters` エントリで、ルールの配列がインラインで記述されている。

<!-- Each rule is an object with a set of predefined properties. The following rule properties are supported: -->
各ルールは、事前に定義されたプロパティのセットを持つオブジェクトです。以下のルールプロパティがサポートされています：

<!-- - `pattern`: A valid JavaScript RegExp pattern to replace. Must be a valid non-empty pattern.
- `text`: A simple non-empty exact text match to replace. Either this property or the above one must be provided. `pattern` has priority over `text` if both are provided.
- `flags`: Regular expression flags for the given pattern. Supported flags are the same as for the standard JavaScript [RegExp constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags_2). Note that the `g` (global matching) flag is always enabled.
- `replacer`: The replacer value to use. By default it is `**SECURE**`. Empty values are allowed. -->
- `pattern`： 置換する有効なJavaScript RegExpパターン。空でない有効なパターンである必要があります。
- `text`： 空でない完全一致のテキストを置換する。このプロパティと上記のプロパティのどちらかを指定する必要がある。両方が指定された場合は `pattern` が `text` よりも優先されます。
- `flags`： 与えられたパターンに対する正規表現のフラグ。サポートされているフラグは、標準的な JavaScriptの[RegExp コンストラクタ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags_2)と同じです。なお、`g`(グローバルマッチング)フラグは常に有効です。
- `replacer`： 使用するリプレッサー値。デフォルトでは `**SECURE**` です。空の値も使用可能です。

<!-- ### Config Examples -->
### 設定例

<!-- Replace all occurrences of `my.magic.app` string with the default replacer: -->
`my.magic.app`の文字列をすべてデフォルトのリプレイサーに置き換える：

```json
[
    {
        "text": "my.magic.app"
    }
]
```

<!-- Replace all occurrences of `my.magic.<any char>` string with a custom replacer (case insensitive): -->
`my.magic.<any char>`の文字列を、カスタムリプレッサーで置換します（大文字小文字を区別しません）：

```json
[
    {
        "pattern": "my\\.magic\\.\\w",
        "flags": "i",
        "replacer": "***"
    }
]
```

<!-- Replace all occurrences of `my.magic.<any chars>` and/or `your.magic` strings with a custom replacer (case insensitive): -->
`my.magic.<any chars>` や `your.magic` が出現するすべての文字列を、カスタムリプレッサーで置き換える（大文字小文字を区別しない）：

```json
[
    {
        "pattern": "my\\.magic\\.\\w+",
        "flags": "i",
        "replacer": "***"
    },
    {
        "pattern": "your\\.magic",
        "flags": "i",
        "replacer": "***"
    }
]
```

<!-- Truncate all log lines to max 15 chars (advanced): -->
すべてのログ行を最大15文字に切り詰めます（上級）：

```json
[
	{
        "pattern": "(.{1,15}).*",
        "flags": "s",
        "replacer": "$1"
    }
]
```

<!-- ### Config Errors Handling -->
### 設定エラーの処理

<!-- If any of the config rules contains invalid items (such as empty/invalid pattern, empty rule, etc.) then Appium will print the detailed report about collected errors and will fail to start until these errors are addressed. -->
設定ルールに無効な項目（empty/invalid pattern、empty ruleなど）がある場合、Appiumは収集したエラーの詳細レポートを表示し、これらのエラーが解決されるまで起動に失敗します。
