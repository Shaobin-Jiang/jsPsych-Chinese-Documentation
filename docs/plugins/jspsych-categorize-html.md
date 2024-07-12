# jspsych-categorize-html

这个插件会呈现HTML，被试通过按键做反应，jsPsych会对其判断是否正确给予反馈。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                       | 名称             | 默认值                   | 描述                                                         |
| -------------------------- | ---------------- | ------------------------ | ------------------------------------------------------------ |
| stimulus                   | html字符串       | *undefined*              | 呈现的HTML内容                        |
| choices                        | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 |
| key_answer                     | 字符串     | *undefined*        | 正确反应的按键名。                                           |
| text_answer                    | 字符串     | ""                 | 描述正确答案的文本，连同`correct_text`和`incorrect_text`参数一起使用。 |
| correct_text                   | 字符串     | "Correct."         | 做出正确反应时呈现的字符串，可以包含HTML。其中，可以在字符串中使用`%ANS%`，实验中会自动用`test_answer`的值替换该部分（详见下面的示例）。 |
| incorrect_text                 | 字符串     | "Wrong."           | 做出错误反应时呈现的字符串，可以包含HTML。其中，可以在字符串中使用`%ANS%`，实验中会自动用`test_answer`的值替换该部分（详见下面的示例）。 |
| prompt                     | 字符串           | null                     | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| force_correct_button_press | 布尔          | false                    | 如果为true，则被试在得到反馈后必须再按正确的键才能进行下一个试次。 |
| show_stim_with_feedback    | 布尔        | true                     | 如果为true，则反馈阶段会同时呈现刺激。如果为false，则反馈阶段只会呈现文字反馈。 |
| show_feedback_on_timeout   | 布尔        | false                    | 如果为true，若被试在规定时间内没有做出反应，会呈现被试做出了错误反应的反馈。如果为false，则会显示超时的提醒。 |
| timeout_message            | 字符串        | "Please respond faster." | 反应超时时呈现的消息。 |
| stimulus_duration          | 数值        | null                     | 呈现刺激的毫秒数。如果为`null`，则被试做出反应后刺激才会消失。 |
| feedback_duration          | 数值          | 2000                     | 呈现反馈的毫秒数。    |
| trial_duration             | 数值        | null                     | 允许被试做反应的时长。如果为`null`，则会一直等待被试做出反应。 |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型    | 值                                                           |
| -------- | ------- | ------------------------------------------------------------ |
| stimulus | 字符串  | 被试在当前试次看到的HTML内容。 |
| response | 字符串 | 说明被试按了哪个键。                                         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| correct  | 布尔   | 如果被试做出正确判断则为`true`否则为`false`。                |

## 示例

#### 对HTML内容进行分类

```javascript
var categorization_trial = {
    type: 'categorize',
    stimulus: '<p>B</p>',
    key_answer: 'p',
    text_answer: 'letter',
    choices: ['p', 'q'],
    correct_text: "<p class='prompt'>Correct, this is a %ANS%.</p>",
    incorrect_text: "<p class='prompt'>Incorrect, this is a %ANS%.</p>",
    prompt: "<p>Press p for letter. Press q for number.</p>"
};
```

