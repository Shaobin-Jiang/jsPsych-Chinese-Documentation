# html-audio-response

这一插件的作用是呈现HTML并记录被试的语音输入。

我们需要在使用该插件前通过[initialize-microphone插件](initialize-microphone.md)获取麦克风权限。权限只需要获取一次就够了。

该插件会将输入的音频记录为[base64格式](https://developer.mozilla.org/en-US/docs/Glossary/Base64)。这种格式将音频用文本表示出来，可以通过一些[在线工具](https://www.google.com/search?q=base64+audio+decoder)或python和R这些编程语言转换成各种音频文件格式。

**该插件会产生大量的数据，请谨慎处理这些数据。**即便只有几秒的音频，也会生成几十kB的数据。如果多个试次都生成这么多数据，就会导致最终的数据对象占用空间迅速变大。如果真的需要记录很多音频数据，不管是因为试次多还是因为单次录音时间长，我们都推荐在一次录制结束后立刻将数据保存到服务器，然后在jsPsych的数据对象中将这部分数据删除。具体怎样做详见下面。

该插件还允许我们通过设置`save_audio_url: true`将音频文件保存为[Object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) 。这样，我们就获得了一份录音的副本，可以用于在后面播放。下面的示例中展示了如何在后面的试次中使用录制的音频。默认情况下，这个功能是停用的，因为它会占用大量的内存。如果运行实验的时候，真的需要使用到这个功能，且录制了大量音频片段，则最好在不需要使用这些URL的时候通过[`URL.revokeObjectURL(objectURL)`](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)手动删除。

!!!warning "警告"
    如果要使用麦克风录音，则需要通过`https://`协议运行实验。如果要使用`file://`协议或`http://`协议，则会因为[可能的安全问题](https://blog.mozilla.org/webrtc/camera-microphone-require-https-in-firefox-68/)无法获取麦克风权限。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
stimulus | HTML字符串 | undefined | 呈现的HTML内容
recording_duration | 数值 | 2000 | 录制的最长毫秒数。默认值设置的很小，是为了防止不小心产生过大的数据量。可以将这个属性设置为`null`，这样就能让被试来通过点击按钮来控制录制的时长。不过，请谨慎考虑要不要这么做，因为如果录制时间太长，可能会导致浏览器崩掉。
stimulus_duration | 数值 | null | 呈现刺激的毫秒数。在超过这个时间后，CSS的`visibility`属性会被设置为`hidden`。如果当前参数值为`null`，则刺激会在试次结束后才消失。
show_done_button | 布尔 | true | 是否呈现“结束”按钮 (被试可以点击该按钮来结束录制)。
done_button_label | 字符串 | 'Continue' | “结束”按钮的文字。
allow_playback | 布尔 | false | 是否允许被试回放录制的音频、重新录制等。如果为`true`，则会给被试呈现一个界面，用来播放录制的音频，并选择是否要重新录制。如果选择重新录制，则会重新呈现刺激，相当于重新开始这个试次。
record_again_button_label | 字符串 | 'Record again' | 设置`allow_playback: true`时选择重新录制的按钮上的文字。
accept_button_label | 字符串 | 'Continue' | 设置`allow_playback: true`时选择不重新录制的按钮上的文字。
save_audio_url | 布尔 | false | 如果为 `true`，则会为录制的音频生成一个[Object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)。请注意只有在后面需要使用到当前录制的音频的时候再将这个属性设置为`true`，因为这样会占用大量内存。


## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
rt | 数值 | 反应时（单位：毫秒），从刺激播放开始计时，到被试点击按钮结束。 如果没有点击按钮 (或者按钮被禁用)，则`rt`为`null`。
response | base64字符串 | base64格式的音频数据
stimulus | 字符串 | 呈现的HTML内容。
estimated_stimulus_onset | 数值 | 开始录制到呈现刺激经过时间的估计值。当前插件会在呈现刺激前开始录音。我们暂时还没找到通过外部设备测量这一估计值准确性的办法。
audio_url | 字符串 | 音频数据的URL。

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "呈现刺激，被试进行口头报告"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychHtmlAudioResponse,
            stimulus: `
            <p style="font-size:48px; color:red;">GREEN</p>
            <p>Speak the color of the ink.</p>`,
            recording_duration: 3500
        };
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-audio-response-demo1.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-audio-response-demo1.html">在新标签页中打开</a>

???+ example "允许回放和重新录制；录制后立刻将数据保存到服务器"
    === "Code"
        ```javascript
        var trial = {
            type: jsPsychHtmlAudioResponse,
            stimulus: `
                <p>Please sing the first few seconds of a song and click the button when you are done.</p>
            `,
            recording_duration: 15000,
            allow_playback: true,
            on_finish: function(data){
                fetch('/save-my-data.php', { audio_base64: data.response })
                    .then((audio_id){
                        data.response = audio_id;
                    });
            }
        };
        ```

        这个示例假定服务器上有一个名为`save-my-data.php`的脚本用来接收数据，且这个脚本会为保存下的音频文件生成一个ID (`audio_id`)并返回。实例中，我们用这个只有几个字符串的ID替换了原本非常长的base64字符串，这样在数据分析时，就可以直接找到相应的音频文件，从而避免在实验过程中长时间将大量的音频数据保存在内存中。

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-audio-response-demo2.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-audio-response-demo2.html">在新标签页中打开</a>

???+ example "在后续的实验中使用录制的音频作为刺激"
    === "Code"
        ```javascript
        var instruction = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `
                <img src='img/10.gif' style="width:100px; padding: 20px;"></img>
                <p>Make up a name for this shape. When you have one in mind, click the button and then say the name aloud.</p>
            `,
            choices: ['I am ready.']
        }

        var record = {
            type: jsPsychHtmlAudioResponse,
            stimulus: `
                <img src='img/10.gif' style="width:100px; padding: 20px;"></img>
                <p>Recording...</p>
            `,
            recording_duration: 1500,
            save_audio_url: true
        };

        var playback = {
            type: jsPsychAudioButtonResponse,
            stimulus: ()=>{
                return jsPsych.data.get().last(1).values()[0].audio_url;
            },
            prompt: '<p>Click the object the matches the spoken name.</p>',
            choices: ['img/9.gif','img/10.gif','img/11.gif','img/12.gif'],
            button_html: '<img src="%choice%" style="width:100px; padding: 20px;"></img>'
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-html-audio-response-demo3.html" width="90%;" height="600px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-html-audio-response-demo3.html">在新标签页中打开</a>


