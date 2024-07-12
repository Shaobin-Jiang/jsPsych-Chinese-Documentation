# 将实验迁移到v7.x

7.0版本改变了jsPsych的很多核心功能。这些改变是为了让jsPsych更好地适配现代的JavaScript工具，如包管理器、打包工具，以及改善开发者的体验，以便更多人能为jsPsych贡献代码。我们希望这些改变能让项目生生不息，也能让更多开发者参与到jsPsych的开发中。

我们的目标是在实现这些改变的同时尽可能减少用户体验。不过，有一些地方我们不得不修改，对于那些熟悉v6.x版本的用户，可以参照这篇文档，看看v7.x中改变了什么。

## 加载jsPsych

引入jsPsych有3种方法。我们更新了[hello world教程](../tutorials/hello-world.md)，其中对着三种方法进行了说明。如果你想使用和6.x版本最类似的方法，可以看看[方法2](../tutorials/hello-world.md#2jspsych_1)。最大的不同之处在于，下载的库文件的文件结构有所不同，文件命名也发生了改变。

## 初始化和运行jsPsych

我们移除了`jsPsych.init()`，并把其功能拆分成了两个函数。

在实验代码的开始，我们需要调用`initJsPsych()`创建一个新的jsPsych实例，并将其保存到一个叫做`jsPsych`的变量中。我们需要在这个函数中传入以前需要传入`jsPsych.init()`的参数，除了`timeline`参数以外。

```js
var jsPsych = initJsPsych({
  use_webaudio: false,
  on_finish: function(){
    jsPsych.data.displayData();
  }
});
```

创建了时间线后，就可以通过`jsPsych.run()`运行实验。该函数只有一个传入参数，就是这条时间线。这也是在6.x版本中使用`jsPsych.init`的地方。由于`jsPsych.run`函数只需要时间线，这个参数应该是一个 *数组*（而不是6.x版本中`{timeline: timeline}`这样的对象）。

```js
var timeline = [...]

jsPsych.run(timeline);
```

## 试次的`type`参数

`type`参数的值应该是插件类，而不是字符串。

例如，如果我们通过CDN引入`html-keyboard-response`插件：

```html
<script src="http://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
```

或者通过release中的`plugin-html-keyboard-response.js`文件：

```html
<script src="plugin-html-keyboard-response.js"></script>
```

这个时候就会有一个名为`jsPsychHtmlKeyboardResponse`的全局变量，定义了对应的插件类。

如果要使用这个插件创建试次，就需要将这个类传入`type`参数。插件类的命名以`jsPsych`开始，后面跟上插件的名字，以驼峰法命名（不是用下划线连接单词）。更多示例详见["使用插件"部分](../overview/plugins.md#_2)。注意这个值 *不是字符串* 。

```js
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Hello, version 7.0!'
}
```

## 接受键盘反应的试次的`choices`参数

接受键盘反应的试次的`choices`参数不再支持`jsPsych.NO_KEYS`和`jsPsych.ALL_KEYS`了，它们现在分别改为`"NO_KEYS"`和`"ALL_KEYS"`这两个字符串。

例如，如果我们引入了`audio-keyboard-response`插件，可以这样禁用被试输入：

```js
var trial = {
  type: jsPsychAudioKeyboardResponse,
  choices: "NO_KEYS",
  stimulus: 'example.ogg',
  trial_ends_after_audio: true
}
```

## 使用扩展

和插件一样，扩展一样要通过类来引用。扩展的初始化在`initJsPsych()`中进行，而不是在`jsPsych.init()`中。扩展类的命名和插件类似，不过它们是以`jsPsychExtension`开始的。

```js
var jsPsych = initJsPsych({
  extensions: [
    {type: jsPsychExtensionWebgazer}
  ]
})
```

这些类可以在使用扩展的试次中使用。

```js
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Hello, version 7.0!',
  extensions: [
    {type: jsPsychExtensionWebgazer}
  ]
}
```

## 自定义插件

如果你想要将自己编写的插件升级到7.x版本，可以使用我们的[插件模板](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-template/index.js)。

新的插件模板中，插件通过类实现，但是核心的组成部分没有改变。

* 6.x版本中`plugin.info`中的内容需要被移到`info`对象中。请注意，用来指定参数的`type`属性在7.x版本中有些不同。这个对象需要是[类的静态属性](https://github.com/jspsych/jspsych-contrib/blob/6a27c3fc72fdb1feb1a4041cd670775a7c4bf51d/packages/plugin-template/index.js#L39)。
* 6.x版本中`plugin.trial`里的内容需要被移到类的`trial`方法中。
* 新的模板中有一个`constructor()`函数，该函数需要接受一个jsPsych实例。这一部分代码不用修改。

以下这些改变可能会影响我们的插件：

* 我们移除了`registerPreload`函数，现在我们会通过`info`对象中的`type`参数，自动检测需要预加载多媒体文件。如果参数的类型为`IMAGE`, `AUDIO`, 或`VIDEO`, 则会对其自动预加载。如果想要禁用预加载，可以将`preload`设置为`false`。
* 如果调用了jsPsych提供的函数，例如`jsPsych.finishTrial()`，请注意`jsPsych`不再是一个全局变量了，我们需要用constructor中传入的jsPsych的索引。因此，我们需要在使用到`jsPsych`的地方前面加上`this.`，例如，`jsPsych.finishTrial()`现在应该写成`this.jsPsych.finishTrial()`。如果对jsPsych的调用在另一个函数内部，此时为了让`this`关键字生效，需要使用JavaScript的[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)。
    例如：
    ```js
    function end_trial() {
      // ...
      jsPsych.finishTrial(data);
    }
    ```
    Would be re-written as:
    ```js
    const end_trial = () => {
      // ...
      this.jsPsych.finishTrial(data);
    }
    ```

## 需要帮助？

如果你在讲代码迁移到7.x版本的时候遇到了困难，可以[寻求帮助](https://github.com/jspsych/jsPsych/discussions/2179)。