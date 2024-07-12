# initialize-microphone

该插件的作用是请求麦克风权限。如果设备上有多个麦克风可用，则会要求被试选择一个设备。权限只需要请求一次。

获取麦克风权限后，就可以通过[`jsPsych.pluginAPI.getMicrophoneRecorder()`](../reference/jspsych-pluginAPI.md#getmicrophonerecorder)访问了。

!!!warning "警告"
    如果要使用麦克风录音，则需要通过`https://`协议运行实验。如果要使用`file://`协议或`http://`协议，则会因为[可能的安全问题](https://blog.mozilla.org/webrtc/camera-microphone-require-https-in-firefox-68/)无法获取麦克风权限。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
device_select_message | html字符串 | `<p>Please select the microphone you would like to use.</p>` | 被试通过下拉菜单从可用设备中选择时呈现的文字内容。
button_label | 字符串 | 'Use this microphone.' | “选择”按钮上的文字。


## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值
-----|------|------
device_id | 字符串 | 选中的麦克风的[ID](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId)。

## 模拟模式

当前插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "获取麦克风权限"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychInitializeMicrophone
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-initialize-microphone-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-initialize-microphone-demo1.html">在新标签页中打开</a>