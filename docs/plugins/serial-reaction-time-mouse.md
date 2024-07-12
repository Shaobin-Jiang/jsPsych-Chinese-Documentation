# serial-reaction-time-mouse plugin

这个插件的作用是进行更广义的SRT任务 [(Nissen & Bullmer, 1987)](https://doi.org/10.1016%2F0010-0285%2887%2990002-8)。屏幕上以网格形式呈现一些正方形，且其中一个的颜色会发生改变。被试需要点击颜色改变的正方形。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                      | 类型   | 默认值        | 描述                                                         |
| ------------------------- | ------ | ------------- | ------------------------------------------------------------ |
| target                    | 数组   | *undefined*   | 目标的位置，用`[行, 列]`的格式表示。                         |
| grid                      | 数组   | `[[1,1,1,1]]` | 这个数组表示网格中哪些地方要显示正方形。数组的每一个元素都是数组，代表了网格的一行，而这些数组的每一个元素又对应了这一行中的每一列。如果一个元素值为1，则该位置会绘制正方形；如果一个元素值为0，则该位置不会绘制正方形。这样，通过1和0的赋值，我们可以自由定义网格中正方形的绘制。 |
| grid_square_size          | 数值   | 100           | 网格中每个正方形边长的像素值。                               |
| target_color              | 字符串 | `#999`        | 目标正方形的背景颜色。                                       |
| response_ends_trial       | 布尔   | `true`        | 如果为true，则试次在被试点击鼠标时结束。                     |
| pre_target_duration       | 数值   | 0             | 目标正方形变色前的毫秒数。                                   |
| trial_duration            | 数值   | null          | 试次持续的最长时间。                                         |
| fade_duration             | 数值   | null          | 如果为正数，则目标正方形在试次开始时会逐渐地变色，变色过程持续当前参数指定的时间。 |
| allow_nontarget_responses | 布尔   | false         | 如果为true，则被试也可以对非目标做反应。                     |
| prompt                    | 字符串 | null          | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称 | 类型    | 值                                    |
| ------ | ------- | ---------------------------------------- |
| grid   | 数组   | 网格中正方形的绘制情况。数组的每一个元素都是数组，代表了网格的一行，而这些数组的每一个元素又对应了这一行中的每一列。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| target | 数组   | 目标在网格中的位置，以`[行, 列]`的格式表示。后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| rt     | 数值 | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| response | 数组 | 被试选择的位置，以`[行, 列]`的格式表示。后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| correct | 布尔 | 被试反应是否正确（正确为true，错误为false）。 |

## 示例

???+ example "经典SRT
    === "Code"

        ```javascript
        var grid = [
          [1,1,1,1]
        ]

        var trial_1 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,0]
        }
        var trial_2 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,1]
        }
        var trial_3 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,2]
        }
        var trial_4 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,3]
        }
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-serial-reaction-time-mouse-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-serial-reaction-time-mouse-demo1.html">在新标签页中打开</a>

???+ example "2x2的网格，网格间留有空隙，每个试次中目标方块的颜色不同"
    === "Code"

        ```javascript
        var grid = [
          [1,0,1],
          [0,0,0],
          [1,0,1]
        ]

        var trial_1 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,0],
          target_color: '#006738'
        }
        var trial_2 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [0,2],
          target_color: '#F78F1E'
        }
        var trial_3 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [2,2],
          target_color: '#13B24B'
        }
        var trial_4 = {
          type: jsPsychSerialReactionTimeMouse,
          grid: grid,
          target: [2,0],
          target_color: '#E74921'
        }
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-serial-reaction-time-mouse-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-serial-reaction-time-mouse-demo2.html">在新标签页中打开</a>
