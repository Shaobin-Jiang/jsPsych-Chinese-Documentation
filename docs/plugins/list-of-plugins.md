 插件列表

以下是jsPsych发行版本中提供的插件。

还有一些并不包括在发行版中的插件可以在[社区](https://github.com/jspsych/jspsych-contrib)中找到。

如果想要整体了解一下插件是什么、是怎样运作的，详见[插件](../overview/plugins.md)一章。

插件 | 描述
------ | -----------
[animation](animation.md) | 以固定帧率展示一连串的图片，并记录被试在观看动画过程中的按键反应和反应时。 
[audio&#8209;button&#8209;response](audio-button-response.md) | 播放音频文件并记录被试点击按钮的行为。按钮可以自定义，例如使用图片代替标准的按钮。
[audio&#8209;keyboard&#8209;response](audio-keyboard-response.md) | 播放音频文件并记录被试按键。
[audio&#8209;slider&#8209;response](audio-slider-response.md) | 放音频文件并记录被试拖动滑动条的行为。 
[browser&#8209;check](browser-check.md) | 获取被试使用的浏览器的信息，并检查浏览器是否符合实验标准。
[call&#8209;function](call-function.md) | 执行一个特定的函数。不会给被试呈现任何内容，通常情况下被试甚至不会知道实验运行了这个插件。它主要用于在实验的特定阶段执行一些任务，例如保存数据。
[canvas&#8209;button&#8209;response](canvas-button-response.md) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试点击按钮的行为。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。
[canvas&#8209;keyboard&#8209;response](canvas-keyboard-response) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试按键。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。
[canvas&#8209;slider&#8209;response](canvas-slider-response.md) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试拖动滑动条的行为。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。
[categorize&#8209;animation](categorize-animation.md) | 要求被试对动画做按键反应，并会给予反馈。
[categorize&#8209;html](categorize-html.md) | 要求被试对HTML内容做按键反应，并会给予反馈。
[categorize&#8209;image](categorize-image.md) | 要求被试对图片做按键反应，并会给予反馈。
[cloze](cloze) | 求被试做填空，并检查被试作答是否正确。
[external&#8209;html](external-html.md) | 呈现一个外部HTML文档（如：知情同意书），并需要被试按键或点击按钮以进入到下一个试次。该插件可以验证被试的反应，这可以用于确认被试开始实验前是否知情同意。
[free&#8209;sort](free-sort.md) | 在屏幕的随机位置上呈现一些图片，被试可以点击拖动这些图片。插件会记录被试对图片全部的移动行为，这样可以通过数据复现出被试进行图片移动的顺序。
[fullscreen](fullscreen.md) | 让实验进入或退出全屏模式。
[html&#8209;audio&#8209;response](html-audio-response.md) | 呈现HTML内容的刺激并通过麦克风记录被试的语音。
[html&#8209;button&#8209;response](html-button-response.md) | 呈现HTML内容的刺激并记录被试点击按钮的行为。按钮可以自定义，例如使用图片代替标准的按钮。 
[html&#8209;keyboard&#8209;response](html-keyboard-response.md) | 呈现HTML内容的刺激并记录被试按键。
[html&#8209;slider&#8209;response](html-slider-response.md) | 呈现HTML内容的刺激并记录被试拖动滑动条的行为。
[html&#8209;video&#8209;response](html-video-response.md) | 呈现HTMl内容的刺激并对被试进行录像。
[iat&#8209;html](iat-html.md) | 使用HTML刺激的内隐联想测验。
[iat&#8209;image](iat-image.md) | 使用图片刺激的内隐联想测验。
[image&#8209;button&#8209;response](image-button-response.md) | 呈现图片刺激并记录被试点击按钮的行为。按钮可以自定义，例如使用图片代替标准的按钮。
[image&#8209;keyboard&#8209;response](image-keyboard-response.md) | 呈现图片刺激并记录被试按键。
[image&#8209;slider&#8209;response](image-slider-response.md) | 呈现图片刺激并记录被试拖动滑动条的行为。
[initialize&#8209;camera](initialize-camera.md) | 请求摄像头权限；如果多个摄像头可用，则会要求被试选择。允许设置录制视频的mime类型。
[initialize&#8209;microphone](initialize-microphone.md) | 请求麦克风录制权限，如果有多个可用设备，会让被试选择使用哪个。
[instructions](instructions.md) | 向被试呈现指导语，并允许被试通过按键或鼠标点击前后翻页。
[maxdiff](maxdiff.md) | 呈现一系列备选项，被试要从这些备选项中选出两个归入两个互斥的类别中（例如：最重要和最不重要，最喜欢和最不喜欢，最像和最不像，等）。被试通过点击备选项两侧的单选框对其进行归类。
[mirror&#8209;camera](mirror-camera.md) | 在屏幕上实时显示被试摄像头的内容。
[preload](preload.md) | 加载图片、音频和视频文件，用于在实验中使用这些文件前将它们加载完成，从而提升计时的精确性，并防止干扰实验的正常进行。
[reconstruction](reconstruction.md) | 呈现一个可以交互的刺激，被试可以改变其某个参数并观看实时的变化。
[resize](resize.md) | 对呈现内容进行校正，使得其呈现大小和一个已知的物理尺寸相同。
[same&#8209;different&#8209;html](same-different-html.md) | 要求被试判断是否相同。首先呈现一个HTML内容的刺激，在一段间隔后，再呈现另一个刺激。被试需要判断两个刺激是否相同。
[same&#8209;different&#8209;image](same-different-image.md) | 要求被试判断是否相同。首先呈现一个图片刺激，在一段间隔后，再呈现另一个刺激。被试需要判断两个刺激是否相同。
[serial&#8209;reaction&#8209;time](serial-reaction-time.md) | 屏幕上呈现一些正方形，其中一个会变色。被试需要通过按键尽快指出变色的正方形。
[serial&#8209;reaction&#8209;time&#8209;mouse](serial-reaction-time-mouse.md) | 屏幕上呈现一些正方形，其中一个会变色。被试需要通过点击尽快指出变色的正方形。
[sketchpad](sketchpad.md) | 创建一个可交互的canvas元素，被试可以通过鼠标或触屏在上面绘制。
[survey&#8209;html&#8209;form](survey-html-form.md) | 渲染一个自定义的HTML表单，允许被试进行多种类型的输入。
[survey&#8209;likert](survey-likert.md) | 呈现李克特量表。
[survey&#8209;multi&#8209;choice](survey-multi-choice.md) | 呈现单选题。
[survey&#8209;multi&#8209;select](survey-multi-select.md) | 呈现多选题。
[survey&#8209;text](survey-text.md) | 呈现题目 + 输入框。被试需要填写回答，然后通过点击按钮进行提交。
[video&#8209;button&#8209;response](video-button-response.md) | 呈现视频文件，可以自定义播放选项。被试需要通过点击按钮进行反应。
[video&#8209;keyboard&#8209;response](video-keyboard-response.md) | 呈现视频文件，可以自定义播放选项。被试需要通过按键进行反应。
[video&#8209;slider&#8209;response](video-slider-response.md) | 呈现视频文件，可以自定义播放选项。被试需要通过拖动滑动条进行反应。
[virtual&#8209;chinrest](virtual-chinrest.md) | 使用[Li, Joo, Yeatman, and Reinecke (2020)](https://doi.org/10.1038/s41598-019-57204-1)开发的虚拟的chinrest流程。可以通过被试将屏幕上的图片调整到和一张信用卡大小一致，让那个显示器按照已知的物理尺寸进行显示。随后，会使用盲点任务估算被试到显示器之间的距离。
[visual&#8209;search&#8209;circle](visual-search-circle.md) | 根据[Wang, Cavanagh, & Green (1994)](http://dx.doi.org/10.3758/BF03206946)设计的可以自定义的视觉搜索任务。被试需要指出目标是否出现在其他干扰项之中。刺激在圆周上等距分布，圆心有一个注视点。
[webgazer&#8209;calibrate](webgazer-calibrate.md) | 眼动实验中，校正WebGazer扩展。
[webgazer&#8209;init&#8209;camera](webgazer-init-camera.md) | 眼动实验中，初始化摄像头并让被试把脸放在镜头范围的中央。
[webgazer&#8209;validate](webgazer-validate.md) | 验证WebGazer扩展对被试注视的预测的精确性。
