# webgazer-calibrate

这个插件的作用是校正[WebGazer扩展](../extensions/webgazer.md)。关于使用jsPsych进行眼动实验，更多详见[概述中的眼动部分](../overview/eye-tracking.md)。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

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

名称| 类型| 值
-----|------|------

目前，该插件不会记录任何数据。可以使用[webgazer-validate](./webgazer-validate.md)插件衡量校准的精确性。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

眼动相关的插件需要一起使用，示例详见[眼动部分的示例](../overview/eye-tracking.md#_8)。

