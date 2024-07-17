# 将实验迁移到v8.x

jsPsych 8.x版本主要是重写了核心部分代码，添加了新特性的同时也变得更加易于维护。多数的变化都是底层的，但也有一些重大变化，可能需要我们在实验代码中做出相应修改。

本片文档主要针对从7.x升级到8.x。如果你在使用6.x或更早的版本，请先参照[将实验迁移到v7.x](./migration-v7.md)。

## 时间线事件

在7.x中，如果时间线设置了`conditional_function`，则该函数会在每次时间线循环时都被执行。在8.x中`conditional_function`只执行一次。我们认为这样更符合直觉。这样，`conditional_function`就可以控制一条时间线是否应该执行，只要确定执行就应该一直持续下去。如果你想要像以前那样使用，可以将这条时间线嵌套在另一条循环的时间线里（<span style="color: red;">译者注：此时原本的`loop_function`应该被移到外层去</span>）。

我们还修改了`on_timeline_start`和`on_timeline_finish`的行为，现在这两个函数都只会执行一次。此前的版本中，时间线每次循环都会执行这两个函数。如果你需要像以前那样使用这两个函数，可以将这条时间线嵌套在另一条循环的时间线里。

## 时间线变量

我们将`jsPsych.timelineVariable()`分成了两个函数，分别用于两种不同情境。如果你要在函数里使用`jsPsych.timelineVariable()`，需要将其替换为`jsPsych.evaluateTimelineVariable()`。如果作为试次参数使用，则不需要改变。

对于后者来说，其行为不变：

```js
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
}
```

对于前者而言，应该这样做：

```js
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    return `<p>The stimulus is ${jsPsych.evaluateTimelineVariable('stimulus')}</p>`
  }
}
```

我们给`evaluateTimelineVariable()`设置了更好的错误追踪，如果没有相应的时间线变量就会报错。

我们删除了`jsPsych.getAllTimelineVariables()`并用试次水平的`save_timeline_variables`替换了。

如果你需要保存所有的时间线变量，可以在试次中设置`save_timeline_variables: true`。

## 试次参数

我们对一些试次参数做了更严格的限制，以提升jsPsych的可维护性。

如果插件参数在源代码的`info`对象中标记为`array: true`，而我们设置的参数不是数组，jsPsych就会报错。相比之下，此前部分插件不会管参数是不是数组。对于jsPsych官方插件来说，只有各种button-response插件的`button_html`参数会受影响。此前这个参数可以是数组也可以是字符串，但我们现在修改了这个参数，必须使用函数。

7.x:

```js
const trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Press a button',
  choices: ['a', 'b', 'c'],
  button_html: '<button class="jspsych-btn" style="font-size: 80px;">%choice%</button>'
}
```

8.x:

```js
const trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Press a button',
  choices: ['a', 'b', 'c'],
  button_html: (choice) => {
    return `<button class="jspsych-btn" style="font-size: 80px;">${choice}</button>`
  }
}
```

`button_html`参数还支持给不同的按钮配置不同的HTML。详见[插件文档](https://www.jspsych.org/plugins/jspsych-html-button-response/)。

## 处理插件参数

在7.x版本中，插件可以省略`info`对象，此时jsPsych仍然可以正常处理这些参数。8.x版本对此更加严格，插件的`info`必须列出所有参数。如果某个参数没有列出，那么这个参数无法使用时间线变量和动态参数。`save_trial_parameters`参数对于没有在`info`中列出的参数也不会生效。

## 插件的`version`和`data`属性

我们向插件的`info`中添加了`version`属性。该属性是一个字符串，需要在新版本插件推出时进行更新。

我们还在`info`中添加了`data`属性。该属性描述了插件产生的数据。

插件并不是必须要有这些属性，但我们推荐你把它加上。在8.x版本中，如果插件的`info`中没有`version`和`data`，jsPsych会警告。在9.x版本中，我们计划强制要求添加这两个属性。

## `finishTrial()`的改变

当插件调用`finishTrial()`或以`return`语句结尾时，jsPsych会自动清屏并结束尚未结束的倒计时。这一改变应该只会影响插件开发者。如果你在使用jsPsych官方提供的插件，应该不会注意到有什么变化。

## 进度条

现在进度条会自动在试次结束后更新，包括嵌套的时间线中的试次。如果你希望像以前一样只在顶级时间线节点结束后更新进度条，可以通过`on_finish`函数控制进度条。

我们还将`jsPsych.setProgressBar(x)`修改为`jsPsych.progressBar.progress = x`，将`jsPsych.getProgressBarCompleted()`修改为`jsPsych.progressBar.progress`，从而简化了进度条相关的API。

## 数据处理

我们移除了`internal_node_id`和`jsPsych.data.getDataByTimelineNode()`。时间线节点的ID在7.x版本中主要是在底层使用，用于追踪实验进度，但是在8.x版本中不用这样了。大多数用户也并不需要在数据中存储`internal_node_id`，所以我们把它移除了。如果你需要使用这个参数，最简单的替代方案可能是使用`data`参数把它添加进去。

## 结束时间线和结束实验

我们将`jsPsych.endExperiment()`重命名为了`jsPsych.abortExperiment()`。

我们将`jsPsych.endCurrentTimeline()`重命名为了`jsPsych.abortCurrentTimeline()`。

## 用户交互监听

在7.x版本中，用户交互事件（例如退出全屏）在实验结束后仍然继续。在新版本中，实验结束后就不会对这些事件进行监听了。

## 需要帮助？

如果你在迁移到v8.x的过程中遇到了问题，欢迎在我们的[讨论区](https://github.com/jspsych/jsPsych/discussions/)提问。
