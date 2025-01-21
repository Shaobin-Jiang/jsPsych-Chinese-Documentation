# audio-slider-response

这个插件的作用是播放音频文件并记录被试拖动滑动条的行为。

如果浏览器支持的话，会使用WebAudio API播放音频，这可以增加播放时间控制的精度。反应时是通过WebAudio自带的计时器测量的，从而提高了反应时的精确度。如果浏览器不支持WebAudio API，则会使用HTML5的audio播放音频文件。

我们可以使用[`preload`插件](./preload.md)自动预加载音频文件。但是，如果你使用了时间线变量或者是其他动态的方法添加音频材料，就需要[手动预加载](../overview/media-preloading.md#_3)。

试次可以在被试做反应时结束，可以在音频播放完后结束，或在被试在要求的时间内没有做反应后结束。你可以禁止被试在音频完成播放前拖动滑动条。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                           | 类型       | 默认值      | 描述                                                         |
| ------------------------------ | ---------- | ----------- | ------------------------------------------------------------ |
| stimulus                       | 字符串     | *undefined* | 要播放的音频文件的路径。                                     |
| labels                         | 字符串数组 | []          | 滑动条上显示等距显示的标签。例如，如果有2个标签，则会呈现在滑动条的两端；如果有3个标签，则两个会呈现在滑动条的两端，另一个呈现在滑动条的中间；如果有4个标签，则两个会呈现在滑动条的两端，另外两个会在滑动条宽度33%和67%的位置。 |
| button_label                   | 字符串     | 'Continue'  | 结束当前试次的按钮的文字。                                   |
| min                            | 整数       | 0           | 滑动条最小值。                                               |
| max                            | 整数       | 100         | 滑动条最大值。                                               |
| slider_start                   | 整数       | 50          | 滑动条起始值。                                               |
| step                           | 整数       | 1           | 滑动条步长，即滑块改变的最小值。                             |
| slider_width                   | 整数       | null        | 滑动条宽度的像素值。如果为`null`，则其宽度和呈现的最宽的元素相等。 |
| require_movement               | 布尔       | false       | 如果为true，则被试在点击继续前必须移动滑动条。               |
| prompt                         | 字符串     | null        | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| trial_duration                 | 数值       | null        | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
| response_ends_trial            | 布尔       | true        | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应也要听完前音频材料。 |
+| trial_ends_after_audio         | 布尔      | false         | 如果为真，则试次会在音频播放结束后立刻停止。 |
| response_allowed_while_playing | 布尔       | true        | 如果为true，则允许被试在音频播放期间做反应。如果为false，则被试只能在音频播放完后才能拖动滑动条。音频播放完后，才会启用滑动条并接受被试反应（包括回放的时候）。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称         | 类型   | 值                                                           |
| ------------ | ------ | ------------------------------------------------------------ |
| response     | 数值   | 滑动条的数值。                                               |
| rt           | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| stimulus     | 字符串 | 当前试次播放的音频文件的路径。                               |
| slider_start | 数值   | 滑动条起始值。                                               |

## 模拟模式

在`data-only`模式下，`response_allowed_while_playing`参数不会影响模拟的反应时，这是因为该模式下，音频文件不会被加载，所以其时长也是未知的。在未来的版本中，随着模拟模式的改进，这一特性可能会改变。

## 示例

???+ example "一个简单的评定量表"
	=== "Code"
		```javascript
		var trial = {
			type: jsPsychAudioSliderResponse,
			stimulus: 'sound/speech_joke.mp3',
			labels: ['Not Funny', 'Funny'],
			prompt: '<p>How funny is the joke?</p>'
		}
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-slider-response-demo-1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-slider-response-demo-1.html">在新标签页中打开</a>

???+ example "音频结束前不接受反应；被试必须和滑动条进行交互才能进入下一个试次"
	=== "Code"
		```javascript
		var trial = {
			type: jsPsychAudioSliderResponse,
			stimulus: 'sound/speech_joke.mp3',
			labels: ['Not Funny', 'Funny'],
			prompt: '<p>How funny is the joke?</p>',
			response_allowed_while_playing: false,
			require_movement: true
		}
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-slider-response-demo-2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-slider-response-demo-2.html">在新标签页中打开</a>
