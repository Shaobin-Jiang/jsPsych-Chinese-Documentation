# 实验设置

我们在调用`initJsPsych`时可以对实验进行一些设置。

这些设置项在传入`initJsPsych`的对象中进行设置。例如，如果需要指定试次间的间隔、有效反应时的最小值以及实验页面呈现的最小宽度，该对象应该是这样的：

```js
initJsPsych({
    default_iti: 250, 
    minimum_valid_rt: 100, 
    experiment_width: 800 
});
```

## 控制实验在页面上渲染的位置

默认情况下，jsPsych会在页面的`<body>`元素内渲染实验内容，但我们也可以控制其在其他元素（例如，一个`<div>`元素）内呈现，这是通过`display_element`参数实现的。

```html
<body>
    <div id="jspsych-target"></div>
</body>
<script>

    initJsPsych({
        display_element: 'jspsych-target'
    });

</script>
```

这样设置方便我们在页面上同时渲染其他内容（例如，呈现实验的demo和注释）或对呈现实验内容的元素进行更多的控制。我们可以通过CSS对该元素的位置、大小、缩放比例等进行设置。

## 实验事件

实验中的一些事件会触发回调函数，详见[事件相关回调函数](./events.md)。这些事件包括：

* `on_finish`: 实验结束时调用
* `on_trial_start`: 每个试次开始时调用
* `on_trial_finish`: 每个试次结束时调用
* `on_data_update`: 当jsPsych数据更新时调用
* `on_interaction_data_update`: 当添加新的交互数据（例如，被试进入或退出全屏模式）时调用
* `on_close`: 页面关闭前调用，例如在被试提前关闭实验页面的时候

## 排除被试的标准

可以根据被试的浏览器的属性，如窗口大小及是否支持某些功能。详见[根据浏览器类型排除被试](./exclude-browser.md)。

## 呈现进度条

我们可以在屏幕上方呈现进度条，该进度条可以自动更新或手动更新。默认情况想，进度条旁边的文字是"Completion Progress"，但我们可以通过`initJsPsych`中的`message_progress_bar`参数对此进行设置。详见[进度条](./progress-bar.md)。

## 选择如何播放音频文件

通过设置`initJsPsych()`中的`use_webaudio`参数，我们可以选择到底是使用WebAudio API还是HTML5的audio元素播放音频。默认情况下，jsPsych使用WebAudio API播放音频文件，因为这样对反应时的记录更加精确。

不过，离线运行实验时（即，双击打开HTML文件而不是托管到服务器上），通过WebAudio API加载文件会报错，这是因为浏览器的[cross-origin security policy](https://security.stackexchange.com/a/190321)。因此，jsPsych会在检测到实验为离线运行时自动切换到“安全模式”，并自动使用HTML5的audio元素播放音频，无论`use_webaudio`参数是否为true。详见运行实验部分中[Cross-origin requests (CORS)和安全模式](./running-experiments.md#cross-origin-requests-cors)这一节。

```js
initJsPsych({
    use_webaudio: false
});
```

## 设置默认的试次间间隔

默认情况下，一个试次结束后，下一个试次会立刻开始，但我们可以在`initJsPsych()`中设置`default_iti` 参数，在两个试次间添加一段时间间隔。

```js
initJsPsych({
    default_iti: 500
});
```

这个参数的单位为毫秒。在这段间隔期间，会呈现空屏。

## 设置实验最大宽度

实验默认情况下会完全占据呈现实验内容的元素。通常情况下，该元素为`<body>`元素，此时实验会占据整个浏览器窗口（可以通过修改上文所说的`display_element`参数来调整）。

如果设置了`experiment_width`参数，则可以限制呈现内容宽度的最大值。该参数单位为像素。

```js
initJsPsych({
    experiment_width: 750
});
```

## 设置有效反应时的最小值

默认情况下，jsPsych会将所有按键反应的反应时记为有效，但我们也可以设置最短的有效反应时（单位：毫秒）。如果在此之前按键，则视为无效。注意，这个参数只对**键盘按键反应**生效，对于按钮和滑动条不生效。默认值为0。

```js
// ignore any keyboard responses that are less than 100 ms
initJsPsych({
    minimum_valid_rt: 100
});
```

## 设置按键反应是否对大小写敏感

JavaScript的键盘输入事件中对大小写进行区分（例如，<kbd>a</kbd>和<kbd>A</kbd>不同）。一般情况下，我们只关心被试到底按了哪个键，而不是输入的字母是大写还是小写的（如，是否按了<kbd>CapsLock</kbd>或<kbd>Shift</kbd>）。因此，jsPsych会将所有按键的choices参数以及按键反应的值转换为小写，这样更方便我们设置choices参数（例如，只需要写成`choices: ['a']`而非`choices: ['a','A']`），也更方便我们对被试反应进行检查、计分。

但也有些时候，我们需要choices属性以及被试按键对大小写敏感。我们可以在`initJsPsych`中将`case_sensitive_responses`参数设置为true。

```js
// use case-sensitive key choices and responses, 
// i.e. uppercase and lower case letters ('a' and 'A') will be treated as different key choices, 
// and will be recorded this way in the data
initJsPsych({
    case_sensitive_responses: true
});
```

注意，该设置仅对使用jsPsych内置的键盘监听的按键有效，如`*-keyboard-response`系列插件，而不会在通过输入框进行输入的插件中生效，如`survey-text`、`cloze`等插件。

## 离线运行实验时禁用“安全模式”

默认情况下，jsPsych会在检测到当前页面在离线运行时（通过`file://`协议）切换到“安全模式”以避免报错。特别地，在安全模式下会使用HTML5的audio元素播放音频（即使将`use_webaudio`设置为true也会这样），并会禁用视频预加载（包括自动和手动预加载）。详见运行实验部分中[Cross-origin requests (CORS)和安全模式](./running-experiments.md#cross-origin-requests-cors)这一节。

我们可以在`initJsPsych`中将`override_safe_mode`参数设置为`true`，从而禁用安全模式。如果你为了测试而禁用了浏览器的一些安全设置时，可以选择这样做。在线上（通过服务器）运行实验时，这个参数不会产生影响，因为使用了`http://`或`https://`协议，不会启动安全模式。

```js
initJsPsych({
    override_safe_mode: true
});
```

## 添加扩展

[扩展](./extensions.md)是可以增强插件功能的jsPsych模块。一个经典的扩展使用案例就是眼动。眼动的扩展使得插件可以收集被试的注视情况并记录到插件的数据对象中。如果你想要在实验中使用扩展，则需要在调用`initJsPsych`时进行设置。`initJsPsych`的`extensions`参数是一个对象数组，每个数组都对应了一个需要添加到实验中的扩展。下面是使用webgazer扩展的示例。

```js
initJsPsych({
    extensions: [
        {type: jsPsychExtensionWebgazer}
    ]
});
```
