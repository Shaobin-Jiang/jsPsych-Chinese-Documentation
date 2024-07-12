# record-video

这个扩展的作用是使用webcam对被试进行录像。

该扩展将视频数据编码成[base 64格式](https://developer.mozilla.org/en-US/docs/Glossary/Base64)。该格式使用文本表示视频数据，并且可以通过很多[线上工具](https://www.google.com/search?q=base64+video+decoder)以及python和R这类编程语言转换成各类视频格式。

## 参数

### 初始化参数

初始化参数在调用`initJsPsych()`时进行设置。

```js
initJsPsych({
  extensions: [
    {type: jsPsychExtensionRecordVideo, params: {...}}
  ]
})
```

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
*无*

### 试次中的参数

试次中的参数可以在将扩展添加到试次中时进行指定。

```js
var trial = {
  type: jsPsych...,
  extensions: [
    {type: jsPsychExtensionRecordVideo, params: {...}}
  ]
}
```

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
*None*

## 数据

名称 | 类型 | 值
-----|------|------
record_video_data | base64 字符串 | [Base 64编码](https://developer.mozilla.org/en-US/docs/Glossary/Base64)的视频数据。

## 示例

???+ example "在试次中进行录像"
    === "Code"
        ```javascript
        const init_camera = {
          type: jsPsychInitializeCamera
        };

        const trial = {
          type: jsPsychHtmlButtonResponse,
          stimulus: `<div id="target" style="width:250px; height: 250px; background-color: #333; position: relative; margin: 2em auto;">
              <div class="orbit" style="width:25px; height:25px; border-radius:25px;background-color: #f00; position: absolute; top:calc(50% - 12px); left:calc(50% - 12px);"></div>
            </div>
            <style>
              .orbit {
                transform: translateX(100px);
                animation: orbit 4s infinite;
              }
              @keyframes orbit {
                0% {
                  transform: rotate(0deg) translateX(100px);
                }
                100% {
                  transform: rotate(360deg) translateX(100px);
                }
              }
            </style>`,
          choices: ['Done'],
          prompt: "<p>Video is recording. Click done after a few seconds.</p>",
          extensions: [
            {type: jsPsychExtensionRecordVideo}
          ]
        };
        ```
        
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-extension-record-video-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-extension-record-video-demo1.html">Open demo in new tab</a>
