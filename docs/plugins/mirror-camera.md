# mirror-camera

这一插件的作用是实时呈现被试摄像头的内容，常用于需要录像的实验中，被试可以通过这个试次预览摄像头的内容。

需要先使用[initialize-camera插件](./initialize-camera.md)获取权限。

!!! warning "警告"
    如果要使用摄像头录像，则需要通过`https://`协议运行实验。如果要使用`file://`协议或`http://`协议，则会因为[可能的安全问题](https://blog.mozilla.org/webrtc/camera-microphone-require-https-in-firefox-68/)无法获取摄像头权限。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
prompt | html字符串 | null | 摄像头内容下方呈现的HTML内容。
width | 整数 | null | 播放视频元素的宽度。如果为`null`则使用视频的宽度。
height | 整数 | null | 播放视频元素的高度。如果为`null`则使用视频的高度。
button_label | 字符串 | "Continue" | 进入下一个试次的按钮文本。
mirror_camera | 布尔 | true | 是否对视频内容镜像。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称 | 类型 | 值 |
-----|------|------
rt | 整数 | 被试观看时长。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "呈现摄像头录制的内容"
    === "Code"
        ```javascript
        const init_camera = {
            type: jsPsychInitializeCamera,
        }

        const mirror_camera = {
            type: jsPsychMirrorCamera,
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-mirror-camera-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-mirror-camera-demo1.html">Open demo in new tab</a>
