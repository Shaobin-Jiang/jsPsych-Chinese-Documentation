# jspsych-image-keyboard-response

这一插件的作用是呈现图片并记录被试按键。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。

我们可以使用[`preload`插件](jspsych-preload.md)自动预加载图片文件。但是，如果你使用了时间线变量或者是其他动态的方法添加图片，就需要[手动预加载](/overview/media-preloading.html#_3)。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | HTML字符串 | undefined | 所呈现图片的路径。 
stimulus_height | 整数 | null | 图片高度的像素值。如果为`null`（未指定），则图片高度为原始高度。 
stimulus_width | 整数 | null | 图片宽度的像素值。如果为`null`（未指定），则图片宽度为原始宽度。 
maintain_aspect_ration | 布尔 | true | 如果**只**设置了图片的宽度或高度且当前参数值为true，则图片的另一维度会按照图片原始宽高比进行缩放。 
choices             | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 
response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 
render_on_canvas | boolean | true | 如果为true，图片会在canvas元素上进行渲染，从而避免在某些浏览器（如Firefox和Edge）中连续呈现的图片中间出现白屏的情况。如果为false，则图片会和此前版本的jsPsych一样在img元素上进行渲染。如果要呈现的是**动态图**，则当前参数必须为false，因为使用canvas渲染的方法仅支持静态图片。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| response | 数值   | 说明被试按了哪个键。                                         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| stimulus | 字符串 | 所呈现图片的路径。                                           |

## 示例

#### 呈现问题，被试做出反应后消失

```javascript
var trial = {
	type: 'image-keyboard-response',
	stimulus: 'img/happy_face_1.png',
	choices: ['e', 'i'],
	prompt: "<p>Is this person happy or sad? Press 'e' for happy and 'i' for sad.</p>",
	response_ends_trial: false
};
```

#### 呈现图片一段时间并不接受反应

```javascript
var trial = {
	type: 'image-button-response',
	stimulus: 'img/happy_face_1.png',
	choices: jsPsych.NO_KEYS,
	prompt: "<p>Study this face for 5 seconds.</p>",
	trial_duration: 5000
};
```
