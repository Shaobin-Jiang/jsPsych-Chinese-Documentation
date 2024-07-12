# image-button-response

这一插件的作用是呈现图片并记录被试点击按钮的行为。试次可以在被试做反应时结束，或持续事先设定好的时长。如果被试在规定时间内没有做反应，试次可以自动结束。我们可以通过HTML改变按钮的样式。

我们可以使用[`preload`插件](./preload.md)自动预加载图片文件。但是，如果你使用了时间线变量或者是其他动态的方法添加图片，就需要[手动预加载](../overview/media-preloading.md#_3)。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | HTML字符串 | undefined | 所呈现图片的路径。 
stimulus_height | 整数 | null | 图片高度的像素值。如果为`null`（未指定），则图片高度为原始高度。 
stimulus_width | 整数 | null | 图片宽度的像素值。如果为`null`（未指定），则图片宽度为原始宽度。 
maintain_aspect_ration | 布尔 | true | 如果**只**设置了图片的宽度或高度且当前参数值为true，则图片的另一维度会按照图片原始宽高比进行缩放。 
choices | 字符串数组 | [] | 按钮的标签。数组中的每一个字符串都会对应一个按钮。 
button_html | HTML字符串 | `'<button class="jspsych-btn">%choice%</button>'` | 生成按钮的HTML模板。你可以通过修改这一参数来自定义不同种类的按钮。`%choice%`会根据`choices`数组中相应的元素值进行修改。如果对于不同按钮需要使用不同的HTML进行呈现，应该把当前的参数值设置为一个数组，这种情况下该数组的长度必须和`chocies`数组的长度一致。`button_html`数组的第一个元素对应`choices`数组中第一个元素，以此类推。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 
margin_vertical | 字符串 | '0px' | 按钮的垂直方向外边距。 
margin_horizontal | 字符串 | '8px' | 按钮的水平方向外边距。 
response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 
render_on_canvas | boolean | true | 如果为true，图片会在canvas元素上进行渲染，从而避免在某些浏览器（如Firefox和Edge）中连续呈现的图片中间出现白屏的情况。如果为false，则图片会和此前版本的jsPsych一样在img元素上进行渲染。如果要呈现的是**动态图**，则当前参数必须为false，因为使用canvas渲染的方法仅支持静态图片。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
rt | 数值 | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 
response | 数值 | 说明被试按了哪个按钮。`choices`数组中的第一个按钮是0，第二个是1，以此类推。 
stimulus | 字符串 | 所呈现图片的路径。 

## 示例

???+ example "呈现问题，被试做出反应后消失"
    === "Code"

        ```javascript
        var trial = {
            type: jsPsychImageButtonResponse,
            stimulus: 'img/happy_face_1.png',
            choices: ['Happy', 'Sad'],
            prompt: "<p>Is this person happy or sad?</p>"
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-image-button-response-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-image-button-response-demo1.html">在新标签页中打开</a>
