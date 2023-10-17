---
title: AppiumとSelenium Grid
---

# AppiumとSelenium Grid

<!-- ## Using Selenium Grid 4+ -->
## Selenium Grid 4+の利用について

<!-- The [relay](https://www.selenium.dev/documentation/grid/configuration/toml_options/#relaying-commands-to-a-service-endpoint-that-supports-webdriver) feature in Grid 4 allows you to proxy Appium requests to an Appium server instance. Here is an example walkthrough of how you would connect two different Appium instances to a Selenium Grid. -->
Grid 4の[relay](https://www.selenium.dev/documentation/grid/configuration/toml_options/#relaying-commands-to-a-service-endpoint-that-supports-webdriver)機能により、AppiumのリクエストをAppiumサーバインスタンスに経由できます。ここでは、2つの異なるAppiumインスタンスをSelenium Gridに接続する方法の全体像を示します。

<!-- ### Define the Appium configs -->
### Appium の設定を定義する

<!-- Each Appium instance should have a config file that can be easily updated. It should contain any information which needs to be unique to that particular server (e.g., ports its drivers should use that others should not). We are going to have 2 Appium servers, so we will need 2 config files: -->
各Appiumインスタンスは、簡単に更新できる設定ファイルを持つ必要があります。このファイルには、特定のサーバに固有の情報（例えば、ドライバが使用すべきポートで、他のサーバが使用すべきでないもの）が含まれている必要があります。今回は2つのAppiumサーバを用意するので、2つの設定ファイルが必要です：

```yaml
# appium1.yml
server:
  port: 4723
  use-drivers:
    - xcuitest
  default-capabilities:
    wdaLocalPort: 8100
    mjpegServerPort: 9100
    mjpegScreenshotUrl: "http://localhost:9100"
```

<!-- In the above YAML config file, we specify the Appium server port, the driver used, and parameters for the driver that will be sent in as default capabilities. Our goal is to ensure that any other drivers running on this host will not compete with system ports or other resources. The second config file could look like the following, where we simply adjust a few ports to prevent clashes: -->
上記のYAML設定ファイルでは、Appiumサーバのポート、使用するドライバ、デフォルトのcapabilitiesとして送信されるドライバのパラメータを指定しています。私たちの目標は、このホスト上で動作する他のドライバが、システムポートや他のリソースと競合しないようにすることです。2つ目の設定ファイルは以下のようなもので、衝突を防ぐためにいくつかのポートを調整するだけです：

```yaml
# appium2.yml
server:
  port: 4733
  use-drivers:
    - xcuitest
  default-capabilities:
    wdaLocalPort: 8110
    mjpegServerPort: 9110
    mjpegScreenshotUrl: "http://localhost:9110"
```

<!-- ### Define the Grid node configs -->
### Grid ノード設定の定義

<!-- We will be launching one Grid "node" per Appium server, to manage relaying commands and determining capacity and online status, etc... So we should have one config file per Grid node as well. Each node config should include the address of the Appium server it will target, as well as a list of capability "configs" it should accept to relay a session request to Appium. Here is what the config could look like for the two nodes: -->
Appiumサーバ1台につき1つのGrid「ノード」を起動し、コマンドの中継や容量、オンライン状態などを管理する予定です。そのため、Gridノードごとに1つの設定ファイルを用意する必要があります。各ノードの設定には、ターゲットとなるAppiumサーバのアドレスと、Appiumへのセッション要求を中継するために受け入れるべき "capability"のリストが含まれていなければなりません。以下は、2つのノードのコンフィグです：

```toml
# node1.toml
[server]
port = 5555

[node]
detect-drivers = false

[relay]
url = "http://localhost:4723"
status-endpoint = "/status"
configs = [
    "1", "{\"platformName\": \"iOS\", \"appium:platformVersion\": \"15.5\", \"appium:deviceName\": \"iPhone 13\", \"appium:automationName\": \"XCUITest\"}"
]
```

```toml
# node2.toml
[server]
port = 5565

[node]
detect-drivers = false

[relay]
url = "http://localhost:4733"
status-endpoint = "/status"
configs = [
    "1", "{\"platformName\": \"iOS\", \"appium:platformVersion\": \"15.5\", \"appium:deviceName\": \"iPhone 12\", \"appium:automationName\": \"XCUITest\"}"
]
```

<!-- Note that each node config also specifies a different port itself for the node to run on. -->
なお、各ノードの設定には、ノードを実行するための異なるポート自体も指定されています。

<!-- ### Putting it together -->
### まとめ

<!-- The Grid nodes aren't enough--you'll also want a Grid "hub" that acts as a load balancer and manager for all the nodes. So in the end we'll have 5 processes running at once: 2 Appium servers, 2 Grid nodes, and 1 Grid hub. It's best to run each of these in a separate terminal window to avoid confusion of logs. Here is how you'd start each process: -->
Gridノードだけでは不十分で、全ノードのロードバランサーやマネージャーとして機能するGrid「ハブ」も必要です。つまり、Appiumサーバ2台、Gridノード2台、Gridハブ1台の計5台が同時に稼働することです。ログの混乱を避けるために、それぞれを別のターミナルウィンドウで実行するのがベストです。以下、各プロセスの起動方法です：

0. `appium --config appium1.yml`
0. `appium --config appium2.yml`
0. `java -jar /path/to/selenium.jar node --config node1.toml`
0. `java -jar /path/to/selenium.jar node --config node2.toml`
0. `java -jar /path/to/selenium.jar hub`

<!-- Once you wait a few moments for the nodes to detect their Appium servers, and to register with the hub, you'll be able to send all your Appium traffic via the single hub endpoint (defaulting to `http://localhost:4444`). -->
ノードがAppiumサーバを検出し、ハブに登録されるまでしばらく待つと、すべてのAppiumトラフィックを単一のハブエンドポイント（デフォルトは`http://localhost:4444`）を介して送信できるようです。

<!-- And of course, you're able to link up Appium servers and nodes running on different machines in your network to form a larger grid. -->
もちろん、ネットワーク上の異なるマシンで動作するAppiumサーバやノードをリンクして、より大きなグリッドを形成することも可能です。

<!-- ## Using Selenium Grid 3 -->
## Selenium Grid 3 の利用

<!-- It is possible to register your Appium server with a local [Selenium Grid 3](https://www.selenium.dev/documentation/legacy/selenium_3/grid_3/) ([setup docs](https://www.selenium.dev/documentation/legacy/grid_3/setting_up_your_own_grid/)) instance by using the `--nodeconfig` server argument. -->
[Selenium Grid 3](https://www.selenium.dev/documentation/legacy/selenium_3/grid_3/) ([setup docs](https://www.selenium.dev/documentation/legacy/grid_3/setting_up_your_own_grid/)) のローカルインスタンスに、`--nodeconfig`サーバ引数を用いてAppium サーバを登録することが可能です。

```bash
appium server --nodeconfig /path/to/nodeconfig.json --base-path=/wd/hub
```

<!-- In the referenced config file you have to define the `browserName`, `version` and `platform` capabilities and based on these parameters the grid will re-direct your test to the right device. You will also need to configure your host details and the Selenium Grid details. For a full list of all parameters and descriptions see [here](https://www.selenium.dev/documentation/legacy/selenium_3/grid_setup/). -->
参照された設定ファイルでは、`browserName`、`version`、`platform`の機能を定義する必要があり、これらのパラメータに準拠して、グリッドはテストを正しいデバイスに再指向します。また、ホストの詳細とSelenium Gridの詳細も設定する必要があります。すべてのパラメータと説明の完全なリストについては、[ここ](https://www.selenium.dev/documentation/legacy/selenium_3/grid_setup/)を参照してください。

<!-- Once you start the Appium server it will register with the grid, and you will see your device on the grid console page: -->
Appiumサーバを起動すると、グリッドに登録され、グリッドコンソールページにデバイスが表示されます：

`http://**\<grid-ip-adress\>**:**\<grid-port\>**/grid/console`

<!-- ### Example Grid Node Configuration JSON -->
### グリッドノード設定JSONの例

```json
{
  "capabilities":
      [
        {
          "browserName": "<e.g._iPhone5_or_iPad4>",
          "version":"<version_of_iOS_e.g._7.1>",
          "maxInstances": 1,
          "platform":"<platform_e.g._MAC_or_Android>"
        }
      ],
  "configuration":
  {
    "cleanUpCycle":2000,
    "timeout":30000,
    "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
    "url":"http://<host_name_appium_server_or_ip-address_appium_server>:<appium_port>/wd/hub",
    "host": "<host_name_appium_server_or_ip-address_appium_server>",
    "port": <appium_port>,
    "maxSession": 1,
    "register": true,
    "registerCycle": 5000,
    "hubPort": <grid_port>,
    "hubHost": "<Grid_host_name_or_grid_ip-address>",
    "hubProtocol": "<Protocol_of_Grid_defaults_to_http>"
  }
}
```

<!-- If `url`, `host`, and `port` are not given, the config will be auto updated to point to `localhost:<appium-port>`. -->
`url`、`host`、`port`を指定しない場合は、`localhost:<appium-port>`を示すように設定が自動更新されます。

<!-- If your Appium server is running on a different machine to your Selenium Grid server, make sure you use an external name/IP address in your `host` and `url` configuration; `localhost` and `127.0.0.1` will prevent Selenium Grid from connecting correctly. -->
AppiumサーバがSelenium Gridサーバと別のマシンで動作している場合、`host` と `url` の設定に 外部の名前/IPアドレス を使用することを確認してください：`localhost`と`127.0.0.1`は Selenium Grid が正しく接続できない時の表示です。
