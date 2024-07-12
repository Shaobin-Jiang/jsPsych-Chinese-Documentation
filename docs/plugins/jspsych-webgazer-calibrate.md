# jspsych-webgazer-calibrate

这个插件的作用是校正[WebGazer扩展](/extensions/jspsych-ext-webgazer.html)。关于使用jsPsych进行眼动实验，更多详见[概述中的眼动部分](/overview/eye-tracking.html)。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
calibration_points | 数组 | `[[10,10], [10,50], [10,90], [50,10], [50,50], [50,90], [90,10], [90,50], [90,90]]` | 数组中的元素为点的`[x,y]`坐标，其值对应的是屏幕宽和高的百分比，原点为屏幕左上角。默认有9个点。 
calibration_mode | 字符串 | `'click'` | 可以设定为`click`以让被试点击校准点或者设定为`view`以让被试看校准点。 
repetitions_per_point | 数值 | 1 | 重复校准点序列的次数。 
point_size | 数值 | 20 | 校准点的直径（单位：毫米）。 
randomize_calibration_order | 布尔 | `false` | 是否对校准点的顺序进行随机化。 
time_to_saccade | 数值 | 1000 | 如果`calibration_mode`为`view`，则该参数为呈现点到校正之间的延迟，可以给被试一定时间将注视目标移动到新的校准点上。 
time_per_point | 数值 | 1000 | 如果`calibration_mode`为`view`，则该参数为校正时呈现点的时间。如果使用`click`校正模式，则校准点会在点击时才消失。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

名称| 类型| 值
-----|------|------

目前，该插件不会记录任何数据。可以使用[webgazer-validate](/plugins/jspsych-webgazer-validate.html)插件衡量校准的精确性。

## 示例

#### 呈现5个校准点，并使用click模式

```javascript
var calibration = {
    type: 'webgazer-calibrate',
    calibration_points: [[50,50], [25,25], [25,75], [75,25], [75,75]],
    repetitions_per_point: 2,
    randomize_calibration_order: true
  }
```

#### 呈现33个围绕在中心的校准点，并使用click模式

```javascript
 var calibration = {
  type: 'webgazer-calibrate',
  calibration_points: [
    [10,10],[10,50],[10,90],
    [30,10],[30,50],[30,90],
    [40,10],[40,30],[40,40],[40,45],[40,50],[40,55],[40,60],[40,70],[40,90],
    [50,10],[50,30],[50,40],[50,45],[50,50],[50,55],[50,60],[50,70],[50,90],
    [60,10],[60,30],[60,40],[60,45],[60,50],[60,55],[60,60],[60,70],[60,90],
    [70,10],[70,50],[70,90],
    [90,10],[90,50],[90,90]
  ],
  repetitions_per_point: 1,
  randomize_calibration_order: true,
  calibration_mode: 'view',
  time_per_point: 500,
  time_to_saccade: 1000
}
```
