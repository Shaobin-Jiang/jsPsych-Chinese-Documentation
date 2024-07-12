# jspsych-video-slider-response plugin

这一插件的作用是呈现视频并记录被试拖动滑动条的行为。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试做了反应、视频播放完毕、或被试在规定时间内没有做反应，试次可以自动结束。你可以禁止被试在视频完成播放前拖动滑动条。我们可以通过HTML改变按钮的样式。

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
|min | 整数 | 0 | 滑动条最小值。 |
|max | 整数 | 100 | 滑动条最大值。 |
|slider_start | 整数 | 50 | 滑动条起始值。 |
|step | 整数 | 1 | 滑动条步长，即滑块改变的最小值。 |
|labels | 字符串数组 | [] | 滑动条上显示等距显示的标签。例如，如果有2个标签，则会呈现在滑动条的两端；如果有3个标签，则两个会呈现在滑动条的两端，另一个呈现在滑动条的中间；如果有4个标签，则两个会呈现在滑动条的两端，另外两个会在滑动条宽度33%和67%的位置。|
|slider_width | 整数 | null | 滑动条宽度的像素值。如果为`null`，则其宽度和呈现的最宽的元素相等。 |
|require_movement | 布尔 | false | 如果为true，则被试在点击继续前必须移动滑动条。|
|button_label | 字符串 | 'Continue' | 结束当前试次的按钮的文字。 |
|trial_ends_after_video | 布尔 | false | 如果为true，则试次会在视频播放完后结束。 |
|trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
|response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 |
|response_allowed_while_playing | 布尔 | true | 如果为true，则允许被试在视频播放期间做反应。如果为false，则被试只能在视频播放完后才能拖动滑动条。视频播放完后，才会启用滑动条并接受被试反应（包括回放的时候）。 |


## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| response | 数组   | 滑动条的值。 |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| stimulus | 字符串 | `stimulus`数组。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
|slider_start | 数值 | 滑动条的起始值。 |
|start | 数值 | 视频开始播放的时间点。|

## 示例

```javascript
var trial = {
	type: 'video-slider-response',
	stimulus: [
		'video/sample_video.mp4',
		'video/sample_video.ogg'
	],
	labels: ["Did not like", "Liked"],
	prompt: "<p>Please rate your enjoyment of the video clip.</p>"
}
```
