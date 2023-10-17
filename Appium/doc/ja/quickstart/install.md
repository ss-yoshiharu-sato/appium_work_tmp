---
title: Appiumのインストール
---

# Appiumのインストール

<!-- Installing Appium is as easy as running a single NPM command: -->
Appiumのインストールは、NPMコマンドを1回実行するだけです：

```bash
npm i -g appium@next
```

<!-- !!! note

    Currently, you must use `appium@next` instead of just `appium`. Once Appium 2.0 has been
    officially published, you can simply use `appium`. 

This command installs Appium globally on your system so that you can access it from the command
line simply by running the `appium` command. Go ahead and run it now: -->

!!! note

    現在は `appium` でなく、`appium@next` を使用する必要があります。Appium 2.0が正式に公開されたら、`appium`を使うだけでよくなるでしょう。

このコマンドは、Appiumをシステムへグローバルにインストールし、`appium`コマンドを実行するだけでコマンドラインからアクセスできるようにします。さっそく実行してみてください：

```
appium
```

<!-- You should see some output that starts with a line like this: -->

このような行で始まる出力が表示されるはずです：

```
[Appium] Welcome to Appium v2.0.0
```

<!-- That's it! If you get this kind of output, the Appium server is up and running. Go ahead and quit
it (CTRL-C) and move on to the next step, where we'll install a driver for automating Android apps. -->

これで完了です！このような出力が出れば、Appiumサーバは稼働しています。そのまま終了して（CTRL-C）、次のステップに進みます。Androidアプリを自動化するためのドライバ（Uiautomator2）を[インストール](uiauto2-driver.md)します。

!!! note
    （日本語訳者加記）既存の1.0系のAppiumとの共存したい場合はどうなるんだろう…グローバルインストールではいけない気がする。
