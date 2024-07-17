# html-button-response

这一插件的作用是呈现HTML并记录被试点击按钮的行为。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。我们可以通过HTML改变按钮的样式。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | HTML字符串 | undefined | 呈现的HTML内容 
choices | 字符串数组 | [] | 按钮的标签。数组中的每一个字符串都会对应一个按钮。 
| button_html | 函数 | ``(choice: string, choice_index: number)=>`<button class="jspsych-btn">${choice}</button>``; | 为`choices`数组中的每个按钮生成相应的HTML。该函数接受按钮的文本和序号作为传入参数，并返回相应的HTML。如果你想要为不同的按钮使用不同的样式，可以根据文本内容或序号进行条件判断。该参数默认返回一个button元素。|
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 
| button_layout | 字符串 | 'grid' | 如果为`'grid'`，则会为包裹按钮的元素设置`display: grid`并启用`grid_rows`和`grid_columns`。如果为`'flex'`，则会为包裹按钮的元素设置`display: flex`。我们可以通过在`button_html`中添加行内CSS控制按钮的排布。|
| grid_rows | 数值 | 1 | 按钮的行数，只有当`button_layout`为`'grid'`时生效。如果为null，则行数会根据按钮数量和列数自动计算。|
| grid_columns | 数值 | null | 按钮的列数，只有当`button_layout`为`'grid'`时生效。如果为null，则列数会根据按钮数量和行数自动计算。|
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 
response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 
enable_button_after            | 数值       | 0                                                 | 延迟多少毫秒后才允许被试点击按钮。|

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
rt | 数值 | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 
response | 数值 | 说明被试按了哪个按钮。`choices`数组中的第一个按钮是0，第二个是1，以此类推。 
stimulus | 字符串 | 呈现的HTML内容。

## 示例

???+ example "呈现问题，被试做出反应后消失"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychHtmlButtonResponse,
          stimulus: '<p style="font-size:48px; color:red;">GREEN</p>',
          choices: ['Red', 'Green', 'Blue'],
          prompt: "<p>What color is the ink?</p>"
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-button-response-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-button-response-demo1.html">在新标签页中打开</a>

???+ example "使用`button_html`生成自定义的按钮"
    === "Code"
        ```javascript
        const trial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<div style="width: 600px">
                <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: green; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: blue; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: green; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: blue; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: red; display: inline-block"></div>
                <div style="width: 50px; height: 50px; background-color: gray; display: inline-block"></div>
            </div>`,
            choices: ['red', 'green', 'blue'],
            prompt: "<p>What color should the gray block be?</p>",
            button_html: (choice) => `<div style="width: 80px; height: 80px; margin: 20px; background-color: ${choice}; cursor: pointer;"></div>`
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-button-response-demo2.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-button-response-demo2.html">Open demo in new tab</a>
