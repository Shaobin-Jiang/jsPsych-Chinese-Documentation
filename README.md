# jsPsych中文文档

![](https://shields.io/badge/Version-6.3_&_v7-brightgreen.svg?style=plastic) ![](https://shields.io/badge/License-MIT-informational.svg?style=plastic)

把jsPsych中文文档更新到了最新的版本。相比于之前的版本，增加了一个版本选择器（天知道为什么2年前我弄不明白这个东西）。

访问[https://shaobin-jiang.github.io/jsPsych-Chinese-Documentation](https://shaobin-jiang.github.io/jsPsych-Chinese-Documentation)可以查看最新版本的v7版本的文档。

当前，6.3版本的文档仍可以通过[https://shaobin-jiang.github.io/jsPsych-Chinese-Documentation/6.3/](https://shaobin-jiang.github.io/jsPsych-Chinese-Documentation/6.3/)访问。

## 可能的问题

- 我也不是专业翻译的，所以很多地方翻译出来的可能并不是很严谨，或者是有太多我个人的语言习惯；有些地方因为我觉得原文太过于繁琐就直接意译了，所以可能会和英文版本文档有出入
- 同样是个人翻译的问题，我没有太多时间和精力去逐字校对，所以难免出现打字的错误
- 链接跳转的问题。你可能会发现有一些链接只能跳转到对应的页面但是不能精确跳转到相应的小标题，这是因为变成中文之后那个链接的id也变了。我试着去一个一个修改了，但是肯定会有落下的
- 我删除了v7中所有插件的安装教程和版本信息，一概用`@latest`替代了，主要是因为我没有研究过jsPsych那一套自动化的流程是怎么弄的，如果手动维护各个版本就太累了

## 参与到翻译中来

其实只要fork → clone一份仓库，然后本地`poetry install`安装相应依赖，就可以开始了。

我现在的设计思路是，一个版本对应一个分支，`v6`分支对应6.3，`v7`分支对应v7，`master`分支对应最新版本。这样方便用`mike`进行版本控制。如果全都混在`master`分支上，如果想要修改以前版本的文档的话，没法用`mike`去操作。现在这样，只要checkout到对应分支，然后`mike deploy <version>`就行。

- 预览：`poetry run mike serve`
- 部署：`poetry run mike deploy <version>`

Anyway希望大家可以参与进来。一个人翻译这个属实太累了。如果你愿意协助一起翻译，可以fork一份代码，提PR；或者，提一个issue也可以。如果精力有限无法参与到翻译中来，也可以考虑给项目点一个star，你们的支持也是我继续做下去的动力。
