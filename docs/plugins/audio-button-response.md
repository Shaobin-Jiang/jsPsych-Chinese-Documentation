# audio-button-response

这个插件的作用是播放音频文件并记录被试点击按钮的行为。

如果浏览器支持的话，会使用WebAudio API播放音频，这可以增加播放时间控制的精度。反应时是通过WebAudio自带的计时器测量的，从而提高了反应时的精确度。如果浏览器不支持WebAudio API，则会使用HTML5的audio播放音频文件。

我们可以使用[`preload`插件](./preload.md)自动预加载音频文件。但是，如果你使用了时间线变量或者是其他动态的方法添加音频材料，就需要[手动预加载](../overview/media-preloading.md#_3)。

试次可以在被试做反应时结束，可以在音频播放完后结束，或在被试在要求的时间内没有做反应后结束。你可以禁止被试在音频完成播放前点击按钮。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                           | 类型       | 默认值                                            | 描述                                                         |
| ------------------------------ | ---------- | ------------------------------------------------- | ------------------------------------------------------------ |
| stimulus                       | 字符串     | *undefined*                                       | 要播放的音频文件的路径。                                     |
| choices                        | 字符串数组 | *undefined*                                       | 按钮的标签。数组中的每一个字符串都会对应一个按钮。           |
| button_html | 函数 | ``(choice: string, choice_index: number)=>`<button class="jspsych-btn">${choice}</button>``; | 为`choices`数组中的每个按钮生成相应的HTML。该函数接受按钮的文本和序号作为传入参数，并返回相应的HTML。如果你想要为不同的按钮使用不同的样式，可以根据文本内容或序号进行条件判断。该参数默认返回一个button元素。|
| prompt                         | 字符串     | null                                              | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| trial_duration                 | 数值       | null                                              | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
| button_layout | 字符串 | 'grid' | 如果为`'grid'`，则会为包裹按钮的元素设置`display: grid`并启用`grid_rows`和`grid_columns`。如果为`'flex'`，则会为包裹按钮的元素设置`display: flex`。我们可以通过在`button_html`中添加行内CSS控制按钮的排布。|
| grid_rows | 数值 | 1 | 按钮的行数，只有当`button_layout`为`'grid'`时生效。如果为null，则行数会根据按钮数量和列数自动计算。|
| grid_columns | 数值 | null | 按钮的列数，只有当`button_layout`为`'grid'`时生效。如果为null，则列数会根据按钮数量和行数自动计算。|
| response_ends_trial            | 布尔       | true                                              | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应也要听完前音频材料。 |
| trial_ends_after_audio         | 布尔       | false                                             | 如果为true，则当前试次会在音频播放完后立刻结束。             |
| response_allowed_while_playing | 布尔       | true                                              | 如果为true，则允许被试在音频播放期间做反应。如果为false，则被试只能在音频播放完后才能点击按钮。音频播放完后，才会启用按钮并接受被试反应（包括回放的时候） |
| enable_button_after            | 数值       | 0                                                 | 延迟多少毫秒后才允许被试点击按钮。如果`response_allowed_while_playing`为真，则试次一开始就会启动计时；否则，会在音频播放完毕后开始计时。|

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称     | 类型 | 值                                                           |
| -------- | ---- | ------------------------------------------------------------ |
| rt       | 数值 | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| response | 数值 | 说明被试按了哪个按钮。`choices`数组中的第一个按钮是0，第二个是1，以此类推。 |
| stimulus | 字符串 | 当前试次播放的音频文件的路径。                               |

## 模拟模式

在`data-only`模式下，`response_allowed_while_playing`参数不会影响模拟的反应时，这是因为该模式下，音频文件不会被加载，所以其时长也是未知的。在未来的版本中，随着模拟模式的改进，这一特性可能会改变。

## 示例

???+ example "呈现问题，被试做出反应后结束"
	=== "Code"
		```javascript
		var trial = {
			type: jsPsychAudioButtonResponse,
			stimulus: 'sound/tone.mp3',
			choices: ['Low', 'High'],
			prompt: "<p>Is the pitch high or low?</p>"
		};
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-button-response-demo-1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-button-response-demo-1.html">Open demo in new tab</a>

???+ example "通过HTML，用图片作为按钮"
	=== "Code"
		```javascript
		const trial = {
    	type: jsPsychAudioButtonResponse,
    	stimulus: 'sound/roar.mp3',
    	choices: images,
    	prompt: "<p>Which animal made the sound?</p>",
    	button_html: (choice)=>`<img style="cursor: pointer; margin: 10px;" src="${choice}" />`
    };
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-button-response-demo-2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-button-response-demo-2.html">在新标签页中打开</a>

???+ example "使用网格布局"
	=== "Code"
		```javascript
		const trial = {
    	type: jsPsychAudioButtonResponse,
      stimulus: 'sound/telephone.mp3',
      prompt: '<p>Which key was pressed first?</p>',
      choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      button_layout: 'grid',
      grid_rows: 4,
      grid_columns: 3
    }
		```

	=== "Demo"
		<div style="text-align:center;">
			<iframe src="../../demos/jspsych-audio-button-response-demo-3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
		</div>

	<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-audio-button-response-demo-3.html">Open demo in new tab</a>
