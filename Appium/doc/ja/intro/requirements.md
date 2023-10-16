---
title: Appium Requirements
---

<!-- The basic requirements for the Appium server are: -->

Appiumサーバの基本要件は以下の通りです：

<!-- * A macOS, Linux, or Windows operating system
* [Node.js](https://nodejs.org) version in the [SemVer](https://semver.org) range `^14.17.0 || ^16.13.0 || >=18.0.0`
* [NPM](https://npmjs.com) version >= 8 (NPM is usually bundled with Node.js, but can be upgraded
independently) -->

* macOS、Linux、Windowsのいずれかのオペレーティング・システム
* [Node.js](https://nodejs.org)のバージョンが[SemVer](https://semver.org)の範囲にある `^14.17.0 || ^16.13.0 || >=18.0.0`
* [NPM](https://npmjs.com) version >= 8 (NPMは通常Node.jsにバンドルされていますが、アップグレードできます)

<!-- By itself, Appium is relatively lightweight and doesn't have significant disk space or RAM
requirements. It can even be run in resource-constrained environments like Raspberry Pi, so long as
Node.js is available. -->

Appium単体では、比較的軽量で、ディスク容量やRAMの要件はそれほど高くありません。Node.jsが利用可能であれば、Raspberry Piのようなリソースに制約のある環境でも実行可能です。

<!-- To use Appium to automate a particular platform, please refer to the documentation of the [Appium
driver(s)](../ecosystem/index.md#drivers) for that platform for additional dependencies. It is
almost universally the case that Appium drivers for a given platform will require the developer
toolchain and SDKs for that platform to be available.
[label](../../zh) -->

Appiumを使って特定のプラットフォームを自動化するには、そのプラットフォームの [Appiumのエコシステム>ドライバ](../ecosystem/index.md#_1)の文書を参照し、追加の依存関係を確認してください。一般的なケースでは、あるプラットフォーム用のAppiumドライバは、そのプラットフォーム用の開発者ツールチェーンとSDKが利用可能です。
