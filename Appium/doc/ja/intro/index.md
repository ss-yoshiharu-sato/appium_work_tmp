---
title: Intro to Appium
---

# Appiumの概要

<!---
As mentioned on the main page, Appium is an open-source project and ecosystem of related software,
designed to facilitate UI automation of many app platforms. With the release of Appium 2.0, Appium
has the following primary goals:[^1]
- Make platform-specific automation capabilities available under a cross-platform, standard API
- Allow easy access to this API from any programming language
- Provide tools to enable convenient community development of Appium extensions
--->

[Appiumの文書/はじめに](../index.md)で述べたように、Appiumはオープンソースのプロジェクトであり、関連ソフトウェアを含むエコシステムです、 多くのアプリプラットフォームのUI自動化を促進するために設計されています。Appium 2.0のリリースにより、Appiumは次のような主要目標を掲げています[^1]

- プラットフォーム固有の自動化機能を、クロスプラットフォームな標準APIで利用できるようにする。
- あらゆるプログラミング言語から、そのAPIに簡単にアクセスできるようにする。
- Appiumの拡張機能をコミュニティで簡単に開発できるようにするためのツールを提供する。

<!---
[^1]:
    To meet these primary goals, we also work with a set of secondary goals or methodology
    principles, which we also encourage for Appium extension developers:

    - As far as possible, rely on (and contribute to) open source technology
    - As far as possible, rely on vendor-provided tools for a given platform
    - As far as possible, rely on automation tools that allow automation of unmodified apps (prefer
      not to require the user to build in additional SDKs or software that introduce discrepancies
      between the test version of the app and the production version)
    - As far as possible, rely on existing standards instead of creating new ones
--->

[^1]: これらの主要な目標を達成するために、われわれは一連の二次的な目標または方法論の原則に基づく開発を、Appium拡張機能の開発者にも推奨しています：

    - できる限り、オープンソース技術に準拠する（そして貢献する）。
    - できる限り、指定されたプラットフォームの開発元提供者が提供するツールに頼る。
    - できる限り、アプリの修正を伴わずに自動化を可能にする自動化ツールを提供する（ユーザーがビルドインする必要がないことが望ましい。アプリのテストバージョンとの間に不一致が生じるようなSDKやソフトウェアをユーザーが追加で組み込む必要はありません。アプリのテストバージョンと本番バージョンの間に矛盾が生じるような、追加のSDKやソフトウェアの組み込みをユーザーに要求しないことが望ましいです。）
    - できる限り、新しい標準を作成するのではなく、既存の標準に準拠する。

<!---
So, take any app platform you know about, like iOS or Android. Appium wants for there to be a way
for developers and testers to write UI automation code for that platform, according to a single,
unified API. 
--->

というわけで、Appiumは、iOSやAndroidなど、皆さんご存じのアプリのプラットフォームで、開発者とテスト担当者が、そのプラットフォームのためにUI自動化コードを書くために単一で統一されたAPIに従って書けるようにしたいと考えています。

<!-- Based on Appium's goals, we have a lot of questions to answer to make it all work: -->

私たちの目標に基づき、目標を達成するためには、多くの疑問に答えなければなりません：

<!---
- Which API should that "single, unified" API be?
- How do we map that API to automation behaviour for a specific platform?
- How do we make that API accessible via multiple popular programming languages?
--->

- 「単一で統一された」APIはとは何か？
- APIを特定のプラットフォームの動作の自動化にどのように対応させるか？
- APIを複数の一般的なプログラミング言語からアクセスできるようにするにはどうすればいいか？

<!---
There's another, larger, question lurking in the background here too, given that there are more app
platforms out there than just iOS and Android: -->

この背景には、iOSとAndroid以外にもアプリのプラットフォームがあることを考えると、もう一つ大きな課題が潜んでいることがわかります。：

<!-- - How do we enable automation for *all* the platforms? -->

- どのようにすれば、*すべての*プラットフォームで自動化を実現できるのか？

<!-- Exploring Appium's answers to these questions may not be the quickest way to learn what Appium is,
but it is certainly a good one! So let's dive in. -->

これらの質問に対する Appiumの答え を探究することは、Appiumとは何か を知るための最短の方法ではないかもしれません、しかし、良い方法であることは間違いありません！
さあ、飛び込んでみましょう。

<!-- ## Appium's choice of API -->
## Appiumが選んだAPI

<!-- Appium is very fortunate to have been preceded by a technology which has been a long-standing
pioneer in the field of UI automation, namely [Selenium](https://seleniumhq.org). The goal of the
Selenium project has been to support UI automation of web browsers, and in this way we can think of
it as occupying a subset of Appium's goals. Along the way, Selenium (and, after they merged,
another project called WebDriver) developed a relatively stable API for browser automation. -->

Appiumにとって、UI自動化の分野で先駆者として活躍してきた技術の、[Selenium](https://seleniumhq.org)が先に開発されたことは非常に幸運でした。Seleniumプロジェクトの目標は、WebブラウザのUI自動化のサポートで、Appiumの目標の一部を占めていると考えられます。その結果、Selenium（合併後はWebDriverという別のプロジェクト）は、ブラウザテストの自動化用の比較的安定したAPIを開発しました。

<!-- Over the years, Selenium worked with various web browser vendors and the [W3C](https://w3c.org)
standards group to turn its API into an official web browser standard, called the [WebDriver
specification](https://w3c.github.io/webdriver/webdriver-spec.html). All the main browsers now
implement automation capabilities inline with the WebDriver spec, without the Selenium team having
to maintain any software that performs actual automation; standards for the win! -->

長年にわたり、SeleniumはいろいろなWebブラウザ開発元や[W3C](https://w3c.org)標準化団体と協力して、APIを[WebDriver仕様](https://w3c.github.io/webdriver/webdriver-spec.html)という公式のWebブラウザ標準に変換しました。主要なブラウザは現在、WebDriver仕様に沿った自動化機能を実装しており、Seleniumチームは自動化を実行するソフトウェアを保守する必要がありません; 標準しか勝たん！

<!-- Appium's initial goals were to develop an automation standard for mobile apps (iOS and Android). We
could have made up something new, but in the spirit of joining forces and keeping standards, well,
standard, we decided to adopt the WebDriver spec as Appium's API.[^2] While user interaction on
websites and in mobile native apps are not entirely identical (with even greater differences once
we start to consider, for example, TV platforms controlled by simple remotes), the fact is that
most software UIs are pretty much the same. This means that the WebDriver spec provides automation
API primitives (finding elements, interacting with elements, loading pages or screens, etc...) that
more or less map to any platform. -->

Appiumの最初の目標は、モバイルアプリ（iOSとAndroid）の自動化標準を開発することでした。新しいものを作ることもできましたが、できる限り標準に準拠するという考えから、AppiumのAPIとしてWebDriver仕様を採用することにしました[^2] WebサイトとモバイルネイティブアプリのUIは完全に同じではありませんが（例えば、シンプルなリモコンで制御するテレビプラットフォームを考えるとさらに違いが大きくなります）、ほとんどのソフトウェアのUIはほぼ同じであるという事実があります。これは、WebDriver仕様が、どのプラットフォームにも対応する自動化APIの原型（要素の検索、要素との対話、ページまたは画面の読み込み、など）を提供できることを意味します。

<!-- [^2]: Technically, when Appium was first written, we were dealing with something older than the
  WebDriver spec, called the JSON Wire Protocol. Since then, Appium continued to evolve along with
  the W3C spec and is fully W3C-compliant. -->

[^2]: 技術的には、Appiumが最初に書かれたとき、JSON Wire ProtocolというWebDriverの仕様より古いものを使っていました。その後、AppiumはW3Cの仕様に沿って進化を続け、現在は完全にW3Cに準拠しています。

<!-- Of course, Appium wants to support the cases where user interaction *does* differ from web to
mobile or web to TV, and so Appium also makes use of the built-in *extensibility* of the WebDriver
spec. The result is that, no matter what platform you want to automate, when you use Appium, you
will do so using the standard WebDriver spec, with two caveats: -->

もちろん、AppiumはWebとモバイル、WebとTVでユーザーインタラクションが異なるケースもサポートしたいので、AppiumはWebDriver仕様のもつ組込の*拡張性*も利用しています。その結果、どのようなプラットフォームで自動化する場合でも、Appiumを使えば、以下の2つの注意点を除き、標準的なWebDriver仕様で自動化できます：

<!-- - We might not have any way to support a particular WebDriver API command on a given platform, and
  so some commands might be unsupported (for example, getting or setting cookies is not possible in
  the world of native mobile app automation).
- We might support automation behaviours that go *beyond* what's available in the WebDriver API
  command list, though any such commands will be valid and spec-compliant extensions to the
  WebDriver API. -->

- とあるプラットフォームでは、WebDriver APIコマンドをサポートする方法がないため、いくつかのコマンドはサポートされていないかもしれません（例えば、クッキーの取得や設定は、ネイティブモバイルアプリの自動化の世界では不可能です）。
- WebDriver APIコマンドリストで利用可能なものを超える動作の自動化をサポートするケースもあるかもしれませんが、そんな場合でも、そのコマンドはWebDriver APIの有効かつ仕様に準拠した拡張となります。

<!-- How do you actually *use* the WebDriver API, particularly in the context of Appium? We'll cover
that in the [section below](#ユニバーサルプログラミング言語へのアクセス) on how Appium provides
universal programming language access. All you need to know for now is that the way Appium
introduces a universal UI automation interface is by implementing the WebDriver protocol. -->

WebDriver APIを実際に*使う*には…特にAppiumの文脈ではどうすればいいのでしょうか？
それについては、Appiumがどのように汎用的なプログラミング言語へのアクセスを提供するかについての[以下のセクション](#_2)で取り上げることにします。今のところ知っておくべきなのは、Appiumが汎用的なUIオートメーションUIを実現する方法は、WebDriverプロトコルを実装することです。

<!-- ## Platform automation behaviour -->
## プラットフォームの自動化挙動

<!-- The next question is, how does Appium map this protocol to automation behaviour on a wide range of
platforms? The trick is that, strictly speaking, Appium doesn't! It leaves this responsibility up
to a kind of software module called an Appium *driver*. There's a whole [Driver
Introduction](./drivers.md) which you can read next, so we won't go into huge detail on how they
work for now. -->

次の疑問は、Appiumはどのようにプロトコルをいろいろなプラットフォーム上の自動化の動作に対応させるのでしょうか？です。
実は、厳密に言えば、Appiumはそれらの処理を行っていません。Appium *ドライバ*という一種のソフトウェアモジュールにその仕事を任せているのです。
[Appium Driver入門](./drivers.md)は後で読むことができますので、ここではドライバがどのように動作するかについてはあまり詳しく説明しません。

<!-- What's important to understand at the moment is that a driver is kind of like a pluggable module
for Appium that gives Appium the power to automate a particular platform (or set of platforms,
depending on the goal of the driver). At the end of the day, a driver's responsibility is to simply
implement an Appium-internal interface representing the WebDriver protocol. How it implements this
interface is totally up to the driver, based on its strategy for making automation happen on
a specific platform. Typically, and with a lot more complexity and difficulty in the details,
a driver does this by relying on platform-specific automation technologies. For example, Apple
maintains an iOS automation technology called
[XCUITest](https://developer.apple.com/documentation/xctest/user_interface_tests). The Appium
driver that supports iOS app automation is called the [XCUITest
Driver](https://github.com/appium/appium-xcuitest-driver) because ultimately what it does is
convert the WebDriver protocol to XCUITest library calls. -->

ドライバはAppiumのプラグインモジュールのようなもので、Appiumに、とあるプラットフォーム（またはドライバの目的によってはプラットフォームのセット）を自動化する能力を与えるものである、というのが現時点での重要なポイントです。結局のところ、ドライバの仕事は、WebDriverへの命令を処理するAppium内部のインターフェースを実装することです。このインターフェースをどのように実装するかは、各々のプラットフォームで自動化を実現するための仕様に基づき、各ドライバに任されています。一般的に細部では複雑で難しいことですが、ドライバはプラットフォーム固有の自動化技術に準拠した動作をします。例えば、Appleは[XCUITest](https://developer.apple.com/documentation/xctest/user_interface_tests)というiOS自動化技術を提供しています。iOSアプリの自動化をサポートするAppiumドライバは、[XCUITest Driver](https://github.com/appium/appium-xcuitest-driver)と呼ばれています。なぜなら、最終的に処理する内容は、WebDriverへの命令をXCUITestライブラリ呼び出しに変換することだからです。

<!-- One of the reasons that drivers are independent, pluggable modules is that they work completely
differently from one another. The tools and requirements for building and using drivers for
different platforms are completely different. And so Appium lets you use just the drivers that you
need for your automation tasks. Choosing drivers and installing them so that you can use them with
your Appium instance is so important that Appium has its very own [CLI for managing
drivers](../cli/extensions.md). -->

ドライバが独立したプラグイン可能なモジュールである理由の1つは、ドライバが互いに全く異なる働きをするためです。異なるプラットフォーム用のドライバを構築して使用するツールや要件は、完全に異なっています。そのため、Appiumでは自動化タスクに必要なドライバだけを使用できるようになっています。Appiumのインスタンスで使うためのドライバを選び、インストールするのはとても重要で、Appiumには独自の[ドライバを管理するためのCLI](../cli/extensions.md)が用意されています。

<!-- So, to answer our original question, the way that Appium provides access to automation capabilities
for a given platform is that the Appium team (or anyone else[^3]) writes a *driver* for that
platform, implementing as much or little of the WebDriver protocol as desired. The driver can then
be installed by anyone using Appium. -->

なので、最初の疑問に答えると、Appiumが与えられたプラットフォームの自動化機能へのアクセスを提供する方法は、Appiumの開発チーム（または他の誰か[^3]）がそのプラットフォーム用の*ドライバ*を書き、必要なだけのWebDriver命令を実装します。そして、そのドライバはAppiumを使用している人なら誰でもインストールできます。

<!-- [^3]: You can build and share your own drivers! Check out [Building
  Drivers](../ecosystem/build-drivers.md) to learn more about how to develop drivers in Node.js
  that can be used with Appium. -->

[^3]: 独自のドライバを構築して共有できます！Appiumで使えるNode.jsでのドライバ開発方法については、[ドライバの構築](../ecosystem/build-drivers.md)を参照してください。

<!-- ## Universal programming language access -->
## ユニバーサルプログラミング言語へのアクセス

<!-- But what does it mean, or look like, to *use* Appium, anyway? Since Appium is ultimately a Node.js
program, it *could* have looked like importing Appium and its drivers as libraries into your own
Node.js programs. But that wouldn't meet Appium's goal of providing automation capabilities to
people using any popular programming language. -->

ところで、"Appiumを使う"とはどういうことなのでしょうか？ Appiumは最終的にはNode.jsのプログラムなので、Appiumとドライバをライブラリとして自分のNode.jsプログラムにインポートするような形にすることも*可能*です。しかし、それでは、*一般的*なプログラミング言語を使う人々に自動化機能を提供するというAppiumの目標を達成できません。

<!-- Luckily, the fact that Appium rode in on Selenium's coattails meant that we had a solution to this
problem from day one. You see, the WebDriver specification is actually an HTTP-based protocol,
meaning it is designed to be used over a network rather than within the memory of a single program. -->

幸運なことに、AppiumがSeleniumの流れをくんでいるため、最初からこの課題を解決することができました。WebDriverの仕様はHTTPベースのプロトコルであり、1つのプログラムのメモリ内ではなく、ネットワーク上で使用されるように設計されています。

<!-- One of the main benefits of this "client-server" architecture is that it allows the automation
implementer (the thing doing the automation, in this case the 'server') to be completely distinct
from the automation runner (the thing defining what automation should be done, in what steps,
etc..., in this case the 'client'). Basically, all the "hard stuff" (actually figuring out how to
make automation happen on a given platform) can be handled in one place by the server, and "thin"
client libraries can be written in any programming language which simply encode HTTP requests to
the server in language-appropriate way. It's possible, in other words, to bring basic Appium
/ WebDriver capabilities to a new programming language relatively easily, assuming high-level HTTP
libraries exist, simply by coding up a basic HTTP client in that language. -->

この「クライアント/サーバ」アーキテクチャの主な利点の1つは、自動化"実装"者（自動化を行うもの、この場合は「サーバ」）が自動化"実行"者（自動化の内容、手順などを定義するもの、この場合は「クライアント」）と完全に区別できるようにすることです。基本的にすべての「難しいこと」（実際に特定のプラットフォーム上で自動化を実現する方法を見つけ出すこと）は、一箇所のサーバで処理することができ、「簡易な」クライアントライブラリは、単に言語に適した方法でサーバへのHTTPリクエストをエンコードする任意のプログラミング言語で書くことができる。言い換えれば、高レベルのHTTPライブラリが存在するならば、その言語で基本的なHTTPクライアントをコーディングするだけで、新しいプログラミング言語にAppium/WebDriverの基本機能を比較的簡単に導入が可能…ということです。

<!-- There are a couple important takeaways here for you, the Appium user: -->

以下に、Appiumのユーザーにとって、いくつかの重要なポイントをあげます：

<!-- - Appium is an *HTTP server*. It must run as a process on some computer for as long as you want to
  be able to use it for automation. It must be accessible on the network to whichever computer you
  want to use to run the automation from (whether that is the same machine or one across the
  world).
- Unless you want to write raw HTTP calls or use cURL, using Appium for automation involves the use
  of an [Appium Client](clients.md) in the language of your choice. The goal of each of these
  clients is to encapsulate the WebDriver protocol so that rather than worrying about the protocol
  itself, you can work with objects and methods that feel idiomatic for your language.
- The Appium server and the Appium client do *not* need to be running on the same computer. You
  simply need to be able to send HTTP requests from the client to the server over some network.
  This greatly facilitates the use of cloud providers for Appium, since they can host the Appium
  server and any related drivers and devices, and all you need to do is point your client script to
  their secure endpoints. -->

- Appiumは *HTTP サーバ* です。自動化のために使用する場合、コンピュータ上のプロセスとして実行する必要があります。そして、自動化を実行するために使用したいコンピュータ（それが同じマシンであるか、または世界中の1つであるかどうかにかかわらず）に対して、ネットワーク上でアクセス可能である必要があります。
- 生のHTTPコールを書いたり、cURLを使ったりしたいなら別ですが、自動化のためにAppiumを使用するには、選択した言語の[Appium Client](clients.md)を使用することです。これらのクライアントの目的は、WebDriverプロトコルのカプセル化で、プロトコル自体を気にすることなく、あなたの言語で手になじんだオブジェクトとメソッドで作業できます。
- AppiumサーバとAppiumクライアントは、*同じコンピュータ上で実行される必要はありません*。クライアントからサーバへ、何らかのネットワークを介してHTTPリクエストを送ることができればよいのです。クラウドプロバイダがAppiumサーバや関連するドライバやデバイスをホストしてくれるので、クライアントスクリプトをその安全なエンドポイントに向けるだけでよいのです。

<!-- And of course, none of this is about "testing" per se, purely about the use of Appium and its
client libraries for automation purposes. If you want to do automation for the purpose of
"testing", you'll likely want to enlist the help of test runners, test frameworks, and the like,
none of which need be related to Appium; one of the benefits of Appium's "universal accessibility"
is that it plays well with whatever set of tools you find most beneficial for your situation. -->

もちろん、これは「テスト」そのものに限らず、純粋に自動化目的のためのAppiumとクライアントライブラリの使用についてです。もしあなたが「テスト」を目的とした自動化を行いたいのであれば、他のテストランナーやテストフレームワークなどの助けを借りたいでしょうし、必ずしもAppiumに連携する必要はありません。

<!-- ## Appium's huge scope -->
## Appiumの巨大な守備範囲（scope）

<!-- Appium's vision (automation of everything under a single API) is huge! Certainly, much bigger than
the team of core maintainers for the open source project. So how does Appium hope to achieve this
goal? Basically, by empowering the community to develop functionality on top of Appium as
a *platform*. This is what we call the Appium "ecosystem". -->

Appiumのビジョン（単一のAPIですべてを自動化する）は壮大なものです！オープンソースプロジェクトのコアメンテナーのチームよりもはるかに巨大です。では、Appiumはどのようにしてこの目標を達成しようとしているのでしょうか？ 基本的には、*プラットフォーム*としてAppiumの上に機能を開発するためのコミュニティを強化することによって、実現しようとしています。これが、Appiumの「エコシステム」です。

<!-- The Appium team does officially maintain a few drivers itself (for example, the XCUITest driver
that we spoke about earlier). But it cannot hope to have the platform-specific expertise or the
capacity to maintain drivers for many different platforms. But what we have done, particularly
beginning with Appium 2.0, is to provide tools to empower the community to join in our vision: -->

Appium開発チームは、いくつかのドライバを自分たちで公式に保守しています（例えば、先にお話したXCUITestドライバなど）。しかし、プラットフォームに特化した専門知識や、多くの異なるプラットフォーム用のドライバを保守するリソースを持つことは期待できません。しかし、私たちがやってきたこと、特にAppium2.0からは、コミュニティが私たちのビジョンに参加するためのツールを提供しています：

<!-- - Anyone can create a driver simply by creating a Node.js module that conforms to the appropriate
  conventions and implements any (sub|super)set of the WebDriver protocol. Creating a driver often
  involves a minimal amount of code because the WebDriver protocol details are abstracted away, and
  many helper libraries are available---the same libraries that power the Appium team's own
  drivers.
- Sharing drivers with others is easy using the Appium driver CLI. There is no central authority.
  Anyone can share drivers publicly or privately, for free or for sale. Drivers can be open or
  closed source (though obviously we appreciate open source!). -->

- 適切な規約に準拠し、WebDriverプロトコルの任意の（サブ|スーパー）セットを実装するNode.jsモジュールを作成するだけで、誰でもドライバを作成できます。WebDriverプロトコルの詳細が抽象化され、多くのヘルパーライブラリが利用できるため、ドライバの作成者は最小限のコードを書くだけで済みます。
- Appium driver CLIを使えば、他人とドライバを共有するのも簡単です。中央の権威は存在しません。誰でも、公開でも非公開でも、無料でも販売でも、ドライバを共有できます。ドライバはオープンでもクローズドでもかまいません（でも、オープンソースであることを歓迎します！）。

<!-- Appium's vision of being a platform for development extends beyond the support of automation for
all app platforms. As a popular automation tool, there are many opportunities for integrating
Appium with all kinds of other tools and services. In addition, there are many feature ideas for
Appium, either as a core server or in its incarnation across various drivers, which the core team
will never have time to build. And so, with Appium 2.0, Appium has released a plugin system that
enables anyone to build and share modules that change how Appium works! -->

開発のためのプラットフォームであるというAppiumのビジョンは、すべてのアプリプラットフォームの自動化をサポートすることにとどまりません。一般的な自動化ツールとして、Appiumを他のあらゆる種類のツールやサービスと統合する機会が多くあります。さらに、Appiumには、コアサーバとして、あるいはさまざまなドライバにまたがる形態で、コアチームが構築する時間がないようなニッチな機能のアイデアが数多くあります。そこで、Appium2.0では、Appiumの動作を変えるモジュールを誰でも作って共有できるように、プラグインシステムをリリースしました！

<!-- In the same way that drivers are easily shareable and consumable via the Appium driver CLI, plugins
can be published and consumed via a parallel [Plugin CLI](../cli/extensions.md). Plugins can do all
sorts of things, for example adding the ability for Appium to find and interact with screen regions
based on a template image (as in the [`images`
plugin](https://github.com/appium/appium/tree/2.0/packages/images-plugin)). There are very few
limitations on what you can do with plugins, so you might also be interested in learning how to
[Build Plugins](../ecosystem/build-plugins.md) in Node.js that can be used with Appium. -->

ドライバがAppium driver CLIを介して簡単に共有・消費できるのと同じように、プラグインも並列の[Plugin CLI](../cli/extensions.md) を介して公開・利用することが可能です。プラグインは、例えば、Appiumがテンプレート画像に基づいて画面領域を検索して対話する機能を追加するなど、さまざまなことができます（[`images`プラグイン](https://github.com/appium/appium/tree/2.0/packages/images-plugin)のようなものです。） プラグインでできることにはほとんど制限がないので、Appiumで使えるNode.jsの[プラグインの作り方](../ecosystem/build-plugins.md)にも興味を持っていただけるかもしれません。

<!-- So that's Appium: an extensible, universal interface for the UI automation of potentially
everything! Read on into some of the specific intro docs for more details, or check out the various
guides to dive into some more general concepts and features of Appium. -->

つまり、Appiumは、拡張性のある、あらゆるもののUIを自動化するための汎用的なインターフェースなのです！   
また、Appiumの一般的な概念や機能については、いろいろなガイドを読んでみてください。
