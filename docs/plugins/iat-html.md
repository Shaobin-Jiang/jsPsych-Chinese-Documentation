# iat-html plugin

这个插件的作用是进行[内隐联想测验 (IAT)](https://implicit.harvard.edu/implicit/iatdetails.html)，刺激为HTML内容。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                    | 类型       | 默认值                                                       | 描述                                                         |
| ----------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| stimulus                | 字符串     | *undefined*                                                  | 呈现的HTML内容。                                             |
| html_when_wrong         | 字符串     | `<span style="color: red; font-size: 80px">X</span>`         | 被试反应错误时呈现的内容。                                   |
| bottom_instructions     | 字符串     | `<p>If you press the wrong key, a red X will appear. Press any key to continue.</p>` | 关于做出错误反应以及此时是否需要再按键以继续实验的说明。     |
| force_correct_key_press | 布尔       | false                                                        | 如果为true，则被试在做出错误反应后需要按另一个键以继续实验。例如，如果要求通过按<kbd>e</kbd>和<kbd>i</kbd>键做反应，在应该按<kbd>e</kbd>的时候被试按了<kbd>i</kbd>，则被试需要再按一下<kbd>e</kbd>才能继续实验。此时，`key_to_move_forward`参数将不生效。 |
| display_feedback        | 布尔       | false                                                        | 如果为true，则同时需要对`html_when_wrong`和`wrong_image_name`参数进行设置。如果为false，则需要设置`trial_duration`参数，此时试次会自动进行下去。 |
| left_category_key       | 字符串     | 'e'                                                          | 和`left_category_label`对应的按键。                          |
| right_category_key      | 字符串     | 'i'                                                          | 和`right_category_label`对应的按键。                         |
| left_category_label     | 字符串     | ['left']                                                     | 包含和特定刺激相关的单词/标签组成的数组，在页面上居左。      |
| right_category_label    | 字符串     | ['right']                                                    | 包含和特定刺激相关的单词/标签组成的数组，在页面上居右。      |
| stim_key_association    | 字符串     | *undefined*                                                  | 可以是`'left'`或`'right'`，用来说明刺激对应着页面左侧还是右侧的类别（`left_category_key`和`right_category_key`）。 |
| key_to_move_forward     | 字符串数组 | jsPsych.ALL_KEYS                                             | 数组中包含了一系列键名，被试可以在做出错误反应、看到反馈时通过按这些键进入到下一个试次。也可以设置为`'other key'`，这样被试只能通过按正确的键才能进入到下一个试次。 |
| trial_duration          | 数值       | null                                                         | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 |
| response_ends_trial     | 布尔       | true                                                         | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| stimulus | 字符串 | 呈现的HTML内容。                                             |
| response | 字符串 | 说明被试按了哪个键。                                         |
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |
| correct  | 布尔   | 说明被试按键反应是否正确。                                   |

## 示例

???+ example "使用HTML呈现IAT的问题"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychIatHtml,
            stimulus: 'Joyous',
            stim_key_association: 'left',
            html_when_wrong: '<span style="color: red; font-size: 80px">X</span>',
            bottom_instructions: '<p>If you press the wrong key, a red X will appear. Press the other key to continue</p>',
            force_correct_key_press: true,
            display_feedback: true,
            trial_duration: 3000, //Only if display_feedback is false
            left_category_key: 'e',
            right_category_key: 'i',
            left_category_label: ['OLD','GOOD'],
            right_category_label: ['YOUNG','BAD'],
            response_ends_trial: true
        }
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-iat-html-demo1.html" width="90%;" height="650px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-iat-html-demo1.html">在新标签页中打开</a>
