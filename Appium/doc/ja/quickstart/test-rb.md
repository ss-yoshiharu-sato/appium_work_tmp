---
title: Write a Test (Ruby)
---

<!-- The [AppiumLib](https://github.com/appium/ruby_lib) and the [AppiumLibCore](https://github.com/appium/ruby_lib_core) (**recommended**) are official Appium client libraries in Ruby, which are available via gem under the [appium_lib](https://rubygems.org/gems/appium_lib) and the [appium_lib_core](https://rubygems.org/gems/appium_lib_core) package names. The appium_lib_core inherits from the Selenium Ruby Binding, and the appium_lib inherits from the appium_lib_core, so installing these libraries include the selenium binding. We recommend `appium_lib_core` if you need a less complex client-side solution. The `appium_lib` has some useful methods the core does not have, but for the cost of greater complexity. -->

[AppiumLib](https://github.com/appium/ruby_lib)と[AppiumLibCore](https://github.com/appium/ruby_lib_core)(**推奨**)はRubyの公式Appiumクライアントライブラリで、gem経由で[appium_lib](https://rubygems.org/gems/appium_lib)、[appium_lib_core](https://rubygems.org/gems/appium_lib_core)というパッケージ名で公開されています。appium_lib_core は Selenium Ruby Binding を、appium_lib は appium_lib_core を継承しているので、これらのライブラリをインストールすると selenium Bindingもインストールされます。あまり複雑でないクライアントサイドのソリューションが必要な場合は、`appium_lib_core`をお勧めします。`appium_lib` には、core にはない便利なメソッドがありますが、その代償として、より複雑なものになっています。

```bash
gem install appium_lib
# or
gem install appium_lib_core
```

<!-- The `appium_lib_core` is the main part as an Appium client.
`appium_lib` has various helper methods, but the driver instance was ordinary designed to be used as a global variable. It could causes an issue to handle the instance.
`appium_lib_core` does not have such a global variable.

This example is by the `appium_lib_core` with `test-unit` gem module.
Tes code in `appium_lib` should be similar. -->

`appium_lib_core` は Appium クライアントとして主要な部分です。
`appium_lib` にはさまざまなヘルパーメソッドが用意されていますが、ドライバのインスタンスはグローバル変数として使用することを前提に設計されているのが普通です。そのため、インスタンスの扱いに問題が生じる可能性があります。
`appium_lib_core` には、このようなグローバル変数はありません。

この例は、`appium_lib_core` に `test-unit` という gem モジュールを組み込んでいます。
`appium_lib` の Tes コードも同様にあるはずです。

```ruby
require 'appium_lib_core'
require 'test/unit'

CAPABILITIES = {
  platformName: 'Android',
  automationName: 'uiautomator2',
  deviceName: 'Android',
  appPackage: 'com.Android.settings',
  appActivity: '.Settings',
  language: 'en',
  locale: 'US'
}

SERVER_URL = 'http://localhost:4723'

class AppiumTest < Test::Unit::TestCase
  def setup
    @core = ::Appium::Core.for capabilities: CAPABILITIES
    @driver = @core.start_driver server_url: SERVER_URL
  end

  def teardown
    @driver&.quit
  end

  def test_version
    @driver.wait { |d| d.find_element :xpath, '//*[@text="Battery"]' }.click
  end
end
```

<!-- !!! note -->

<!-- It's not within the scope of this guide to give a complete run-down on the Ruby client
    library or everything that's happening here, so we'll leave the code itself unexplained in detail for now.

    - You may want to read up particularly on Appium [Capabilities](../guides/caps.md).
    - [functional test code](https://github.com/appium/ruby_lib_core/tree/master/test/functional) in the appium_lib_core GitHub repository should help to find more working example.
    - Documentation [appium_lib_core](https://www.rubydoc.info/github/appium/ruby_lib_core) and [appium_lib](https://www.rubydoc.info/github/appium/ruby_lib) also helps to find available methods. -->

!!! note
    このガイドでは、Rubyのクライアントライブラリやここで起こっていることのすべてを説明できません。すべてを完全に説明することはこのガイドの目的ではありませんので、コード自体の詳細については説明しないことにします。

    - Appium の [Capabilities](../guides/caps.md) を特に読んでおくとよいかもしれません。
    - また、GitHubリポジトリ appium_lib_core の [functional test code](https://github.com/appium/ruby_lib_core/tree/master/test/functional) を読むと、より実践的な例が見つかるはずです。
    - 文書 [appium_lib_core](https://www.rubydoc.info/github/appium/ruby_lib_core) と [appium_lib](https://www.rubydoc.info/github/appium/ruby_lib) も、利用可能なメソッドを探すのに役立ちます。

<!-- Basically, this code is doing the following:

1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows whatkind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Battery" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session. -->

基本的に、このコードは以下のようなことをしています：

1. Appiumサーバに送信する「Capabilities」（パラメータ）のセットを定義し、Appiumがどのようなことを自動化したいかを知ることができるようにする。
1. Androidの内蔵設定アプリでAppiumのセッションを開始する。
1. 「Battery」をリスト項目から探し、クリックする。
1. 視覚的な効果を得るために、一瞬だけポーズをとる。
1. Appiumのセッションを終了する。

<!-- That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server
running in another terminal session, otherwise you'll get an error about not being able to connect
to one. Then, you can execute the script: -->

いい感じです！試しにやってみましょう。テストを実行する前に、別のターミナルセッションでAppiumサーバが動作していることを確認してください。そうしないと、接続できないというエラーが表示されます。
準備ができたら以下のスクリプトを実行します：

```bash
bundle install
bundle exec ruby test.rb
```

<!-- If all goes well, you'll see the Settings app open up and navigate to the "Battery" view before the
app closes again.

Congratulations, you've started your Appium journey! Read on for some next steps to explore. -->

うまくいけば、アプリが再び閉じる前に、設定アプリが開き、「バッテリー」ビューに移動するのがわかるでしょう。

おめでとうございます、あなたはAppiumの旅を始めました！次のステップに進むために[次の段階へ](next-steps.md)を読んでみてください。
