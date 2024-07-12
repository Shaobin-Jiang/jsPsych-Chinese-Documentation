# webgazer-init-camera

这个插件的作用是初始化摄像头并让被试把脸放在镜头范围的中央，以为[WebGazer扩展](../extensions/webgazer)的使用做好准备。关于使用jsPsych进行眼动实验，更多详见 [概述中的眼动部分](../overview/eye-tracking)。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
instructions | 字符串 | （太长了就不写在这里了） | 指导语。 
button_text | 字符串 | Continue | 被试结束试次需要点击的按钮上的文本。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
load_time | 数值 | webgazer初始化花费的时间。在某些情况下，花费的时间可能比较长，所以如果被试报告初始化出现问题时，可以通过当前数据对问题进行解决。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

眼动相关的插件需要一起使用，示例详见[眼动部分的示例](../overview/eye-tracking.md#_8)。