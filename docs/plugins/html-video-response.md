# html-video-response

这一插件的作用是呈现HTML并对被试进行录像。

如果要使用摄像头，需要先使用[initialize-camera插件](./initialize-camera.md)获取权限。权限只需要获取一次。

当前插件会将视频数据编码成[base 64格式](https://developer.mozilla.org/en-US/docs/Glossary/Base64)。该格式使用文本表示视频数据，并且可以通过很多[线上工具](https://www.google.com/search?q=base64+video+decoder)以及python和R这类编程语言转换成各类视频格式。

**该插件会产生大量的数据，所以你需要认真考虑怎么处理这部分数据。**即便是几秒钟的视频也会让数据量增大几十kB。如果试次数增多，数据量也会急剧增长。如果你的确需要大量的录像，无论是需要录像的试次比较多还是说单个诗词中录像时间比较长，最好都是在试次结束后立马将数据保存到服务器，然后从jsPsych的数据对象中把这部分数据删掉。关于如何操作，详见下面的例子。

该插件还允许我们通过`save_video_url: true`将视频存储为[Object URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)。这种做法会生成一个存储了视频的URL，可以在实验后面的阶段进行播放。例如，参见下面将录制的视频作为后续试次刺激内容进行呈现的示例。默认情况下，这个功能并未启用，因为会占用较多内存。如果你的确需要这个功能，又录制了很多视频片段，可能需要通过[`URL.revokeObjectURL(objectURL)`](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)手动删除用不到的部分。

!!! warning "警告"
    如果要使用摄像头录像，则需要通过`https://`协议运行实验。如果要使用`file://`协议或`http://`协议，则会因为[可能的安全问题](https://blog.mozilla.org/webrtc/camera-microphone-require-https-in-firefox-68/)无法获取摄像头权限。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimulus | HTML字符串 | undefined | 呈现的HTML内容。
recording_duration | 数值 | 2000 | 录像的时间上限，单位为毫秒。默认值设置的很低是因为用户有可能一不小心就录出了很大的视频文件。如果想让被试控制何时结束录像，可以把这个值设置为`null`。不过，慎用，因为如果被试录制事件过长可能会导致浏览器崩掉。
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。
show_done_button | 布尔 | true | 是否呈现结束录制的按钮。
done_button_label | 字符串 | 'Continue' | 结束录制按钮的内容。
allow_playback | 布尔 | false | 是否允许被试回看并重新录制。如果为真，则会给被试呈现一个界面来回看录制的视频，并提供两个按钮供被试选择是继续实验还是重新录制。如果重新录制，则会重新呈现刺激内容，和重新开始试次效果一致。
record_again_button_label | 字符串 | 'Record again' | 当`allow_playback: true`时，重新录制按钮的文本。The label for the record again button enabled when `allow_playback: true`.
accept_button_label | 字符串 | 'Continue' | 当`allow_playback: true`时接受录制结果的按钮文本。
save_video_url | 布尔 | false | 如果为真，会保存一份视频的[Object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)。如果你在实验后面的阶段不需要用到这份录制的视频，请不要启用这个选项，因为它会吃掉很多内存。


## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称 | 类型 | 值 |
| ---- | ---- | -- |
| rt | 数值 | 反应时（单位：毫秒），从刺激呈现开始计时，到被试点击按钮结束。如果没有点击或按钮被禁用，则为`null` |
| response | base64字符串 | base64格式的视频数据。 |
| stimulus | 字符串 | 呈现的HTML内容。 |
| video_url | 字符串 | 保存了视频内容的URL。 |

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "简单的录制"
    === "Code"
        ```javascript
        var init_camera = {
            type: jsPsychInitializeCamera
        }

        var trial = {
            type: jsPsychHtmlVideoResponse,
            stimulus: `
            <p style="font-size:48px; color:red;"> <-- </p>
            <p>Turn your head in the direction of the arrow</p>`,
            recording_duration: 3500,
            show_done_button: false,
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-video-response-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-video-response-demo1.html">Open demo in new tab</a>

???+ example "允许回看、重新录制"
    === "Code"
        ```javascript
        var init_camera = {
            type: jsPsychInitializeCamera
        }

        var trial = {
            type: jsPsychHtmlVideoResponse,
            stimulus: `<p>Make a sad face</p>`,
            recording_duration: 3500,
            show_done_button: false,
            allow_playback: true
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-video-response-demo2.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-video-response-demo2.html">Open demo in new tab</a>

???+ example "将录制的视频用于后续试次"
    === "Code"
        ```javascript
        var init_camera = {
            type: jsPsychInitializeCamera
        }

        var record = {
            type: jsPsychHtmlVideoResponse,
            stimulus: `<p>Make a sad face.</p>`,
            recording_duration: 1500,
            show_done_button: false,
            save_video_url: true
        };

        var classify = {
            type: jsPsychVideoButtonResponse,
            stimulus: () => {
                return [jsPsych.data.get().last(1).values()[0].video_url];
            },
            choices: ["Happy", "Sad", "Angry", "Surprised"],
            prompt: "<p>What emotion is this?</p>",
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-video-response-demo3.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-video-response-demo3.html">Open demo in new tab</a>


