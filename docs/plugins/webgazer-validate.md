# webgazer-validate

这个插件的作用是测量[WebGazer扩展](../extensions/webgazer)对被试注视的预测的精确性。关于使用jsPsych进行眼动实验，更多详见 [概述中的眼动部分](../overview/eye-tracking)。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

名称 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
validation_points | 数组 | `[[10,10], [10,50], [10,90], [50,10], [50,50], [50,90], [90,10], [90,50], [90,90]]` | 数组中的元素为点的`[x,y]`坐标，默认有9个点，坐标的单位由`validation_point_coordinates`参数控制。 
validation_point_coordinates | 字符串 | `'percent'` | 如果为`percent`，则验证点的坐标值指的是相对于屏幕宽度和高度的百分比；如果为`center-offset-pixels`，则验证点的坐标指的是到屏幕中心距离的像素值 
roi_radius | 数值 | 200 | 计算被试注视点落在可接受范围内的百分比时，取的验证点周围范围半径的像素值。  
randomize_validation_order | 布尔 | `false` | 是否对验证点顺序进行随机。 
time_to_saccade | 数值 | 1000 | 呈现点到验证之间的延迟，可以给被试一定时间将注视目标移动到新的验证点上。 
validation_duration | 数值 | 2000 | 呈现验证点的时间。 
point_size | 数值 | 20 | 验证点直径的像素值。 
show_validation_data | 布尔 | false | 如果为true，则在验证完成后会呈现验证的可视化结果，会根据被试的注视是否落在了目标点的`roi_radius`范围内对其进行上色。主要用于测试和debug。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称              | 类型 | 值 
-----|------|------
raw_gaze | 数组 | 被试注视的原始数据。对于每一个验证点，该数组都嵌套了一个数组，其中是一系列`{x,y,dx,dy}`格式的数据，用来表示x和y的坐标（单位为像素）以及注视点到目标验证点的距离。 
percent_in_roi | 数组 | 对于每一个验证点，落在`roi_radius`范围内的百分比。 
average_offset | 数组 | （对注视点进行平均得到一个点，该点）到验证点水平距离`x`和垂直距离`y`，以及注视点到该平均点距离的平均值`r`。 
samples_per_sec | 数值 | 平均每秒的取样数。 
validation_points | 数组 | 记录了所有验证点，顺序和其呈现顺序相同。 

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

眼动相关的插件需要一起使用，示例详见[眼动部分的示例](../overview/eye-tracking.md#_8)。
