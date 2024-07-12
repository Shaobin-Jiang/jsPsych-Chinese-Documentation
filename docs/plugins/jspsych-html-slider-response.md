# jspsych-html-slider-response

这一插件的作用是呈现HTML并记录被试拖动滑动条的行为。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | HTML字符串 | *undefined* | 呈现的HTML内容。 
labels | 字符串数组 | [] | 滑动条上显示等距显示的标签。例如，如果有2个标签，则会呈现在滑动条的两端；如果有3个标签，则两个会呈现在滑动条的两端，另一个呈现在滑动条的中间；如果有4个标签，则两个会呈现在滑动条的两端，另外两个会在滑动条宽度33%和67%的位置。 
button_label | 字符串 | 'Continue' | 结束当前试次的按钮的文字。 
min | 整数 | 0 | 滑动条最小值。 
max | 整数 | 100 | 滑动条最大值。 
slider_start | 整数 | 50 | 滑动条起始值。 
step | 整数 | 1 | 滑动条步长，即滑块改变的最小值。 
slider_width | 整数 | null | 滑动条宽度的像素值。如果为`null`，则其宽度和呈现的最宽的元素相等。 
require_movement | 布尔 | false | 如果为true，则被试在点击继续前必须移动滑动条。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。 
trial_duration | 数值 | null | 允许被试做反应的时间限制。如果被试在设定的时间内没有做反应，那么其反应会被记为`null`，试次会在超出时间后结束。如果当前参数值为`null`，则试次会一直等待被试做反应。 
response_ends_trial | 布尔 | true | 如果为true，则当前试次会在被试做出反应时结束（假定被试是在`trial_duration`指定的时间范围内做出的反应）如果为false，则当前试次会持续到`trial_duration`指定的时间才结束。你可以把当前参数设置为`false`以让被试即便提前做了反应，看当前刺激的时间也要达到固定的时长。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称         | 类型   | 值                                                           |
| ------------ | ------ | ------------------------------------------------------------ |
| response     | 数值   | 滑动条的数值。                                               |
| rt           | 数值   | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 |
| stimulus     | 字符串 | 呈现的HTML内容。                                             |
| slider_start | 数值   | 滑动条起始值。                                               |

## 示例

```javascript
var trial = {
	type: 'html-slider-response',
	stimulus: '<p>Running</p>',
	labels: ['healthy', 'unhealthy'],
	prompt: "<p>How healthy/unhealthy is this activity?</p>"
};
```
