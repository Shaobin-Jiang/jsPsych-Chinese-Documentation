# jspsych-video-keyboard-response plugin

这一插件的作用是呈现视频并记录被试按键。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试做了反应、视频播放完毕、或被试在规定时间内没有做反应，试次可以自动结束。你可以禁止被试在视频完成播放前按键。

我们可以使用[`preload`插件](jspsych-preload.md)自动预加载视频文件。但是，如果你使用了时间线变量或者是其他动态的方法添加视频材料，就需要[手动预加载](/overview/media-preloading.html#_3)。同时还请注意，如果你的实验是以文件形式运行的（即，直接在浏览器中打开文件，而非通过服务器访问），那么视频预加载会被禁用，以防出现CORS错误——详见[运行实验](/overview/running-experiments.html)这一部分。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                   | 类型       | 默认值                                            | 描述                                                         |
| ---------------------- | ---------- | ------------------------------------------------- | ------------------------------------------------------------ |
| stimulus               | 数组 | undefined                                         | 包含所呈现视频路径的数组。你可以为同一个视频添加多个格式（例如.mp4 / .ogg / .webm），以更好地[兼容不同浏览器](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats)。通常来说，.mp4可以兼容多种浏览请。当前插件不兼容.mov文件。视频播放器你会优先选择当前数组中第一个与所使用的浏览器兼容的视频，所以请将你希望优先使用的视频放到数组开头。 |
| prompt                 | 字符串     | null                                              | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| width | 数值 | 视频原宽度 | 视频宽度的像素值。 |
|height | 数值 | 视频原高度 | 视频高度的像素值。 |
|autoplay | 布尔 | true | 如果为true，视频会在加载完成后立刻开始播放。 |
|controls | 布尔 | false | 如果为true，则被试可以看到视频播放器的控制面板，从而可以暂停、调整进度。 |
|start | 数值 | null | 如果赋值，则视频会从该点开始播放（单位：秒）。 |
|stop| 数值 | null | 如果赋值，则视频会到该点停止播放（单位：秒）。 |
|rate | 数值 | null | 视频播放速率。1是原速度，<1是慢速，>1是加速。 |
| choices                        | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 |
|trial_ends_after_video | 布尔 | false | 如果为true，则试次会在视频播放完后结束。 |
|trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
|response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 |
|response_allowed_while_playing | 布尔 | true | 如果为true，则允许被试在视频播放期间做反应。如果为false，则被试只能在视频播放完后才能按键。视频播放完后，才会接受被试反应（包括回放的时候）。 |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| response | 字符串 | 说明被试按了哪个键。         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。如果被试没有按键，则记为`null`。 |
| stimulus | 字符串 | `stimulus`数组。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。                               |

## 示例

```javascript
var trial = {
	type: 'video-keyboard-response',
	stimulus: [
		'video/sample_video.mp4',
		'video/sample_video.ogg'
	],
	choices: ['y','n'],
	width: 640
}
```
