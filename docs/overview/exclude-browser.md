# 根据浏览器类型排除被试
*7.1版本有变动*

线上实验中，被试可能会使用各种浏览器，而有的实验则要求被试的浏览器至少要满足一些特定要求。

在jsPsych 7.1版本中，我们推荐使用[browser-check插件](../plugins/browser-check.md)。该插件会记录被试浏览器的信息，并排除不满足标准的被试。详见[browser-check插件的文档页](../plugins/browser-check.md)。

此前，在`initJsPsych()`中指定`exclusions`参数的方法已经在`8.0`版本中被移除，该部分的文档可以在[7.0版本的文档](https://www.jspsych.org/7.0/overview/exclude-browser)中找到。
