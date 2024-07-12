#

![jsPsych](img/jspsych-logo.jpg)

jsPsych是一个用于编写行为实验的JavaScript框架，这些实验是用浏览器来运行的。

使用jsPsych时，我们通过[插件](overview/plugins.md)来创建实验。插件定义了各种事件，例如在屏幕上呈现图片、收集数据（比如被试在什么时候按了什么键）。我们可以使用[jsPsych提供的插件](plugins/list-of-plugins.md)，也可以使用社区开发的插件（位于[contrib仓库](https://github.com/jspsych/jspsych-contrib)中），或是[创建自己的插件](developers/plugin-development.md)。只要将各个插件添加到[时间线](overview/timeline.md)中，就可以创建实验了。

我们推荐从[时间线部分](overview/timeline.md)开始学习jsPsych。在读完该部分后，可以继续阅读[hello world教程](tutorials/hello-world.md)来学习如何用jsPsych创建实验，以及阅读[反应时实验教程](tutorials/rt-task.md)来学习jsPsych框架的核心特性。