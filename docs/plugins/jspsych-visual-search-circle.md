# jspsych-visual-search-circle plugin

这个插件的作用是进行一个可以自定义的视觉搜索任务，基于[Wang, Cavanagh, & Green (1994)](http://dx.doi.org/10.3758/BF03206946)的研究。被试需要指出目标是否出现在其他干扰项之中。刺激在圆周上等距分布，圆心有一个注视点。下面是一个使用正反两种N字的例子：

![Sample Visual Search Stimulus](/img/visual_search_example.jpg)

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数               | 类型         | 默认值      | 描述                                                         |
| ------------------ | ------------ | ----------- | ------------------------------------------------------------ |
| target_present     | 布尔         | *undefined* | 目标是否存在。                                               |
| set_size           | 数值         | *undefined* | 呈现的刺激数。                                               |
| target             | 字符串       | *undefined* | 搜索目标图片的路径。                                         |
| foil               | 字符串或数组 | *undefined* | 干扰项图片的路径。如果干扰项使用多张不同图片，可以使用数组对当前参数赋值。 |
| fixation_image     | 字符串       | *undefined* | 注视点图片路径。                                             |
| target_size        | 数组         | `[50, 50]`  | 数组有两个元素，分别为搜索项图片的高度和宽度。               |
| fixation_size      | 数值         | `[16, 16]`  | 数组有两个元素，分别为注视点图片的高度和宽度。               |
| circle_diameter    | 数值         | 250         | 搜索项分布的圆形的直径像素值。                               |
| target_present_key | 字符串       | 'j'         | 当目标存在时按的键。                                         |
| target_absent_key  | 字符串       | 'f'         | 当目标不存在时按的键。                                       |
| trial_duration     | 数值         | null        | 被试做反应的时间限制。如果为null，则会允许被试一直进行搜索。 |
| fixation_duration  | 数值         | 1000        | 在呈现搜索项前多少毫秒时呈现注视点。                         |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称           | 类型   | 值                                                           |
| -------------- | ------ | ------------------------------------------------------------ |
| correct        | 布尔   | 如果被试反应正确则为true。                                   |
| response       | 字符串 | 说明被试按了哪个键。                                         |
| rt             | 数值   | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| set_size       | 数值   | 搜索项的数量。                                               |
| target_present | 布尔   | 如果目标存在则为true。                                       |
| locations      | 数组   | 数组中的每个元素记录了搜索项中心位置的像素值。如果目标存在，则数组的第一个元素对应目标的位置。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |

## 示例

#### 寻找反的N

```javascript
var trial_1 = {
  type: 'visual-search-circle',
  target: 'img/backwardN.gif',
  foil: 'img/normalN.gif',
  fixation_image: 'img/fixation.gif',
  target_present: true,
  set_size: 4
}
```
