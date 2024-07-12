# jsPsych："Hello world"的呈现

按照传统，本教程会讲解如何用jsPsych在浏览器页面中呈现"Hello world!"。尽管这个实验并没有什么用，但创建实验的过程对于学习jsPsych的基础用法还是很有益的。本教程假定你知道如何搭建网页。

## 第1步: 下载jsPsych

我们的第一步是下载jsPsych。可以从[GitHub releases page](https://github.com/jspsych/jsPsych/releases)下载最新的版本。

*注意: 下面图片显示的是6.3.1版本，但是各版本下载步骤是一样的。*

![releasespage](/img/githubreleases.png)

!!! warning "警告"
		我们强烈推荐下载代码的最新发行版，而不是通过GitHub仓库中的那个**大绿按钮**下载，因为那样下载得到的代码可能还在开发中，可能会有bug存在。

## 第2步: 创建实验项目文件夹

在电脑上创建一个新文件夹用于存放实验用到的文件。完成创建后，从第1步中下载的压缩包中提取出文件夹（如果下载的是6.3.0版本，文件夹的名字就是```jspsych-6.3.0```）并移动到实验项目文件夹中。

```
📂 My Experiment
--  📂 jspsych-6.3.0
```

`jspsych-6.3.0` 文件夹的文件结构如下：

```
📂 My Experiment
--  📂 jspsych-6.3.0
----  📂 css
----  📂 examples
----  📂 plugins
----  📄 jspsych.js
```

## 第3步: 创建HTML文件

用jsPsych编写程序时，你需要一个好的编辑器，[Visual Studio Code](https://code.visualstudio.com/) (支持Windows, OSX, Linux)就是一个很好的选择。

有了一个你喜欢的编辑器后，你可以在实验文件夹下创建一个新的文件，名为`experiment.html`。

```
📂 My Experiment
--  📂 jspsych-6.3.0
--  📄 experiment.html
```

## 第4步: 添加HTML基础代码

几乎所有的HTML文件都有一部分共同的代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
	</head>
	<body></body>
</html>
```

把上面的代码添加到`experiment.html`文件中并保存。在浏览器中打开该文件，你可以看到一个空白页，页面标题的'My experiment'。

## 第5步: 引入jsPsych库

使用`<script>`标签引入jsPsych库：

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
		<script src="jspsych-6.3.0/jspsych.js"></script>
	</head>
	<body></body>
</html>
```

你可能还想要引入jsPsych的默认样式，它设置了一系列基本的样式，让实验看起来更美观。此时就需要在文档的`<head>`标签内添加`<ilink>`标签。

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
		<script src="jspsych-6.3.0/jspsych.js"></script>
		<link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
	</head>
	<body></body>
</html>
```

## 第6步: 使用jspsych-html-keyboard-response插件呈现文字

在当前的演示中，我们想要在屏幕上呈现文字，而这正是[jspsych-html-keyboard-response插件](../plugins/jspsych-html-keyboard-response.md)的作用。使用插件时，我们需要用`<script>`标签将其引入。

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
		<script src="jspsych-6.3.0/jspsych.js"></script>
		<script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
		<link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
	</head>
	<body></body>
</html>
```

引入插件后，我们可以使用插件创建实验了。为了表明一个试次使用了html-keyboard-response插件，我们会创建一个JavaScript对象，并指定其`type`属性为`html-keyboard-response`。接下来，我们可以在这个对象中指定插件的其他参数。

如果要直接将JavaScript添加到网页中，我们需要在`<body>`标签后加入一系列`<script>`标签。

<span style='color: red;'>译者注：在</span>`body`<span style='color: red;'>标签内部的最后添加同样可以</span>

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
		<script src="jspsych-6.3.0/jspsych.js"></script>
		<script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
		<link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
	</head>
	<body></body>
	<script>

	var hello_trial = {
		type: 'html-keyboard-response',
		stimulus: 'Hello world!'
	}

	</script>
</html>
```

完成试次的定义后，我们需要告诉jsPsych在运行实验的时候把这个试次包括进去。这就要求我们使用`jsPsych.init`函数并指定`timeline`参数。

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My experiment</title>
		<script src="jspsych-6.3.0/jspsych.js"></script>
		<script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
		<link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
	</head>
	<body></body>
	<script>

	var hello_trial = {
		type: 'html-keyboard-response',
		stimulus: 'Hello world!'
	}

	jsPsych.init({
		timeline: [hello_trial]
	})

	</script>
</html>
```

保存文件后，在浏览器中将其打开。此时，你应该看到屏幕上呈现'Hello world!'的字样；如果你按下键盘上的某个键，屏幕上的文字就会消失（即，试次结束）。