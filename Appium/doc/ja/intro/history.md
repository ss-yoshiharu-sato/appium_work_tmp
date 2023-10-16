---
title: Appium Project History
---

<!-- Appium has been around in one form or another since 2012. It's been under the
direction of various individuals and organizations, and it's even been
implemented in 3 different programming languages! Welcome to more than you ever
wanted to know about how Appium got to be what is it today... -->

Appiumは2012年頃から、何らかの形で登場しています。いろいろな個人や組織の下で開発され、3つの異なるプログラミング言語でも実装されています！この文書では、Appiumがどのようにして現在の形になったのかについてご紹介していきます...

<!-- ## Early Inspiration -->

## 初期のアイデア

<!-- [Dan Cuellar](https://twitter.com/thedancuellar) was the Test Manager at Zoosk
in 2011, when he encountered a problem. The length of the test passes on the
iOS product was getting out of hand. Less testing was an option, but would come
with additional risk, especially with it taking several days to get patches
through the iOS App Store Review process. He thought back to his days working
on websites and realized automation was the answer. -->

[Dan Cuellar](https://twitter.com/thedancuellar)は2011年、Zooskでテストマネージャーを務めていましたが、ある問題に遭遇しました。iOS製品のテスト期間の長さは、手に負えなくなっていました。テストを減らすという選択肢もありましたが、iOS App Storeのレビュープロセスを通過するためにパッチを取得するのに数日かかるなど、さらなるリスクを伴います。彼は、Webサイト制作に携わっていた頃のことを思い出し、テストの自動化が解決策であることに気づきました。

<!-- Dan surveyed the existing landscape of tools, only to find that all of them
hand major drawbacks. The tool supplied by Apple, UIAutomation, required tests
to be written in JavaScript, and did not allow for real-time debugging or
interpretation. It also had to be executed inside the Xcode profiling tool,
Instruments. Other 3rd-party tools used private APIs and required SDKs and HTTP
Servers to be embedded into the application. This seemed highly undesirable. -->

Danは、既存のツールの状況を調査しました。しかし、そのどれもが大きな欠点を抱えていることに気がつきました。Appleが提供するUIAutomationというツールは、テストをJavaScriptで書く必要があり、リアルタイムのデバッグや解釈ができません。また、XcodeのプロファイリングツールであるInstrumentsの中で実行する必要もありました。他のサードパーティツールはプライベートAPIを使用し、アプリケーションにSDKとHTTPサーバを組み込む必要がありました。これは非常に好ましくないと思いました。

<!-- Unsatisfied with the existing options, Dan asked his manager for some
additional time to see if he could find a better way. He spent 2 weeks poking
and prodding around to see if there was a way to use approved Apple
technologies to automate an iOS application. The first implementation he tried
used AppleScript to send messages to Mac UI elements using the OS
X accessibility APIs. This worked to some degree, but would never work on real
devices, not to mention other drawbacks. -->

既存の選択肢はどれもよくない…Danは上司に、もっといい方法がないか探すために、時間をくださいと頼みました。彼は2週間かけて、Appleの公認技術を使ってiOSアプリケーションを自動化する方法はないかと、いろいろと調べてみました。最初に試したのは、OSXのアクセシビリティAPIを使って、MacのUI要素にメッセージを送るAppleScriptを使った実装でした。これはある程度うまくいきましたが、実際のデバイスでは絶対に使えないし、他の欠点もあります。

<!-- So he thought, what if I could get the UIAutomation framework to run in real
time like an interpreter? He looked into it and he determined that all he would
need to do is find a way to receive, execute, and reply to commands from within
a UIAutomation JavaScript program. Using the utility Apple provided for
executing shell commands he was able to `cat` sequentially ordered text files
to receive commands, `eval()` the output to execute them, and write them back
to disk with `python`. He then prepared code in C# that implemented the
Selenium-style syntax to write the sequentially ordered JavaScript commands.
iOSAuto is born. -->

そこで彼は、UIAutomationフレームワークをインタプリタのようにリアルタイムで動作できたらどうだろうかと考えました。そして、UIAutomationのJavaScriptプログラムからコマンドを受信し、実行し、返信する方法を見つけるだけでよいと判断したのです。Appleが提供するシェルコマンドの実行ユーティリティを使い、順次並べられたテキストファイルを「cat」してコマンドを受け取り、その出力を「eval()」してコマンドを実行し、「python」によってディスクに書き戻すことができました。そして、C#でSeleniumスタイルの構文を実装したコードを用意し、順次並べられたJavaScriptコマンドを書き込むようにしました。iOSAutoの誕生です。

## Selenium Conference 2012

<!-- Dan was selected to speak at Selenium Conference 2012 in London about an
entirely different topic. As part of his presentation, he showed off iOS
Automation using Selenium syntax to demonstrate writing platform-agnostic tests
that use separate platform-specific page objects with a common interface. To
his surprise, the cool test architecture would take a backseat to the spectacle
of iOS tests running like WebDriver tests. Several people suggested that he
give a lightning talk later in the conference to explain exactly how it worked. -->

Danは、ロンドンで開催されたSelenium Conference 2012で、全く別のトピックについて講演することになりました。プレゼンテーションの一環として、彼はSeleniumのシンタックスを使ったiOS Automationを披露し、共通のインターフェースで別々のプラットフォーム固有のページオブジェクトを使用し、プラットフォームに依存しないテストを書けることを示しました。驚いたことに、このクールなテストアーキテクチャは、iOSのテストがWebDriverのテストのように実行される光景に比べれば、見劣りすることになりました。何名かの人たちは、彼がカンファレンスの後半でライトニングトークを行い、その仕組みを正確に説明することを提案しました。

<!-- On the second day of the conference, Dan stepped up on stage to give the
lightning talk.  Jason Huggins, co-creator of Selenium, moderated the lightning
talks.  Dan experienced technical difficulties getting his presentation to
load, and Jason nearly had to move on to the next lightning talk.  At the last
moment, the screen turned on and Dan jumped into his presentation. He explained
the details of his implementation and how it worked, begged for contributors,
and in five minutes it was over. The crowd applauded politely, and he left the
stage. -->

カンファレンス2日目、Danはライトニングトークを行うためにステージに上がりました。Seleniumの共同制作者であるJason Hugginsがライトニングトークのモデレーターを務めました。Danは、プレゼンテーションの読み込みに技術的な問題が発生し、Jasonは危うく次のライトニングトークに移らなければならないところでした。最後の瞬間、スクリーンが点灯し、Danはプレゼンテーションに突入しました。彼は、自分の実装の詳細とその仕組みを説明し、コントリビューターを募り、5分後には終了しました。観客は丁寧に拍手を送り、彼はステージを後にしたのでした。

<!-- ## The Phone Rings -->
## 電話が鳴り響く

<!-- Four months after the Selenium Conference, Jason called Dan. Jason had been
working on iOS testing support for a client at Sauce Labs.  Jason remembered
Dan's lightning talk and thought the project might be useful to Jason's work,
but Dan's source code was not public. Jason asked Dan to meet up.  Later that
week, Dan met Jason in a bar in San Francisco and showed him the source code
for iOS Auto. -->

Selenium Conferenceから4カ月後、JasonがDanに電話をかけてきました。JasonはSauce LabsでクライアントのiOSテストサポートに取り組んでいました。JasonはDanのライトニングトークを思い出し、そのプロジェクトがJasonの仕事に役立つかもしれないと思いましたが、Danのソースコードは公開されていませんでした。JasonはDanに会ってくれるように頼みました。 その週の後半、DanはサンフランシスコのバーでJasonに会い、iOS Autoのソースコードを見せました。

<!-- A long-time open source advocate, Jason encouraged Dan to release his code
under an open source license.  In August, Dan [released the source
code](https://github.com/penguinho/appium-old/commit/3ab56d3a5601897b2790b5256351f9b5af3f9e90)
on GitHub in C#. Jason encouraged Dan to change the language to make the
project more appealing to potential contributors. Dan [uploaded a new version
in
Python](https://github.com/penguinho/appium-old/commit/9b891207be0957bf209a77242750da17d3eb8eda).
In September, Jason added a web server and [began to implement the WebDriver
wire
protocol](https://github.com/hugs/appium-old/commit/ae8fe4578640d9af9137d0546190fa29317d1499)
over HTTP, making iOS Auto scriptable from any Selenium WebDriver client
library in any language. -->

長年のオープンソース提唱者であるJasonは、Danにオープンソースライセンスでコードを公開するよう勧めました。 8月、DanはGitHubでC#で[ソースコード](https://github.com/penguinho/appium-old/commit/3ab56d3a5601897b2790b5256351f9b5af3f9e90)を公開しました。Jasonは、このプロジェクトを潜在的な貢献者にアピールするために、言語を変更するようDanに勧めました。DanはPythonで新しいバージョンを[アップロード](https://github.com/penguinho/appium-old/commit/9b891207be0957bf209a77242750da17d3eb8eda)しました。9月、JasonはWebサーバを追加し、HTTP上でWebDriverワイヤープロトコルの実装を開始しました[ソースコード](https://github.com/hugs/appium-old/commit/ae8fe4578640d9af9137d0546190fa29317d1499)。これにより、どの言語のSelenium WebDriverクライアントライブラリからもiOS Autoをスクリプト化できるようになりました。

<!-- ## The Mobile Testing Summit -->
## Mobile Testing Summi

<!-- Jason decided that the project should be presented at the [Mobile Testing
Summit](https://twitter.com/mobtestsummit) in November, but suggested that the
project get a new name first. Many ideas were thrown out and they settled on
AppleCart. A day later, while he was perusing some of Apple's guidance on
copyright and trademarks, Jason noticed that under the section of examples for
names Apple would defend its trademarks against, the first example was
"AppleCart". He called Dan and informed him of the situation, and they
brainstormed for a bit before Jason hit the jackpot. Appium... Selenium for
Apps. -->

Jasonは、このプロジェクトを11月の[Mobile Testing Summit](https://twitter.com/mobtestsummit)で発表することを決めましたが、その前にプロジェクトに新しい名前をつけることを提案しました。 多くのアイデアが出され、AppleCartに決まりました。その翌日、著作権や商標に関するAppleのガイダンスを読んでいたJasonは、Appleが商標を守るための名称の例という項目で、最初の例が「AppleCart」であることに気がつきました。彼はDanに電話をして状況を伝え、少しブレーンストーミングをした後、Jasonは大当たりを引き当てました。Appium... アプリのためのSelenium。

<!-- ## Sauce Labs and Node.js -->
## Sauce LabsとNode.js

<!-- In January 2013, not long after the Mobile Testing Summit, Sauce Labs decided
to fully back Appium and provide more developer power. A task force was created
to evaluate the current state and how best to move forward with the project.
The team, which included Jonathan Lipps (the current project lead), decided
that Appium needed a rebirth, and ultimately settled on Node.js as the
framework to use. Node is well-known as a fast and efficient web server
backend, and at the end of the day, Appium is just a highly-specialized web
server. It was also decided that JavaScript as a language was accessible enough
that Appium would be able to grow into a larger community of open-source
developers with JavaScript than the other options on the table. -->

2013年1月、Mobile Testing Summitから間もない頃、Sauce LabsはAppiumを全面的にバックアップし、より多くの開発力を提供することを決定しました。現状とプロジェクトの進め方を評価するために、タスクフォースが作られました。Jonathan Lipps（現在のプロジェクトリーダー）を含むチームは、Appiumの再構築が必要だと判断し、最終的に使用するフレームワークとしてNode.jsに落ち着きました。Nodeは高速で効率的なWebサーバのバックエンドとして有名で、結局のところ、Appiumは高度に専門化されたWebサーバに過ぎません。また、言語としてのJavaScriptは十分にアクセスしやすく、AppiumがJavaScriptを使ったオープンソース開発者のコミュニティを、他の選択肢よりも大きく成長できると判断されました。

<!-- In just a few days, the team leveraged the existing work on Appium and had
a new version of Appium with as much functionality as the previous Python
version. The foundation had been laid for Appium's basic architecture, and we
have been successfully building on it since. A few weeks into this sprint,
Jonathan Lipps was formally designated project lead and he began to strategize
how to get more people from the community involved with Appium's development. -->

わずか数日で、チームはAppiumに関する既存の作業を活かし、以前のPythonバージョンと同等の機能を持つ新しいバージョンのAppiumを手に入れました。Appiumの基本的なアーキテクチャの基礎が築かれ、それ以降、私たちはそれをうまく構築してきました。この時、Jonathan Lippsは正式にプロジェクトリードに任命され、コミュニティからより多くの人をAppiumの開発に参加させる方法を考え始めました。

<!-- ## Appium Around the World -->
## 世界中のAppium

<!-- Ultimately, Jonathan decided that getting Appium in front of as many developers
at conferences and meetups was the best way to attract users and contributions.
Appium in its new incarnation was debuted at the [Google Test Automation
Conference 2013](https://www.youtube.com/watch?v=1J0aXDbjiUE). Later in 2013,
Appium was presented at conferences and meetups all around the US, as well as
in England, Poland, Portugal, and Australia. Notably, Jonathan had Appium
[perform as instruments in a band](https://www.youtube.com/watch?v=zsbNVkayYRQ)
and Dan Cuellar put together a fun [Appium video
montage](https://www.youtube.com/watch?v=xkzrEn0v0II) for Selenium Conference. -->

最終的にJonathanは、カンファレンスやミートアップで多くの開発者の前にAppiumを出すことが、ユーザーや貢献を集めるための最良の方法だと判断しました。新しい姿のAppiumは、[Google Test Automation Conference 2013](https://www.youtube.com/watch?v=1J0aXDbjiUE)でお披露目されました。その後も2013年には、全米各地はもちろん、イギリス、ポーランド、ポルトガル、オーストラリアなどのカンファレンス、ミートアップでAppiumが発表されました。特に、JonathanはAppiumに[【バンドの楽器として演奏】](https://www.youtube.com/watch?v=zsbNVkayYRQ)させ、Dan CuellarはSelenium Conferenceで楽しい[【Appiumビデオモンタージュ】](https://www.youtube.com/watch?v=xkzrEn0v0II)をまとめました。

<!-- But during all these presentations and conferences, the project continued to
develop. Early in 2013 we released Android and Selendroid support, making
Appium the first truly cross-platform automation framework. The project also
continued to attract users and contributors, and by the end of 2013, we'd
already had well over 1,000 commits. -->

しかし、これらのプレゼンテーションやカンファレンスの間にも、プロジェクトは発展し続けました。2013年の初めにはAndroidとSelendroidのサポートをリリースし、Appiumを初の真にクロスプラットフォームな自動化フレームワークとしました。また、プロジェクトはユーザーやコントリビューターを魅了し続け、2013年末にはすでに1,000を超えるコミットを獲得していました。

<!-- ## The Road to Appium 1.0 -->
## Appium 1.0への道のり

<!-- Appium began to grow and mature significantly. In May 2014,
we released Appium 1.0, which stood as a milestone in Appium's development.
Appium was given
[various](http://sauceio.com/index.php/2014/01/appium-selected-as-a-black-duck-open-source-rookie-of-the-year/)
[awards](http://sauceio.com/index.php/2014/10/appium-wins-a-bossy-award-from-infoworld/)
and became the most popular open-source cross-platform mobile automation
framework. Stability improved, bugs were prioritized and fixed, and features
added. Sauce Labs increased the number of developers it donated to working
on Appium, but the entire community stayed involved in guiding the project and
contributing to it, and project governance continued to happen in the open, on
public mailing lists and GitHub's issue tracker. -->

Appiumは大きく成長し、成熟し始めました。2014年5月には、Appiumの発展におけるマイルストーンとなるAppium 1.0をリリースしました。
Appiumに与えられたのは   
[新人賞](http://sauceio.com/index.php/2014/01/appium-selected-as-a-black-duck-open-source-rookie-of-the-year/)   
[大賞](http://sauceio.com/index.php/2014/10/appium-wins-a-bossy-award-from-infoworld/)    
を受賞し、最も人気のあるオープンソースのクロスプラットフォームモバイルオートメーションフレームワークとなりました。安定性が向上し、バグが優先的に修正され、機能が追加されました。Sauce Labsは、Appiumに取り組むために寄付する開発者の数を増やしましたが、コミュニティ全体がプロジェクトの指導や貢献に関わり続け、プロジェクトのガバナンスは、公開のメーリングリストやGitHubの課題追跡で、オープンに行われ続けました。

<!-- ## The Appium Umbrella Broadens -->
## Appiumの広がり

<!-- Eventually, it became clear that the Appium codebase was not optimized for
a large team of distributed, sometime contributors. We took the opportunity as
a committer team to rewrite Appium from the ground up, using a more modern
version of the JavaScript language, and redoing Appium's architecture so that
it was easy for users or third-party developers to build their own Appium
"drivers". We wanted for it to be easier for new contributors to get ramped up
on the Appium codebase, and to see support for new platforms added to Appium by
groups other than the core team. That vision has begun to be fulfilled, with
groups like Microsoft and Youi.tv adding drivers to Appium for Windows desktop
app automation and Youi.tv app automation, respectively. Who knows what
platforms will be added next? -->

やがて、Appiumのコードベースは、分散しているいつかの貢献者の大規模なチームには最適化されていないことが明らかになりました。私たちはコミッターチームとして、Appiumを一から書き直す機会を得ました。よりモダンなバージョンのJavaScript言語を使用し、ユーザーやサードパーティの開発者が独自のAppium「ドライバ」を簡単に構築できるようにAppiumのアーキテクチャを作り直しました。私たちは、新しい貢献者がAppiumのコードベースをより簡単に使いこなせるようにし、コアチーム以外の団体によって新しいプラットフォームのサポートがAppiumに追加されることを望んでいました。このビジョンは、MicrosoftやYoui.tvのようなグループが、それぞれWindowsデスクトップアプリケーションの自動化とYoui.tvアプリケーションの自動化のためにAppiumにドライバを追加することで実現され始めています。次にどんなプラットフォームが追加されるかは、誰にもわかりません。

<!-- ## Appium To The People -->
## 人類のためのAppium

<!-- In late 2016, Sauce Labs donated Appium as a project to the [JS
Foundation](https://js.foundation), in order to cement for the world Sauce's
commitment that Appium remains open source. The JS Foundation is a non-profit
open source stewardship organization which takes responsibility for holding the
copyright for open source projects, as well as ensuring they have a long and
successful tenure in the community. As a result of our move to a non-profit
foundation, we hope that the door will open even more widely for new
contributors, either as individuals or representing one of the many companies
which now have an interest in seeing Appium move forward.

Eventually, the JS Foundation merged into the [OpenJS Foundation](https://openjsf.org), and Appium
is currently an Impact Project in the foundation. -->

2016年末、Sauce Labsは、Appiumがオープンソースであり続けるというSauceのコミットメントを世界に示すために、Appiumをプロジェクトとして[JS Foundation]（https://js.foundation）に寄贈しました。JS Foundationは非営利のオープンソース・スチュワードシップ組織で、オープンソースプロジェクトの著作権を保持し、コミュニティで長く成功することを保証する責任を担っています。非営利の財団に移行したことで、個人として、あるいはAppiumの前進に関心を持つ多くの企業の代表として、新しい貢献者のための扉がより広く開かれることを期待しています。

最終的に、JS Foundationは[OpenJS Foundation](https://openjsf.org)に統合され、Appiumは現在、同財団のImpact Projectとなっています。

## Appium 2.0

<!-- Appium 2.0 was released in 2022, with a new focus on Appium as an ecosystem rather than a singular
project. Drivers and plugins can be developed and shared by anyone, opening up a world of
possibilities for automation-related development for platforms far beyond iOS and Android. -->

Appium 2.0は2022年にリリースされ、Appiumを単一のプロジェクトではなく、エコシステムとして新たにフォーカスしています。ドライバやプラグインを誰でも開発・共有できるようになり、iOSやAndroidをはるかに超えるプラットフォームで、自動化関連の開発の可能性が広がりました。
