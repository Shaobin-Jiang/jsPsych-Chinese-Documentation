# jsPsych："Hello world"的呈现

按照传统，本教程会讲解如何用jsPsych在浏览器页面中呈现 **"Hello world!"**。尽管这并不是一个真正的实验，但整个过程对于学习jsPsych的基础用法还是很有益的。

## 选择搭建方式

jsPsych从7.0版本开始，提供了三种搭建jsPsych项目的方式，你可以根据自己的需求选取搭建方式。

- [**我想要最简单的搭建方式**](#option-1-using-cdn-hosted-scripts)：这种方法是通过使用托管在CDN上的文件来实现的。使用这种方法时，我们不需要下载或安装什么东西。该方法的缺点在于我们无法对jsPsych框架进行自定义，但是对于大多数实验，当前方法还是足够的。

- [**我想要在保持简单的同时能够对框架进行自定义**](#option-2-download-and-host-jspsych)：使用这种方法时，我们需要下载jsPsych库的源代码。 _如果你使用过 jsPsych 7.0以前的版本，这应该是你最熟悉的方式_ 。拿到源代码之后，我们就可以对框架进行修改，从而对插件的功能进行微调。

- [**我想要使用现代的JavaScript特性，如`npm`和`import`语句**](#option-3-using-npm)：我们可以通过NPM安装jsPsych、插件和扩展。这种方式可以方便我们将jsPsych和我们熟悉的JavaScript框架结合起来，以及使用TypeScript、打包工具等。

## 选项1：使用CDN托管的脚本

### 第1步：创建HTML文件

!!!tip "小贴士"
    用jsPsych编写程序时，我们需要一个好的编辑器，[Visual Studio Code](https://code.visualstudio.com/)（支持Windows, OSX, Linux）就是一个很好的选择。

我们来创建一个名为`experiment.html`的新文件。

（几乎）所有的HTML文档都会使用相同的基本代码，如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
  </head>
  <body></body>
</html>
```

把上边的代码添加到`experiment.html`文件中并保存。现在，在浏览器中打开该文件，就可以看到一个空白页，页面标题为'My experiment'。

### 第2步：引入jsPsych框架

jsPsych框架是通过`<script>`标签引入的。我们这里使用的jsPsych框架来自于[CDN](https://unpkg.com/)，即，框架托管在服务器上，我们不需要自己下载一份源代码了。

```html hl_lines="5"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
  </head>
  <body></body>
</html>
```

注意，上面的URL中包含了jsPsych的版本号，因而，我们的实验并不会因为jsPsych未来的升级而发生改变。

我们可能还需要引入jsPsych的样式表，该样式表会对实验的样式进行一些设置。此时，我们就需要在文档的`<head>`中加入一个`<link>`标签：

```html hl_lines="6"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
</html>
```

### 第3步：创建script元素并初始化jsPsych

我们可以在`<body>`标签后面加上`<script>`标签，来添加JavaScript代码。

```html hl_lines="9 10"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
  </script>
</html>
```

我们通过调用`initJsPsych()`函数并将其返回值赋给一个变量来初始化jsPsych：

```html hl_lines="10"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();
  </script>
</html>
```

### 第4步：使用插件来打印消息

在这一部分的demo中，我们实现的功能是在屏幕上呈现文字。这也正是[html-keyboard-response插件](../plugins/html-keyboard-response.md)的功能。使用插件之前，我们需要通过`<script>`标签将其引入。

```html hl_lines="6"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.0.0"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();
  </script>
</html>
```

引入插件后，我们就可以使用它来创建一个试次。使用`html-keyboard-response`插件创建试次时，我们需要创建一个对象，这个对象有一个`type`属性，值为`jsPsychHtmlKeyboardResponse`。我们还可以在这个对象中指定插件其他的参数。下面的例子中，我们通过`stimulus`参数来指定呈现的文字。关于各个插件的参数，可以在它们各自的[文档页](../plugins/html-keyboard-response.md)上找到。

```html hl_lines="13 14 15 16"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.0.0"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Hello world!'
    }
  </script>
</html>
```

### 第5步：运行实验

定义好了试次之后，我们就需要告诉jsPsych将这个试次包含在要运行的实验中。这就要求我们调用`jsPsych.run`函数并传入一条[时间线](../overview/timeline.md)。对于像当前这种简单的实验，使用的时间线就是一个数组，其中包含了需要运行的试次。

```html hl_lines="18"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.0.0"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Hello world!'
    }

    jsPsych.run([hello_trial]);
  </script>
</html>
```

保存文件后，在浏览器中打开，我们就可以看到屏幕上显示的"Hello world!"，按键后，文字就会消失（试次结束）。

## 选项2：下载jsPsych并手动添加到项目中

### 第1步：下载jsPsych

我们的第一步是下载最新发布的jsPsych。这里是[下载链接(jspsych.zip)](https://www.github.com/jspsych/jspsych/releases/latest/download/jspsych.zip))。我们也可以从[GitHub releases page](https://github.com/jspsych/jsPsych/releases)的顶部找到最新的版本。

### 第2步: 创建实验项目文件夹

在电脑上创建一个新文件夹用于存放实验用到的文件。当前教程中，我们将这个文件夹命名为"MyExperiment"。在这个文件夹中添加一个名为`jspsych`的子文件夹。创建好后，将第1步中下载的文件打开，并将`dist`文件夹中的文件复制到`jspsych`文件夹中。文件结构如下：

```text
📂 MyExperiment
--  📂 jspsych
----  📄 jspsych.js
----  📄 plugin-animation.js
----  📄 plugin-audio-keyboard-response.js
----  ...
```

### 第3步: 创建HTML文件

!!!tip "小贴士"
    用jsPsych编写程序时，我们需要一个好的编辑器，[Visual Studio Code](https://code.visualstudio.com/)（支持Windows, OSX, Linux）就是一个很好的选择。

现在，在`MyExperiment`文件夹下创建一个名为`experiment.html`的新文件。文件结构如下：

```text
📂 MyExperiment
--  📄 experiment.html
--  📂 jspsych
```

（几乎）所有的HTML文档都会使用相同的基本代码，如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
  </head>
  <body></body>
</html>
```

把上边的代码添加到`experiment.html`文件中并保存。现在，在浏览器中打开该文件，就可以看到一个空白页，页面标题为'My experiment'。

### 第4步：引入jsPsych框架

我们通过`<script>`标签来引入jsPsych。将该标签的`src`属性设置为`jspsych.js`文件的路径：

```html hl_lines="5"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
  </head>
  <body></body>
</html>
```

我们可能还需要引入jsPsych的样式表，该样式表会对实验的样式进行一些设置。此时，我们就需要在文档的`<head>`中加入一个`<link>`标签：

```html hl_lines="6"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
</html>
```

### 第5步：创建script元素并初始化jsPsych

我们可以在`<body>`标签后面加上`<script>`标签，来添加JavaScript代码。

```html hl_lines="9 10"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
  </script>
</html>
```

我们通过调用`initJsPsych`函数并将其返回值赋给一个变量来初始化jsPsych：

```html hl_lines="10"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();
  </script>
</html>
```

### 第6步：使用插件来打印消息

在这一部分的demo中，我们实现的功能是在屏幕上呈现文字。这也正是[html-keyboard-response插件](../plugins/html-keyboard-response.md)的功能。使用插件之前，我们需要通过`<script>`标签将其引入。

```html hl_lines="6"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <script src="jspsych/plugin-html-keyboard-response.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();
  </script>
</html>
```

引入插件后，我们就可以使用它来创建一个试次。使用`html-keyboard-response`插件创建试次时，我们需要创建一个对象，这个对象有一个`type`属性，值为`jsPsychHtmlKeyboardResponse`。我们还可以在这个对象中指定插件其他的参数。下面的例子中，我们通过`stimulus`参数来指定呈现的文字。关于各个插件的参数，可以在它们各自的[文档页](../plugins/html-keyboard-response.md)上找到。

```html hl_lines="13 14 15 16"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <script src="jspsych/plugin-html-keyboard-response.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Hello world!'
    }
  </script>
</html>
```

### 第7步：运行实验

定义好了试次之后，我们就需要告诉jsPsych将这个试次包含在要运行的实验中。这就要求我们调用`jsPsych.run`函数并传入一条[时间线](../overview/timeline.md)。对于像当前这种简单的实验，使用的时间线就是一个数组，其中包含了需要运行的试次。

```html hl_lines="18"
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych/jspsych.js"></script>
    <script src="jspsych/plugin-html-keyboard-response.js"></script>
    <link href="jspsych/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
    const jsPsych = initJsPsych();

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Hello world!'
    }

    jsPsych.run([hello_trial]);
  </script>
</html>
```

保存文件后，在浏览器中打开，我们就可以看到屏幕上显示的"Hello world!"，按键后，文字就会消失（试次结束）。

## 选项3：使用NPM

如果你选择通过`npm`安装jsPsych，我们就假定你已经对Node.js很熟悉，且了解web开发。此外，我们还假定你还用到了[webpack](https://webpack.js.org/)或是其他打包工具。

!!! info "补充"
    你可以去看一看[jsPsych Builder](https://github.com/bjoluc/jspsych-builder) CLI。jsPsych Builder使用webpack帮助我们将实验创建、搭建开发服务器、对脚本和样式表进行转译和打包等流程自动化。鉴于jsPsych Builder会自动完成本教程中的一些步骤，所以如果你选择使用它，可以去jsPsych Builder的GitHub Page上的getting started部分看看。

### 第1步：安装jsPsych

运行`npm install jspsych`。

这条命令会安装jsPsych的核心部分，而插件和扩展需要单独进行安装。

### 实例

我们通过调用`initJsPsych`函数创建`JsPsych`实例，其[配置方式](../reference/jspsych.md#initjspsych)多种多样，我们可以将可选的参数通过一个对象传给`initJsPsych`。

```js
import {initJsPsych} from 'jspsych';

const jsPsych = initJsPsych();
```

### 第3步：静态的HTML和CSS

jsPsych只需要我们的HTML文档中有一个body元素即可。而对于样式表，我们可以直接使用`import 'jspsych/css/jspsych.css'`在JavaScript文件中将其引入，也可以在HTML文档的头部添加一个link标签（例如`<link href="path/to/jspsych.css" rel="stylesheet" type="text/css" />`），选择哪一种取决于我们所使用的打包工具的设置。

### 第4步：安装并引入插件

我们可以使用下面的命令安装`html-keyboard-response`插件：

`npm install @jspsych/plugin-html-keyboard-response`

接下来，我们来引入`htmlKeyboardResponse`插件类：

```js
import {initJsPsych} from 'jspsych';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

const jsPsych = initJsPsych();
```

### 第5步：创建试次

引入插件后，我们就可以使用它来创建一个试次。使用`html-keyboard-response`插件创建试次时，我们需要创建一个对象，这个对象有一个`type`属性，值为`htmlKeyboardResponse`。我们还可以在这个对象中指定插件其他的参数。下面的例子中，我们通过`stimulus`参数来指定呈现的文字。关于各个插件的参数，可以在它们各自的[文档页](../plugins/html-keyboard-response.md)上找到。

```js
import {initJsPsych} from 'jspsych';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

const jsPsych = initJsPsych();

const trial = {
  type: htmlKeyboardResponse,
  stimulus: 'Hello world!',
}
```

### 第6步：运行实验

定义好了试次之后，我们就需要告诉jsPsych将这个试次包含在要运行的实验中。这就要求我们调用`jsPsych.run`函数并传入一条[时间线](../overview/timeline.md)。对于像当前这种简单的实验，使用的时间线就是一个数组，其中包含了需要运行的试次。

```js
import {initJsPsych} from 'jspsych';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

const jsPsych = initJsPsych();

const trial = {
  type: htmlKeyboardResponse,
  stimulus: 'Hello world!',
}

jsPsych.run([trial]);
```