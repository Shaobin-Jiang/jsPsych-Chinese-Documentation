# html-keyboard-response

这一插件的作用是呈现HTML并记录被试的按键。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。


## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                | 类型       | 默认和             | 描述                                                         |
| ------------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| stimulus            | HTML字符串 | *undefined*        | 呈现的HTML内容                                               |
| choices             | 字符串数组 | `"ALL_KEYS"` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`"ALL_KEYS"`，即所有按键都是有效的。如果将当前参数值设为`"NO_KEYS"`，则不允许被试按任何键。 |
| prompt              | 字符串     | null               | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |
| stimulus_duration   | 数值       | null               | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 |
| trial_duration      | 数值       | null               | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
| response_ends_trial | 布尔       | true               | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| response | 字符串 | 说明被试按了哪个键。                                         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| stimulus | 字符串 | 呈现的HTML内容。                                             |

## 示例

???+ example "呈现试次，被试做出反应后结束"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '<p style="font-size:48px; color:green;">BLUE</p>',
            choices: ['r', 'g', 'b'],
            prompt: "<p>Is the ink color (r)ed, (g)reen, or (b)lue?</p>"
        };
        ```
        
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-keyboard-response-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-keyboard-response-demo1.html">在新标签页中打开</a>

???+ example "呈现注视点1秒；不接受反应"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '<p style="font-size: 48px;">+</p>',
            choices: "NO_KEYS",
            trial_duration: 1000,
        };		
        ```
	=== "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-keyboard-response-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-keyboard-response-demo2.html">在新标签页中打开</a>
