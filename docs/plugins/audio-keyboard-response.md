# audio-keyboard-response

这个插件的作用是播放音频文件并记录被试按键反应。

如果浏览器支持的话，会使用WebAudio API播放音频，这可以增加播放时间控制的精度。反应时是通过WebAudio自带的计时器测量的，从而提高了反应时的精确度。如果浏览器不支持WebAudio API，则会使用HTML5的audio播放音频文件。

我们可以使用[`preload`插件](./preload.md)自动预加载音频文件。但是，如果你使用了时间线变量或者是其他动态的方法添加音频材料，就需要[手动预加载](../overview/media-preloading.md#_3)。

试次可以在被试做反应时结束，可以在音频播放完后结束，或在被试在要求的时间内没有做反应后结束。你可以禁止被试在音频完成播放前按键。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                           | 类型       | 默认值             | 描述                                                         |
| ------------------------------ | ---------- | ------------------ | ------------------------------------------------------------ |
| stimulus                       | 字符串     | undefined          | 要播放的音频文件的路径。                                     |
| choices                        | 字符串数组 | `ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`NO_KEYS`，则不允许被试按任何键。 |
| prompt                         | 字符串     | null               | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| trial_duration                 | 数值       | null               | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
| response_ends_trial            | 布尔       | true               | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应也要听完前音频材料。 |
| trial_ends_after_audio         | 布尔       | false              | 如果为true，则当前试次会在音频播放完后立刻结束。             |
| response_allowed_while_playing | 布尔       | true               | 如果为true，则允许被试在音频播放期间做反应。如果为false，则被试只能在音频播放完后才能按键。音频播放完后，才会接受被试反应（包括回放的时候）。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| response | 字符串 | 说明被试按了哪个键。如果被试没有按键，则记为`null`。         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。如果被试没有按键，则记为`null`。 |
| stimulus | 字符串 | 当前试次播放的音频文件的路径。                               |

## 模拟模式

在`data-only`模式下，`response_allowed_while_playing`参数不会影响模拟的反应时，这是因为该模式下，音频文件不会被加载，所以其时长也是未知的。在未来的版本中，随着模拟模式的改进，这一特性可能会改变。

## 示例

???+ example "呈现试次，被试做出反应后结束"
	=== "Code"
		```javascript
		var trial = {
			type: jsPsychAudioKeyboardResponse,
			stimulus: 'sound/tone.mp3',
			choices: ['e', 'i'],
			prompt: "<p>Is the pitch high or low? Press 'e' for low and 'i' for high.</p>",
			response_ends_trial: true
		};
		```
	
	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-keyboard-response-demo-1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-keyboard-response-demo-1.html">在新标签页中打开</a>


???+ example "播放音频但不接受被试反应；试次在完成播放后结束"
	=== "Code"
		```javascript
		var trial = {
			type: jsPsychAudioKeyboardResponse,
			stimulus: 'sound/tone.mp3',
			choices: "NO_KEYS",
			trial_ends_after_audio: true
		};
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-keyboard-response-demo-2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-keyboard-response-demo-2.html">在新标签页中打开</a>
