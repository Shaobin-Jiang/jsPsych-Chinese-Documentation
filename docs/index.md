#

![jsPsych](img/jspsych-logo.jpg)

jsPsych是一个用于在浏览器中运行行为实验的JavaScript库，该框架方便我们将实验室实验迁移到线上环境。

使用jsPsych时，需要用[时间线 (timeline)](overview/timeline.md)来描述整个实验。jsPsych负责处理的事情包括该运行哪个试次、存储数据、随机等，它使用**插件**来定义时间线上各点该做什么。插件是预置的简单实验任务（例如呈现指导语、呈现刺激并获取键盘按键反应）模板，支持多种多样的实验，十分灵活。如果你有过JavaScript相关的编程经验，也可以自定义插件。

我们推荐你从[文档中关于时间线的那部分](overview/timeline.md) 开始了解、学习jsPsych。然后，你可以继续阅读[Hello World教程](tutorials/hello-world.md)和[反应时实验教程](tutorials/rt-task.md)。