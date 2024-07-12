# 眼动

jsPsych通过[WebGazer](https://webgazer.cs.brown.edu/)库支持眼动功能。WebGazer通过计算机视觉技术，使用webcam识别被试的眼睛，并预测注视点。该系统通过被试点击或注视屏幕上特定位置的方式进行校准。这些位置和眼部特征有关。注视点通过回归进行预测。

## 开始

### 加载webgazer.js

jsPsych目前不支持[官方版本的WebGazer](https://webgazer.cs.brown.edu/#download)。我们在[fork的版本](https://github.com/jspsych/WebGazer)中做了一些微调，从而更适用于jsPsych的一般使用场景，如需要更精确地计时的时候。

我们fork的版本也在jsPsych的发行版当中，可以在`/examples/js/webgazer`文件夹下找到。你需要把这个文件夹复制到你的项目文件夹下。当前的教程假定该路径为`/js/webgazer`，但你也可以根据自己的喜好进行修改。 

通过`<script>`标签引入`webgazer.js`。

```html
<head>
  <script src="jspsych/jspsych.js"></script>
  <script src="js/webgazer/webgazer.js"></script>
</head>
```

### 加载jsPsych的webgazer扩展

[webgazer扩展](/extensions/jspsych-ext-webgazer.html)可以增强jsPsych和webgazer的交互，我们像加载插件一样加载该扩展。


```html
<head>
  <script src="jspsych/jspsych.js"></script>
  <script src="webgazer.js"></script>
  <script src="jspsych/extensions/jspsych-ext-webgazer.js"></script>
</head>
```

在实验中使用WebGazer扩展时需要在`jsPsych.init()`中的`extensions`属性下进行指定。

```js
jsPsych.init({
  timeline: [...],
  extensions: [
    {type: 'webgazer'}
  ]
})
```

!!! tip "小贴士" 
    使用WebGazer的实验示例可以在**/examples**文件夹下找到。详见`webgazer.html`, `webgazer_image.html`, 和 `webgazer_audio.html`。

### 初始化摄像头

眼动实验中，我们可以使用[jspsych-webgazer-init-camera插件](/plugins/jspsych-webgazer-init-camera.html)来帮助被试调整脸的摆放位置。这个插件会把摄像头看到的呈现给被试，包括面部特征点，且会在被试面部位置合适后才继续实验。如果没有获得权限，这个插件还会请求访问webcam的权限。


```js
var init_camera_trial = {
  type: 'webgazer-init-camera'
}
```


### 校准

我们可以使用[jspsych-webgazer-calibrate插件](/plugins/jspsych-webgazer-calibrate.html)校准WebGazer。这个插件会呈现一系列校准点，并允许我们选择校准的方式——点击或注视，我们通过百分比的方式制定校准点的位置，如，`[25,50]`会在距屏幕左侧25%屏幕宽度、距屏幕上方50%屏幕高度位置呈现校准点。[这个插件的文档](/plugins/jspsych-webgazer-calibrate.html)对校准进行了详尽的说明。

注意，calibration插件中不包含指导语，所以你需要使用别的插件（如，`html-button-response`）在校准前呈现指导语。

```js
var calibration_trial = {
  type: 'webgazer-calibrate',
  calibration_points: [[25,50], [50,50], [75,50], [50,25], [50,75]],
  calibration_mode: 'click'
}
```


### 验证

我们可以使用[jspsych-webgazer-vaidate插件](/plugins/jspsych-webgazer-validate.html)验证校准的准确性。和calibration插件一样，我们可以设置一系列验证点。这里，.我们可以按照百分比或距离屏幕中心的像素值进行设置，这取决于你在实验过程是怎么定义的你的刺激的。你还可以设置每个验证点周围可接受范围的半径，插件会自动计算落在该范围内的注视点的比例。这有助于我们确定是否需要重新校准。[这个插件的文档](/plugins/jspsych-webgazer-validate.html)对验证进行了详尽的说明。


```js
var validation_trial = {
  type: 'webgazer-validate',
  validation_points: [[-200,200], [200,200],[-200,-200],[200,-200]],
  validation_point_coordinates: 'center-offset-pixels',
  roi_radius: 100
}
```

验证阶段会将被试对每个验证点的注视的原始数据存储起来，还会记录被试注视点的平均、对于每个验证点落在`roi_radius`内的注视点的百分比以及每秒采样的数量。

```js
{
  raw_gaze: [...],
  percent_in_roi: [...],
  average_offset: [...],
  samples_per_sec: ...
}
```

我们推荐在实验中周期性进行校准和验证。

### 在试次中加入眼动

如果需要在实验中使用眼动，可以在试次中加入扩展。

```js
var trial = {
  type: 'html-keyboard-response',
  stimulus: '<img id="scene" src="my-scene.png"></img>',
  extensions: [
    {
      type: 'webgazer', 
      params: { 
        targets: ['#scene']
      }
    }
  ]
}
```

这样，就会在试次开始时启动WebGazer。

我们可以向`extensions`中的`params`属性中传入一系列[CSS选择器](https://www.w3schools.com/cssref/css_selectors.asp)。试次会记录每个被选中的DOM元素的[边界矩形](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)。这样就方便我们将注视数据和屏幕上的内容联系起来。

```js
webgazer_targets : {
  'selector': {x: ..., y: ..., height: ..., width: ..., top: ..., left: ..., right: ..., bottom:...}
  'selector': {x: ..., y: ..., height: ..., width: ..., top: ..., left: ..., right: ..., bottom:...}
}
```

注视数据会被添加到试次数据的`webgazer_data`属性下。注视数据是一个对象数组，每个对象包含了`x`、`y`和`t`属性。`x`、`y`属性以像素为单位描述被试的注视位置，`t`则记录了当前距离实验开始经过的毫秒数。注意，我们很难对不同浏览器、系统下测量的精确性进行控制。比如说，不同浏览器可能会导致`t`的精确度有所不同。

```js
webgazer_data: [
  {x: ..., y: ..., t: ...},
  {x: ..., y: ..., t: ...},
  {x: ..., y: ..., t: ...},
  {x: ..., y: ..., t: ...}
]
```

## 提高数据质量的几点建议

下面这些因素有助于提高数据质量。

1. 摄像机输入质量很重要。好的光照条件会起到重要的作用，所以应要求被试在采光良好的屋子里进行眼动实验。
2. 被试需要在校准期间和之后保持头部相对的静止。校准对于头动的鲁棒性不是很好。
3. WebGazer基于点击的校准可以在整个实验过程中使用。你可以通过在实验任意阶段调用`jsPsych.extensions.webgazer.startMouseCalibration()`启动这一功能。如果你使用一个“继续”按钮让被试进入下一个试次，然后每次移动按钮的位置，就可以在实验全程对校准进行小的调整。
4. 相比于jsPsych其他功能，进行注视预测会消耗更多的计算资源。WebGazer可以达到的最大取样率取决于被试设备的算力，所以我们需要让被试在实验开始前关掉不必要的软件和浏览器窗口。我们在验证阶段也需要检查取样率是否够。

如果你有一些基于自身经历的建议，可以在[GitHub discussion](https://github.com/jspsych/jsPsych/discussions)上进行分享，我们会把它加到这个列表中。

## 示例

下面的例子就是我们把上述内容整合起来的样子。

```html
<html>
<head>
    <script src="jspsych/jspsych.js"></script>
    <script src="jspsych/plugins/jspsych-preload.js"></script>
    <script src="jspsych/plugins/jspsych-image-keyboard-response.js"></script>
    <script src="jspsych/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jspsych/plugins/jspsych-webgazer-init-camera.js"></script>
    <script src="jspsych/plugins/jspsych-webgazer-calibrate.js"></script>
    <script src="jspsych/plugins/jspsych-webgazer-validation.js"></script>
    <script src="js/webgazer/webgazer.js"></script>
    <script src="jspsych/extensions/jspsych-ext-webgazer.js"></script>
    <link rel="stylesheet" href="jspsych/css/jspsych.css">
</head>
<body></body>
<script>

var preload = {
  type: 'preload',
  images: ['img/blue.png']
}

var init_camera = {
  type: 'webgazer-init-camera'
}

var calibration = {
  type: 'webgazer-calibrate'
}

var validation = {
  type: 'webgazer-validate'
}

var start = {
  type: 'html-keyboard-response',
  stimulus: 'Press any key to start.'
}

var trial = {
  type: 'image-keyboard-response',
  stimulus: 'img/blue.png',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  extensions: [
    {
      type: 'webgazer', 
      params: {targets: ['#jspsych-image-keyboard-response-stimulus']}
    }
  ]
}

jsPsych.init({
  timeline: [init_camera, calibration, validation, start, trial],
  preload_images: ['img/blue.png'],
  extensions: [
    {type: 'webgazer'}
  ]
})

</script>
</html>
```

这下面是上面实验中使用image-keyboard-response的试次中的示例数据。除了这个插件自己收集的数据，我们还可以看到额外增加了`webgazer_data`和`webgazer_targets`数组。`webgazer_data`呈现了图片呈现的1秒期间所做的21个注视点的预测，而`webgazer_targets`数组则表明有一个目标，即image-keyboard-response的stimulus，并记录了目标（图片）矩形边界的x和y坐标。通过比较`webgazer_targets`中的边界和`webgazer_data`中的每一个x/y位置，我们可以确定注视点是否/什么时候落在了目标区域内。

```js
{
  "rt": null,
  "stimulus": "img/blue.png",
  "response": null,
  "trial_type": "image-keyboard-response",
  "trial_index": 4,
  "time_elapsed": 30701,
  "internal_node_id": "0.0-4.0",
  "webgazer_data": [
    { "x": 1065, "y": 437, "t": 39},
    { "x": 943, "y": 377, "t": 79},
    { "x": 835, "y": 332, "t": 110},
    { "x": 731, "y": 299, "t": 146},
    { "x": 660, "y": 271, "t": 189},
    { "x": 606, "y": 251, "t": 238},
    { "x": 582, "y": 213, "t": 288},
    { "x": 551, "y": 200, "t": 335},
    { "x": 538, "y": 183, "t": 394},
    { "x": 514, "y": 177, "t": 436},
    { "x": 500, "y": 171, "t": 493},
    { "x": 525, "y": 178, "t": 542},
    { "x": 537, "y": 182, "t": 592},
    { "x": 543, "y": 178, "t": 633},
    { "x": 547, "y": 177, "t": 691},
    { "x": 558, "y": 174, "t": 739},
    { "x": 574, "y": 183, "t": 789},
    { "x": 577, "y": 197, "t": 838},
    { "x": 584, "y": 214, "t": 889},
    { "x": 603, "y": 218, "t": 937},
    { "x": 606, "y": 221, "t": 987}
  ],
  "webgazer_targets": [
    "#jspsych-image-keyboard-response-stimulus": {
      "x": 490,
      "y": 135,
      "height": 300,
      "width": 300,
      "top": 135,
      "bottom": 435,
      "left": 490,
      "right": 790
    }
  ]
}
```