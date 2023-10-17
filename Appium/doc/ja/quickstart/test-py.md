---
title: Pythonでのテスト
---

# Pythonでのテスト

<!-- The [Appium Python Client](https://github.com/appium/python-client) is an official Appium client in Python, which is available via pypi under the [Appium-Python-Client](https://pypi.org/project/Appium-Python-Client/) package name.
It inherits from the [Selenium Python Binding](https://pypi.org/project/selenium/), so installing the Appium Python Client includes the selenium binding. -->

[Appium Python Client](https://github.com/appium/python-client)はPythonの公式Appiumクライアントで、pypi経由で[Appium-Python-Client](https://pypi.org/project/Appium-Python-Client/)というパッケージ名で公開されています。[Selenium Python Binding](https://pypi.org/project/selenium/)を継承しているので、Appium Python Clientをインストールするとselenium bindingも同時にインストールされます。

```bash
pip install Appium-Python-Client
```

<!-- This example uses Python's built-in `unittest` module, though you can use any Python test framework you want.
The Appium Python client adds the `appium:` vendor prefix automatically.
You usually do not need to worry about the prefix. -->

この例ではPythonの組み込みモジュールである `unittest` を使用していますが、Pythonのテストフレームワークであれば何でも使用可能です。
Appium Pythonクライアントは、自動的に `appium:` という開発元プレフィックスを追加します。
通常、この接頭辞を気にする必要はありません。

```python
import unittest
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

capabilities = dict(
    platformName='Android',
    automationName='uiautomator2',
    deviceName='Android',
    appPackage='com.Android.settings',
    appActivity='.Settings',
    language='en',
    locale='US'
)

appium_server_url = 'http://localhost:4723'

class TestAppium(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Remote(appium_server_url, capabilities)

    def tearDown(self) -> None:
        if self.driver:
            self.driver.quit()

    def test_find_battery(self) -> None:
        el = self.driver.find_element(by=AppiumBy.XPATH, value='//*[@text="Battery"]')
        el.click()

if __name__ == '__main__':
    unittest.main()
```

<!-- !!! note -->

<!-- It's not within the scope of this guide to give a complete run-down on the Python client
    library or everything that's happening here, so we'll leave the code itself unexplained in detail for now.
    - You may want to read up particularly on Appium [Capabilities](../guides/caps.md).
    - [functional test code](https://github.com/appium/python-client/tree/master/test/functional) in Python Client GitHub repository should help to find more working example.
    - [Documentation](https://appium.github.io/python-client-sphinx/) also helps to find methods
    defined in the Appium Python Client. -->

!!! note
    このガイドでは、Pythonのクライアントライブラリやここで起こっていることのすべてを説明できません。ライブラリや、ここで起こっていることのすべてを完全に説明することはこのガイドの目的ではないので、コード自体の詳細については説明しないことにします。
    
    - Appium の [Capabilities](../guides/caps.md) を特に読んでおくとよいかもしれません。
    - Python ClientのGitHubリポジトリにある[functional test code](https://github.com/appium/python-client/tree/master/test/functional)は、より実用的な例を見つけるのに役立つと思います。
    - [Documentation](https://appium.github.io/python-client-sphinx/)は、Appium Pythonで定義されたメソッドを見つけるのにも役立ちます。

<!-- Basically, this code is doing the following: -->
基本的に、このコードは以下のようなことをしています：

<!-- 1. Defining a set of "Capabilities" (parameters) to send to the Appium server so Appium knows what kind of thing you want to automate.
1. Starting an Appium session on the built-in Android settings app.
1. Finding the "Battery" list item and clicking it.
1. Pausing for a moment purely for visual effect.
1. Ending the Appium session. -->

1. Appiumサーバに送信する「Capabilities」（パラメータ）のセットを定義し、Appiumがどのようなことを自動化したいかを知ることができるようにする。
1. Androidの内蔵設定アプリでAppiumのセッションを開始する。
1. 「Battery」をリスト項目から探し、クリックする。
1. 視覚的な効果を得るために、一瞬だけポーズをとる。
1. Appiumのセッションを終了する。

<!-- That's it! Let's give it a try. Before you run the test, make sure that you have an Appium server running in another terminal session, otherwise you'll get an error about not being able to connect to one. Then, you can execute the script: -->

いい感じです！試しにやってみましょう。テストを実行する前に、別のターミナルセッションでAppiumサーバが動作していることを確認してください。
そうしないと、接続できないというエラーが表示されます。
準備ができたら以下のスクリプトを実行します：

```bash
python test.py
```

<!-- If all goes well, you'll see the Settings app open up and navigate to the "Battery" view before the
app closes again.

Congratulations, you've started your Appium journey! Read on for some next steps to explore. -->

うまくいけば、アプリが再び閉じる前に、設定アプリが開き、「バッテリー」ビューに移動するのがわかるでしょう。

おめでとうございます、あなたはAppiumの旅を始めました！次のステップに進むために[次の段階へ](next-steps.md)を読んでみてください。
