# 眼动

jsPsych通过[WebGazer](https://webgazer.cs.brown.edu/)库支持眼动功能。WebGazer通过计算机视觉技术，使用webcam识别被试的眼睛，并预测注视点。该系统通过被试点击或注视屏幕上特定位置的方式进行校准。这些位置和眼部特征有关。注视点通过回归进行预测。

## 开始

### 加载webgazer.js

jsPsych目前不支持[官方版本的WebGazer](https://webgazer.cs.brown.edu/#download)。我们在[fork的版本](https://github.com/jspsych/WebGazer)中做了一些微调，从而更适用于jsPsych的一般使用场景，如需要更精确地计时的时候。

使用时，需要将`webgazer.js`文件通过`<script>`标签引入。但是，`webgazer.js`文件并不在jsPsych的NPM包中，所以无法通过unpkg.com的CDN使用。不过，该文件可以通过jsdelivr.net的CDN使用："https://cdn.jsdelivr.net/gh/jspsych/jspsych@jspsych@latest/examples/js/webgazer/webgazer.js"。

```html
<head>
  <script src="https://unpkg.com/jspsych@latest"></script>
  <script src="https://cdn.jsdelivr.net/gh/jspsych/jspsych@latest/examples/js/webgazer/webgazer.js"></script>
</head>
```

!!!note "注意"
  我们fork的`webgazer.js`文件也在jsPsych的发行版当中，可以在`/examples/js/webgazer`文件夹下找到。所以，如果你选择把jsPsych的文件都下载下来使用 (即，Hello World教程中的[搭建方案2](../tutorials/hello-world.md#2jspsych_1))，也是可以的。这种情况下，假定你把这个文件复制到`/js/webgazer`文件夹下，就可以这样引入该文件：
  ```html
  <script src="js/webgazer/webgazer.js"></script>
  ```

### 加载jsPsych的webgazer扩展

[webgazer扩展](../extensions/webgazer.md)可以很方便地让jsPsych和webgazer交互，其加载方式和插件一样。

```html
<head>
  <script src="https://unpkg.com/jspsych@latest"></script>
  <script src="https://cdn.jsdelivr.net/gh/jspsych/jspsych@latest/examples/js/webgazer/webgazer.js"></script>
  <script src="https://unpkg.com/@jspsych/extension-webgazer@latest"></script>
</head>
```

在实验中使用WebGazer扩展时需要添加到`initJsPsych()`的扩展列表中。

```js
initJsPsych({
  extensions: [
    {type: jsPsychExtensionWebgazer}
  ]
})
```

### 初始化摄像头

眼动实验中，我们可以使用[jspsych-webgazer-init-camera插件](../plugins/webgazer-init-camera.md)来帮助被试调整面部的摆放位置。这个插件会把摄像头“看”到的呈现给被试，包括面部特征点，且会在被试面部位置合适后才继续实验。如果没有获得权限，这个插件还会请求访问webcam的权限。


```js
var init_camera_trial = {
  type: jsPsychWebgazerInitCamera
}
```


### 校准

我们可以使用[jspsych-webgazer-calibrate插件](../plugins/webgazer-calibrate.md)校准WebGazer。这个插件会呈现一系列校准点，并允许我们选择校准的方式——点击或注视，我们通过百分比的方式制定校准点的位置，如，`[25,50]`会在距屏幕左侧25%屏幕宽度、距屏幕上方50%屏幕高度位置呈现校准点。[这个插件的文档](../plugins/webgazer-calibrate.md)对校准进行了详尽的说明。

注意，calibration插件中不包含指导语，所以你需要使用别的插件（如，`html-button-response`）在校准前呈现指导语。

```js
var calibration_trial = {
  type: jsPsychWebgazerCalibrate,
  calibration_points: [[25,50], [50,50], [75,50], [50,25], [50,75]],
  calibration_mode: 'click'
}
```


### 验证

我们可以使用[jspsych-webgazer-vaidate插件](../plugins/webgazer-validate.md)验证校准的准确性。和calibration插件一样，我们可以设置一系列验证点。这里，.我们可以按照百分比或距离屏幕中心的像素值进行设置，这取决于你在实验过程是怎么定义的你的刺激的。你还可以设置每个验证点周围可接受范围的半径，插件会自动计算落在该范围内的注视点的比例。这有助于我们确定是否需要重新校准。[这个插件的文档](../plugins/webgazer-validate.md)对验证进行了详尽的说明。


```js
var validation_trial = {
  type: jsPsychWebgazerValidate,
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

如果需要在实验中的某个试次中使用眼动，可以把扩展添加到该试次中。

```js
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<img id="scene" src="my-scene.png"></img>',
  extensions: [
    {
      type: jsPsychExtensionWebgazer, 
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

下面几点有助于提高数据质量。

1. 摄像机输入质量很重要。好的光照条件会起到重要的作用，所以应要求被试在采光良好的屋子里进行眼动实验。
2. 被试需要在校准期间和之后保持头部相对的静止。校准对于头动的鲁棒性不是很好。
3. WebGazer基于点击的校准可以在整个实验过程中使用。你可以通过在实验任意阶段调用`jsPsych.extensions.webgazer.startMouseCalibration()`启动这一功能。如果你使用一个“继续”按钮让被试进入下一个试次，然后每次移动按钮的位置，就可以在实验全程对校准进行小的调整。
4. 相比于jsPsych其他功能，进行注视预测会消耗更多的计算资源。WebGazer可以达到的最大取样率取决于被试设备的算力，所以我们需要让被试在实验开始前关掉不必要的软件和浏览器窗口。我们在验证阶段也需要检查取样率是否够。

如果你有一些基于自身经历的建议，可以在[GitHub discussion](https://github.com/jspsych/jsPsych/discussions)上进行分享，我们会把它加到这个列表中。

## 示例

!!!tips "小贴士" 
    我们还提供了一些使用WebGazer的实验样例，这些样例位于jsPsych的 **/examples** 文件夹中。详见`webgazer.html`, `webgazer_image.html`, 和 `webgazer_audio.html`。

!!!example "示例"
    下面的示例把上面的内容整合到了一起，并同时展示了如何根据验证阶段的数据判断是否需要重新校准。可以在<a href="../../demos/eye-tracking-with-webgazer.html" target="_blank">去运行这个实验</a>。

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://unpkg.com/jspsych@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-button-response@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-webgazer-init-camera@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-webgazer-calibrate@latest"></script>
        <script src="https://unpkg.com/@jspsych/plugin-webgazer-validate@latest"></script>
        <script src="https://cdn.jsdelivr.net/gh/jspsych/jspsych@latest/examples/js/webgazer/webgazer.js"></script>
        <script src="https://unpkg.com/@jspsych/extension-webgazer@latest"></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/jspsych@latest/css/jspsych.css"
        />
        <style>
          .jspsych-btn {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body></body>
      <script>

          var jsPsych = initJsPsych({
            extensions: [
              {type: jsPsychExtensionWebgazer}
            ]
          });

          var preload = {
            type: jsPsychPreload,
            images: ['img/blue.png']
          }

          var camera_instructions = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
              <p>In order to participate you must allow the experiment to use your camera.</p>
              <p>You will be prompted to do this on the next screen.</p>
              <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
              <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
            `,
            choices: ['Got it'],
          }

          var init_camera = {
            type: jsPsychWebgazerInitCamera
          }

          var calibration_instructions = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
              <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
              <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
            `,
            choices: ['Got it'],
          }

          var calibration = {
            type: jsPsychWebgazerCalibrate,
            calibration_points: [
              [25,25],[75,25],[50,50],[25,75],[75,75]
            ],
            repetitions_per_point: 2,
            randomize_calibration_order: true
          }

          var validation_instructions = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
              <p>Now we'll measure the accuracy of the calibration.</p>
              <p>Look at each dot as it appears on the screen.</p>
              <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
            `,
            choices: ['Got it'],
            post_trial_gap: 1000
          }

          var validation = {
            type: jsPsychWebgazerValidate,
            validation_points: [
              [25,25],[75,25],[50,50],[25,75],[75,75]
            ],
            roi_radius: 200,
            time_to_saccade: 1000,
            validation_duration: 2000,
            data: {
              task: 'validate'
            }
          }

          var recalibrate_instructions = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
              <p>The accuracy of the calibration is a little lower than we'd like.</p>
              <p>Let's try calibrating one more time.</p>
              <p>On the next screen, look at the dots and click on them.<p>
            `,
            choices: ['OK'],
          }

          var recalibrate = {
            timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
            conditional_function: function(){
              var validation_data = jsPsych.data.get().filter({task: 'validate'}).values()[0];
              return validation_data.percent_in_roi.some(function(x){
                var minimum_percent_acceptable = 50;
                return x < minimum_percent_acceptable;
              });
            },
            data: {
              phase: 'recalibration'
            }
          }

          var calibration_done = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
              <p>Great, we're done with calibration!</p>
            `,
            choices: ['OK']
          }

          var begin = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p>The next screen will show an image to demonstrate adding the webgazer extension to a trial.</p>
              <p>Just look at the image while eye tracking data is collected. The trial will end automatically.</p>
              <p>Press any key to start.</p>
            `
          }

          var trial = {
            type: jsPsychImageKeyboardResponse,
            stimulus: 'img/blue.png',
            choices: "NO_KEYS",
            trial_duration: 2000,
            extensions: [
              {
                type: jsPsychExtensionWebgazer, 
                params: {targets: ['#jspsych-image-keyboard-response-stimulus']}
              }
            ]
          }

          var show_data = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
              var trial_data = jsPsych.data.getLastTrialData().values();
              var trial_json = JSON.stringify(trial_data, null, 2);
              return `<p style="margin-bottom:0px;"><strong>Trial data:</strong></p>
                <pre style="margin-top:0px;text-align:left;">${trial_json}</pre>`;
            },
            choices: "NO_KEYS"
          };
          
          jsPsych.run([
            preload, 
            camera_instructions, 
            init_camera, 
            calibration_instructions, 
            calibration, 
            validation_instructions, 
            validation, 
            recalibrate,
            calibration_done,
            begin, 
            trial, 
            show_data
          ]);
          
      </script>
    </html>
    ```

    Below is example data from the image-keyboard-response trial taken from the experiment above. In addition to the standard data that is collected for this plugin, you can see the additional `webgazer_data` and `webgazer_targets` arrays. The `webgazer_data` shows 21 gaze location estimates during the 1-second image presentation. The `webgazer_targets` array shows that there was one target, the image-keyboard-response stimulus, and tells you the x- and y-coordinate boundaries for the target (image) rectangle. By comparing each of the x/y locations from the `webgazer_data` locations array with the target boundaries in `webgazer_targets`, you can determine if/when the estimated gaze location was inside the target area.

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
