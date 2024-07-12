# jspsych-canvas-button-response

这一插件的作用是在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试点击按钮的行为和反应时。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。canvas元素下方会有一个或多个按钮选项，我们可以通过HTML改变按钮的样式。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | 函数 | *undefined* | 在canvas上绘图的函数。该函数唯一的参数是一个canvas元素，例如`function(c) {...}`或`function drawStim(c) {...}`，这里`c`指的是一个canvas元素。注意，当前函数中仍然需要设定正确的context，如`let ctx = c.getContext("2d")`。 
canvas_size | 数组 | [500, 500] | 定义canvas元素大小的数组，单位为像素。数组的第一个元素是canvas元素的高，第二个元素是canvas元素的宽。 
choices | 字符串数组 | [] | 钮的标签。数组中的每一个字符串都会对应一个按钮。 
button_html | HTML字符串 | `'<button class="jspsych-btn">%choice%</button>'` | 生成按钮的HTML模板。你可以通过修改这一参数来自定义不同种类的按钮。`%choice%`会根据`choices`数组中相应的元素值进行修改。如果对于不同按钮需要使用不同的HTML进行呈现，应该把当前的参数值设置为一个数组，这种情况下该数组的长度必须和`chocies`数组的长度一致。`button_html`数组的第一个元素对应`choices`数组中第一个元素，以此类推。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 
margin_vertical | 字符串 | '0px' | 按钮的垂直方向外边距。 
margin_horizontal | 字符串 | '8px' | 按钮的水平方向外边距。 
response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
rt | 数值 | 反应时（单位：毫秒），从刺激播放开始计时，到被试做出反应结束。 
response | 数值 | 说明被试按了哪个按钮。`choices`数组中的第一个按钮是0，第二个是1，以此类推。 

注意：这里**没有**记录`stimulus`因为它是一个函数。如果`stimulus`中有什么是你需要记录的，可以通过`data`参数进行添加。

## 示例

### 根据参数画圆

```javascript
function filledCirc(canvas, radius, color){
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(250, 250, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill()
}

var circle_1 = {
    type: 'canvas-button-response',
    stimulus: function (c) {
        filledCirc(c, 100, 'blue');
    },
    choices: ['Red', 'Green', 'Blue'],
    prompt: '<p>What color is the circle?</p>',
    data: {color: 'blue', radius: 100}
};

var circle_2 = {
    type: 'canvas-button-response',
    stimulus: function (c) {
        filledCirc(c, 150, 'green');
    },
    choices: ['Larger', 'Smaller'],
    prompt: '<p>Is this circle larger or smaller than the last one?</p>',
    data: {color: 'green', radius: 150}
};

```