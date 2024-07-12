# 插件列表

以下是jsPsych中内置的插件。如果这里的插件不能满足你的要求，你可以在[GitHub Discussions](https://github.com/jspsych/jsPsych/discussions)提出意见，看看社区其他人有没有满足你的要求的非官方插件或者愿意帮忙开发这样的插件。你也可以查阅[开发新插件的文档](/overview/plugins.html#_5)或者观看[开发插件的视频教程](https://www.youtube.com/watch?v=XQcsFwAmbiw&list=PLnfo1lBY1P2Mf_o6rV5wiqqn92Mw3UTGh&index=4)。

插件 | 描述 
------ | -----------
[jspsych&#8209;animation](/plugins/jspsych-animation.html) | 以固定帧率展示一连串的图片，并记录被试在观看动画过程中的按键反应和反应时。 
[jspsych&#8209;audio&#8209;button&#8209;response](/plugins/jspsych-audio-button-response.html) | 播放音频文件并记录被试点击按钮的行为。被试可以自定义按钮，例如使用图片代替标准的按钮。 
[jspsych&#8209;audio&#8209;keyboard&#8209;response](/plugins/jspsych-audio-keyboard-response.html) | 播放音频文件并记录被试按键。 
[jspsych&#8209;audio&#8209;slider&#8209;response](/plugins/jspsych-audio-slider-response.html) | 播放音频文件并记录被试拖动滑动条的行为。 
[jspsych&#8209;call&#8209;function](/plugins/jspsych-call-function.html) | 执行一个特定的函数。不会给被试呈现任何内容，通常情况下被试甚至不会知道实验运行了这个插件。它主要用于在实验的特定阶段执行一些任务，例如保存数据。 
[jspsych&#8209;canvas&#8209;button&#8209;response](/plugins/jspsych-canvas-button-response.html) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试点击按钮的行为。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。 
[jspsych&#8209;canvas&#8209;keyboard&#8209;response](/plugins/jspsych-canvas-keyboard-response.html) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试按键。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。 
[jspsych&#8209;canvas&#8209;slider&#8209;response](/plugins/jspsych-canvas-slider-response.html) | 在[HTML canvas元素](https://www.w3schools.com/html/html5_canvas.asp)上绘制刺激，并记录被试拖动滑动条的行为。canvas元素对于呈现动态、随参数变化的图形以及控制多个图形元素（图形、文字、图像）的位置十分有用。 
[jspsych&#8209;categorize&#8209;animation](/plugins/jspsych-categorize-animation.html) | 要求被试对动画做按键反应，并会给予反馈。 
[jspsych&#8209;categorize&#8209;html](/plugins/jspsych-categorize-html.html) | 要求被试对HTML内容做按键反应，并会给予反馈。 
[jspsych&#8209;categorize&#8209;image](/plugins/jspsych-categorize-image.html) | 要求被试对图片做按键反应，并会给予反馈。 
[jspsych&#8209;cloze](/plugins/jspsych-cloze.html) | 要求被试做完形填空，并检查被试作答是否正确。 
[jspsych&#8209;external&#8209;html](/plugins/jspsych-external-html.html) | 呈现一个外部HTML文档（如：知情同意书），并需要被试按键或点击按钮以进入到下一个试次。该插件可以验证被试的反应，这可以用于确认被试开始实验前是否知情同意。 
[jspsych&#8209;free&#8209;sort](/plugins/jspsych-free-sort.html) | 在屏幕的随机位置上呈现一些图片，被试可以点击拖动这些图片。插件会记录被试对图片全部的移动行为，这样可以通过数据复现出被试进行图片移动的顺序。 
[jspsych&#8209;fullscreen](/plugins/jspsych-fullscreen.html) | 让实验进入或退出全屏模式。 
[jspsych&#8209;html&#8209;button&#8209;response](/plugins/jspsych-html-button-response.html) | 呈现HTML内容的刺激并记录被试点击按钮的行为。被试可以自定义按钮，例如使用图片代替标准的按钮。 
[jspsych&#8209;html&#8209;keyboard&#8209;response](/plugins/jspsych-html-keyboard-response.html) | 呈现HTML内容的刺激并记录被试按键。 
[jspsych&#8209;html&#8209;slider&#8209;response](/plugins/jspsych-html-slider-response.html) | 呈现HTML内容的刺激并记录被试拖动滑动条的行为。 
[jspsych&#8209;iat&#8209;html](/plugins/jspsych-iat-html.html) | 使用HTML刺激的内隐联想测验。 
[jspsych&#8209;iat&#8209;image](/plugins/jspsych-iat-image.html) | 使用图片刺激的内隐联想测验。 
[jspsych&#8209;image&#8209;button&#8209;response](/plugins/jspsych-image-button-response.html) | 呈现图片刺激并记录被试点击按钮的行为。被试可以自定义按钮，例如使用图片代替标准的按钮。 
[jspsych&#8209;image&#8209;keyboard&#8209;response](/plugins/jspsych-image-keyboard-response.html) | 呈现图片刺激并记录被试按键。 
[jspsych&#8209;image&#8209;slider&#8209;response](/plugins/jspsych-image-slider-response.html) | 呈现图片刺激并记录被试拖动滑动条的行为。 
[jspsych&#8209;instructions](/plugins/jspsych-instructions.html) | 向被试呈现指导语，并允许被试通过按键或鼠标点击前后翻页。 
[jspsych&#8209;maxdiff](/plugins/jspsych-maxdiff.html) | 呈现一系列备选项，被试要从这些备选项中选出两个归入两个互斥的类别中（例如：最重要和最不重要，最喜欢和最不喜欢，最像和最不像，等）。被试通过点击备选项两侧的单选框对其进行归类。 
[jspsych&#8209;preload](/plugins/jspsych-preload.html) | 加载图片、音频和视频文件，用于在实验中使用这些文件前将它们加载完成，从而提升计时的精确性，并防止干扰实验的正常进行。 
[jspsych&#8209;rdk](/plugins/jspsych-rdk.html) | 呈现随机运动点阵 (Random Dot Kinematogram, RDK)，并让被试通过按键报告整体运动方向。 
[jspsych&#8209;reconstruction](/plugins/jspsych-reconstruction.html) | 呈现一个可以交互的刺激，被试可以改变其某个参数并观看实时的变化。 
[jspsych&#8209;resize](/plugins/jspsych-resize.html) | 对呈现内容进行校正，使得其呈现大小和一个已知的物理尺寸相同。 
[jspsych&#8209;same&#8209;different&#8209;html](/plugins/jspsych-same-different-html.html) | 要求被试判断是否相同。首先呈现一个HTML内容的刺激，在一段间隔后，再呈现另一个刺激。被试需要判断两个刺激是否相同。 
[jspsych&#8209;same&#8209;different&#8209;image](/plugins/jspsych-same-different-image.html) | 要求被试判断是否相同。首先呈现一个图片刺激，在一段间隔后，再呈现另一个刺激。被试需要判断两个刺激是否相同。 
[jspsych&#8209;serial&#8209;reaction&#8209;time](/plugins/jspsych-serial-reaction-time.html) | 屏幕上呈现一些正方形，其中一个会变色。被试需要通过按键尽快指出变色的正方形。 
[jspsych&#8209;serial&#8209;reaction&#8209;time&#8209;mouse](/plugins/jspsych-serial-reaction-time-mouse.html) | 屏幕上呈现一些正方形，其中一个会变色。被试需要通过点击尽快指出变色的正方形。 
[jspsych&#8209;survey&#8209;html&#8209;form](/plugins/jspsych-survey-html-form.html) | 渲染一个自定义的HTML表单，允许被试进行多种类型的输入。 
[jspsych&#8209;survey&#8209;likert](/plugins/jspsych-survey-likert) | 呈现李克特量表。 
[jspsych&#8209;survey&#8209;multi&#8209;choice](/plugins/jspsych-survey-multi-choice.html) | 呈现单选题。 
[jspsych&#8209;survey&#8209;multi&#8209;select](/plugins/jspsych-survey-multi-select.html) | 呈现多选题。 
[jspsych&#8209;survey&#8209;text](/plugins/jspsych-survey-text.html) | 呈现题目 + 输入框。被试需要填写回答，然后通过点击按钮进行提交。 
[jspsych&#8209;video&#8209;button&#8209;response](/plugins/jspsych-video-button-response.html) | 呈现视频文件，可以自定义播放选项。被试需要通过点击按钮进行反应。 
[jspsych&#8209;video&#8209;keyboard&#8209;response](/plugins/jspsych-video-keyboard-response.html) | 呈现视频文件，可以自定义播放选项。被试需要通过按键进行反应。 
[jspsych&#8209;video&#8209;slider&#8209;response](/plugins/jspsych-video-slider-response.html) | 呈现视频文件，可以自定义播放选项。被试需要通过拖动滑动条进行反应。 
[jspsych&#8209;virtual&#8209;chinrest](/plugins/jspsych-virtual-chinrest.html) | 使用[Li, Joo, Yeatman, and Reinecke (2020)](https://doi.org/10.1038/s41598-019-57204-1)开发的虚拟的chinrest流程。可以通过被试将屏幕上的图片调整到和一张信用卡大小一致，让那个显示器按照已知的物理尺寸进行显示。随后，会使用盲点任务估算被试到显示器之间的距离。 
[jspsych&#8209;visual&#8209;search&#8209;circle](/plugins/jspsych-visual-search-circle.html) | 根据[Wang, Cavanagh, & Green (1994)](http://dx.doi.org/10.3758/BF03206946)设计的可以自定义的视觉搜索任务。被试需要指出目标是否出现在其他干扰项之中。刺激在圆周上等距分布，圆心有一个注视点。 
[jspsych&#8209;vsl&#8209;animate&#8209;occlusion](/plugins/jspsych-vsl-animate-occlusion.html) | 基于[Fiser & Aslin (2002)](http://dx.doi.org/10.1037//0278-7393.28.3.458)的视觉统计学习范式。插件会呈现一系列做往复运动的刺激。屏幕中央有一个矩形遮挡物，刺激在到达矩形后面时会发生改变。 
[jspsych&#8209;vsl&#8209;grid&#8209;scene](/plugins/jspsych-vsl-grid-scene.html) | 基于[Fiser & Aslin (2002)](http://dx.doi.org/10.1037//0278-7393.28.3.458)的视觉统计学习范式。插件会呈现一个网格，网格中是一个个刺激。这个插件还可以产生作为其他插件刺激内容的HTML代码。 
[jspsych&#8209;webgazer&#8209;calibrate](/plugins/jspsych-webgazer-calibrate.html) | 眼动实验中，校正WebGazer扩展。 
[jspsych&#8209;webgazer&#8209;init&#8209;camera](/plugins/jspsych-webgazer-init-camera.html) | 眼动实验中，初始化摄像头并让被试把脸放在镜头范围的中央。 
[jspsych&#8209;webgazer&#8209;validate](/plugins/jspsych-webgazer-validate.html) | 验证[WebGazer扩展](/extensions/jspsych-ext-webgazer.html)对被试注视的预测的精确性。 

