# jspsych-vsl-animate-occlusion plugin

这个插件（VSL，visual statistical learning）的作用是呈现一系列运动的图形，它们会消失在一个矩形的遮挡物后面，重新出现时会变成另一个图形。可以用当前插件复现下面文献中的实验：

Fiser, J., & Aslin, R. N. (2002). Statistical learning of higher-order temporal structure from visual shape sequences. *Journal of Experimental Psychology: Learning, Memory, and Cognition, 28*(3), 458.

## 依赖

这个插件需要Snap.svg库，可以在[http://www.snapsvg.io](http://www.snapsvg.io)找到。你需要在实验代码文件的`<head>`部分引入该库。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                  | 类型       | 默认值             | 描述                                                         |
| --------------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| stimuli               | 数组       | *undefined*        | 数组的每一个元素都对应了一个刺激，即图片文件的路径。数组中刺激的顺序决定了动画中刺激的出现顺序。 |
| canvas_size           | 数组       | `[400, 400]`       | 该数组定义了动画区域的宽度和高度。刺激最远会移动到该区域的边界，所以如果增加了该区域的宽度同时不增加`timing_cycle`参数可以加速图片的运动。 |
| image_size            | 数组       | `[100, 100]`       | 该数组定义了图片的宽度和高度。矩形遮挡物的宽度和图片宽度相等。 |
| initial_direction     | 字符串     | "left"             | 刺激一开始运动的方向（后面的运动会改变方向）。取值可以是"left"或"right"。 |
| occlude_center        | 布尔       | true               | 如果为true，则会在屏幕中央呈现矩形遮挡物，该遮挡物的宽度恰好可以在图片到达它后面时将其完全遮住。 |
| choices               | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 |
| cycle_duration        | 数值       | 1000               | 序列中一个刺激循环一次（移动到边界再回到中央）所需要的毫秒数。 |
| pre_movement_duration | 数值       | 500                | 刺激从中间矩形遮挡物后面移出前等待的时间。                   |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| Name      | Type        | Value                                    |
| --------- | ----------- | ---------------------------------------- |
| stimulus  | 数组 | 数组中每一个元素对应序列中的一个刺激，顺序和它们的呈现顺序一致。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| response | 数组 | 记录了被试反应信息的数组。数组中的每一个元素是一个对应着被试反应的对象，包含了三个属性：`key`是被试按的键，`stimulus`是做反应时呈现的刺激的序号，`rt`是被试反应时距离序列开始经过的时间。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |

## 示例

#### 呈现简单的序列

```javascript
var trial = {
  type: 'vsl-animate-occlusion',
  stimuli: [
    "img/1.gif",
    "img/2.gif",
    "img/3.gif",
    "img/4.gif",
    "img/5.gif",
    "img/6.gif",
    "img/7.gif",
    "img/8.gif",
    "img/9.gif",
    "img/10.gif"
  ]
}
```
