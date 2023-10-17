---
title: メソッドの実行
---

# メソッドの実行

<!-- Because the scope of commands implemented in Appium drivers is broader than the scope of commands defined by the W3C WebDriver spec, Appium needs a way for these "extended" commands to be accessible by client libraries. There are two main strategies for this: -->
Appiumドライバで実装されるコマンドの範囲は、W3C WebDriver仕様で定義されているコマンドの範囲よりも広いため、Appiumではこれらの「拡張」コマンドをクライアントライブラリからアクセスできるようにする方法が必要です。   
これには、主に2つの戦略があります：

<!-- 1. Appium drivers define new W3C-compatible API routes, and Appium clients are updated to include support for those new routes.
2. Appium drivers define so-called "Execute Methods" which provide new functionality by overloading the existing `Execute Script` command which is already available in any WebDriver-based client library (including all Selenium and Appium clients). -->
1. Appiumドライバが新しいW3C互換のAPIルートを定義し、Appiumクライアントがそれらの新しいルートへのサポートを含むように更新されます。
2. Appiumドライバは、いわゆる「Execute Methods」を定義し、WebDriverベースのクライアントライブラリ（すべてのSeleniumとAppiumクライアントを含む）ですでに利用できる既存の `Execute Script` コマンドをオーバーロードすることによって新しい機能を提供します。

<!-- There are pros and cons for each strategy, but it is ultimately up to the extension author to decide how they wish implement new commands.  -->
それぞれの方法には長所と短所がありますが、新しいコマンドをどのように実装するかは、最終的には拡張機能の作者に任されています。

<!-- This guide is designed to specifically help you understand the "Execute Method" strategy.  This pattern is commonly used in official Appium drivers and other third-party extensions. Here's an example of how the `Execute Script` command is designed to work in the world of WebDriver and browser automation: -->
このガイドは、特に「Execute Method」戦略を理解するのに役立つように設計されています。 このパターンは、公式のAppiumドライバやその他のサードパーティ製拡張機能でよく使用されています。ここでは、`Execute Script` コマンドがWebDriverとブラウザの自動化の世界でどのように機能するように設計されているかの例を示します：

=== "JS (WebDriverIO)"

    ```js
    await driver.executeScript('return arguments[0] + arguments[1]', [3, 4])
    ```

=== "Java"

    ```java
    JavaScriptExecutor jsDriver = (JavaScriptExecutor) driver;
    jsDriver.executeScript("return arguments[0] + arguments[1]", 3, 4);
    ```

=== "Python"

    ```py
    driver.execute_script('return arguments[0] + arguments[1]', 3, 4)
    ```

=== "Ruby"

    ```rb
    driver.execute_script 'return arguments[0] + arguments[1]', 3, 4
    ```

=== "C#"

    ```dotnet
    ((IJavaScriptExecutor)driver).ExecuteScript("return arguments[0] + arguments[1]", 3, 4);
    ```

<!-- What's happening here is that we are defining a snippet of JavaScript (technically, a function body) to be executed within the web browser. The client can send arguments which are serialized, sent over HTTP, and finally provided to the function as parameters.  In this example, we are essentially defining an addition function. The return value of the `Execute Script` command is whatever the return value of the JavaScript snippet is! In the case of this example, that value would be the number `7` (`3`+ `4`). -->
ここで起こっていることは、ウェブブラウザ内で実行されるJavaScriptのスニペット（厳密には関数本体）を定義していることです。クライアントは引数を送ることができ、その引数はシリアライズされてHTTPで送信され、最後にパラメータとして関数に提供されます。 この例では、実質的に加算関数を定義していることになる。「スクリプトの実行」コマンドの戻り値は、JavaScriptスニペットの戻り値である！   
この例の場合、その値は数字 `7` (`3` + `4`) です。

<!-- Each client library has its own way of calling the command and providing any arguments to the script function, but the function itself—the snippet—is always a string and is the same across all languages. -->
クライアントライブラリによって、コマンドの呼び出し方やscript関数への引数の与え方は異なりますが、関数そのもの（スニペット）は常に文字列であり、どの言語でも同じです。

<!-- In the world of Appium, we are usually not automating a web browser, which means this command is not particularly useful. But it *is* useful as a way to encode the name of an arbitrary command and to provide parameters. For example, the [XCUITest Driver](https://github.com/appium/appium-xcuitest-driver) has implemented a command that lets a client terminate a running application if you know the ID (the `bundleId`) of the app. The way that the driver makes this command available is via the Execute Method `mobile: terminateApp`. Instead of providing a JavaScript function to the "Execute Script" command, the user provides a _known string_ as defined by the driver. The only other thing a client needs to know is the set of parameters for the method, which are documented by the driver. In this case, we have a parameter named `bundleId`, whose value should be a string encoding the ID of the app to terminate. Here is how this Execute Method would be called: -->
Appiumの世界では、通常、Webブラウザを自動化することはないので、このコマンドは特に有用ではありません。しかし、任意のコマンドの名前をエンコードし、パラメータを提供する方法としては**有用**です。例えば、[XCUITest Driver](https://github.com/appium/appium-xcuitest-driver) は、アプリのID (`bundleId`) を知っていれば、クライアントが実行中のアプリケーションを終了できるコマンドを実装しています。ドライバがこのコマンドを利用可能にする方法は、実行メソッド `mobile: terminateApp` を介して行われます。「スクリプトの実行」コマンドにJavaScriptの関数を提供する代わりに、ユーザーはドライバが定義する_既知の文字列_を提供します。クライアントが知る必要があるのは、ドライバによって文書化されているメソッドのパラメータセットだけです。この場合、`bundleId`というパラメータがあり、その値には終了させるアプリのIDをエンコードした文字列を指定する必要があります。この「Execute Methods」の呼び出し方は以下の通りです：

=== "JS (WebDriverIO)"

    ```js
    await driver.executeScript('mobile: terminateApp', [{bundleId: 'com.my.app'}])
    ```

=== "Java"

    ```java
    JavaScriptExecutor jsDriver = (JavaScriptExecutor) driver;
    jsDriver.executeScript("mobile: terminateApp", ImmutableMap.of("bundleId", "com.my.app"));
    ```

=== "Python"

    ```py
    driver.execute_script('mobile: terminateApp', {'bundleId': 'com.my.app'})
    ```

=== "Ruby"

    ```rb
    driver.execute_script 'mobile: terminateApp', { bundleId: 'com.my.app' }
    ```

=== "C#"

    ```dotnet
    ((IJavaScriptExecutor)driver).ExecuteScript("mobile: terminateApp", new Dictionary<string, string> { { "bundleId", "com.my.app" } });
    ```

<!-- There are two important differences in using Appium Execute Methods from vanilla Selenium JavaScript execution: -->
Appium Execute Methodsを使用する場合、vanilla Selenium JavaScript実行と異なる重要な点が2つあります：

<!-- 1. The script string is just a command name; it will be provided by the driver documentation
1. The standard way to provide parameters is as a *single* object with keys representing parameter names and values representing parameter values. So in this case, we had to specify both the parameter name (`bundleId`) as the key of the parameters object, and the parameter value (`com.my.app`) as the value for that key. A driver can define parameters as _required_ or _optional_. -->
1. スクリプト文字列は単なるコマンド名であり、ドライバの文書で提供されます。
1. パラメータを提供する標準的な方法は、パラメータ名を表すキーとパラメータ値を表す値を持つ*単一*オブジェクトとして提供されます。つまり、今回のケースでは、パラメータオブジェクトのキーとしてパラメータ名（`bundleId`）を、そのキーの値としてパラメータ値（`com.my.app`）を指定しなければなりませんでした。ドライバは、パラメータを_quired_または_optional_として定義できます。

<!-- Of course, always refer to the documentation for the particular Execute Method in case the author has made any alterations to the standard access method. -->
もちろん、標準的なアクセス方法に対して作者が何らかの変更を加えた場合は、常に特定の実行メソッドの文書を参照してください。
