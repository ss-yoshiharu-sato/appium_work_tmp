---
title: The Event Timing API
---

<!-- Appium comes with the ability to retrieve timing information about startup information and command length. This is an advanced feature that is controlled by the use of the `appium:eventTimings` capability (set it to `true` to log event timings). -->
Appiumには、起動情報やコマンドの長さなどのタイミング情報を取得する機能が用意されています。これは、`appium:eventTimings`capabilityの使用によって制御される高度な機能です（イベントのタイミングを記録するには`true`に設定します）。

<!-- With this capability turned on, the `GET /session/:id` response (i.e., the response to `driver.getSessionDetails()` or similar, depending on client) will be decorated with an `events` property. This is the structure of that `events` property: -->
このcapabilityをオンにすると、`GET /session/:id` レスポンス（クライアントによっては `driver.getSessionDetails()` などへのレスポンス）は `events` プロパティで飾られます。その `events` プロパティの構造がこれです：

```
{
    "<event_type>": [<occurence_timestamp_1>, ...],
    "commands": [
        {
            "cmd": "<command_name>",
            "startTime": <js_timestamp>,
            "endTime": <js_timestamp>
        },
        ...
    ]
}
```

<!-- In other words, the `events` property has 2 kinds of properties of its own: -->
つまり、`events`プロパティは、それ自体で2種類のプロパティを持ちます：

<!-- * Properties which are the names of event types
* The `commands` property -->
* イベントタイプの名前のプロパティ
* `commands`プロパティ

<!-- Properties which are names of event types correspond to an array of timestamps when that event happened. It's an array because events might happen multiple times in the course of a session. Examples of event types include: -->
イベントタイプの名前のプロパティは、イベントが発生したときのタイムスタンプの配列に対応します。イベントがセッションの過程で複数回発生する可能性があるため、配列になっています。イベントタイプの例としては、以下のようなものがあります：

* `newSessionRequested`
* `newSessionStarted`

<!-- (Individual drivers will define their own event types, so we do not have an exhaustive list to share here. It's best to actually get one of these responses from a real session to inspect the possible event types.) -->
（個々のドライバは独自のイベントタイプを定義するので、ここで共有するための完全なリストは提示できません。可能なイベントタイプを調べるには、実際のセッションからこれらの応答の1つを実際に取得するのが一番です）

<!-- The `commands` property is an array of objects. Each object has the name of the Appium-internal command (for example `click`), as well as the time the command started processing and the time it finished processing. -->
`commands` プロパティは、オブジェクトの配列である。各オブジェクトにはAppium内部のコマンド名(例えば`click`)と、コマンドの処理開始時刻と処理終了時刻が格納されています。

<!-- With this data, you can calculate the time between events, or a strict timeline of events, or statistical information about average length of a certain type of command, and so on. -->
このデータを使って、イベントとイベントの間の時間や、イベントの厳密なタイムライン、ある種のコマンドの平均的な長さに関する統計情報などを計算できます。

<!-- You can only receive data about events that have happened when you make the call to `/session/:id`, so the best time to get data about an entire session is right before quitting it. -->
`session/:id`は、呼び出したときに発生したイベントに関するデータしか受け取れないので、セッション全体に関するデータを取得するには、セッションを終了する直前がベストです。

<!-- The Appium team maintains an event timings parser tool that can be used tgenerate various kinds of reports from event timings output: [appium/appium-event-parser](https://github.com/appium/appium-event-parser). -->
Appiumチームでは、イベントタイミングパーサツールを用意しており、イベントタイミングアウトプットからさまざまな種類のレポートを生成できます： 

[appium/appium-event-parser](https://github.com/appium/appium-event-parser).

<!-- ## Add a custom event -->
## カスタムイベントを追加する

<!-- !!! warning "TODO" -->

<!-- The links to the commands in the following paragraph do not yet work since these docs are under construction. -->
!!! warning "TODO"
    これらの文書は作成中であるため、以下の段落のコマンドへのリンクはまだ機能していません。

<!-- You can add custom events that will show up in the event timings data. You can send a custom event name to the Appium server using the [Log Event API](#TODO), and the server will store the timestamp. The [Get Events](#TODO) command can be used to retrieve named events' timestamps later on. -->
イベントタイミングデータに表示されるカスタムイベントを追加できます。[Log Event API](#TODO)を使ってカスタムイベント名をAppiumサーバに送信すると、サーバがタイムスタンプを保存します。[Get Events](#TODO)コマンドを使えば、後から名前付きイベントのタイムスタンプを取得できます。
