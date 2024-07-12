# resize

这个插件的作用是呈现一个可调整大小的div元素，被试可以通过拖拽使得其和参照物大小一致。当被试认为该元素和参照物大小一致，可以点击按钮结束试次，此时数据中会记录该div元素的缩放比例。这样，后续的刺激会以固定大小呈现（和参照物大小一致），而不再由显示器分辨率决定。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
item_height | 数值 | 1 | 参照物的高度，可以使用任意单位，只要所有参数都是用该单位即可。 
item_width | 数值 | 1 | 参照物的宽度 
pixels_per_unit | 数值 | 100 | 在缩放比例生效后，参照物的一单位长度等于该参数值个像素的长度。 
prompt | 字符串 | `''` | 呈现在可调整区域下方、按钮上方的HTML内容。 
button_label | 字符串 | 'Continue' | 用来结束校准的按钮上的文本。 
starting_size | 数值 | 100 | 可调整区域原始大小中，较长边长度的像素值，其纵横比会根据参照物宽和高进行调整。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
final_width_px | 数值 | 可调整控件的最终宽度像素值。 
scale_factor | 数值 | 后续实验中div#jspsych-content元素的缩放比例。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "用信用卡作为参照物，并将150像素显示为1英寸长"
    === "Code"
        ```javascript
        var inputs = {
            type: jsPsychResize,
            item_width: 3 + 3/8,
            item_height: 2 + 1/8,
            prompt: "<p>Click and drag the lower right corner of the box until the box is the same size as a credit card held up to the screen.</p>",
            pixels_per_unit: 150
        };
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-resize-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-resize-demo1.html">在新标签页中打开</a>
