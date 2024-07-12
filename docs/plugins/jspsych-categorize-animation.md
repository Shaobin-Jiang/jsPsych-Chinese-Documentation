# jspsych-categorize-animation

这个插件会以固定帧率呈现一系列图片，被试通过按键做反应，jsPsych会对其判断是否正确给予反馈。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                           | 类型       | 默认值             | 描述                                                         |
| ------------------------------ | ---------- | ------------------ | ------------------------------------------------------------ |
| stimuli                        | 数组       | *undefined*        | 数组的每一个元素都是动画中一帧图片的路径。                   |
| choices                        | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 |
| key_answer                     | 字符串     | *undefined*        | 正确反应的按键名。                                           |
| text_answer                    | 字符串     | ""                 | 描述正确答案的文本，连同`correct_text`和`incorrect_text`参数一起使用。 |
| correct_text                   | 字符串     | "Correct."         | 做出正确反应时呈现的字符串，可以包含HTML。其中，可以在字符串中使用`%ANS%`，实验中会自动用`test_answer`的值替换该部分（详见下面的示例）。 |
| incorrect_text                 | 字符串     | "Wrong."           | 做出错误反应时呈现的字符串，可以包含HTML。其中，可以在字符串中使用`%ANS%`，实验中会自动用`test_answer`的值替换该部分（详见下面的示例）。 |
| frame_time                     | 数值       | 500                | 每张图片呈现的毫秒数。                                       |
| sequence_reps                  | 数值       | 1                  | 图片序列的呈现次数。                                         |
| allow_response_before_complete | 布尔       | false              | 如果为true，则被试可以在动画结束前做反应。                   |
| prompt                         | 字符串     | null               | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| feedback_duration              | 数值       | 2000               | 呈现反馈的毫秒数。                                           |
| render_on_canvas               | 布尔       | true               | 如果为true，图片会在canvas元素上进行渲染，从而避免在某些浏览器（如Firefox和Edge）中连续呈现的图片中间出现白屏的情况。如果为false，则图片会和此前版本的jsPsych一样在img元素上进行渲染。如果要呈现的是**动态图**，则当前参数必须为false，因为使用canvas渲染的方法仅支持静态图片。 |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| stimulus | 数组   | 试次中呈现的刺激组成的数组。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| response | 字符串 | 说明被试按了哪个键。                                           |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| correct  | 布尔   | 如果被试做出正确判断则为`true`否则为`false`。                |

## 示例

#### 基本示例

```javascript
var animation_trial = {
  type: 'categorize-animation',
  stimuli: ["img/face_3.jpg", "img/face_2.jpg", "img/face_4.jpg", "img/face_1.jpg"],
	choices: ['p', 'q'], 
	key_answer: 'q', 
};
```

#### 使用`%ANS%`给予反馈

```javascript
var animation_trial = {
  type: 'categorize-animation',
  stimuli: ["img/face_3.jpg", "img/face_2.jpg", "img/face_4.jpg", "img/face_1.jpg"],
  choices: ['p', 'q'], 
  key_answer: 'q', 
	text_answer: 'Dax', // the label for the sequence is 'Dax'
	correct_text: 'Correct! This was a %ANS%.',
	incorrect_text: 'Incorrect. This was a %ANS%.'
};
```
