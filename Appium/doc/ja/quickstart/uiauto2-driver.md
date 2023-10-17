---
title: Uiautomatuon2のインストール
---

# Uiautomatuon2のインストール

<!-- You can't do much with Appium unless you have a [ドライバ](../intro/drivers.md), which is an
interface that allows Appium to automate a particular platform. -->

Appiumでは、[ドライバ](../intro/drivers.md)がなければ、多くのことができません、ドライバは、Appiumが特定のプラットフォームを自動化するためのインターフェースです。

<!-- !!! info

    For this quickstart guide, we're going to be automating an app on the Android platform, because
    the system requirements for Android automation via Appium are the same as for Appium itself
    (whereas the iOS driver, for example, requires you to be using macOS).

The driver we're going to use is called the [UiAutomator2
Driver](https://github.com/appium/appium-uiautomator2-driver). It's worth visiting that driver's
documentation and bookmarking it, because it will be an invaluable reference down the line. -->

!!! info
    このクイックスタートガイドでは、Androidプラットフォーム上のアプリを自動化することにします。AppiumによるAndroidの自動化のシステム要件は、Appiumそのものと同じだからです（一方、iOSのドライバは、例えばmacOSを使用していることが必要です）。

今回使用するドライバは、[UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)と呼ばれています。そのドライバの文書を訪れてブックマークしておくと、この先、リファレンスとして便利でしょう。

<!-- ## Set up Android automation requirements -->
## Androidの自動化要件を設定する

<!-- According to the driver, in addition to a working Appium server, we also need to do the following: -->

ドライバによると、Appiumサーバが動作することに加え、以下のことが必要です：

<!-- - Download [Android SDK platform tools](https://developer.Android.com/studio/releases/platform-tools). You will probably want to download [Android Studio](https://developer.Android.com/studio) and manage the SDK tools from within it for the easiest experience.
- Set an environment variable pointing to the directory on disk where the Android tools are
installed. You can usually find the path to this directory in the Android Studio SDK manager. It
will contain the `platform-tools` and other directories. We need to define and persist the
environment variable as `Android_HOME` (or alternatively `Android_SDK_ROOT`).
- Use the Android SDK manager to download whichever Android platform we want to automate (for
example, API level 30)
- Install the Java JDK (for the most recent Android API levels, JDK 9 is required, otherwise JDK
8 is required). It's easiest to use the [OpenJDK packages](https://openjdk.java.net/install/). Make
sure you get the JDK and not the JRE.
- When the JDK is installed, you'll need to find the path to the JDK home directory as it was
installed on your system. This will be the directory that *contains* the `bin`, `include`, and
other directories. The path must be persisted as an environment variable named `JAVA_HOME`, so that
Appium can find the appropriate Java tooling that is required to work with the Android platform.
- Use Android Studio to create and launch an Android Virtual Device (an AVD, otherwise known as an
emulator). You may need to download the system images for the API level of the emulator you want to
create. Using the AVD creation wizard in Android Studio is generally the easiest way to do all of
this. -->

- [Android SDKプラットフォームツール](https://developer.Android.com/studio/releases/platform-tools)をダウンロードします。 [Android Studio](https://developer.Android.com/studio)をダウンロードし、その中でSDKツールを管理するのが最も簡単でしょう。
- Androidツールがインストールされているディレクトリを示す環境変数を設定します。このディレクトリへのパスは、通常、Android Studio SDKマネージャで見つけることができます。このディレクトリには、`platform-tools`やその他のディレクトリが含まれています。環境変数に `Android_HOME` (または `Android_SDK_ROOT`) を定義して保持する必要があります。
- Android SDK Managerを使用して、自動化したいAndroidプラットフォーム（例えば、APIレベル30）をダウンロードする。
- Java JDKをインストールする（最新のAndroid APIレベルではJDK 9が必要で、それ以外ではJDK 8が必要です）。[OpenJDK packages](https://openjdk.java.net/install/)を使用するのが最も簡単です。JREではなく、*JDK*を入手したことを確認してください。
- JDKがインストールされたら、あなたのシステムにインストールされたJDKのホームディレクトリへのパスを見つける必要があります。これは、`bin`、`include`、およびその他のディレクトリを含むディレクトリです。このパスは、AppiumがAndroidプラットフォームで動作するために必要な適切なJavaツールを見つけることができるように、`JAVA_HOME`という環境変数として永続化する必要があります。
- Android Studioを使用して、Android Virtual Device（AVD、別称エミュレータ）を作成し、起動します。作成するエミュレータのAPIレベルのシステムイメージをダウンロードする必要がある場合があります。Android StudioのAVD作成ウィザードを使用するのが、一般的にこれdを行う最も簡単な方法です。

<!-- !!! note -->
<!-- You can also use a physical Android device, so long as it is configured for debugging and
        development -->

!!! note
    端末が、デバッグおよび開発者モードに設定されていれば、実機のAndroidデバイスを使用できます。

<!-- - With the emulator or device connected, you can run `adb devices` (via the binary located at
`$Android_HOME/platform-tools/adb`) to verify that your device shows up as connected. -->

- エミュレータまたはデバイスを接続した状態で、シェルで `adb devices`（`$Android_HOME/platform-tools/adb`にあるバイナリ）を実行し、デバイスが接続されていることを確認します。

<!-- Once your device shows up as connected in ADB, and you've verified that the environment variables
are set up correctly in the terminal context where you are going to run Appium, you should be good
to go! If you ran into problems with any of these steps, refer to the driver documentation, or the
various Android or Java documentation sites as necessary. -->

ADBでデバイスが接続されていることが確認され、Appiumを実行するターミナルログで環境変数が正しく設定されていることが確認されれば、もう大丈夫です。テストを実行できます！
これらのステップで問題が発生した場合は、ドライバの文書を参照するか、必要に応じてAndroidやJavaの文書サイトを参照してください。

<!-- Also, congratulations: whether or not you intended to, you now have the Android developer toolchain
set up on your system, so you can get busy making Android apps if you want! -->

同時におめでとうございます：あなたが意図していたかどうかに関わらず、あなたのPCは今、Android開発者ツールチェーンがセットアップされているので、Androidアプリの作成に取りかかることができます！

<!-- ## Install the driver itself -->
## ドライバ本体をインストールする

<!-- Since the UiAutomator2 driver is maintained by the core Appium team, it has an 'official' driver
name that you can use to install it easily via the [Appium Extension CLI](../cli/extensions.md): -->

UiAutomator2ドライバはAppiumのコアチームによって保守されているため、「公式」ドライバ名を持っています。それを使って [Appium 拡張CLI] (../cli/extensions.md) から簡単にインストールできます：

```bash
appium driver install uiautomator2
```

<!-- It should produce output that looks something like: -->
以下のような出力が出るはずです：

```
Attempting to find and install driver 'uiautomator2'
✔ Installing 'uiautomator2' using NPM install spec 'appium-uiautomator2-driver'
Driver uiautomator2@2.0.5 successfully installed
- automationName: UiAutomator2
- platformNames: ["Android"]
```

<!-- Running this command will locate and install the latest version of the UiAutomator2 driver, making
it available for automation. Note that when it is installed it tells you what platforms it is valid
for (in this case, `Android`), and what automation name (the `appium:automationName`
[capability](../guides/caps.md)) must be used to select this driver for use during an Appium
session (in this case, `UiAutomator2`). -->

このコマンドを実行すると、最新バージョンのUiAutomator2ドライバを検索してインストールし、自動化できるようにします。インストールされると、どのプラットフォームで有効か（この場合は `Android` ）と、Appiumセッション中にこのドライバを使用するために、どの自動化名（ `appium:automationName` [capability](../guides/caps.md) を使用しなければならないか（この場合は `UiAutomator2` ）が表示されることに留意してください。）

<!-- !!! note -->

<!-- In this quickstart we have used the Extension CLI to install the UiAutomator2 driver, but if you
    are incorporating Appium into a Node.js project, you might prefer to use NPM to manage Appium
    and its connected drivers. To learn more about this technique, visit the guide on [managing
    Appium extensions](../guides/managing-exts.md). -->

!!! note
    このクイックスタートでは、UiAutomator2ドライバをインストールするために拡張CLIを使用しています。Node.jsプロジェクトに組み込む場合は、NPMを使用してAppiumと接続されたドライバを管理することを好むかもしれません。このテクニックの詳細については、[Appium DriversとPluginの管理](../guides/managing-exts.md)をご覧ください。

<!-- Now, start the Appium server again (run `appium`), and you should see that the newly-installed
driver is listed as available: -->

ここで、Appiumサーバを再起動（`appium`を実行）すると、新しくインストールされた ドライバが使用可能であることが確認できます：

```
[Appium] Available drivers:
[Appium]   - uiautomator2@2.0.5 (automationName 'UiAutomator2')
```

<!-- With the Android setup complete and the UiAutomator2 driver installed, you're ready to write your
first test! So pick the language you're most comfortable with under the quickstart menu and give it
a shot. -->

Androidのセットアップが完了し、UiAutomator2ドライバがインストールされたので、最初のテストを書く準備が整いました。この文書のクイックスタートメニューから一番使いやすい言語を選び、試してみてください。
