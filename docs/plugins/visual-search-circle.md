# visual-search-circle plugin

这个插件的作用是进行一个可以自定义的视觉搜索任务，基于[Wang, Cavanagh, & Green (1994)](http://dx.doi.org/10.3758/BF03206946)的研究。被试需要指出目标是否出现在其他干扰项之中。刺激在圆周上等距分布，圆心有一个注视点。下面是一个使用正反两种N字的例子：

![Sample Visual Search Stimulus](/img/visual_search_example.jpg)

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

* `target`, `foil`和`set_size`参数：可以将这些参数组合起来构建经典的视觉搜索任务，任务中除了目标，都是相同的干扰项。
或者
* `stimuli`参数：可以使用这个数组呈现任意的图片，干扰项、目标、图片的重复次数等不受限制。

无论什么情况下，都需要设置`target_present`和`fixation_image`参数。而对于其他参数，如果不需要则不用进行赋值。


| 参数               | 类型         | 默认值      | 描述                                                         |
| ------------------ | ------------ | ----------- | ------------------------------------------------------------ |
| target             | 字符串       | null | 搜索目标图片的路径。如果使用`target`, `foil`和`set_size`参数，则必须指定这个参数；如果使用`stimuli`参数，则不要指定这个参数。 |
| foil               | 字符串          | null          | 干扰项图片的路径。所有的干扰项都会使用这一图片。如果使用`target`, `foil`和`set_size`参数，则必须指定这个参数；如果使用`stimuli`参数，则不要指定这个参数。 |
| set_size           | 数值         | null          | 呈现的刺激数，如果`target_present`为`true`则也会包括目标项。当`target_present`为`false`，会有和当前参数相等数量的干扰项；如果`target_present`为`true`，则会有`set_size - 1`个干扰项。如果使用`target`, `foil`和`set_size`参数，则必须指定这个参数；如果使用`stimuli`参数，则不要指定这个参数。  |
| stimuli            | 图片数组 | null          | 包含了需要呈现的图片的数组。如果不使用`target`, `foil`和`set_size`参数，则需要指定这个参数 |
| target_present     | 布尔         | *undefined*   | 目标是否存在。必须指定这个参数。如果使用`target`, `foil`和`set_size`参数且当前参数为`false`，则会有set_size个干扰项，如果为`true`，则会有set_size - 1个干扰项。如果使用`stimuli`参数，则这个参数只能用来判断被试反应是否正确。 |
| fixation_image     | 字符串          | *undefined*   | 注视点图片路径。必须指定这个参数 |
| target_size        | 数组         | `[50, 50]`  | 数组有两个元素，分别为搜索项图片的高度和宽度。               |
| fixation_size      | 数值         | `[16, 16]`  | 数组有两个元素，分别为注视点图片的高度和宽度。               |
| circle_diameter    | 数值         | 250         | 搜索项分布的圆形的直径像素值。                               |
| target_present_key | 字符串       | 'j'         | 当目标存在时按的键。                                         |
| target_absent_key  | 字符串       | 'f'         | 当目标不存在时按的键。                                       |
| trial_duration     | 数值         | null        | 被试做反应的时间限制。如果为null，则会允许被试一直进行搜索。 |
| fixation_duration  | 数值         | 1000        | 在呈现搜索项前多少毫秒时呈现注视点。                         |
| randomize_item_locations | 布     | true      | 是否随机位置。如果为`false`，则第一个刺激永远在`location_first_item`指定的位置。|
| location_first_item | 数值 | 0 | 如果`randomize_item_locations`为`false`，则指定第一个刺激的位置（以角度表示）。0°位于注视点上方，正方向为顺时针。|

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称           | 类型   | 值                                                           |
| -------------- | ------ | ------------------------------------------------------------ |
| correct        | 布尔   | 如果被试反应正确则为true。                                   |
| response       | 字符串 | 说明被试按了哪个键。                                         |
| rt             | 数值   | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| set_size       | 数值   | 搜索项的数量。                                               |
| target_present | 布尔   | 如果目标存在则为true。                                       |
| locations      | 数组   | 数组中的每个元素记录了搜索项中心位置的像素值。如果目标存在，则数组的第一个元素对应目标的位置。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |

## 示例

???+ example "相同的干扰项"
    === "Code"

        ```javascript
        var instructions = {
          type: jsPsychHtmlButtonResponse,
          stimulus: `<p>Press J if there is a backwards N.</p>
            <p>Press F if all the Ns are in the normal orientation.</p>`,
          choices: ['Continue']
        }

        var trial = {
          type: jsPsychVisualSearchCircle,
          target: 'img/backwardN.gif',
          foil: 'img/normalN.gif',
          fixation_image: 'img/fixation.gif',
          target_present: true,
          set_size: 4
        }
        ```
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-visual-search-circle-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-visual-search-circle-demo1.html">在新标签页中打开</a>

???+ example "不同的干扰项"
    === "Code"

        ```javascript
        var instructions = {
          type: jsPsychHtmlButtonResponse,
          stimulus: `<p>Press E if there is an elephant in the group.</p>
            <p>Press N if there is no elephant in the group.</p>`,
          choices: ['Continue']
        }

        var trial = {
          type: jsPsychVisualSearchCircle,
          stimuli: ['img/elephant.png', 'img/lion.png', 'img/monkey.png'],
          fixation_image: 'img/fixation.gif',
          target_present_key: 'e',
          target_absent_key: 'n',
          target_present: true
        }
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-visual-search-circle-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-visual-search-circle-demo2.html">在新标签页中打开</a>
