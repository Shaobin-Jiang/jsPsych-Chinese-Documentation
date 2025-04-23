# initialize-camera

这一插件的作用是要求被试给予摄像头权限。如果同时多台摄像头可用，则会让被试选择其一。权限只需要获取一次。

选中摄像头后，就可以通过[`jsPsych.pluginAPI.getCameraRecorder()`](../reference/jspsych-pluginAPI.md#getcamerarecorder)访问。

!!! warning "警告"
    如果要使用摄像头录像，则需要通过`https://`协议运行实验。如果要使用`file://`协议或`http://`协议，则会因为[可能的安全问题](https://blog.mozilla.org/webrtc/camera-microphone-require-https-in-firefox-68/)无法获取摄像头权限。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
device_select_message | html字符串 | `<p>Please select the camera you would like to use.</p>` | 有多个可选摄像头时呈现的消息。
button_label | 字符串 | 'Use this camera.' | 选择按钮的文本。
include_audio | 布尔 | false | 如果为真，则录像时同时录音。
width | 整数 | null | 请求使用特定宽度录像。这一宽度不一定会生效，因为这取决于录像设备。详见[`MediaRecorder`限制](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints#requesting_a_specific_value_for_a_setting)。
height | 整数 | null | 请求使用特定高度录像。这一宽度不一定会生效，因为这取决于录像设备。详见[`MediaRecorder`限制](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints#requesting_a_specific_value_for_a_setting)。
mime_type | 字符串 | null | 使用特定[MIME类型](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/mimeType)进行录像，例如`'video/mp4; codecs="avc1.424028, mp4a.40.2"'`。如果采用了默认值 `null`，那么jsPsych会自动搜索兼容的封装/编码格式组合，常见组合[详见这里](../reference/jspsych-pluginAPI.md#initializecamerarecorder)。如果没有兼容的组合，则jsPsych默认使用 `'video/webm'` MIME类型。


## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称 | 类型 | 值 |
| ---- | ---- | -- |
device_id | 字符串 | 选中摄像头的[设备ID](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId)。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "请求摄像头权限"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychInitializeCamera
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-initialize-camera-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-initialize-camera-demo1.html">Open demo in new tab</a>
