# virtual-chinrest

这个插件的作用是使用虚拟的chinrest，以测量被试和屏幕键的距离。它还可以将jsPsych的页面内容进行标准化（例如，让一个200像素宽的刺激在被试的电脑上为2.2cm宽）。这些是基于[Li, Joo, Yeatman, and Reinecke (2020)](https://doi.org/10.1038/s41598-019-57204-1)的成果完成的，当前插件的代码也是根据 [他们的实现](https://github.com/QishengLi/virtual_chinrest)进行修改的。我们希望你在使用这个插件的时候，在文章中引用他们的文章。

!!! note "引用"
    Li, Q., Joo, S. J., Yeatman, J. D., & Reinecke, K. (2020). Controlling for Participants’ Viewing Distance in Large-Scale, Psychophysical Online Experiments Using a Virtual Chinrest. _Scientific Reports, 10_(1), 1-11. doi: [10.1038/s41598-019-57204-1](https://doi.org/10.1038/s41598-019-57204-1)

这个插件分为两个阶段：

**第1阶段**：计算被试显示器上像素到厘米的转换比率。被试需要拿一张信用卡或是其他相同大小的物体放在屏幕上，然后调整屏幕上的图片，直到图片大小和信用卡大小相同。这样，在我们已经知道信用卡尺寸的情况下，就可以得到被试设备的像素到厘米的转换比率。

**第2阶段**. 我们使用[盲点](<https://en.wikipedia.org/wiki/Blind_spot_(vision)>)任务测量被试到显示器的距离。被试需要闭上右眼，然后注释屏幕上的一个黑色正方形，与此同时一个红色点会不断地从右向左移动。 在红色点从视野消失时，被试需要按空格键。这样，当前插件可以利用红色点在消失时和黑色方块的距离估计被试到显示器的距离。这个估计过程假定被试的盲点位于13.5°。

## 参数

如果不需要则不用对默认值进行修改。

| 参数                     | 类型    | 默认值                                                                                                                                                                                                                                                                                                                                                                                    | 描述                                                                                                                                                                                                                 |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resize_units                  | 字符串  | "none"                                                                                                                                                                                                                                                                                                                                                                                           | 试次结束后，对jsPsych内容区大小进行调整后的单位：`"none"` `"cm"` `"inch"` 或 `"deg"`。如果为`"none"`，则不会对jsPsych的内容区进行大小的调整。                                                                    |
| pixels_per_unit               | 数值 | 100                                                                                                                                                                                                                                                                                                                                                                                              | 在缩放比例生效后，参照物的一单位长度等于该参数值个像素的长度。单位由`resize_units`指定。这个只在调整屏幕大小时生效（即`resize_units`参数不是 "none"）。                                                    |
| adjustment_prompt             | HTML字符串  | "Click and drag the lower right corner of the image until it is the same size as a credit card held up to the screen. You can use any card that is the same size as a credit card, like a membership card or driver's license. If you do not have access to a real card you can use a ruler to measure the image width to 3.37 inches or 85.6 mm."                                               | 可以包含HTML元素。该参数的内容会在被试手动调整大小阶段在信用卡图片下面进行呈现。                                      |
| adjustment_button_prompt      | HTML字符串  | "Click here when the image is the correct size"                                                                                                                                                                                                                                                                                                                                                  | 被试手动调整大小阶段信用卡图片下方的按钮上的文字。                                                                                                                                      |
| item_path                     | 字符串  | "img/card.png"                                                                                                                                                                                                                                                                                                                                                                                   | 呈现的信用卡图片的路径。默认的图片文件为`/examples/img/card.png`。                                                                                                      |
| item_height_mm                | 数值 | 53.98                                                                                                                                                                                                                                                                                                                                                                                            | 参照物（如：信用卡）的高度，单位为毫米。                                                                                                                                                                |
| item_width_mm                 | 数值 | 85.6                                                                                                                                                                                                                                                                                                                                                                                             | 参照物（如：信用卡）的宽度，单位为毫米。                                                                                                                                                                  |
| item_init_size                | 数值 | 250                                                                                                                                                                                                                                                                                                                                                                                              | 信用卡图片长边长度的像素数。                                                                                                                                 |
| blindspot_reps                | 数值 | 5                                                                                                                                                                                                                                                                                                                                                                                                | 测量盲点位置的次数。如果为0，则不会测量盲点位置，也不会对视距和视角进行计算。                                              |
| blindspot_prompt              | HTML字符串  | "Now we will quickly measure how far away you are sitting. Put your left hand on the space bar. Cover your right eye with your right hand. Using your left eye, focus on the black square. Keep your focus on the black square. The red ball will disappear as it moves from right to left. Press the space bar as soon as the ball disappears. Press the space bar when you are ready to begin. | 可以包含HTML元素。该参数的内容会在盲点任务上方呈现。                                                                      |
| redo_measurement_button_label | HTML字符串  | 'No, that is not close. Try again'                                                                                                                                                                                                                                                                                                                                                               | 在报告测得视距的页面中，用于重做任务的按钮上的文字。如果被试点击该按钮，则会重新开始盲点任务。                                                                                      |
| blindspot_done_prompt         | HTML字符串  | "Yes"                                                                                                                                                                                                                                                                                                                                                                                            | 在报告测得视距的页面中，用于接受当前估算的按钮上的文字。如果被试点击该按钮，则会重新开始盲点任务。                                                                                                                                               |
| blindspot_measurements_prompt | HTML字符串  | 'Remaining measurements: '                                                                                                                                                                                                                                                                                                                                                                       | 写在剩余测量次数前的文字，出现在盲点任务的下方。                                                                                                            |
| viewing_distance_report       | HTML字符串  | "Based on your responses, you are sitting about `<span id='distance-estimate' style='font-weight: bold;'></span>` from the screen. Does that seem about right?"                                                                                                                                                                                                                                  | 盲点任务后估计的视距。如果为`"none"`，则不会向被试报告视距。默认情况下，会在ID为`distance-estimate`的`span`元素内显示距离。 |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

_注意，deg数据**只**会在使用盲点任务估计视距时被返回 (px2deg, win_height_deg, win_width_deg, item_width_deg)._

| 名称            | 类型 | 值                                            |
| --------------- | ---- | --------------------------------------------- |
| rt              | 数值 | 反应时（单位：毫秒）。                        |
| item_height_mm  | 数值 | 参照物高度（单位：毫米）。                    |
| item_width_mm   | 数值 | 参照物宽度（单位：毫米）。                    |
| item_height_deg | 数值 | 可调整大小的div容器最终的高度（单位：角度）。 |
| item_width_deg  | 数值 | 可调整大小的div容器最终的宽度（单位：角度）。 |
| item_width_px   | 数值 | 可调整大小的div容器最终的宽度（单位：像素）。 |
| px2deg          | 数值 | 像素到角度的转换比率。                        |
| px2mm           | 数值 | 像素到毫米的转换比率。                        |
| scale_factor    | 数值 | div#jspsych-content的缩放比例。               |
| win_width_deg   | 数值 | 窗口内侧宽度（单位：角度）。                  |
| win_height_deg  | 数值 | 窗口内侧高度（单位：角度）。                  |
| view_dist_mm    | 数值 | 估算得到的视距（单位：毫米）。                |


## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "测量到屏幕的距离和像素比；不调整大小"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychVirtualChinrest,
            blindspot_reps: 3,
            resize_units: "none"
        };
        ```
    === "Demo"
        这个demo需要一个较大的可视区域。请<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo1.html">在新标签页中打开</a>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo1.html">在新标签页中打开</a>

???+ example "根据每厘米的像素数调整大小"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychVirtualChinrest,
          blindspot_reps: 3,
          resize_units: "cm",
          pixels_per_unit: 50
        };

        var resized_stimulus = {
          type: jsPsychHtmlButtonResponse,
          stimulus: `
            <p>If the measurements were done correctly, the square below should be 10 cm x 10 cm.</p>
            <div style="background-color: black; width: 500px; height: 500px; margin: 20px auto;"></div>
          `,
          choices: ['Continue']
        }
        ```
    === "Demo"
        这个demo需要一个较大的可视区域。请<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo2.html">在新标签页中打开</a>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo2.html">在新标签页中打开</a>

???+ example "根据视角调整大小"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychVirtualChinrest,
          blindspot_reps: 3,
          resize_units: "deg",
          pixels_per_unit: 50
        };

        var resized_stimulus = {
          type: jsPsychHtmlButtonResponse,
          stimulus: `
            <p>If the measurements were done correctly, the square below should take up about 10 degrees of visual angle.</p>
            <div style="background-color: black; width: 500px; height: 500px; margin: 20px auto;"></div>
          `,
          choices: ['Continue']
        }
        ```
    === "Demo"
        这个demo需要一个较大的可视区域。请<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo3.html">在新标签页中打开</a>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-virtual-chinrest-demo3.html">在新标签页中打开</a>
