# 关于jsPsych

jsPsych是一个[多位开发者](https://github.com/jspsych/jsPsych/graphs/contributors)共同参与的开源项目。当前，项目是由Josh de Leeuw ([@jodeleeuw](https://github.com/jodeleeuw)), Becky Gilbert ([@becky-gilbert](https://github.com/becky-gilbert)), 和Björn Luchterhandt ([@bjoluc](https://github.com/bjoluc))组成的核心团队维护的。

jsPsych的作者是[Josh de Leeuw](https://www.vassar.edu/faculty/jdeleeuw)。

### 在论文中引用jsPsych

如果你在学术作品中使用了jsPsych，请将下面的文献添加到参考文献列表：

> de Leeuw, J.R., Gilbert, R.A., & Luchterhandt, B. (2023). jsPsych: Enabling an open-source collaborative ecosystem of behavioral experiments. *Journal of Open Source Software*, *8*(85), 5351, [https://joss.theoj.org/papers/10.21105/joss.05351](https://joss.theoj.org/papers/10.21105/joss.05351).

这篇文章更新了对jsPsych的介绍并包含了当前所有核心开发成员，它替代了早些的那篇文献：

> de Leeuw, J.R. (2015). jsPsych: A JavaScript library for creating behavioral experiments in a Web browser. *Behavior Research Methods*, _47_(1), 1-12. doi:[10.3758/s13428-014-0458-y](http://link.springer.com/article/10.3758%2Fs13428-014-0458-y)

你的引用表明jsPsych得到了使用和重视，这样我们也会有动力继续开发下去。

#### 第三方插件/扩展的引用工具

jsPsych是一个开源合作的生态，你使用的很多插件、扩展可能是第三方开发者贡献的。我们希望确保他们的工作得到认可，所以创建了一个命令行的引用工具，你可以用这个工具来引用jsPsych以及实验中用到的插件/扩展。你可以按照以下步骤使用该工具：

1. 在浏览器中启动jsPsych实验
2. 通过Ctrl + ⇧ + J (Windows) 或 ⌘ + ⌥ + J (Mac) 打开浏览器控制台
3. 输入 `jsPsych.getCitations()`

此时APA格式的jsPsych引用会被打印出来，你可以把打印出来的内容复制粘贴到你的论文中。如果要引用实验中使用到的插件/扩展，需要传入包含插件/扩展名称的数组，例如`jsPsych.getCitations([jsPsychHtmlKeyboardResponse, jsPsychMouseTrackingExtension])`。你还可以传入第二个参数，用来指定引用格式，例如`jsPsych.getCitations([jsPsychHtmlKeyboardResponse, jsPsychMouseTrackingExtension], "apa")`。目前，我们支持APA格式 (`"apa"`) 和Bibtex (`"bibtex"`)。

