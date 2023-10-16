# この日本訳について

[Appiumのドキュメント - Appium Documentation](https://appium.io/docs/ja/2.1/)
[appium/appium: Cross-platform automation framework for all kinds of your apps built on top of W3C WebDriver protocol](https://github.com/appium/appium)

## 概要
ローカルでプレビューするために、以下のようにしています。

- mkdocs.ymlの追加
    - docディレクトリの下のjaディレクトリで動作するように設定
    - プレビュー時のみ使用するためのnavの設定
- README.md（このファイル）の追加
- assetsディレクトリのコピー（.gitignoreで除外されているため）

## 補足

### mkdocsの環境構築
pythonで動作します
```
python -v
```

mkdocsとmaterialをインストール
```
pip install mkdocs
pip install mkdocs-material
```

実行方法はjaディレクトリ内で以下のコマンド
```
mkdocs serve
```

project_name/site 下に出力

### 作業メモ
- 準備
    - enディレクトリより未翻訳のファイルを構成を崩さずに複製
    - assetsディレクトリの複製
- 翻訳作業
    - 翻訳するファイルをmkdocs.ymlのnavに追加
    - `mkdocs serve`で確認しながら作業
    - 翻訳する段落の改行を編集（削除）
    - 翻訳サイトに英文を渡す
    - 訳文のですますや前後の繋がりや用語の統一などを編集
    - もとの英文をコメントアウト
- 作業中の発券
    - h1に入るもの
        - title: XXXの英語を翻訳していたが、navの値が入っているっぽい
        - なので、戻したほうが良さげ
        - 本文にh1（#）がある場合はそれが優勢される

### イレギュラーな処理をしたので、要確認
-  !!! info などが読みづらくなるため、mdのフォーマットを崩しています。

### 要確認
- ブランチが作成できないのでmainで作業中
- pullリクエストの方法がわからない
- 正しい英訳 < 雰囲気の伝わる日本語 でいいのか…

## 進捗

### Appiumの文書
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| はじめに | ファイル | index.md | ○ | ○ | ---- |

### 導入(intro/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Appium入門 | ---- | ---- | ---- | ---- | ---- |
| - Appiumの概要 | ファイル | index.md | ○ | ○ | ---- |
| - Appium Drivers入門 | ファイル | drivers.md | ○ | ○ | ---- |
| - Appiumクライアント入門 | ファイル | clients.md | ○ | ○ | ---- |
| Appiumのシステム要件 | ファイル | requirements.md | ○ | ○ | ---- |
| Appiumプロジェクトの歴史 | ファイル | history.md | ○ | ○ | ---- |

### クイックスタート(quickstart/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| はじめに | ファイル | index.md | ○ | ○ | ---- |
| Appiumのインストール | ファイル | install.md | ○ | ○ | ---- |
| Uiautomatuon2のインストール | ファイル | uiauto2-driver.md | ○ | ○ | ---- |
| テストの記述 | ---- | ---- | ---- | ---- | ---- |
| - Javaでのテスト | ファイル | test-java.md | ○ | ○ | ---- |
| - JavaScriptでのテスト | ファイル | test-js.md | ○ | ○ | ---- |
| - Pythonでのテスト | ファイル | test-py.md | ○ | ○ | ---- |
| - Rubyでのテスト | ファイル | test-rb.md | ○ | ○ | ---- |
| 次の段階へ | ファイル | next-steps.md | ○ | ○ | ---- |

### CLIリファレンス(cli/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| CLI入門 | ファイル | index.md | ○ | ○ | ---- |
| サーバCLIの引数 | ファイル | args.md | ○ | ○ | ---- |
| 拡張CLI | ファイル | extensions.md | ○ | ○ | ---- |

### ガイド(guides/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Appium 1.xからAppium 2.xへの移行 | ファイル | migrating-1-to-2.md | ○ | ○ | ---- |
| Appium DriversとPluginの管理 | ファイル | managing-exts.md | ○ | ○ | ---- |
| Appium設定ファイル | ファイル | config.md | ○ | ○ | ---- |
| Appium Serverのセキュリティ | ファイル | security.md | ○ | ○ | ---- |
| Capabilities（機能・能力） | ファイル | caps.md | ○ | ○ | ---- |
| Context API | ファイル | context.md | ○ | ○ | ---- |
| Settings API | ファイル | settings.md | ○ | ○ | ---- |
| メソッドの実行 | ファイル | execute-methods.md | ○ | ○ | ---- |
| イベントタイミングAPI | ファイル | event-timing.md | ○ | ○ | ---- |
| ログフィルタリング | ファイル | log-filters.md | ○ | ○ | ---- |
| AppiumとSelenium Grid | ファイル | grid.md | ○ | ○ | ---- |
| アプリケーションバンドル・キャッシングロジック | ファイル | caching.md | ○ | ○ | ---- |

### エコシステム(ecosystem/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Appiumのエコシステム | ファイル | index.md | ○ | ○ | ---- |
| Appium ドライバの構築 | ファイル | build-drivers.md | ○ | △ | ---- |
| Appium Pluginの構築 | ファイル | build-plugins.md | ○ | △ | ---- |
| Appium 拡張の文書作成 | ファイル | build-docs.md | ○ | △ | ---- |

### 貢献(contributing/)
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Appiumに貢献する | ファイル | index.md | ○ | ○ | ---- |
| Appiumの設定システム | ファイル | config-system.md | ○ | △ | ---- |

### その他
| 項目名 | 種別 | パス(ja/省略) | 一時翻訳 | 文章確認 | 公開 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 追加資料 | ファイル | resources.md | ○ | ○ | ---- |

## 使用したツールなど

### 表記の統一

- [文章校正ツール](https://so-zou.jp/web-app/text/proofreading/#word15)

### Webを経由したプレビュー

- [無料で手軽！コマンド一つで静的サイトホスティングできるSurgeを試してみた。 | dotstudio](https://dotstud.io/blog/static-site-hosting-surge/)
- [surge](http://enormous-theory.surge.sh/ja/)

appium/packages/appium/docs/ja
```
mkdocs build
```

appium/packages/appium/site
```
surge . <site-name>
```

### 翻訳

- [DeepL翻訳：高精度な翻訳ツール](https://www.deepl.com/)
