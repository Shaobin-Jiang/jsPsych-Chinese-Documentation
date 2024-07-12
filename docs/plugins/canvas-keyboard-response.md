# canvas-keyboard-response

这一插件的作用是在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试的按键反应。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                | 类型       | 默认值             | 描述                                                         |
| ------------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| stimulus            | 函数       | *undefined*        | 在canvas上绘图的函数。该函数唯一的参数是一个canvas元素，例如`function(c) {...}`或`function drawStim(c) {...}`，这里`c`指的是一个canvas元素。注意，当前函数中仍然需要设定正确的context，如`let ctx = c.getContext("2d")`。 |
| canvas_size         | 数组       | [500, 500]         | 定义canvas元素大小的数组，单位为像素。数组的第一个元素是canvas元素的高，第二个元素是canvas元素的宽。 |
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
| rt       | 数值   | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 |

注意：这里**没有**记录`stimulus`因为它是一个函数。如果`stimulus`中有什么是你需要记录的，可以通过`data`参数进行添加。

## 示例

???+ example "绘制一个矩形并等待被试反应"
    === "Code"
        ```javascript
        function drawRect(c){
            var ctx = c.getContext('2d');
            ctx.beginPath();
            ctx.rect(30, 30, 200, 50);
            ctx.stroke();
        }

        var trial = {
            type: jsPsychCanvasKeyboardResponse,
            canvas_size: [300, 300],
            stimulus: drawRect,
            choices: ['e','i'],
            prompt: '<p>Is this a circle or a rectangle? Press "e" for circle and "i" for rectangle.</p>',
            data: {shape: 'rectangle'}
        }
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-canvas-keyboard-response-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-canvas-keyboard-response-demo1.html">在新标签页中打开</a>
    
???+ example "绘制圆形，但不接受反应"
    === "Code"
        ```javascript
        function drawCirc(c){
            var ctx = c.getContext('2d');
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }

        var trial = {
            type: jsPsychCanvasKeyboardResponse,
            canvas_size: [300, 300],
            stimulus: drawCirc,
            prompt: '<p>No key response is allowed.</p><p>The stimulus disappears after 3 seconds.</p>',
            choices: "NO_KEYS",
            trial_duration: 3000,
            data: {shape: 'circle', radius: 50}
        }
        ```
            
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-canvas-keyboard-response-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-canvas-keyboard-response-demo2.html">在新标签页中打开</a>
