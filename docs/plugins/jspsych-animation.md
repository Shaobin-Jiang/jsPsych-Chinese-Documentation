# jspsych-animation

这个插件的作用是以固定帧率展示一连串的图片，且可以循环指定次数。被试可以在动画过程中的任意时间点做反应，实验会对反应时进行记录。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimuli | 数组 | *undefined* | 由图片文件的路径组成。 
frame_time | 数值 | 250 | 呈现每张图片的毫秒数。 
frame_isi | 数值 | 0 | 如果大于0，则图片之间会有间隔。该参数指定的是这一间隔的长度。 
sequence_reps | 数值 | 1 | 整个序列的重复次数。除了`frame_isi`之外，序列的两次重复之间没有间隔。 
choices | 字符串数组 | `jsPsych.ALL_KEYS` | 包含了被试可以做反应的按键范围。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`jsPsych.ALL_KEYS`，即所有按键都是有效的。如果将当前参数值设为`jsPsych.NO_KEYS`，则不允许被试按任何键。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
render_on_canvas | 布尔 | true | 如果为true，图片会在canvas元素上进行渲染，从而避免在某些浏览器（如Firefox和Edge）中连续呈现的图片中间出现白屏的情况。如果为false，则图片会和此前版本的jsPsych一样在img元素上进行渲染。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
animation_sequence | 数组 | 数组的每一个元素都是一个对象，对应了动画序列中的一帧。每一个对象都有`stimulus`属性，即所呈现的图片，以及`time`属性，即当前帧呈现时距离动画开始已经经过的毫秒数。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
response | 数组 | 数组的每一个元素都是一个对象，记录了被试的反应。每一个对象都有`stimulus`属性，即按键时呈现的图片，`rt`属性，即被试按键时距离动画开始已经经过的毫秒数，以及`key_press`属性，即被试按下的键。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 

## 示例

#### 将一系列图片呈现多次

```javascript
var animation_sequence = ["img/face_1.jpg", "img/face_2.jpg", "img/face_3.jpg", "img/face_4.jpg", "img/face_3.jpg", "img/face_2.jpg"];

var animation_trial = {
    type: 'animation',
    stimuli: animation_sequence,
    sequence_reps: 3
};
```
