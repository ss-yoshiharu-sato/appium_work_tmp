---
title: Context（文脈・状況）API
---

# Context（文脈・状況）API

<!-- A common feature of many app platforms is the ability for developers to embed web content inside of the platform-native app frame. This allows developers to leverage web technologies or existing web content for some or all of the app functionality. However, the additional complexity of mixing "modes" within a single application can make it difficult for automation tools that are designed to target the "native" elements and behaviours. -->
多くのアプリプラットフォームの共通機能として、開発者はプラットフォームネイティブのアプリフレームの中にウェブコンテンツを埋め込むことができます。これにより、開発者はアプリの機能の一部または全部にウェブ技術や既存のウェブコンテンツを活用できます。しかし、1つのアプリケーション内で「モード」を混在させるという複雑さが加わることで、「ネイティブ」な要素や動作をターゲットに設計された自動化ツールでは対応が難しくなることがあります。

<!-- Appium provides a set of APIs for working with different app modes, called "contexts", that Appium drivers can implement if they support automation commands in these different modes. There are three basic commands that Appium has added to the W3C WebDriver spec for this purpose: -->
Appiumは、「Context」という異なるアプリモードを扱うためのAPIセットを提供しており、ドライバがこれらの異なるモードでの自動化コマンドをサポートする場合に実装できます。そのために、AppiumがW3C WebDriver仕様に追加した基本的なコマンドは3つあります：

| コマンド名 | メソッド/ルート | パラメータ | 説明 | 戻り値 |
|----|----|----|----|----|
| `Get Contexts` | `GET /session/:id/contexts` |    | 利用可能なContextのリストを取得する  | `array<string>` |
| `Get Current Context` | `GET /session/:id/context`  |    | アクティブなContextの名前を取得する | `string` |
| `Set Context` | `POST /session/:id/context` | `name` (`string`) | 与えられた `name` を持つContextに切り替える | `null`  |

<!-- This API is flexible enough to handle a variety of semantic interpretations on the part of the driver. For example, the XCUITest driver includes two kinds of contexts: the native app context and any active webviews, as one context per webview. A call to `Get Contexts` will return the list of names, which you as a test author can sift through and use to switch into the appropriate context. As another example, the [Appium Altunity Plugin](https://github.com/headspinio/appium-altunity-plugin) introduces the concept of a `UNITY` context, which encapsulates all the plugin's specific behaviour to ensure that when outside of the `UNITY` context, the active driver's usual command implementations are used. -->

このAPIは、ドライバ側のさまざまな意味解釈を扱うのに十分な柔軟性を持っています。例えば、XCUITestドライバは、ネイティブアプリのContextとアクティブなウェブビューの2種類のContextを含み、ウェブビューごとに1つのContextとして使用します。`Get Contexts`を呼び出すと、名前のリストが返され、テスト作成者はそれを見て、適切なContextに切り替えることができます。別の例として、[Appium Altunity Plugin](https://github.com/headspinio/appium-altunity-plugin) は`UNITY`Contextという概念を導入しています。このContextはプラグイン特有の動作をすべてカプセル化し、`UNITY`Context以外の場所ではアクティブドライバの通常のコマンド実装が使用されるようにします。

<!-- It is important to note that a call to `Get Contexts` will always contain at least one context, conventionally but not necessarily named `NATIVE_APP`. This is the default active context. -->
重要なことは、`Get Contexts`を呼び出すと、必ず少なくとも1つのContextが含まれるということです（従来は`NATIVE_APP`という名前でしたが、必ずしもそうとは限りません）。これはデフォルトのアクティブなContextです。

<!-- Depending on the type of context you're in, the operation of the driver might change. The XCUITest driver, when targeting a webview context, will not run its typical routines for finding and interacting with elements. Instead, it will run a different set of routines appropriate to web elements. This might have a variety of consequences, like supporting a different set of locator strategies. -->
どのようなContextにいるかによって、ドライバの動作は変わるかもしれません。XCUITestドライバは、ウェブビューContextをターゲットにした場合、要素を見つけ、操作するための典型的なルーチンを実行しません。代わりに、Web要素に適した別のルーチンが実行されます。これは、ロケーター戦略の異なるセットをサポートするなど、さまざまな結果をもたらす可能性があります。

<!-- The command names in the table above are generic references to the commands and not code examples. For examples of how to access the Context API in the language-specific client libraries, please visit the documentation for a given library. -->
上表のコマンド名は、コマンドの一般的な参照であり、コードの例ではありません。言語固有のクライアントライブラリでContext APIにアクセスする方法の例については、各ライブラリの文書を参照してください。
