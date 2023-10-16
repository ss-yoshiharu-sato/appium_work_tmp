---
title: Appium Documentation
---

<!---# Appium Documentation--->
# Appiumの文書

<div style="text-align: center">
  <img src="assets/images/appium-logo-horiz.png" style="max-width: 400px;" />
</div>

<!---
Welcome to the Appium documentation! Appium is an open-source project and ecosystem of related
software, designed to facilitate UI automation of many app platforms, including mobile (iOS,
Android, Tizen), browser (Chrome, Firefox, Safari), desktop (macOS, Windows), TV (Roku, tvOS,
Android TV, Samsung), and more.
--->
Appiumの文書にようこそ。Appiumはオープンソースプロジェクトであり、そのエコシステムは多様なプラットフォーム、例えばモバイル（iOS・Android・Tizen）やブラウザ（Chrome・Firefox・Safari）、デスクトップ（macOS・Windows）、TV（Roku・tvOS・Android TV・Samsung）に対するUI自動化を支援するために設計されています。

<!---
If you're new to Appium, it's recommended that you start off with the [Introduction](intro/), then
move on to the [Quickstart](quickstart/). And you can always find Appium's code on GitHub at
[appium/appium](https://github.com/appium/appium).
--->
もしあなたがAppiumを初めて学ぶのであれば、[導入](intro/)からとりかかり、[クイックスタート](quickstart/)へと進むとよいでしょう。GitHub上の[appium/appium](https://github.com/appium/appium)においてコードも確認できます。

<!---## What is Appium for?--->
## Appiumは何のためにあるか？

<!---
Appium is used mostly in the field of software test automation, to help determine whether the
functionality of a given app is working as expected. In contrast to other types of software
testing, UI automation allows testers to write code that walks through user scenarios in the actual
UI of an application, mimicking as closely as possible what happens in the real world while
enabling the various benefits of automation, including speed, scale, and consistency.
--->

Appiumは、主にソフトウェアテストの自動化の分野で使用され、対象となるアプリの機能が期待通りに動作しているかどうかを調べるのに役立ちます。
他のソフトウェアテストとは違い、テスターは実際のアプリケーションのUIでユーザーシナリオ（ユーザーの行動）を模倣するコードを書くことができます。Appiumはこのような自動化のさまざまなメリットを享受しながら、現実の世界で起きていることをできるだけ忠実に再現することができ、スピード、スケール、一貫性など、テスト自動化のさまざまなメリットを得ることができます。

<!---
Appium aims to provide a set of tools that support this kind of automation in a standard way across
any number of platforms. Most platforms come with tools that allow UI automation at some level, but
these are usually platform-specific and require specialized knowledge and specific programming
language experience and toolchains. Appium tries to unify all these automation technology under
a single stable interface, accessible via most popular programming languages (you can write Appium
scripts in Java, Python, Ruby, JS, and more).
--->

Appiumは、このようなテスト自動化を標準的な方法でサポートするツール一式を、多くのプラットフォームで提供することを目的としています。ほとんどのプラットフォームには、ある程度のレベルでUIの自動化を可能にするツールが付属しています。これらは通常、プラットフォーム固有のものであり、専門的な知識や特定のプログラミング言語経験やツールチェインが必要です。Appiumは、これらの自動化技術を単一の安定したインターフェースに統合しようとするものです。（スクリプトはJava、Python、Ruby、JSなどで書くことができます。）

<!--
## Learning Appium
--->
## Appiumを学ぶ

<!---
This documentation is a great way to learn more about Appium:

- Check out the [Introduction](intro/) first to make sure you understand all the concepts involved in Appium.
- Go through the [Quickstart](quickstart/) to get set up and run a basic Android test.
- Have a look at the various guides and references.
- Using Appium for a real project means using an Appium driver for a specific platform, so you'll want to have a look at the [Ecosystem](ecosystem/) page where we keep links to the drivers and plugins you might want to use; you can refer to those projects for specific information about using Appium for a given platform.
--->

以下の文書は、Appiumについてより多くを学ぶために有用です：

- [導入](intro/)の文書を読みましょう。Appiumの考え方を理解することができるでしょう。
- [クイックスタート](quickstart/)を完了してください。基本的なAndroidでのテストの実行や環境構築を習得できます。
- ガイド や リファレンス を読んで重要な事柄を知ってください。
- 実際のプロジェクトでAppiumを使うということは、特定のプラットフォーム用のAppiumドライバを使うということなので、[エコシステム](ecosystem/)の文書で、使いたいドライバやプラグインへのリンクを参照すれば、特定のプラットフォームでAppiumを使うための情報を得られるでしょう。

<!---
You can also check out a list of third-party [Resources](resources.md) to explore Appium around the
web.
--->

また、[資料](resources.md)の文書では、Web上にあるサードパーティの資料のリストを見ることができます。

<!---
## Contributing to Appium
--->
## Appiumに貢献する

<!---
Appium is open source, available under an Apache 2.0 license. Appium's copyright is held by the
[OpenJS Foundation](https://openjsf.org), and Appium receives contributions from many companies
across several software industries, regardless of their competitive status. (3rd-party drivers and
plugins are available under the licenses provided by their authors.)
--->

Appiumはオープンソースであり、Apache 2.0ライセンスで利用可能です。Appiumの著作権は[OpenJS Foundation](https://openjsf.org)が保有しており、Appiumは競合などに関係なく、複数のソフトウェア業界にわたる多くの企業から貢献を受けています。(サードパーティのドライバやプラグインは、その作者が提供する各々のライセンスで利用できます)。

<!---
As such, we welcome contributions! The project moves forward in relation to the investment of
contributions of code, documentation, maintenance, and support from companies and volunteers. To
learn more about contributing, check out our GitHub repo at
[appium/appium](https://github.com/appium/appium) and read through our
[Contributing](contributing/) guides.
--->

以上、私達は、皆様からの貢献を歓迎します！プロジェクトは、企業やボランティアからのコード、文書、保守、サポートなどの貢献で前進していきます。貢献の詳細については、GitHubのリポジトリ [appium/appium](https://github.com/appium/appium)と[貢献](contributing/)をお読みください。

## 日本語訳によせて

- 体裁は「です・ます」、コマンド名といった固有の文字はカタカナ表記、英語併記、もしくは英語をそのまま残していく予定です。

---

- Written by 松尾和昭 (Kazuaki Matsuo, @KazuCocoa)
