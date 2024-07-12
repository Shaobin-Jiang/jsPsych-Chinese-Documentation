# jspsych-ext-webgazer

这个扩展通过[WebGazer](https://webgazer.cs.brown.edu/)库支持眼动功能。关于这个扩展的使用详见[概述中的眼动部分](/overview/eye-tracking.html)。

## 参数

### 初始化参数

初始化参数在调用`jsPsych.init()`时进行设置。

```js
jsPsych.init({
  extensions: [
    {type: 'webgazer', params: {...}}
  ]
})
```

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
webgazer  | 对象 | `undefined` | 你可以直接引用已经加载的webgazer.js实例。如果没有直接引用，当前扩展会寻找全局的`webgazer`对象。如果你是通过`<script>`标签引入webgazer.js，则一般不需要设定这个参数。 
auto_initialize | 布尔 | false | 实验开始时是否自动初始化webgazer。如果为true，则实验会在页面加载完成后尝试访问用户的webcam。当前参数默认值为false，因为最好在请求摄像头使用权限前向被试解释为什么需要用到该权限。可以使用`webgazer-init-camera`插件在实验中初始化摄像头。 
round_predictions | 布尔 | true | 是否对WebGazer预测的`x`和`y`坐标进行四舍五入。这会**大幅**减少数据占用的空间，因为WebGazer默认会保留15位小数。考虑到系统的噪声，的确没什么必要将数据记的这么精确。 
sampling_interval | 数值 | 34 | 设置注视预测之间的间隔。因为底层代码中部分是异步的，这个间隔只是一个大概的值。取样的间隔平均起来不会短于这个值，但是总会有波动。如果把间隔设置的果断，则会出现性能问题，且记录的数据会过多，因为webcam的视频一般一秒只会刷新30次。 

### 试次中的参数

试次中的参数可以在将扩展添加到试次中时进行指定。

```js
var trial = {
  type: '...',
  extensions: [
    {type: 'webgazer', params: {...}}
  ]
}
```

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
targets | 数组 | [] | 数组中的元素对应屏幕上的元素，会记录它们的坐标并和WebGazer数据进行比较。数组中的每个元素都应该是选择了元素的有效的[CSS选择器](https://www.w3schools.com/cssref/css_selectors.asp)。若该选择器选择了多于一个元素，则只会记录第一个匹配的元素。 

## 数据

名称 | 类型 | 值 
-----|------|------
webgazer_data | 数组 | 包含被试注视数据的数组。数组中的每个元素都是一个对象，包含了`x`、`y`和`t`属性。`x`、`y`属性以像素为单位描述被试的注视位置，`t`则记录了当前距离实验开始经过的毫秒数。 
webgazer_targets | 对象 | 包含呈现的由`targets`参数指定的元素坐标的像素值。这个对象中的每个属性名都是一个选择器，也就是用于选择相应元素的CSS选择器。该属性值为一个对象，包括了记录该元素左上角位置的`x`、`y`属性，`width`和`height`值，以及`top`, `bottom`, `left`, 和 `right` 等参数，这些参数共同定义了元素的[边界矩形](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)。 

## 函数

除了jsPsych的webgazer-*插件，jsPsych的webgazer扩展还提供一系列方便用户更直接和WebGazer进行交互的函数。这些函数可以在实验的任何阶段进行调用，且对于创建使用WebGazer的插件很重要。下面的这些函数只用时前面都需要加上`jsPsych.extensions.webgazer` (例如 `jsPsych.extensions.webgazer.faceDetected()`)。

### start()

执行webgazer的初始化，包括向用户请求访问摄像头的权限。返回一个`Promise`对象，如果摄像头初始化成功，则该对象会resolve；如果摄像头无法访问，例如，因为被试不给权限，则该对象会fail。如果使用了`webgazer-init-camera`插件或将`auto_initialize`参数设置为`true`，则该函数会被自动执行。

### isInitialized()

如果`start()`成功执行，则返回`true`，否则返回`false`。

### faceDetected()

如果WebGazer可以开始进行预测了 (`webgazer.getTracker().predictionReady` 为 `true`)，则返回`true`。

### showPredictions()

启动WebGazer对于预测的注视位置的实时可视化。

### hidePredictions()

关闭WebGazer对于预测的注视位置的实时可视化。

### showVideo()

呈现webcam捕捉的图像、引导面部位置的方框以及WebGazer预测的人脸特征点位置。

### hideVideo()

不呈现webcam捕捉的图像。

### resume()

启动注视预测。当前扩展在大多数情况下会自动对此进行处理。一般来说，只有你自己在开发一个需要和WebGazer进行交互的插件时才需要用到这个函数。

### pause()

关闭注视预测。当前扩展在大多数情况下会自动对此进行处理。一般来说，只有你自己在开发一个需要和WebGazer进行交互的插件时才需要用到这个函数。

### resetCalibration()

清除全部校准数据。

### startMouseCalibration()

将鼠标移动和鼠标点击用于校准。虽然`webgazer-calibration`插件也可以用来进行校正，且使用时我们可以自定义多个参数，但是调用当前这个校准函数则可以在整个实验过程中持续根据鼠标移动或点击校准WebGazer。例如，所有*-button-response试次都可以进行WebGazer校准。 

### stopMouseCalibration()

禁止鼠标移动和鼠标点击用于校准WebGazer。

### calibratePoint(x, y)

告诉WebGazer将位置`x`, `y`（屏幕上的坐标，单位为像素）用于校准。可以在通过要求被试注视屏幕上某个特定位置等方法进行校准时使用。

### setRegressionType(regression_type)

改变WebGazer进行feature → location回归的方法。可选方法包括 `ridge`, `weightedRidge`, 和 `threadedRidge`。关于这些选项，详见WebGazer的文档。
当前扩展使用WebGazer的默认模式（目前为`ridge`）。

### getCurrentPrediction()

获取WebGazer当前预测的注视位置。返回一个`Promise`对象，该对象在WebGazer完成了注视预测的计算时会resolve。该Promise对象有一个参数，这个参数是一个包括了`x`、`y`和`t`属性的对象。`t`是当前帧所在时间点的`performance.now()`值。

### startSampleInterval(interval)

每`interval`毫秒进行一次取样。如果`interval`未定义，则使用扩展初始化时的默认值。每次取样都会触发一个`onGazeUpdate`回调，同时也会产生其他影响，而这些影响会在数据中被记录。

### stopSampleInterval()

停止`startSampleInterval()`所启动的取样。

### onGazeUpdate(callback)

每次检测被试注视时执行。`callback`会在每次对注视进行预测的时候触发。`callback`的第一个参数是一个对象，其属性包括了`x`和`y`，若当前试次启用了这个扩展，则还会包括`t`属性，即当前距离试次开始经过的毫秒数。 `t`在数值上等于当前帧所在时间点的`performance.now()`。如果当前试次正在运行中，则`t`的值是相对于试次开始时间计算的。

这个函数返回一个关闭当前监听的函数。如果你不需要在每次对注视进行预测时执行回调，就可以调用该函数。例如：

```js
var cancelGazeUpdateHandler = jsPsych.extensions.webgazer.onGazeUpdate(function(prediction){
  console.log(`Currently looking at ${prediction.x}, ${prediction.y}`);
});

cancelGazeUpdateHandler();
```

你可以添加多个`onGazeUpdate`，但它们不会自动关闭，所以如果不需要再使用的时候记得关掉它们。
