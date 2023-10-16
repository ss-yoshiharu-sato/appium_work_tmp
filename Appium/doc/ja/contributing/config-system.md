---
title: Appium's Config System
---

<!-- Appium 2 supports [configuration files](../guides/config.md). A configuration file is intended to have (nearly) 1:1 parity with command-line arguments. An end user can supply Appium 2 with a configuration file, CLI args, or both (the args have precedence over the config file). -->
Appium2は、[設定ファイル](../guides/config.md)をサポートしています。設定ファイルは、コマンドライン引数と（ほぼ）1対1のパリティを持つことを意図しています。エンドユーザは、Appium2に設定ファイル、CLI の引数、またはその両方を与えることができます（引数は設定ファイルよりも優先されます）。

<!-- This document will be a technical overview of how the configuration system works. It is intended for Appium contributors, but will also explain the system's fundamental features. -->
この文書は、設定システムがどのように機能するかについての技術的な概要です。Appiumの貢献者を対象としていますが、システムの基本的な機能についても説明します。

<!-- ## Reading a Config File -->
## 設定ファイルの読み方

<!-- A config file is a JSON, JavaScript, or YAML file which can be validated against a schema. By default, this file will be named `.appiumrc.{json,js,yaml,yml}` and should be in the root of the project which depends upon `appium`. Other filenames and locations are supported via the `--config <file>` flag. For obvious reasons, the `config` argument is disallowed within config files. -->
設定ファイルとは、スキーマに対して検証可能なJSON、JavaScript、またはYAMLファイルです。デフォルトでは、このファイルは `.appiumrc.{json,js,yaml,yml}` という名前で、`appium` に依存しているプロジェクトのルートにあるはずです。他のファイル名や場所は `--config <file>` フラグで指定できます。明らかな理由により、`config`引数は設定ファイル内では禁止されています。

<!-- In lieu of a separate file, configuration can be embedded in a project's `package.json` using the `appiumConfig` property, e.g.,: -->
別ファイルの代わりに、`appiumConfig`プロパティを使用して、プロジェクトの `package.json` に設定を埋め込むことができます：

```json
{
  "appiumConfig": {
    "server": {
      "port": 12345
    }
  }
}
```

<!-- When an Appium server is started via the `appium` executable, the `init` function in `lib/main.js` will call into `lib/config-file.js` to load and/or search for a configuration file and in `package.json`. -->
Appium Serverを `appium` 実行ファイルから起動すると、`lib/main.js` の `init` 関数が `lib/config-file.js` を呼び出し、設定ファイルの読み込みと検索、および `package.json` の検索を行います。

!!! note

    <!-- It is not an error if configuration isn't found! -->
    コンフィギュレーションが見つからなくてもエラーにはなりません！

<!-- The [`lilconfig`](https://npm.im/lilconfig) package provides the search & load functionality; refer to its documentation for more information about the search paths. Additionally, Appium provides support for config files written in YAML via the package [`yaml`](https://npm.im/yaml). -->
[`lilconfig`](https://npm.im/lilconfig)パッケージは、検索とロードの機能を提供します。検索パスの詳細については、その文書を参照してください。さらに、Appium は [`yaml`](https://npm.im/yaml) パッケージによって、YAML で書かれた設定ファイルのサポートを提供しています。

<!-- If a config file is found and successfully [validated](#validation), the result will be merged with a set of defaults and any additionall CLI arguments. CLI arguments have precedence over config files, and config files have precedence over defaults. -->
設定ファイルが見つかり、[検証](#validation)に成功した場合、その結果はデフォルトのセットと追加されたCLI引数とマージされます。CLI引数は設定ファイルより優先され、設定ファイルはデフォルトより優先されます。

<!-- ## Validation -->
## 検証(Validation)

<!-- The same system is used for _both_ validation of config files _and_ command-line arguments. -->
設定ファイルの検証とコマンドライン引数の検証の両方に、同じシステムが使用されます。

<!-- The package [`ajv`](https://npm.im/ajv) provides validation. Of course, to make `ajv` validate anything, it must be provided a _schema_. -->
パッケージ [`ajv`](https://npm.im/ajv) は検証を提供します。もちろん、`ajv`に検証をさせるためには、スキーマを提供する必要があります。

<!-- The _base_ schema is a [JSON Schema Draft-7](https://json-schema.org/draft/2020-12/json-schema-core.html)-compliant object exported by `lib/schema/appium-config-schema.js`. This schema defines configuration _native to Appium_, and only concerns its behavior as a _server_; it does not define configuration for any other functionality (e.g., the `plugin` or `driver` subcommands). -->
基本スキーマ（構造）は `lib/schema/appium-config-schema.js` によって出力される [JSON Schema Draft-7](https://json-schema.org/draft/2020-12/json-schema-core.html) に準拠したオブジェクトです。このスキーマは、Appium_のネイティブな設定を定義し、_server_としての動作にのみ関係します。他の機能（例えば、`plugin`や`driver`サブコマンド）の設定は定義しません。


!!! warning

    <!-- Note that this file is the _base_ schema; this will become painfully relevant. -->
    このファイルは _base_ schema であることに注意してください; これは痛烈に関連することになるでしょう。

<!-- This file is is _not_ a JSON file, because  -->
このファイルはJSONファイルではありません。

<!-- a) JSON is painful to work with for humans, 
b) is especially reviled by @jlipps, and 
c) `ajv` accepts objects, not JSON files. -->
a) JSONは人間にとって扱いにくいものです    
b) @jlippsに特に嫌われています   
c) `ajv` はオブジェクトを受け付けますが、JSONファイルではありません   

<!-- It is more straightforward to explain how config files are validated, so we'll start there. -->
設定ファイルをどのように検証するかを説明する方がよりわかりやすいので、そこから始めましょう。

<!-- ### Validating Config Files -->
### 設定ファイルの検証

<!-- When a config file is found (`lib/config-file.js`), it will call the `validate` function exported from `lib/schema/schema.js` with the contents of the config file. In turn, this asks `ajv` to validate the data against the schema that Appium has provided it. -->
設定ファイルが見つかると (`lib/config-file.js`) 、 `lib/schema/schema.js` からエクスポートされた `validate` 関数を、設定ファイルの内容とともに呼び出します。この関数は `ajv` に、Appium が提供したスキーマに対してデータを検証するように要求します。

<!-- If the config file is invalid, errors will be generated to be displayed to the user. Finally, the `init` function will detect these errors, display them, and the process will exit. -->
設定ファイルが無効な場合は、エラーが生成され、ユーザーに表示されます。最後に、`init`関数がこれらのエラーを検出し、表示し、プロセスが終了します。

<!-- I hope that made sense, because this is the easy part. -->
これが簡単な部分なので、ご理解いただけたでしょうか？

<!-- ### Validating CLI Arguments -->
### CLI 引数の検証

<!-- As mentioned earlier, the same system is used for validating both config files and CLI arguments. -->
前述したように、設定ファイルとCLI引数の検証には同じシステムが使用されています。

<!-- Totally not judging, but Appium uses [`argparse`](https://npm.im/argparse) for its CLI argument parsing. This package, and others like it, provides an API to define the arguments a command-line Node.js script accepts, and will ultimately return an object representation of the user-supplied arguments. -->
全くもって判断に迷うところですが、AppiumはCLI引数のパースに[`argparse`](https://npm.im/argparse)を使用しています。このパッケージや他のパッケージは、コマンドラインのNode.jsスクリプトが受け入れる引数を定義するためのAPIを提供し、最終的にユーザが提供した引数のオブジェクト表現を返します。

<!-- Just as the schema defines what's allowed in a config file, it also defines what's allowed on the command-line. -->
スキーマが設定ファイルで許可されるものを定義するのと同じように、コマンドラインで許可されるものも定義します。

<!-- #### Defining CLI Arguments via Schema -->
#### スキーマによるCLI引数の定義

<!-- CLI arguments must be _defined_ before their values can be validated. -->
CLI引数は、その値が検証される前に_定義されなければなりません。

<!-- A JSON schema isn't a natural fit for defining CLI args--it needs some grease to make it work--but it's close enough that we can do so with an adapter and some custom metadata. -->
JSONスキーマはCLIの引数を定義するのに適しているとは言えませんが、アダプタとカスタムのメタデータを使えば十分可能です。

<!-- In `lib/cli/parser.js`, there's a wrapper around `argparse`'s `ArgumentParser`; it's called (wait for it)... `ArgParser`. The wrapper exists because we're doing some custom things with `argparse`, but is has nothing to do with the schema directly. -->
`lib/cli/parser.js`には `argparse` の `ArgumentParser` をラップするものがあります; その名前は（ちょっと待て）...。ArgParser`と呼ばれています。このラッパーは `argparse` でいくつかのカスタム処理を行うために存在しますが、スキーマとは直接関係ありません。

<!-- An `ArgParser` instance is created and its `parseArgs()` method is called with the raw CLI arguments. The definition of the accepted arguments comes from `lib/cli/args.js` in part--here, all of the arguments _not_ intended for use with the `server` subcommand are hard-coded (e.g., the `driver` subcommand and _its_ subcommands). `args.js` also contains a function `getServerArgs()`, which in turn calls into `toParserArgs` in `lib/schema/cli-args.js`. `lib/schema/cli-args.js` can be considered the "adapter" layer between `argparse` and the schema. -->
`ArgParser` のインスタンスが作成され、その `parseArgs()` メソッドが生の CLI 引数で呼ばれます。引数の定義は `lib/cli/args.js` から一部引用しています。ここでは、`server` サブコマンドで使用することを意図しない引数はすべてハードコーディングされています（例えば、`driver` サブコマンドと _its_ サブコマンドなど）。`args.js` には `getServerArgs()` という関数があり、この関数は `lib/schema/cli-args.js` にある `toParserArgs` を呼び出す。`lib/schema/cli-args.js` は `argparse` とスキーマの間の「アダプター」層と考えられます。

<!-- `toParserArgs` uses the `flattenSchema` function exported by `lib/schema/schema.js`, which "squashes" the schema into a key/value representation. Then, `toParserArgs` iterates over each key/value pair and "converts" it into a suitable `ArgumentOption` object for final handoff to `ArgParser`. -->
`toParserArgs` は `lib/schema/schema.js` によってエクスポートされた `flattenSchema` 関数を使用して、スキーマをキー/バリュー表現に「つぶす」。そして、 `toParserArgs` は各キーと値のペアを繰り返し処理し、最終的に `ArgParser` に渡すために適切な `ArgumentOption` オブジェクトに "変換" します。

<!-- This adapter (`cli-args.js`) is where most of the mess is hidden; let's explore this rat's nest a bit further. -->
このアダプタ（`cli-args.js`）は、ほとんどの混乱が隠されている場所です。このネズミの巣をもう少し詳しく調べてみましょう。

<!-- ##### CLI & Schema Incongruities -->
##### CLI とスキーマの不整合

<!-- The conversion algorithm (see function `subSchemaToArgDef` in `lib/schema/cli-args.js`) is mostly just hacks and special cases neatly packed into a function. Things that don't cleanly map from `argparse` to a JSON schema include, but are not limited to: -->
変換アルゴリズム（`lib/schema/cli-args.js`の関数 `subSchemaToArgDef` を参照）は、ほとんどがハックと特殊なケースを関数にきれいにまとめただけです。argparse` から JSON スキーマにきれいにマッピングできないものには、以下のようなものがありますが、これらに限定されるものではありません：

<!-- - A schema cannot natively express "store the value of `--foo=<value>` in a property called `bar`" in a schema (this corresponds to the `ArgumentOption['dest']` prop).
- A schema cannot natively express aliases; e.g., `--verbose` can also be `-v`
- A schema `enum` is not restricted to multiple types, but `argparse`'s equivalent `ArgumentOption['choices']` prop _is_
- A schema does not know about `argparse`'s concept of "actions" (note that Appium is not currently using custom actions--though it did, and it could again).
- `argparse` has no native type for `email`, `hostname`, `ipv4`, `uri` etc., and the schema does
- Schema validation only _validates_, it does not perform translation, transformation, or coercion (mostly). `argparse` allows this.
- Schemas allow the `null` type, for whatever reason. Ever pass `null` on the CLI?
- `argparse` does not understand anything other than primitives; no objects, arrays, etc., and certainly not arrays of a particular type. -->

- スキーマでは、「`--foo=<value>` の値を `bar` というプロパティに格納する」ことをネイティブに表現できません（これは `ArgumentOption['dest']` prop に対応します）。
- スキーマはネイティブにエイリアスを表現できません。例えば、 `--verbose` は `-v` にもなります。
- スキーマの `enum` は複数の型に制限されないが、 `argparse` と同等の `ArgumentOption['choices']` prop _is_ がある。
- スキーマは `argparse` の "アクション" の概念を知りません（Appium は現在カスタムアクションを使用していないことに注意してください--以前は使用していましたし、再び使用もできます）。
- argparse` は `email`, `hostname`, `ipv4`, `uri` などのネイティブな型を持っておらず、スキーマはそのような型を持っている。
- スキーマのバリデーションは_validates_だけで、翻訳、変換、強制を行いません（ほとんど）。argparse`はこれを可能にします。
- スキーマは何らかの理由で `null` 型を許可しています。CLIで `null` を渡したことがありますか？
- オブジェクトや配列などは理解できませんし、特定の型の配列も理解できません。

<!-- All of the above cases and others are handled by the adapter. -->
上記のケースを含め、すべてアダプターで対応します。

!!! warning

    <!-- Some decisions made in the adapter were arrived at via coin toss. If you are curious about why something is the way it is, it's likely that it had to do _something_. -->
    アダプターで行われたいくつかの決定は、コイントスでたどり着いたものです。何かがなぜそうなっているのか気になる場合、それは*何か*をしなければならなかったと思われます。

<!-- Let's look more closely at handling types. -->
型の扱いについて、もう少し詳しく見てみましょう。

<!-- #### Argument Types via `ajv` -->
#### `ajv` による引数型の処理

<!-- While `argparse` allows consumers, via its API, to define the _type_ of various arguments (e.g., a string, number, boolean flag, etc.), Appium mostly avoids these built-in types. _Why is that?_ Well: -->
`argparse`では、APIを通じて利用者がさまざまな引数の型（文字列、数値、ブーリアンフラグなど）を定義できますが、Appiumではこれらの組み込み型を避けることがほとんどです。_なぜでしょうか？_ さて：

<!-- 1. We already know the type of an argument, because we've defined it in a schema.
2. `ajv` provides validation against a schema.
3. A schema allows for greater expression of types, allowed values, etc., than `argparse` can provide natively.
4. The expressiveness of a schema allows for better error messaging. -->

1. スキーマで定義しているので、引数の型はすでに知っている。
2. `ajv` はスキーマに対するバリデーションを提供します。
3. スキーマは `argparse` がネイティブで提供できるよりも、型や許容値などをより多く表現することができる。
4. スキーマの表現力により、より良いエラーメッセージを提供できます。

<!-- To that end, the adapter eschews `argparse`'s built-in types (see allowed string values of `ArgumentOption['type']`) and instead abuses the ability to provide a _function_ as a `type`. The exception is _boolean_ flags, which do not have a `type`, but rather `action: 'store_true'`. The world may never know why. -->
そのために、このアダプタは `argparse` の組み込み型 (`ArgumentOption['type']` の許容される文字列値を参照) を避け、代わりに `function_` を `type` として提供する機能を悪用しています。例外は _boolean_ フラグで、これは `type` を持たず、 `action: 'store_true'` を持つ。その理由はまだわからないかもしれません。

<!-- ##### Types as Functions -->
##### 関数としての型

<!-- When a `type` is a function, the function performs both validation _and_ coercion (if necessary). So what are these functions? -->
型が関数である場合、関数は検証_と強制(必要な場合)の両方を実行します。では、これらの関数は何なのでしょうか？

<!-- > Note: `type` is _omitted_ (and thus _not_ a function) from the `ArgumentOption` if the property
> type is `boolean`, and is instead provided an `action` property of `store_true`. Yes, this is
> weird. No, I don't know why. -->
> 注意: `type` が `boolean` である場合、 `ArgumentOption` からは `type` が省略されます (つまり、関数ではありません)。
> そして、代わりに `store_true` という `action` プロパティが提供されます。はい、これは
> 変です。いや、なぜなのかわからない。

<!-- Well... it depends upon the schema. But generally speaking, we create a _pipeline_ of functions, each corresponding to a keyword in the schema. Let's take the example of the `port` argument. In lieu of asking the OS which ports the `appium`-running user can bind to, this argument is expected to be an integer between 1 and 65535. This turns out to be two functions which we combine into a pipeline: -->
まあ...それはスキーマによりますね。しかし、一般的には、スキーマのキーワードに対応する関数のパイプラインを作成します。例えば、`port`という引数を例にとって考えてみましょう。この引数は、`appium`を実行するユーザーがバインドできるポートをOSに尋ねる代わりに、1～65535の間の整数にすることが期待されています。これは、2つの関数をパイプラインにまとめたものであることがわかります：

<!-- 1. Convert the value to an integer, if possible. Because _every value in `process.argv` is a string_, we must coerce if we want a number.
2. Use `ajv` to validate the integer against the schema for `port`. A schema lets us define a range via the `minimum` and `maximum` keywords. Read more about how this works in -->

1. 可能であれば、値を整数に変換する。`process.argv`のすべての値は文字列であるため、数値が必要な場合は強制的に変換しなければならない。
2. `ajv` を使って、整数を `port` のスキーマに照らし合わせて検証する。スキーマは `minimum` と `maximum` というキーワードで範囲を定義することができる。この仕組みについて詳しくは

<!-- Much like the config file validation, if errors are detected, Appium nicely tells the end-user and the process exits w/ some help text. -->
設定ファイルの検証のように、エラーが検出された場合、Appiumはエンドユーザーにうまく伝え、ヘルプテキストとともにプロセスを終了させます。

<!-- For other arguments which are naturally of non-primitive types, things are not so straightforward. -->
その他の引数で、当然ながら原始的でない型の場合は、それほど簡単ではありません。

<!-- ##### Transformers -->
##### トランスフォーマー

<!-- Remember how `argparse` doesn't understand arrays? What if the most ergonomic way to express a value is, in fact, an array? -->
`argparse` が配列を理解できないことを思い出してください。もし、ある値を表現する最も人間工学的な方法が、実際には配列であったとしたらどうでしょうか？

<!-- Well, Appium can't accept an array on the CLI, even though it can accept one in the config file. But Appium _can_ accept a comma-delimited string (a CSV "line"). Or a string filepath referring to a file which _contains_ a delimited list. Either way: by the time the value gets out of the argument parser, it should be an array. -->
さて、AppiumはCLI上では配列を受け入れることができません。しかし、Appiumはカンマ区切りの文字列（CSVの "行"）を受け入れることができます。または、区切られたリストを含むファイルを参照する文字列 filepath。いずれにせよ、値が引数パーサーから出る頃には、それは配列になっているはずです。

<!-- And as mentioned above, the native facilities of a JSON schema cannot express this. However, it's possible to define a _custom keyword_ which Appium can then detect and handle accordingly. So that's what Appium does. -->
そして、前述のように、JSONスキーマのネイティブ機能ではこれを表現できません。しかし、カスタムキーワードを定義することで、Appiumがそれを検出し、それに応じて処理することは可能です。だから、Appiumはそうしているのです。

<!-- In this case, a custom keyword `appiumCliTransformer` is registered with `ajv`. The value of `appiumCliTransformer` (at the time of this writing) can be `csv` or `json`. In the base schema file, `appium-config-schema.js`, Appium uses `appiumCliTransformer: 'csv'` if this behavior is desired. -->
今回は、カスタムキーワード `appiumCliTransformer` が `ajv` に登録されています。appiumCliTransformer` の値には（本稿執筆時点では） `csv` または `json` を指定することができる。ベースとなるスキーマファイル `appium-config-schema.js` において、Appium はこの動作が必要な場合に `appiumCliTransformer: 'csv'` を使用します。

<!-- !!! note

    Any property defined in the schema having type `array` will _automatically_ uses the `csv` transformer. Likewise, a property having type `object` will use the `json` transformer. It's conceivable that `array` may want to use the `json` transformer, but otherwise, the presence of the `appiumCliTransformer` keyword on an `array`-or-`object`-typed property is not stricly necessary. -->
!!! note
    スキーマで定義された `array` 型のプロパティは、自動的に `csv` トランスフォーマーを使用します。同様に、`object`型を持つプロパティは、`json`トランスフォーマーを使用します。しかし、`array` や `object` 型のプロパティに `appiumCliTransformer` キーワードが存在することは、厳密には必要ではありません。

<!-- The adapter (remember the adapter?) creates a pipeline function including a special "CSV transformer" (transformers are defined in `lib/schema/cli-transformers.js`), and uses this function as the `type` property of the `ArgumentOption` passed into `argparse`. In this case, the `type: 'array'` in the schema is ignored. -->
アダプタは（アダプタを覚えていますか）、特別な "CSV トランスフォーマー" を含むパイプライン関数を作成し（トランスフォーマーは `lib/schema/cli-transformers.js` で定義されています）、この関数を `argparse` に渡される `ArgumentOption` の `type` プロパティとして使用します。この場合、スキーマにある `type: 'array'` は無視される。

<!-- !!! note

    The config file doesn't _need_ to perform any complex transformation of values, because it naturally allows Appium to define exactly what it expects. So Appium does no post-processing of config file values. -->
!!! note
    設定ファイルでは、値の複雑な変換を行う必要はありません。なぜなら、当然ながらAppiumが期待するものを正確に定義することができるためです。そのため、Appiumはconfigファイルの値の後処理を行いません。

<!-- Properties that do not need this special treatment use `ajv` directly for validation. How this works requires some explanation, so that's next. -->
この特別な処理を必要としないプロパティは、検証のために `ajv` を直接使用します。これがどのように機能するかは説明が必要なので、次に説明します。

<!-- #### Validation of Individual Arguments via `ajv` -->
#### `ajv` による個々の引数の検証

<!-- When we think of a JSON schema, we tend to think, "I have this JSON file and I want to validate it against the schema". That's valid, and in fact Appium does just that with config files! However, Appium does not do this when validating arguments. -->
JSONスキーマについて考えるとき、私たちは「このJSONファイルを持っていて、スキーマに対してバリデーションを行いたい」と考えがちです。それはそれで正しいですし、実際Appiumは設定ファイルでそれを行っています！しかし、Appiumは引数のバリデーションを行う際に、このようなことは行いません。

<!-- !!! note

    During implementation, I was tempted to mash all of the arguments together into a config-file-like data structure and then validate it all at once. I think that would have been _possible_, but since an object full of CLI arguments is a flat key/value structure and the schema is not, this seemed like trouble. -->
!!! note
    実装中、私はすべての引数をconfig-fileのようなデータ構造にマッシュアップし、それを一度に検証する誘惑にかられました。しかし、CLI の引数でいっぱいのオブジェクトはフラットなキー/バリュー構造で、スキーマはそうではないので、これはトラブルのように思えました。

<!-- Instead, Appium validates a value against a specific property _within_ the schema. To do this, it maintains a mapping between a CLI argument definition and its corresponding property. The mapping itself is a `Map` with a unique identifier for the argument as the key, and an `ArgSpec` (`lib/schema/arg-spec.js`) object as the value. -->
その代わりに、Appiumはスキーマの中の特定のプロパティに対して値を検証します。そのために、CLI引数の定義とそれに対応するプロパティの間のマッピングを保持します。マッピング自体は `Map` で、キーとして引数の一意な識別子、値として `ArgSpec` (`lib/schema/arg-spec.js`) オブジェクトがあります。

<!-- An `ArgSpec` object stores the following metadata: -->
`ArgSpec`オブジェクトは以下のメタデータを格納する：

<!-- | Property Name   | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `name`          | Canonical name of the argument, corresponding to the property name in the schema.     |
| `extType?`      | `driver` or `plugin`, if appropriate                                                  |
| `extName?`      | Extension name, if appropriate                                                        |
| `ref`           | Computed `$id` of the property in the schema                                          |
| `arg`           | Argument as accepted on CLI, without leading dashes                                   |
| `dest`          | Property name in parsed arguments object (as returned by `argparse`'s `parse_args()`) |
| `defaultValue?` | Value of the `default` keyword in schema, if appropriate                              | -->

| プロパティ名      | 説明                                                                                   |
| --------------- | ------------------------------------------------------------------------------------- |
| `name`          | スキーマのプロパティ名に対応する、引数の正式な(Canonical)名前です                              |
| `extType?`      | `driver` または `plugin` (適切な場合)                                                   |
| `extName?`      | 拡張機能名（適切な場合）                                                                  |
| `ref`           | スキーマ内のプロパティの `$id` を計算したもの                                               |
| `arg`           | CLI で使用する引数（先頭のダッシュを除く）                                                  |
| `dest`          | 解析された引数オブジェクトのプロパティ名（`argparse`の `parse_args()` が返す）                |
| `defaultValue?` | スキーマの `default` キーワードの値（適切な場合）                                           |

<!-- When a schema is [finalized](#schema-finalization), the `Map` is populated with `ArgSpec` objects for all known arguments. -->
キーマが [finalized](#schema-finalization) されると、`Map` にすべての既知の引数に対する `ArgSpec` オブジェクトが格納されます。

<!-- So when the adapter is creating the pipeline of functions for the argument's `type`, it already has an `ArgSpec` for the argument. It creates a function which calls `validate(value, ref)` (in `lib/schema/schema.js`) where `value` is whatever the user provided, and `ref` is the `ref` property of the `ArgSpec`. The concept is that `ajv` can validate using _any_ `ref` it knows about; each property in a schema can be referenced by this `ref` whether it's defined or not. To help visualize, if a schema is: -->
そのため、アダプタが引数の `type` に対応した関数のパイプラインを作成する際には、すでに引数の `ArgSpec` を用意しています。このとき、`validate(value, ref)` (`lib/schema/schema.js` 内) を呼び出す関数が作成される。ここで、`value` はユーザが指定したもの、 `ref` は `ArgSpec` の `ref` 属性である。スキーマの各プロパティは、定義されているかどうかにかかわらず、この `ref` によって参照できます。スキーマの各プロパティは、定義されているかどうかに関わらず、この `ref` によって参照できます：

```json
{
  "$id": "my-schema.json",
  "type": "object",
  "properties": {
    "foo": {
      "type": "number"
    }
  }
}
```

<!-- The `ref` of `foo` would be `my-schema.json#/properties/foo`. Assuming our `Ajv` instance knows about this `my-schema.json`, then we can call its `getSchema(ref)` method (which has a `schema` property, but is a misnomer nonetheless) to get a validation function; `validate(value, ref)` in `schema.js` calls this validation function. -->
foo` の `ref` は `my-schema.json#/properties/foo` です。Ajv`インスタンスがこの `my-schema.json` を知っていると仮定すると、その `getSchema(ref)` メソッド（これは `schema` プロパティを持ちますが、それにしても誤った名称です）を呼び出してバリデーション関数を取得できます； `schema.js` の `validate(value, ref)` はこのバリデーション関数を呼び出します。

<!-- !!! note

    The schema spec says a schema author can supply an explicit `$id` keyword to override this; it's unsupported by Appium at this time. If needed, extension authors must carefully use `$ref` without custom `$id`s. It's highly unlikely an extension would have a schema so complicated as to need this, however; Appium itself doesn't even use `$ref` to define its own properties! -->
!!! note
    キーマの仕様では、スキーマの作者はこれを上書きするために明示的な `$id` キーワードを提供することができるとされていますが、現時点ではAppiumではサポートされていません。Appium では今のところサポートされていません。必要であれば、拡張機能の作者はカスタム `$id` を使わずに `$ref` を慎重に使用しなければなりません。Appium 自身は、自身のプロパティを定義するために `$ref` を使用することすらありません！

<!-- Next, let's take a look at how Appium loads schemas. This actually happens _before_ any argument validation. -->
次に、Appium がどのようにスキーマをロードするかを見てみましょう。これは実際には、引数のバリデーションの前に行われます。

<!-- ## Schema Loading -->
## スキーマの読み込み

<!-- Let's ignore extensions for a moment, and start with the base schema. -->
拡張機能を無視して、ベーススキーマから始めましょう。

<!-- When something first imports the `lib/schema/schema.js` module, an instance of an `AppiumSchema` is created. This is a singleton, and its methods are exported from the module (all of which are bound to the instance). -->
最初に `lib/schema/schema.js` モジュールをインポートすると、`AppiumSchema` のインスタンスが生成されます。これはシングルトンであり、そのメソッドはモジュールからエクスポートされます（すべてインスタンスにバインドされます）。

<!-- The constructor does very little; it instantiates an `Ajv` instance and configures it with Appium's [custom keywords](#custom-keyword-reference) and adds support for the `format` keyword via the [ajv-formats](https://npm.im/ajv-formats) module. -->
コンストラクタはほとんど何もしません。`Ajv` インスタンスをインスタンス化して、Appium の [custom keywords](#custom-keyword-reference) で設定し、[ajv-formats](https://npm.im/ajv-formats) モジュールを介して `format` キーワードのサポートを追加しています。

<!-- Otherwise, the `AppiumSchema` instance does not interact with the `Ajv` instance until its `finalize()` method (exported as `finalizeSchema()`) is called. When this method is called, we're saying "we are not going to add any more schemas; go ahead and create `ArgSpec` objects and register schemas with `ajv`". -->
それ以外の場合、`AppiumSchema` インスタンスは、その `finalize()` メソッド（`finalizeSchema()` としてエクスポートされます）が呼ばれるまで `Ajv` インスタンスと対話しません。このメソッドが呼ばれると、「これ以上スキーマを追加するつもりはないので、先に `ArgSpec` オブジェクトを作成して `ajv` にスキーマを登録しておいてください」と言うことです。

<!-- When does finalization happen? Well: -->
ファイナライズはいつ行われるのですか？そうですね：

<!-- 1. When the `appium` executable begins, it _checks for and configures extensions_ (hand-wave) in `APPIUM_HOME`.
2. Only then does it start to think about arguments--it instantiates an `ArgParser`, which (as you'll recall) runs the adapter to convert the schema to arguments.
3. _Finalization happens here_--when creating the parser. Appium need the schema(s) to be registered with `ajv` in order to create validation functions for arguments.
4. Thereafter, Appium parses the arguments with the `ArgParser`.
5. Finally, decides what to do with the returned object. -->
1. appium`の実行ファイルが起動すると、`APPIUM_HOME`にある拡張機能のチェックと設定（ハンドウェーブ）が行われます。
2. このとき、スキーマを引数に変換するためのアダプタを実行する `ArgParser` をインスタンス化します。
3. 最終的な処理はここで行われます。Appiumは、引数の検証関数を作成するために、スキーマを `ajv` に登録する必要があります。
4. その後、Appium は `ArgParser` で引数をパースします。
5. 最後に、返されたオブジェクトをどうするか決めます。

<!-- Without extensions, `finalize()` still knows about the Appium base schema (`appium-config-schema.js`), and just registers that. However, step 1. above is doing a _lot of work_, so let's look at how extensions come into play. -->
拡張機能がない場合、`finalize()`はAppiumのベーススキーマ(`appium-config-schema.js`)を知っていて、それを登録するだけです。しかし、上記のステップ1.は_多くの作業を行っているので、拡張機能がどのように作用するのかを見てみましょう。

<!-- ## Extension Support -->
## 拡張機能のサポート

<!-- One of the design goals of this system is the following: -->
このシステムの設計目標の1つは、以下の通りです：

<!-- _An extension should be able to register custom CLI arguments with the Appium, and a user should be able to use them like any other argument_. -->
拡張機能はAppiumにカスタムCLI引数を登録でき、ユーザはそれを他の引数のように使用できるようにすること_。

<!-- Previously, Appium 2.0 accepted arguments in thiszs the configuration on the command-line. Further, no contextual help (via `--help`) existed for these arguments. -->
以前、Appium 2.0はこの方法で（`--driverArgs`を介して）引数を受け入れましたが、バリデーションはハンドロールで、拡張機能の実装者がカスタムAPIを使用する必要がありました。また、コマンドラインで設定としてJSON文字列を渡すという厄介なことも必要でした。さらに、これらの引数に対するContextヘルプ(`--help`)は存在しませんでした。

<!-- Now, by providing a schema for its options, a driver or plugin can register CLI arguments and config file schemas with Appium. -->
現在では、オプションのスキーマを提供することで、ドライバやプラグインはCLI引数や設定ファイルのスキーマをAppiumに登録できます。

<!-- To register a schema, an extension must provide the `appium.schema` property in its `package.json`. The value may be a schema or a path to a schema. If the latter, the schema should be JSON or a CommonJS module (ESM not supported at this time, nor is YAML). -->
スキーマを登録するには、拡張機能の `package.json` に `appium.schema` プロパティを指定する必要があります。このプロパティにはスキーマを指定するか、スキーマへのパスを指定できます。後者の場合、スキーマはJSONかCommonJSモジュールでなければなりません（ESMは現時点ではサポートされていませんし、YAMLもサポートされていません）。

<!-- For any property in this schema, the property will appear as a CLI argument of the form `--<extension-type>-<extension-name>-<property-name>`. For example, if the `fake` driver provides a property `foo`, the argument will be `--driver-fake-foo`, and will show in `appium server --help` like any other CLI argument. -->
このスキーマ内の任意のプロパティに対して、プロパティは `--<extension-type>-<extension-name>-<property-name>` という形式のCLI引数として表示されます。例えば、`fake` ドライバがプロパティ `foo` を提供する場合、その引数は `--driver-fake-foo` となり、他の CLI 引数と同様に `appium server --help` で表示されます。

<!-- The corresponding property in a config file would be `server.<extension-type>.<extension-name>.<property-name>`, e.g.: -->
設定ファイルの対応するプロパティは `server.<extension-type>.<extension-name>.<property-name>` となり、例えば以下のようです：

```json
{
  "server": {
    "driver": {
      "fake": {
        "foo": "bar"
      }
    }
  }
}
```

<!-- The naming convention described above avoids problems of one extension type having a name conflict with a different extension type. -->
上記の命名規則により、ある拡張型が別の拡張型と名前が衝突する問題を回避できます。

<!-- !!! note

    While an extension can provide aliases via `appiumCliAliases`, "short" flags are disallowed, since all arguments from extensions are prefixed with `--<extension-type>-<extension-name>-`. The extension name and argument name will be kebab-cased for the CLI, according to [Lodash's rules](https://lodash.com/docs/4.17.15#kebabCase) around kebab-casing. -->

!!! note
    拡張機能は `appiumCliAliases` によってエイリアスを提供できますが、拡張機能からの引数はすべて `--<extension-type>-<extension-name>-` で始まるため、"short"フラグは禁止されています。拡張機能名と引数名は、CLIでは[Lodashのルール](https://lodash.com/docs/4.17.15#kebabCase)のケバブケースにしたがって、変換されます。

<!-- The schema object will look much like Appium's base schema, but it will only have top-level properties (nested properties are currently unsupported). Example: -->
スキーマオブジェクトはAppiumのベーススキーマとよく似ていますが、トップレベルのプロパティしか持ちません（ネストしたプロパティは現在サポートされていません）。

例：

```json
{
  "title": "my rad schema for the cowabunga driver",
  "type": "object",
  "properties": {
    "fizz": {
      "type": "string",
      "default": "buzz",
      "$comment": "corresponds to CLI --driver-cowabunga-fizz"
    }
  }
}
```

<!-- As written in a user's config file, this would be the `server.driver.cowabunga.fizz` property. -->
ユーザーの設定ファイルに書くと、これは `server.driver.cowabunga.fizz` プロパティです。

<!-- When extensions are loaded, the `schema` property is verified and the schema is registered with the `AppiumSchema` (it is _not_ registered with `Ajv` until `finalize()` is called). -->
拡張機能がロードされると、`schema` プロパティが検証され、スキーマが `AppiumSchema` に登録されます（`finalize()` が呼ばれるまで `Ajv` には登録_されません_）。

<!-- During finalization, each registered schema is added to the `Ajv` instance. The schema is assigned an `$id` based on the extension type and name (which overrides whatever the extension provides, if anything). Schemas are also forced to disallowed unknown arguments via the `additionalProperties: false` keyword. -->
終了時、登録されたスキーマが `Ajv` インスタンスに追加される。スキーマには、拡張機能の種類と名前に準拠した `$id` が割り当てられる（拡張機能が提供するものがあれば、それを優先する）。また、スキーマは `additionalProperties: false` キーワードによって、未知の引数を許可しないように強制されます。

<!-- Behind the scenes, the base schema has `driver` and `plugin` properties which are objects. When finalized, a property is added to each--corresponding to an extension name--and the value of this property is a reference to the `$id` of a property in the extension schema. For example, the `server.driver` property will look like this: -->
裏側では、ベーススキーマはオブジェクトである `driver` と `plugin` プロパティを持っています。このプロパティの値は、拡張スキーマのプロパティの `$id` への参照です。例えば、`server.driver`のプロパティは次のようです：

```json
{
  "driver": {
    "cowabunga": {
      "$ref": "driver-cowabunga.json"
    }
  }
}
```

<!-- This is why we call it the "base" schema--it is _mutated_ when extensions provide schemas. The extension schemas are kept separately, but the _references_ are added to the schema before it's ultimately added to `ajv`. This works because an `Ajv` instance understands references _from_ any schema it knows about _to_ any schema it knows about. -->
このスキーマを "ベース "スキーマと呼んでいるのは、拡張機能がスキーマを提供するときに "ベース "スキーマを変更するためです。拡張のスキーマは別に保管されますが、最終的に `ajv` に追加される前に、スキーマに _references_ が追加されます。これは、`Ajv`のインスタンスが、自分が知っているスキーマから、自分が知っているスキーマへの参照を理解するために機能します。

<!-- !!! note

This makes it impossible to provide a complete static schema for Appium _and_ the installed extensions (as of Nov 5 2021). A static `.json` schema _is_ generated from the base (via a Gulp task), but it does not contain any extension schemas. The static schema also has uses beyond Appium; e.g., IDEs can provide contextual error-checking of config files this way. Let's solve this? -->
!!! note
    このため、Appium _とインストールされている拡張機能のための完全な静的スキーマを提供することは不可能です（2021年11月5日現在）。静的な `.json` スキーマは（Gulpタスクによって）ベースから生成されますが、拡張スキーマは含まれません。静的スキーマはAppium以外の用途にも使えます。例えば、IDEはこの方法で設定ファイルのContextエラーチェックを提供できます。これを解決しましょうか？

<!-- Just like how we look up the reference ID of a particular argument in the base schema, validation of arguments from extensions happens the exact same way. If the `cowabunga` driver has the schema ID `driver-cowabunga.json`, then the `fizz` property can be referenced from any schema registered with `ajv` via `driver-cowabunga.json#/properties/fizz`. "Base" schema arguments begin with `appium.json#properties/` instead. -->
ベーススキーマで特定の引数の参照IDを調べる方法と同じように、拡張機能からの引数の検証も全く同じように行われます。もし`cowabunga`ドライバがスキーマID `driver-cowabunga.json` を持っていれば、`fizz`プロパティは `driver-cowabunga.json#/properties/fizz` を介して `ajv` に登録したどのスキーマからでも参照することができる。"ベース "スキーマの引数は、代わりに `appium.json#properties/` で始まります。

<!-- ## Development Environment Support -->
## 開発環境のサポート

<!-- During the flow of development, a couple extra tasks have been automated to maintain the base schema: -->
開発の流れの中で、ベーススキーマを維持するために、いくつかの追加タスクが自動化されました：

<!-- - As a post-transpilation step, a `lib/appium-config.schema.json` gets generated from
- `lib/schema/appium-config-schema.js` (in addition to its CJS counterpart generated by Babel).
- This file is under version control. It ends up being _copied_ to
- `build/lib/appium-config.schema.json` in this step. A pre-commit hook (see
- `scripts/generate-schema-declarations.js` in the root monorepo) generates
- a `types/appium-config-schema.d.ts` from the above JSON file. The types in `types/types.d.ts`
- depend upon this file. This file is under version control. -->
- コンパイル後のステップとして、`lib/appium-config.schema.json`が以下の場所から生成されます。
- 翻訳後のステップとして、`lib/schema/appium-config-schema.js`から `lib/appium-config.schema.json` が生成されます（Babelによって生成されるCJS対応ファイルに加えて）。
- このファイルはバージョン管理下にあります。このファイルはバージョン管理下にあり、最終的に
- このステップでは `build/lib/appium-config.schema.json` にコピーされます。コミット前のフック (
- scripts/generate-schema-declarations.js`を参照)が生成します。
- types/appium-config-schema.d.ts`を生成します。types/types.d.ts`の型は、このファイルに依存しています。
- の型はこのファイルに依存する。このファイルはバージョン管理下にあります。

<!-- ## Custom Keyword Reference -->
## カスタムキーワードリファレンス

<!-- Keywords are defined in `lib/schema/keywords.js`. -->
キーワードは `lib/schema/keywords.js` で定義されています。

<!-- - `appiumCliAliases`: allows a schema to express aliases (e.g., a CLI argument can be `--verbose` or `-v`). This is an array of strings. Strings shorter than three (3) characters will begin with a single dash (`-`) instead of a double-dash (`--`). Note that any argument provided by an extension will begin with a double-dash, because these are required to have the `--<extension-type>-<extension-name>-` prefix.
- `appiumCliDest`: allows a schema to specify a custom property name in the post-`argprase` arguments objects. If not set, this becomes a camelCased string.
- `appiumCliDescription`: allows a schema to override the description of the argument when displayed on the command-line. This is useful paired with `appiumCliTransformer` (or `array`/`object`-typed properties), since there's a substantial difference between what a CLI-using user can provide vs. what a config-file-using user can provide.
- `appiumCliTransformer`: currently a choice between `csv` and `json`. These are custom functions which post-process a value. They are not used when loading & validating config files, but the idea should be that they result in the same object you'd get if you used whatever the config file wanted (e.g., an array of strings). `csv` is for comma-delimited strings and CSV files; `json` is for raw JSON strings and `.json` files.
- `appiumCliIgnore`: If `true`, do not support this property on the CLI.
- `appiumDeprecated`: If `true`, the property is considered "deprecated", and will be displayed as such to the user (e.g., in the `--help` output). Note the JSON Schema draft-2019-09 introduces a new keyword `deprecated` which we should use instead if upgrading to this metaschema. When doing so, `appiumDeprecated` should itself be marked as `deprecated`. -->
- `appiumCliAliases`: スキーマでエイリアスを表現できます（例えば、CLI の引数は `--verbose` または `-v` とできます）。これは文字列の配列である。3文字より短い文字列は、ダブルダッシュ (`--`) の代わりにシングルダッシュ (`-`) で始まります。拡張機能によって提供される引数は、ダブルダッシュで始まることに注意してください。なぜなら、これらは `--<extension-type>-<extension-name>-` というプレフィックスを持つことが要求されるからです。
- `appiumCliDest`: スキーマがポスト`argprase`引数オブジェクトにカスタムプロパティ名を指定できます。設定されていない場合、これはキャメルケースの文字列です。
- `appiumCliDescription`: コマンドラインで表示される引数の説明をスキーマで上書きできます。これは `appiumCliTransformer` (または `array`/`object`-typed properties) と組み合わせて使用するのが便利です。
- `appiumCliTransformer`: 現在、`csv` と `json` のどちらかを選択できます。これらは値の後処理を行うカスタム関数です。設定ファイルの読み込みと検証には使用されませんが、設定ファイルが望むもの（例えば、文字列の配列）を使用した場合と同じオブジェクトを得ることができるようにする必要があります。`csv` はカンマ区切りの文字列と CSV ファイル、`json` は生の JSON 文字列と `.json` ファイル用です。
- `appiumCliIgnore`： `true`の場合、CLIでこのプロパティをサポートしない。
- `appiumDeprecated`： `true`の場合、このプロパティは "非推奨 "とみなされ、ユーザーにそのように表示されます（例えば、`--help`出力）。JSON Schema draft-2019-09 では、新しいキーワード `deprecated` が導入されており、このメタスキーマにアップグレードする場合は、これを代わりに使用する必要があることに注意してください。その際、`appiumDeprecated` 自体を `deprecated` としてマークする必要があります。
