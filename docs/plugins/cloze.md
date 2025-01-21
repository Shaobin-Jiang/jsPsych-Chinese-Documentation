# cloze

这个插件的作用是呈现一段文本，但这一段文本中部分词被移除了。被试需要对移除的部分进行填空。当被试点击按钮时，会对被试作答进行记录。我们可以对被试的作答进行判断，如果出错了可以执行一个特定的函数，从而告知被试自己作答错误。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数          | 类型   | 默认值             | 描述                                                         |
| ------------- | ------ | ------------------ | ------------------------------------------------------------ |
| text          | 字符串 | *undefined*        | 呈现的题目文本。其中的空白部分用`%%`进行标识，这些部分在实验中会被自动替换为输入框。如果你希望检查被试作答是否正确，则需要提供正确答案，正确答案需要写在两个%中间（例如：`%正确答案%`）。如果有多个正确答案，可以在正确答案之间加上 / （例如%correct/alsocorrect%）。 |
| button_text   | 字符串 | OK                 | 结束当前试次的按钮上的文字。                                 |
| check_answers | 布尔   | false              | 被试点击按钮后是否检查被试作答是否正确。如果为true，则会检查被试作答，如果作答错误则会调用`mistake_fn`。这种情况下，试次不会自动结束。如果为false，则试次在被试点击按钮后自动结束。 |
| allow_blanks  | 布尔   | true               | 被试点击完成按钮后是否检查被试答案。如果为真，则不会检查被试是否真的完成作答或者答案为空，试次也会随之结束。如果为假，则会检查被试作答，如果有未答的部分则会调用`mistake_fn`。此时，试次不会自动结束。|
| case_sensitivity | 布尔  | true            | 是否检查被试答案大小写是否匹配。如果为`false`则不检查大小写。 |
| mistake_fn    | 函数   | ```function(){}``` | 如果`check_answers`为true且被试作答错误调用的函数。          |
| autofocus     | 布尔  | true               | 试次开始时是否让第一个输入框获取焦点。默认启用，但有可能被意外禁用，尤其是被试使用读屏软件的时候。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称     | 类型       | 值         |
| -------- | ---------- | ---------- |
| response | 字符串数组 | 被试的答案 |

## 示例

???+ example "使用默认设置（不检查作答情况，使用默认按钮文本）的简单填空"
    === "Code"
        ```javascript
            var cloze_trial = {
                type: jsPsychCloze,
                text: 'The %% is the largest terrestrial mammal. It lives in both %% and %%.'
            };
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-cloze-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-cloze-demo1.html">在新标签页中打开</a>


???+ example "更复杂的示例（检查作答情况，错误作答的处理，修改按钮文本）"
    === "Code"
        ```javascript
            var cloze_trial = {
                type: jsPsychCloze,
                text: 'A rectangle has % 4 % corners and a triangle has % 3 %.',
                check_answers: true,
                button_text: 'Next',
                mistake_fn: function(){alert("Wrong answer. Please check again.")}
            };
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-cloze-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-cloze-demo2.html">在新标签页中打开</a>
