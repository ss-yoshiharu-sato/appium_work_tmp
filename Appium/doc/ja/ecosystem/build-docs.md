---
title: Appium 拡張の文書作成
---

# Appium 拡張の文書作成

<!-- Once you've [built a driver](./build-drivers.md) or [built a plugin](./build-plugins.md) for Appium, you will hopefully want to document how that extension works for your users. The most basic way of doing this is to write up a quick README and keep it in the root of your project's repository. However, this can involve a lot of duplication of effort, especially when documenting things like Appium commands. -->
Appium で [ドライバをビルド](./build-drivers.md) や [プラグインをビルド](./build-plugins.md) したら、できればその拡張機能がどう動くかを文書化したいと思うことでしょう。これを行う最も基本的な方法は、簡単なREADMEを書き上げ、プロジェクトのリポジトリのルートに置いておくことです。しかし、この方法では、特にAppiumコマンドのようなものを文書化する場合、多くの重複した労力を必要とすることがあります。

<!-- Let's say your driver implements ~25 of the standard WebDriver protocol commands. You could write up a description of these commands, how they map to the protocol, what parameters they take, and what behaviour will result on your particular platform. But this information is already more or less stored in your code, as the command implementation (and any docstrings or comments). Having this information in two places creates an opportunity for the docs to get out of sync with the reality of the code. Wouldn't it be nice to generate command reference documentation straight from the code? -->
例えば、あなたのドライバが、標準的なWebDriverプロトコルのコマンドを25個ほど実装しているとしましょう。これらのコマンドについて、どのようにプロトコルに対応するか、どのようなパラメータを取るか、そしてあなたの特定のプラットフォームでどのような動作になるか、といった説明を書き上げることができます。しかし、この情報は、コマンドの実装（およびdocstringsやコメント）として、すでに多かれ少なかれコードに保存されています。この情報を2つの場所に持っていると、文書とコードの実態がずれてしまう可能性があります。コードから直接コマンドのリファレンス・文書を生成できたらいいと思いませんか？

<!-- Another problem with the basic single file README approach is that many extensions might want a whole set of documents including longer prose guides (like this one). It might be nice to have code examples where you can toggle between different programming languages. It might be nice to be able to add a project-specific logo. And so on. -->
基本的な単一ファイルのREADMEアプローチのもう一つの課題は、多くの拡張機能が、（このような）長い散文的なガイドを含む一連の文書を必要とするかもしれないということです。異なるプログラミング言語を切り替えられるようなコード例があるといいかもしれません。プロジェクト固有のロゴを追加できるようにするのもいいかもしれません。などなど。

<!-- Luckily, the Appium project has built tools to do all these things, and we've packaged up these tools so our ecosystem developers building drivers and plugins can _also_ use them. The best way to get going with these tools is probably to look at an existing Appium driver repo to see how it's done, for example the [XCUITest driver repo](https://github.com/appium/appium-xcuitest-driver). But this guide will outline the basic approach. -->
幸運なことに、Appiumプロジェクトはこれらのことを行うためのツールを構築しており、ドライバやプラグインを構築するエコシステムの開発者がこれらのツールを使用できるようにパッケージ化しています_。これらのツールを使い始めるための最良の方法は、おそらく既存のAppiumドライバレポを見て、それがどのように行われているかを見ることです。例えば、[XCUITest driver repo](https://github.com/appium/appium-xcuitest-driver). しかし、このガイドでは、基本的なアプローチの概要を説明します。

<!-- ### Conceptual architecture -->
### 概念的なアーキテクチャ

<!-- Appium settled on [MkDocs](https://www.mkdocs.org/) as a Markdown-based documentation site generator. It uses a Python toolchain (and not Node.js), but it turned out to be the best option for our purposes. You can adjust this, but by default Appium's utilities also assume that you'll be using the [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme/extension for MkDocs. -->
Appiumは、Markdownベースの文書サイト生成ツールとして、[MkDocs](https://www.mkdocs.org/)に準拠しています。これはPythonツールチェーン（Node.jsではない）を使用していますが、私たちの目的には最適なオプションであることが判明しました。これを調整もできますが、デフォルトではAppiumのユーティリティもMkDocsのテーマ/拡張機能である [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) を使用することを前提としています。

<!-- From here, building a basic docs site is as easy as collecting your Markdown files together and creating a sort of manifest file defining how you want them to be organized. -->
ここから、基本的な文書サイトの構築は、Markdownファイルを集めて、それらをどのように整理するかを定義するマニフェストファイルのようなものを作成するのと同じくらい簡単です。

<!-- The other main piece is automatic documentation generation from your code files. Appium maintains a plugin for [TypeDoc](https://typedoc.org/). This plugin is incorporated into our doc utility. When you give it an entrypoint for you driver or plugin, it will scan and parse all your code files looking for Appium command implementations. A set of Markdown reference files will be generated for these commands, which can then be included in your docs site. -->
もう1つの主要な部分は、コードファイルから文書を自動生成することです。Appiumでは、[TypeDoc](https://typedoc.org/)のプラグインを用意しています。このプラグインは、私たちのdocユーティリティに組み込まれています。あなたがドライバやプラグインのエントリーポイントを与えると、Appiumコマンドの実装を探すために、すべてのコードファイルをスキャンして解析してくれます。これらのコマンドのためにMarkdownの参照ファイルのセットが生成され、それはあなたのdocsサイトに含めることができます。

<!-- In order to make different versions of your docs available (one for each minor release of your extension, typically), we also bundle [Mike](https://github.com/jimporter/mike). -->
あなたの文書の異なるバージョンを利用可能にするために（典型的には、あなたの拡張機能のマイナーリリースごとに1つ）、われわれはまた、[Mike](https://github.com/jimporter/mike)をバンドルしています。

<!-- ### Setup -->
### セットアップ

<!-- To take advantage of Appium's documentation utilities, you'll need to make sure of the following: -->
Appiumの文書ユーティリティを利用するためには、以下のことを確認する必要があります：

<!-- - Python 3 is available
- The appropriate Python dependencies are available (the versions used by Appium itself are listed
- in the doc utility's [requirements.txt](https://github.com/appium/appium/blob/master/packages/docutils/requirements.txt)). It's recommended you use the same versions.
- Include the `@appium/docutils` NPM package as a dev dependency of your project
- Annotate your commands using TypeDoc (this works for JS projects and not just TypeScript projects).
- Put your markdown docs files in a directory
- Create a [`mkdocs.yml`](https://www.mkdocs.org/user-guide/configuration/) file that extends
  Appium's base MkDocs configuration. (If your `mkdocs.yml` file is in the root of your repo, then the line at the top of it should look like:
  ```yml
  INHERIT: ./node_modules/@appium/docutils/base-mkdocs.yml
  ```
  Basically, make sure you're inheriting the path to `@appium/docutils`'s `base-mkdocs.yml`. -->
- Python 3が利用可能である
- 適切なPythonの依存関係が利用可能である（Appium自身が使用するバージョンはdocユーティリティの[requirements]に記載されています。
- docユーティリティの[requirements.txt](https://github.com/appium/appium/blob/master/packages/docutils/requirements.txt)に記載されています）。同じバージョンを使用することが推奨されます。
- NPM パッケージの `@appium/docutils` を、プロジェクトの dev 依存としてインクルードする。
- TypeDocを使ってコマンドに注釈をつける（これはTypeScriptプロジェクトだけでなく、JSプロジェクトでも有効です）。
- マークダウンの文書ファイルをディレクトリに置く
- を拡張した [`mkdocs.yml`](https://www.mkdocs.org/user-guide/configuration/) ファイルを作成する。
  Appiumの基本的なMkDocsの設定を拡張した[`mkdocs.yml`]（）を作成します。(もし `mkdocs.yml` ファイルがあなたのレポのルートにある場合、その先頭の行は次のようになるはずです：
  ```yml
  INHERIT: ./node_modules/@appium/docutils/base-mkdocs.yml
  ```
  基本的には、`@appium/docutils` の `base-mkdocs.yml` へのパスを継承していることを確認します。

<!-- ### Usage -->
### 使い方

<!-- At this point, you can use the `appium-docs` CLI tool. Run this tool with no arguments to get the full help output and see all the available subcommands and parameters. Here are a few usage examples: -->
この時点で、`appium-docs` という CLI ツールを使用できます。このツールを引数なしで実行すると、完全なヘルプ出力が得られ、利用可能なすべてのサブコマンドとパラメータを見ることができます。以下にいくつかの使用例を示します：

```bash
# リファレンスを生成し、mkdocs サイトを site dir にビルドしますr
appium-docs build

# build と同じですが、docs をローカルの開発サーバにホストします
# そして変更を監視し、ファイルが変更されたらリビルドする
appium-docs build --serve

# docs をビルドし、docs-site ブランチに mike versioning でデプロイします
# 含まれるコミットメッセージとブランチでのリベース戦略を使って
# これは特に GitHub pages ブランチにコンテンツをプッシュする際に便利です！
appium-docs build \
  --deploy \
  -b docs-site \
  -m 'docs: auto-build docs for appium-xcuitest-driver@%s' \
  --rebase
```
