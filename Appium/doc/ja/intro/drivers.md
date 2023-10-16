---
title: Intro to Appium Drivers
---

<!-- As the [main Overview](index.md) makes clear, "drivers" are basically Appium's answer to the
question, "how do we support automation of multiple, unrelated platforms?" In this doc we'll get
into a little more detail about how drivers work. The specific details of how drivers work probably
don't matter too much for you, unless you're planning on writing your own driver or contributing to
an existing driver (things we hope you do!). -->

[Appiumの概要](index.md)が明らかにしているように、「ドライバ」は基本的に "複数の無関係なプラットフォームの自動化をどのようにサポートするか？" という課題に対する Appiumの答えです。この文書では、ドライバがどのように機能するかについて、もう少し詳しく説明します。ドライバがどのように動作するかの具体的な詳細は、あなたが独自のドライバを書いたり、既存のドライバに貢献することを計画していない限り、おそらくあまり重要ではありません（ただ、私たちはあなたがそうすることを望んでいます！）。

<!-- The main benefit in understanding a bit more of how drivers work is that being aware of the typical
complexity or the typical driver architecture will inform your debugging process when you
inevitably run into an issue in one of your tests. -->

ドライバがどのように動作するかを理解することの主な利点は、典型的な複雑さや典型的なドライバのアーキテクチャを認識しておくことで、テスト中にバグや動作不良に遭遇したときのデバッグに役立つことです。

<!-- ## Interface Implementations -->
## インターフェースの実装

<!-- At the most basic level, drivers are simply Node.js classes that extend a special class included in
Appium, called `BaseDriver`. You could have something very close to a "working" driver, with these
very simple lines of code: -->

最も基本的なレベルでは、ドライバは単にNode.jsのクラスで、Appiumに含まれる`BaseDriver`という特別なクラスを拡張しています。   
以下のような非常にシンプルなコードで、「動く」ドライバに近いものを作ることができます：

```js
import BaseDriver from '@appium/base-driver'

class MyNewDriver extends BaseDriver {
}
```

<!-- This empty driver doesn't *do* anything, but you could wrap it up in a Node.js module, add a few
Appium-related fields to the module's manifest (`package.json`), and then install it using `appium
driver install`. -->

この空のドライバは何もしませんが、Node.jsモジュールにラップして、モジュールのマニフェスト（`package.json`）にAppium関連のフィールドを追加し、シェルから`appium driver install`でインストールできます。

<!-- So, from a technical perspective, an Appium driver is just a bit of code that inherits from some
other Appium code. That's it! Now, inheriting from `BaseDriver` actually gives us a lot, because
`BaseDriver` is essentially an encapsulation of the entire WebDriver protocol. So all a driver
needs to do to do something useful is to *implement* Node.js methods with names corresponding to
their WebDriver protocol equivalents. -->

つまり、技術的な観点から見ると、Appiumドライバは、他のAppiumのコードを継承するコードに過ぎないのです。それだけです！ `BaseDriver`を継承することで、実際には多くのことができます。というのも、`BaseDriver`は本質的にWebDriverプロトコル全体をカプセル化したものだからです。つまり、ドライバが何か役に立つことをするために必要なのは、WebDriverプロトコルに対応する名前を持つNode.jsメソッドを*実装*することだけです。

<!-- So let's say I wanted to do something with this empty driver; first I have to decide which
WebDriver command I want to implement. For our example, let's take the [Navigate
To](https://www.w3.org/TR/webdriver1/#navigate-to) WebDriver command. Leave aside for the moment
what I want to have the driver *do* when this command is executed. To tell Appium the driver can
handle the command, all we have to do is define a method like this in our driver class:[^1] -->

とりあえず、この空のドライバで 何か をしたいとします。まず、どのWebDriverコマンドを実装したいかを決定しなければなりません。この例では、[Navigate To](https://www.w3.org/TR/webdriver1/#navigate-to)WebDriverコマンドを取り上げます。このコマンドで、ドライバに何をさせたいかはひとまず置いておいてください。Appiumにこのコマンドを扱えることを伝えるには、ドライバクラスに次のようなメソッドを定義すればよいのです[^1]。

```js
async setUrl(url) {
    // do whatever we want here
}
```

<!-- [^1]: You might notice that `setUrl` doesn't look anything like `Navigate To`, so how did we know
  to use it rather than some other random string? Well, Appium's WebDriver-protocol-to-method-name
  mapping is defined in a special file within the `@appium/base-driver` package called
  [routes.js](https://github.com/appium/appium/blob/2.0/packages/base-driver/lib/protocol/routes.js).
  So if you're writing a driver, this is where you would go to figure out what method names to use
  and what parameters to expect. Or you could look at the source for any of the main Appium
  drivers! -->

[^1]: `setUrl`が `Navigate To` のように見えないことにお気づきかもしれませんが、他のランダムな文字列ではなく、どうやってこれを使用することを知ったのでしょうか？Appium の WebDriver プロトコルからメソッド名へのマッピングは、 `@appium/base-driver` パッケージの中の [routes.js](https://github.com/appium/appium/blob/2.0/packages/base-driver/lib/protocol/routes.js) という特別なファイルで定義されています。ですから、もしあなたがドライバを書くのであれば、どのようなメソッド名を使い、どのようなパラメータが必要かを知るために、このファイルを参照することです。あるいは、他の主要なAppiumドライバのソースを見ることもできます！

<!-- That's it! How we actually implement the command is totally up to us, and depends on the
platform(s) we want to support. Here are some different example implementations of this command for
different platforms: -->

以上です！このコマンドを実際にどのように実装するかは、完全に私たち次第であり、サポートしたいプラットフォームに依存します。
以下は、このコマンドをさまざまなプラットフォームで実装した例です：

<!-- - Browsers: execute some JavaScript to set `window.location.href`
- iOS apps: launch an app using a deep link
- Android apps: launch an app using a deep link
- React apps: load a specific route
- Unity: go to a named scene -->

- ブラウザ：JavaScriptを実行し、設定する `window.location.href`
- iOSアプリ：ディープリンクを使用してアプリを起動する
- Androidアプリ：ディープリンクを使ってアプリを起動する
- Reactアプリ：特定のルートを読み込む
- Unity：名前のついたシーンに移動する

<!-- So you can see there can be a lot of differences between how drivers implement the same WebDriver
command across platforms.[^2] What is the *same*, though, is how they express that they can handle
a protocol command. -->

このように、プラットフォームによって、同じWebDriverコマンドを実装するドライバには多くの違いがあることがわかります[^2] しかし共通するのは、プロトコルコマンドで処理できることをどのように表現するかということです。

<!-- [^2]: Of course, we want to keep the semantics as similar as possible, but in the world of iOS, for
  example, launching an app via a deep link (a URL with a special app-specific scheme) is about as
  close as we are going to get to navigating to a web URL. -->

[^2]: もちろん、可能な限り言葉の意味は同じにしたいのですが、例えばiOSの世界では、ディープリンク（アプリ専用の特別なスキームを持つURL）を使ってアプリを起動することは、WebのURLにナビゲートするのとほぼ同じことです。

<!-- We're going into this great amount of detail (which you don't need to remember, by the way),
because it's important to stress the point that an Appium driver is not inherently anything in
particular, other than a bit of JS code that can handle WebDriver protocol commands. Where you go
from there is up to you, the driver author! -->

以上のように非常に多くの詳細を説明しました（ですが、覚えておく必要はありません）、というのも、Appiumドライバは、WebDriver仕様の命令を処理できるJSコードなだけで、本質は特別なものではない、という点が重要だからです。そこからどのように展開していくかは、ドライバの作者であるあなた次第です！

<!-- ## Automation mapping -->
## 自動化対応（Automation mapping）

<!-- But *typically* what driver authors want to do is to provide automation behaviours for a given
platform(s) that are semantically very similar to the the WebDriver spec implementations for
browsers. When you want to find an element, you should get a reference to a UI element. When you
want to click or tap that element, the resulting behaviour should be the same as if a person were
to click or tap on the element. And so on. -->

しかし、*典型的な*ドライバ作者がしたいことは、ブラウザのためのWebDriver仕様の実装と意味的に非常に似ています。与えられたプラットフォーム（複数でも可）の動作の自動化手段を提供することです。ある要素を見つけたいとき、UI要素への参照を得るべきです。その要素をクリックしたりタップしたりすると、人がその要素をクリックしたりタップしたりしたのと同じような挙動になるはずです…などなど。

<!-- So the real challenge for driver authors is not how to work with the WebDriver protocol (because
`BaseDriver` encapsulates all that for you), but how to make the actual automation happen on the
target platform. Every driver relies on its own set of underlying technologies here. As mentioned
in the [Overview](index.md), the iOS driver uses an Apple technology called
[XCUITest](https://developer.apple.com/documentation/xctest/xcuielement). These underlying
automation technologies usually have proprietary or idiosyncratic APIs of their own. Writing
a driver becomes the task of mapping the WebDriver protocol to this underlying API (or sometimes
a set of different underlying APIs--for example, the UiAutomator2 driver relies not only on the
[UiAutomator2](https://developer.Android.com/training/testing/other-components/ui-automator)
technology from Google, but also functions only available through
[ADB](https://developer.Android.com/studio/command-line/adb), as well as functions only available
via the Android SDK inside a helper app). Tying it all together into a single, usable, WebDriver
interface is the incredibly useful (but incredibly challenging) art of driver development! -->

つまり、ドライバ作者の本当の課題は、WebDriverプロトコルをどのように扱うかではなく（`BaseDriver`がすべてをカプセル化してくれるから）、対象プラットフォームで実際の自動化を実現する方法です。すべてのドライバは、独自の基礎技術のセットに依存しています。[Appiumの全体像](index.md)で述べたように、iOSドライバは[XCUITest](https://developer.apple.com/documentation/xctest/xcuielement)というAppleの技術を使用しています。基礎となる自動化技術は、通常、独自または特異なAPIを持っています。ドライバの作成は、WebDriverプロトコルをこのAPI（時には、異なるAPIのセット--例えば、UiAutomator2ドライバは、Googleの[UiAutomator2](https://developer.Android.com/training/testing/other-components/ui-automator) 技術に依存するだけではなく、[ADB](https://developer.Android.com/studio/command-line/adb) を通してのみ利用できる機能、および、補助アプリ内のAndroid SDKを通してのみ利用できる機能もあります）に適合させる作業です。これらを1つの使いやすいWebDriverインターフェースにまとめることが、ドライバ開発の非常に便利な（しかし非常に難しい）開発の醍醐味です！

## 複数階層構造（Multi-level architecture）

<!-- In practice, this often results in a pretty complex architecture. Let's take iOS for example again.
The XCUITest framework (the one used by the Appium driver) expects code that calls it to be written
in Objective-C or Swift. Furthermore, XCUITest code can only be run in a special mode triggered by
Xcode (and directly or indirectly, the Xcode command line tools). In other words, there's no
straightforward way to go from a Node.js function implementation (like `setUrl()` above) to
XCUITest API calls. -->

実際のところ、結果として、かなり複雑なアーキテクチャになることがよくあります。再びiOSを例にとって考えてみましょう。XCUITestフレームワーク（Appiumドライバで使用されるもの）は、それを呼び出すコードがObjective-CまたはSwiftで書かれていることが前提です。さらに、XCUITestのコードは、Xcode（および直接または間接的にXcodeのコマンドラインツール）によってトリガーされる特別なモードでのみ実行できます。つまり、Node.jsの関数実装（上記の`setUrl()`のような）からXCUITestのAPIコールに移行するための直接的な方法はありません。

<!-- What the XCUITest driver authors have done is instead to split the driver into two parts: one part
written in Node.js (the part which is incorporated into Appium and which initially handles the
WebDriver commands), and the other part written in Objective-C (the part which actually gets run on
an iOS device and makes XCUITest API calls). This makes interfacing with XCUITest possible, but
introduces the new problem of coordination between the two parts. -->

XCUITestドライバの作者が行ったのは、ドライバを2つの部分に分けることです：1つはNode.jsで書かれた部分（Appiumに組み込まれ、最初にWebDriverコマンドを処理する部分）、 もう一つはObjective-Cで書かれた部分（iOSデバイス上で実際に実行され、XCUITest APIを呼び出す部分）です。これにより、XCUITestとの連動が可能です。 しかし、2つの部分の間の調整という新しい課題が発生します。

<!-- The driver authors could have chosen any of a number of very different strategies to model the
communication between the Node.js side and the Objective-C side, but at the end of the day decided
to use ... the WebDriver protocol! That's right, the Objective-C side of the XCUITest driver is
itself a WebDriver implementation, called
[WebDriverAgent](https://github.com/appium/webdriveragent).[^3] -->

ドライバの作者は、Node.js側とObjective-C側の間の通信をモデル化するために、非常に多くの選択肢がありましたが、最終的に、WebDriverプロトコルを採用することにしました。そう！XCUITestドライバのObjective-C側は、[WebDriverAgent](https://github.com/appium/webdriveragent)というWebDriverの実装そのものなのです[^3]。

<!-- [^3]: You could in theory, therefore, point your WebDriver client straight to WebDriverAgent and
  bypass Appium entirely. This is usually not convenient, however, for a few reasons: -->

[^3]: したがって理論的には、WebDriverクライアントを直接WebDriverAgentに向け、Appiumを完全にバイパスすることも可能です。ですがいくつかの理由から、一般的には便利ではありません：

  <!-- - The Appium XCUITest driver builds and manages WebDriverAgent for you, which can be a pain and
    involves the use of Xcode.
  - The XCUITest driver does lots more than what can be done by WebDriverAgent, for example working
    with simulators or devices, installing apps, and the like. -->

- Appium XCUITestドライバは、WebDriverAgentをビルドして管理するため、Xcodeを使用する必要があり、面倒な場合があります。
- XCUITestドライバは、シミュレータやデバイスとの連携、アプリのインストールなど、WebDriverAgentでできること以上のことをたくさんやってくれます。

<!-- The moral of the story is that driver architectures can become quite complicated and multilayered,
due to the nature of the problem we're trying to solve. It also means it can be difficult sometimes
to tell where in this chain of technologies something has gone wrong, if you run into a problem
with a particular test. With the XCUITest world again, we have something like the following set of
technologies all in play at the same time: -->

要するに、解決しようとする問題の性質上、ドライバのアーキテクチャは非常に複雑で多層的なものになりうるということです。また、特定のテストで問題が発生した場合、この一連の技術のどこで問題が発生したのかを判断するのが難しい場合があるということです。XCUITestの世界では、次のような技術が同時に存在しています：

<!-- - Your test code (in its programming language) - owned by you
- The Appium client library - owned by Appium
- The Selenium client library - owned by Selenium
- The network (local or Internet)
- The Appium server - owned by Appium
- The Appium XCUITest driver - owned by Appium
- WebDriverAgent - owned by Appium
- Xcode - owned by Apple
- XCUITest - owned by Apple
- iOS itself - owned by Apple
- macOS (where Xcode and iOS simulators run) - owned by Apple

It's a pretty deep stack! -->

- あなたのテストコード（プログラミング言語） - あなたに帰属
- Appiumクライアントライブラリ - Appiumに帰属
- Seleniumクライアントライブラリ - Seleniumに帰属
- ネットワーク（ローカルまたはインターネット）
- Appiumサーバ - Appiumに帰属
- Appium XCUITestドライバ - Appiumに帰属有
- WebDriverAgent（ウェブドライバエージェント） - Appiumに帰属
- Xcode - Appleに帰属
- XCUITest - Appleに帰属
- iOS本体 - Appleに帰属
- macOS (XcodeとiOSのシミュレータが動作する場所) - Appleに帰属

かなり深いスタックですね！

## 代理応答モード（Proxy mode）

<!-- There's one other important architectural aspect of drivers to understand. It can be exemplified
again by the XCUITest driver. Recall that we just discussed how the two "halves" of the XCUITest
driver both speak the WebDriver protocol---the Node.js half clicks right into Appium's WebDriver
server, and the Objective-c half (WebDriverAgent) is its own WebDriver implementation. -->

ドライバには、もうひとつ理解すべき重要なアーキテクチャの要素があります。またしても、XCUITestドライバを例にしましょう。XCUITestドライバにある2つの各機能が、両方ともWebDriverプロトコルを話すことは説明しました。―― Node.jsの部分は、AppiumのWebDriverサーバに直接接続します。そして、Objective-cの部分（WebDriverAgent）は、それ自体がWebDriverの実装となっています。

<!-- This opens up the possibility of Appium taking a shortcut in certain cases. Let's imagine that the
XCUITest driver needs to implement the `Click Element` command. The internal code of this
implementation would look something like taking the appropriate parameters and constructing an HTTP
request to the WebDriverAgent server. In this case, we're basically just reconstructing the
client's original call to the Appium server![^4] So there's really no need to even write a function
implementing the `Click Element` command. Instead, the XCUITest driver can just let Appium know
that this command should be proxied directly to some other WebDriver server. -->

これは、特定のケースでAppiumがショートカットをする可能性をもたらします。例えば、XCUITestドライバが`Click Element`コマンドを実装する必要があるとしましょう。この実装の内部コードは、適切なパラメータを取り、WebDriverAgentサーバへのHTTPリクエストを構築するようなものです。この場合、基本的にはクライアントがAppiumサーバに対して行った元の呼び出しを再構築しているだけです！[^4] なので、`Click Element`コマンドを実装した関数を書く必要すらありませんでした。その代わりに、XCUITestドライバは、このコマンドが他のWebDriverサーバに直接プロキシされるべきであることをAppiumに知らせるだけでよいのです。

<!-- [^4]: It's not *exactly* the same call, because the Appium server and the WebDriverAgent server
  will generate different session IDs, but these differences will be handled transparently. -->

[^4]: AppiumサーバとWebDriverAgentサーバが異なるセッションIDを生成するため、*正確に*同じ呼び出しではありません。は異なるセッションIDを生成しますが、これらの違いは透過的に処理されるからです。

<!-- If you're not familiar with the concept of "proxying," in this case it just means that the XCUITest
driver will not be involved at all in handling the command. Instead it will merely be repackaged
and forwarded to WebDriverAgent at the protocol level, and WebDriverAgent's response will likewise
be passed back directly to the client, without any XCUITest driver code seeing it or modifying it. -->

プロキシという概念になじみがない方もいらっしゃると思いますが、この場合、XCUITestドライバはコマンドの処理に全く関与しないことを意味します。その代わり、コマンドは再パッケージ化され、プロトコル・レベルでWebDriverAgentに転送されます、そして、WebDriverAgentのレスポンスも同様に、クライアントに直接返されます、WebDriverAgentのレスポンスも同様に、XCUITestドライバコードがそれを見たり変更したりすることなく、直接クライアントに返されます。

<!-- This architectural pattern provides a nice bonus for driver authors who choose to deal with the
WebDriver protocol everywhere, rather than constructing bespoke protocols. It also means that
Appium can create wrapper drivers for any other existing WebDriver implementation very easily. If
you look at the [Appium Safari driver](https://github.com/appium/appium-safari-driver) code, for
example, you'll see that it implements basically no standard commands, because all of these are
proxied directly to an underlying SafariDriver process. -->

このアーキテクチャパターンは、すべての場所でWebDriverプロトコルを扱うことを選択したドライバ作者にとって、嬉しい特典です。また、Appiumが他の既存のWebDriver実装のラッパードライバを非常に簡単に作成できることを意味します。例えば、[Appium Safari driver](https://github.com/appium/appium-safari-driver) のコードを見てみると、基本的に標準的なコマンドを実装していないことがわかります。なぜなら、これらのすべてが基礎となるSafariDriverプロセスに直接代理（proxied）されるからです。

<!-- It's important to understand that this proxying business is sometimes happening under the hood,
because if you're ever diving into some open source driver code trying to figure out where
a command is implemented, you might be surprised to find no implementation at all in the Node.js
driver code itself! In that case, you'll need to figure out where commands are being proxied to so
you can look there for the appropriate implementation. -->

この代理処理(proxying business)は、時々裏側で起こっていることを理解することが重要です。 なぜなら、オープンソースのドライバコードに潜り込んで、あるコマンドがどこに実装されているかを調べようとすると、Node.jsのドライバコード自体に全く実装がないことに驚くかもしれません！その場合、コマンドがどこにプロキシされているのかを把握し、適切な実装を探せるようにする必要があります。

<!-- OK, that's enough for this very detailed introduction to drivers! -->

さて、ドライバに関する非常に詳しい説明はこれくらいにしておきます！
