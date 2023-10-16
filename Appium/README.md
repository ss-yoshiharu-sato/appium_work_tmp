# Appiumの作業場

## 関連リンク
- リポジトリ: [appium/appium](https://github.com/appium/appium)
- ドキュメント: [Appiumのドキュメント](https://appium.io/docs/ja/2.1/)

## TODO
- [ ] バージョンアップに対応 => 2.1
- [ ] Vivliostyleの環境を導入

----

## ディレクトリ構成

- README.md（このファイル）
- /doc/（マニュアルの翻訳用のソース）
  - mkdocs.yml
  - base-mkdocs.yml
  - /ja/
    - README.md（マニュアルの翻訳用のソースに関する説明：独自追加）
    - index.md（本家にもある）
    - resources.md
    - word.md
    - /assets/
    - /ctl/
    - /contributing/
    - /ecosystem/
    - /guides/（本家にもある）
      - migrating-1-to-2.md（本家にもある）
    - /intro/（本家にもある）
      - index.md（本家にもある）
    - /quickstart/
- /site/（マニュアルをビルドしたものが入る）

----

## mkdocを使ってデータを生成する
### pythonが使えることを確認
```bash
% python -V
Python 3.11.5
```
### mkdocが使えることを確認
```bash
% pip list | grep mkdocs
```
### mkdocのインストール
```bash
% pip install mkdocs
```
### インストールの確認
```bash
% pip list | grep mkdocs
mkdocs          1.5.3
```
### 必要な追加機能をインストール
```bash
% pip install mkdocs-material
```
### インストールの確認
```bash
% pip list | grep mkdocs     
mkdocs                     1.5.3
mkdocs-material            9.4.6
mkdocs-material-extensions 1.2
```
### プレビューの方法
実行方法はjaディレクトリ内で以下のコマンド
```bash
cd Appium/doc/ja 
mkdocs serve
```
- http://127.0.0.1:8000/ は404になるので、http://127.0.0.1:8000/ja/

### エラーに対応
```bash
WARNING -  Doc file 'ja/guides/caching.md' contains a relative link '../../../../packages/base-driver/lib/basedriver/helpers.js', but the target
           '../../packages/base-driver/lib/basedriver/helpers.js' is not found among documentation files.
```
↑ 一旦原稿からリンクを削除して対処

### 公開用にビルドする（siteがレンダリングされる）
```bash
mkdocs build
```
### surge.shに公開する
siteへ移動して以下を実行
```
surge . <site-name>
```
```bash
cd ../../site
surge . <site-name>
```
#### コマンド実行できない場合はインストール
https://surge.sh/

```bash
npm install --global surge
```
```bash
surge
```
```bash
% which surge
/usr/local/bin/surge

% surge
   Running as neuvecom@gmail.com (Student)
        project: /Users/yoshiharusato/appium_work_tmp/
※ 一旦ディレクトリを移動して再実行
        project: /Users/yoshiharusato/appium_work_tmp/Appium/site/
         domain: sneaky-kitty.surge.sh
         upload: [====================] 100% eta: 0.0s (93 files, 5382850 bytes)
            CDN: [====================] 100%
     encryption: *.surge.sh, surge.sh (216 days)
             IP: 138.197.235.123

   Success! - Published to sneaky-kitty.surge.sh
```
#### 現状はエラーになってしまう
- トップは`404`、jaは`502 Bad Gateway…`
- 多分なにかしらファイルが足りてないので`site`にもってくる

----

## VivliostyleによりドキュメントのPDF化
リポジトリにプルリクエストを送れない（方法がわからない）のと、すぐに手元で利用したいので、VibliostleでPDF化して持ち歩くためのメモ

### 前準備
- nodeが必要
  `node -v`
- `vivliostyle.config.js`と`package.json`をどこかから持ってくる
  - 他の案件で日本語化している作業のものから複製して、編集
  - package.json
    ```js
    {
      "name": "<ここを変更> => appium_document_ja",
      "description": "<ここを変更> => appium_document_ja",
      "version": "0.0.0",
      "author": "neuvecom <neuvecom@gmail.com>",
      "scripts": {
        "build": "vivliostyle build",
        "preview": "vivliostyle preview"
      },
      "dependencies": {
        "@vivliostyle/cli": "latest"
      },
      "license": "MIT",
      "private": true
    }
    ```
  - vivliostyle.config.js
    ```js
    module.exports = {
      title: 'Appium ドキュメント 日本語版PDF',
      author: 'neuvecom <neuvecom@gmail.com>',
      language: 'ja',
      size: 'B5',
      theme: '@vivliostyle/theme-techbook@^1.0.0',
      entry: [
        'doc/ja/index.md',
      ],
      workspaceDir: '.vivliostyle',
    }
    ```
- `npm install`

### PDFの生成
- `npm run build`

**npm create book プロジェクト名 について**

- すでに原稿があるので、`npm create book` はしない
- 対話式で設定してる部分は直接ファイルを編集すれば済む
- `git init` と `npm install` をしているにすぎず、git の必要はないので、`npm install`のみ実行すればよい

### スニペット
```html
<div style="break-before: page;"></div>
```

----

## メモ
- 