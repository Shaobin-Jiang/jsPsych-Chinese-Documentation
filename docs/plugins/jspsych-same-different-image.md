# jspsych-same-different plugin

这个插件的作用是依次呈现两个图片刺激，并要求被试通过按键判断两个刺激是否相同。这里的相同并不一定指的是完全一致，例如，也可以判断两个刺激是否属于一类。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                 | 类型   | 默认值      | 描述                                                         |
| -------------------- | ------ | ----------- | ------------------------------------------------------------ |
| stimuli              | 数组   | *undefined* | 数组中有两个元素，每个元素代表一个刺激。其中，每个刺激都是图片文件的路径，并且会按照在数组中的位次进行呈现。 |
| answer               | 字符串 | *undefined* | 可以是`'same'`或`'different'`。                              |
| same_key             | 字符串 | 'q'         | 被试判断两个刺激相同时按的键。                               |
| different_key        | 字符串 | 'p'         | 被试判断两个刺激不同时按的键。                               |
| first_stim_duration  | 数值   | 1000        | 呈现第一个刺激的毫秒数。如果该参数为`null`，则刺激在被试按任意键时才会消失。 |
| gap_duration         | 数值   | 500         | 两个刺激间空屏的时间。                                       |
| second_stim_duration | 数值   | 1000        | 呈现第二个刺激的毫秒数。如果该参数为`null`，则刺激在被试做反应时才会消失。 |
| prompt               | 字符串 | null        | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 |


## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型   | 值                                                           |
| -------- | ------ | ------------------------------------------------------------ |
| stimulus | 数组   | 数组长度为2，包含了被试看到的图片的路径。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| response | 字符串 | 说明被试按了哪个建。                                         |
| rt       | 数值   | 反应时（单位：毫秒），从第二个刺激呈现开始计时，到被试做出反应结束。 |
| correct  | 布尔   | 如果被试反应和`answer`一致，则为true。                       |
| answer   | 字符串 | 当前试次的正确答案，可以是`'same'`或`'different'`。          |

此外，如果`first_stim_duration`为`null`，则还会记录一下数据：

| 名称     | 类型   | 值                                                           |
| --------------- | ------- | ---------------------------------------- |
| rt_stim1        | 数值 | 被试从看到第一个刺激到做出反应之间的毫秒数。 |
| response_stim1  | 字符串  | 被试在呈现第一个刺激后按的键。 |

## 示例

#### 呈现两张表现不同情感的表情

```javascript
var block = {
  type: 'same-different-image',
  stimuli: ['img/happy_face_1.jpg', 'img/sad_face_3.jpg'],
  prompt: "<p>Press s if the faces had the same emotional expression. Press d if the faces had different emotional expressions.</p>",
  same_key: 's',
  different_key: 'd',
  answer: 'different'
}
```

#### 呈现表现相同情感的表情

```javascript
var block = {
  type: 'same-different-image',
  stimuli: ['img/happy_face_1.jpg', 'img/happy_face_3.jpg'],
  prompt: "<p>Press s if the faces had the same emotional expression. Press d if the faces had different emotional expressions.</p>",
  same_key: 's',
  different_key: 'd',
  answer: 'same'
}
```
