# jsPsych

---
## initJsPsych

```javascript
var jsPsych = initJsPsych(settings);
```

### 参数

| 参数 | 类型   | 描述                              |
| --------- | ------ | ---------------------------------------- |
| settings  | 对象 | 初始化jsPsych对象时的设置项。详见下表。 |

该对象可以包含多个参数，但这些参数都是选填的。

| 参数                  | 类型     | 描述                              |
| -------------------------- | -------- | ---------------------------------------- |
| display_element            | 字符串   | 呈现实验内容的HTML元素的ID。如果不指定，则jsPsych使用`<body>`元素呈现内容。键盘监听事件会绑定到该元素上。如果要能够检测到键盘事件，则该元素需要获得焦点（被试需要点一下）。 |
| on_finish                  | 函数   | 实验结束时执行的函数。         |
| on_trial_start             | 函数   | 新的试次开始时执行的函数。      |
| on_trial_finish            | 函数   | 试次结束时执行的函数。            |
| on_data_update             | 函数   | 每次使用`jsPsych.data.write`方法存储数据时执行的函数。所有插件都是用这个方法存储数据（调用`jsPsych.finishTrial`），所以每次插件存储新的数据时当前函数都会执行。 |
| on_interaction_data_update | 函数   | 每次出现新的交互行为时执行的函数。交互事件包括点开别的窗口（blur）、回到实验窗口（focus）、进入全屏模式（fullscreenenter）和退出全屏模式（fullscreenexit）。 |
| on_close                   | 函数   | 被试离开页面时执行的函数。例如，如果要在被试关闭页面前保存数据，可以使用这个函数。 |
| show_progress_bar          | 布尔  | 如果为`true`，则会在页面顶端显示[进度条](../overview/progress-bar.md)。默认值为`false`。 |
| message_progress_bar       | 字符串或函数   | 进度条旁边显示的文字，默认为'Completion Progress'。如果为函数，则该函数接受当前进度为传入参数，取值范围为0 - 1。该函数在每次进度条更新时被调用。|
| auto_update_progress_bar   | 布尔   | 如果为true，则页面顶端的进度条在主时间线中的试次结束后会自动更新。 |
| use_webaudio               | 布尔   | 如果为`false`。则jsPsych不会使用WebAudio API播放音频，而是会使用HTML5的Audio对象。WebAudio API计时更精确，如果可以的话，还是应该使用它。默认值为`true`。 |
| default_iti                | 数值  | 试次间间隔，单位为毫秒。默认值为0毫秒。 |
| experiment_width           | 数值  | jsPsych包裹实验元素的容器的宽度，单位为像素。如果不指定，则其宽度为jsPsych呈现内容的元素宽度的100%。通常来说，呈现内容的元素是`<body>`元素，所以此时容器宽度等于屏幕宽度。<br><span style="color: red;">译者注：jsPsych包括了多层嵌套，外面一层是body标签，即呈现实验内容的元素；包裹实验元素的容器只会包含实验任务相关的，而不会包含进度条这些东西（进度条也是在呈现内容的元素内呈现的，但被另一个容器包裹）</span> |
| minimum_valid_rt           | 数值  | 按键反应有效反应时的最小值。如果在此之前按键，则该反应无效。注意次参数仅对按键反应有效，对按钮和滑动条无效。默认值为0。 |
直接在浏览器中运行实验（如，双击打开HTML文件）会使用 `file://` 协议，此时部分功能不可用。默认情况下，jsPsych在检测到当前HTML文件是通过`file://`协议运行时，会进入安全模式，自动禁用不能使用的功能。具体来说，禁用Web Audio（使用HTML5的audio，即使`use_webaudio`为true)和视频预加载。`override_safe_mode`参数默认为false，但我们也可以在使用`file://`协议时将其设置为true，以强制使用被禁用的功能。此时，我们需要禁用浏览器的安全 (CORS)功能——不过你需要明白你的这些操作是干什么的。注意，当前参数在在线运行实验时没有影响。因为使用了`http://`或`https://`协议。 |
| case_sensitive_responses   | 布尔   | 如果为`true`，则jsPsych会在记录键盘反应时对大小写进行区分。例如，如果试次仅接受"a"按键，则"A"为无效按键。如果为false，则jsPsych不会对键盘反应区分大小写，即，在choices参数为"a"时，"a"和"A"都是有效的反应。如果我们不希望被试反应的记录被打开了大写锁定或按下了<kbd>Shift</kbd>这些因素影响，应该将当前参数设置为false。默认值为`false`。 |
| extensions | 数组 | 包含了使用的扩展的数组。数组中的每个元素是一个对象，对应一个扩展。每个对象必须有`type`属性，即扩展的名称。可以给对象添加`params`参数，该参数是一个对象，会被传入扩展的`initialize`函数中。当前参数默认为空数组。 |

### 返回值

返回一个jsPsych实例，通过该实例调用本页中提到的方法。因此，在调用`initJsPsych`函数前，是不能使用本页中提到的方法的。

### 描述

配置并启动试验。

### 示例

```javascript
var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }, 
  show_progress_bar: true,
  default_iti: 500
});
```

更多示例详见GitHub仓库里[examples文件夹](https://github.com/jspsych/jsPsych/tree/main/examples)。

---
## jsPsych.abortCurrentTimeline

```javascript
jsPsych.abortCurrentTimeline()
```

### 参数

无。

### 返回值

无。

### 描述

结束当前时间线。如果时间线是嵌套的，则只会结束包含直接包含当前试次的时间线。

### 示例

#### 如果按下特定键，则结束时间线

```javascript
var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

var images = [
  "img/1.gif", "img/2.gif", "img/3.gif", "img/4.gif",
  "img/5.gif", "img/6.gif", "img/7.gif", "img/8.gif",
  "img/9.gif", "img/10.gif"
];

var trials = [];
for (var i = 0; i < images.length; i++) {
  trials.push({
    stimulus: images[i]
  });
}

var block = {
  type: jsPsychImageKeyboardResponse,
  choices: ['y', 'n'], 
  prompt: '<p>Press "y" to Continue. Press "n" to end this node of the experiment.</p>',
  on_finish: function(data) {
    if (jsPsych.pluginAPI.compareKeys(data.response, 'n')) {
      jsPsych.abortCurrentTimeline();
    }
  },
  timeline: trials
}

var after_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>The next node</p>'
}

jsPsych.run([block, after_block]);
```

---
## jsPsych.abortExperiment

```javascript
jsPsych.abortExperiment(message, data)
```

### 参数

| 参数        | 类型   | 描述                           |
| ----------- | ------ | ------------------------------ |
| message | 字符串 | 实验结束后呈现在屏幕上的消息。 |
| data | 对象 | 可选，该对象会在实验的最后一个试次被保存到数据中。|

### 返回值

无。

### 描述

跳过剩下的所有试次，结束实验。如果`jsPsych`的`on_finish`函数返回一个`Promise`对象，则会在该promise对象执行完成后才会显示`message`。

### 示例

#### 如果做出特定反应，直接结束实验

```javascript
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'image1.jpg',
  choices: ['y', 'n'],
  prompt: '<p>Press "y" to Continue. Press "n" to end the experiment</p>',
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, "n")){
      jsPsych.abortExperiment('The experiment was ended by pressing "n".');
    }
  }
}
```

---

## jsPsych.abortTimelineByName

```javascript
jsPsych.abortTimelineByName()
```

### 参数

| 参数       | 类型     | 描述                              |
| --------------- | -------- | ---------------------------------------- |
| name | 字符串   | 中止的时间线的名称。 |

### 返回值

无。

### 描述

结束当前名为`name`的时间线。如果有很多层嵌套的时间线，可以控制具体哪一条时间线应该中止。

### 示例

#### Abort a procedure if an incorrect response is given.

```javascript
const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>+</p>',
  choices: "NO_KEYS",
  trial_duration: 1000
}

const test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['y', 'n'],
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, "n")){
      jsPsych.abortTimelineByName('memory_test');
    }
  }
}

const memoryResponseProcedure = {
  timeline: [fixation, test]
}

// the variable `encode` is not shown, but imagine a trial that displays
// some stimulus to remember.
const memoryEncodeProcedure = {
  timeline: [fixation, encode]
}

const memoryTestProcedure = {
  timeline: [memoryEncodeProcedure, memoryResponseProcedure]
  name: 'memory_test',
  timeline_variables: [
    {stimulus: 'image1.png'},
    {stimulus: 'image2.png'},
    {stimulus: 'image3.png'},
    {stimulus: 'image4.png'}
  ]
}


```

---
## jsPsych.addNodeToEndOfTimeline

```javascript
jsPsych.addNodeToEndOfTimeline(node_parameters)
```

### 参数

| 参数       | 类型     | 描述                              |
| --------------- | -------- | ---------------------------------------- |
| node_parameters | 对象   | 定义时间线的对象，必须有`timeline`参数，且该参数值必须是一个有效的时间线数组 。|

### 返回值

无。

### 描述

在实验末尾添加时间线。

### 示例

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'This is a new trial.'
}

var new_timeline = {
  timeline: [trial]
}

jsPsych.addNodeToEndOfTimeline(new_timeline)
```

---
## jsPsych.evaluateTimelineVariable

```js
jsPsych.evaluateTimelineVariable(variable_name)
```

### 参数

| 参数 | 类型 | 描述 |
| --------- | ---- | ----------- |
| variable_name | 字符串 | 需要计算的变量名。 |

### 返回值

当前时间线变量的值。

### 描述

不同于`jsPsych.timelineVariable()`，`evaluateTimelineVariable()`会立刻返回当前时间线变量的值。所以在不需要立刻执行的场景下不应该使用这个方法。具体来说，例如在函数内访问时间线变量的时候是可以使用这个方法的。
timeline variable within a function, immediate evaluation is usually correct.

### 示例

#### 在函数内直接获取时间线变量

```javascript
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function(){
    return `<img style='width:100px; height:100px;' src='${jsPsych.evaluateTimelineVariable('image')}'></img>`;
  }
}

const procedure = {
  timeline: [trial],
  timeline_variables: [
    {image: 'face1.png'},
    {image: 'face2.png'},
    {image: 'face3.png'},
    {image: 'face4.png'}
  ]
}
```

---
## jsPsych.finishTrial

```javascript
jsPsych.finishTrial(data)
```

### 参数

| 参数 | 类型   | 描述                      |
| --------- | ------ | -------------------------------- |
| data      | 对象 | 当前试次需要存储的数据。 |


### 返回值

无。

### 描述

该方法告诉jsPsych当前试次结束，用于在各个插件中结束当前试次。试次结束后会执行以下任务：

* 使用`jsPsych.data.write()`存储数据
* 执行试次的on_finish回调函数
* 执行on_trial_finish回调函数
* 如果呈现了进度条，则更新进度条
* 如果当前试次是最后一个（且on_finish回调已经执行了），则结束实验
* 如果有下一个试次则开始下一个试次

### 示例

```javascript
// this code would be in a plugin
jsPsych.finishTrial({correct_response: true});
```

---
## jsPsych.getCurrentTrial

```javascript
jsPsych.getCurrentTrial()
```

### 参数

无。

### 返回值

返回一个包含有当前试次信息的对象，包含了当前对象的参数。

### 描述

获取当前试次的信息。

### 示例

```javascript
var trial = jsPsych.getCurrentTrial();
console.log('The current trial is using the '+trial.type+' plugin');
```


---
## jsPsych.getDisplayElement

```javascript
jsPsych.getDisplayElement()
```

### 参数

无。

### 返回值

返回呈现实验内容的DOM元素。

### 描述

获取呈现实验内容的DOM元素。

### 示例

```javascript
var el = jsPsych.getDisplayElement();

// hide the jsPsych display
el.style.visibility = 'hidden';
```
---

## jsPsych.getInitSettings

```javascript
jsPsych.getInitSettings()
```

### 参数

无。

### 返回值

返回初始化实验时用于配置实验的对象。

### 描述

获取初始化实验时用于配置实验的对象。

### 示例

```javascript
var settings = jsPsych.getInitSettings();

// check the experiment structure
console.log(JSON.stringify(settings.timeline));
```


---

## jsPsych.getProgress

```javascript
jsPsych.getProgress()
```

### 参数

无。

### 返回值

返回包括以下属性的对象：

| Property             | 类型    | 描述                              |
| -------------------- | ------- | ---------------------------------------- |
| total_trials         | 数值 | 实验中的试次数。注意，可能的循环或者被跳过的试次不会被计入其中。 |
| current_trial_global | 数值 | 返回当前是第几个试次。没完成一个试次，这个值都会加1。 |
| percent_complete     | 数值 | 估算实验进度的百分比。如果实验没有循环或条件时间线，则这个值是准确的，否则这个值是估计值。 |


### 描述

该犯法会返回关于当前实验的长度和被试实验进度的信息。

### 示例

```javascript
var progress = jsPsych.getProgress();
alert('You have completed approximately '+progress.percent_complete+'% of the experiment');
```


---
## jsPsych.getProgressBarCompleted

```javascript
jsPsych.getProgressBarCompleted()
```

### 参数

无。

### 返回值

返回一个0 - 1之间的数值，表示目前进度条的进度。

### 描述

用来获取进度条当前进度。对于自动和手动控制都有效。

### 示例

```javascript
var progress_bar_amount = jsPsych.getProgressBarCompleted();
```

---

## jsPsych.getStartTime

```javascript
jsPsych.getStartTime()
```

### 参数

无。

### 返回值

返回一个`Date`对象，用来表示实验是什么时候开始的。

### 描述

获取实验的开始时间。

### 示例

```javascript
var start_time = jsPsych.getStartTime();
```

---

## jsPsych.getTotalTime

```javascript
jsPsych.getTotalTime()
```

### 参数

无。

### 返回值

返回一个数值，表示从调用`jsPsych.run`到当前所经过的毫秒数。

### 描述

获取被试做实验的时间。

### 示例

```javascript
var time = jsPsych.getTotalTime();
console.log(time);
```

---
## jsPsych.pauseExperiment

```javascript
jsPsych.pauseExperiment()
```

### 参数

无。

### 返回值

无。

### 描述

当前试次结束后暂停实验，但在调用`jsPsych.resumeExperiment()`前不会执行后面的试次。

### 示例

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Press p to take a 30 second break. Otherwise, press c to continue immediately.',
  choices: ['p','c'],
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, "p")) { 
      jsPsych.pauseExperiment();
      setTimeout(jsPsych.resumeExperiment, 30000);
    }
  }
}
```

---

## jsPsych.resumeExperiment

```javascript
jsPsych.resumeExperiment()
```

### 参数

无。

### 返回值

无。

### 描述

在调用`jsPsych.pauseExperiment()`后恢复实验进行。如果还没达到`post_trial_gap`，则会等到该间隔结束后再继续实验。例如，如果`post_trial_gap`为10,000ms，但`jsPsych.resumeExperiment()`在前一个试次结束后6,000ms的时候被调用了，则会再等4,000ms才会开始下一个试次。

### 示例

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Press p to take a 30 second break. Otherwise, press c to continue immediately.',
  choices: ['p','c'],
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, "p")) { 
      jsPsych.pauseExperiment();
      setTimeout(jsPsych.resumeExperiment, 30000);
    }
  }
}
```

---

## jsPsych.run

```javascript
jsPsych.run(timeline)
```

### 参数

| 参数 | 类型    | 描述                              |
| --------- | ------- | ---------------------------------------- |
| timeline  | 数组   | 当前实验的时间线。详见[创建实验：时间线](../overview/timeline.md)。 |

### 返回值

无。

### 描述

使用传入的时间线开始实验。

### 示例

```javascript
var timeline = [trial1, trial2, trial3];

jsPsych.run(timeline);
```

---

## jsPsych.setProgressBar

```javascript
jsPsych.setProgressBar(value)
```

### 参数

| 参数 | 类型    | 描述                              |
| --------- | ------- | ---------------------------------------- |
| value     | 数值 | 进度条进度（0 - 1之间）。 |


### 返回值

无。

### 描述

设置进度条进度，取值范围为0 - 1，大于1的值记为1。

### 示例

```javascript
jsPsych.setProgressBar(0.85);
```

---

## jsPsych.timelineVariable

```javascript
jsPsych.timelineVariable(variable)
```

### 参数

| 参数 | 类型 | 描述
----------|------|------------
variable | 字符串 | 时间线变量的名称

### 返回值

返回一个占位符，jsPsych会在执行到这个试次的时候对其进行解析。

### 描述

[时间线变量](../overview/timeline.md#_5)非常适合用于创建重复但每次重复使用不同参数值的实验。当前函数会获取时间线变量当前的值。必须和使用时间线变量的时间线一起使用。详见[时间线变量部分](../overview/timeline.md#_5)。

### 示例

#### 作为试次的参数使用

```javascript
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('image')
}

var procedure = {
  timeline: [trial],
  timeline_variables: [
    {image: 'face1.png'},
    {image: 'face2.png'},
    {image: 'face3.png'},
    {image: 'face4.png'}
  ]
}
```

---

## jsPsych.version

```javascript
jsPsych.version()
```

### 参数

无。

### 返回值

以字符串形式返回版本号。

### 描述

获取jsPsych的版本。

### 示例

```javascript
var version = jsPsych.version();
console.log(version);
```
