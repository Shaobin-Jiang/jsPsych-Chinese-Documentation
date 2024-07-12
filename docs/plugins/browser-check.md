# browser-check

这个插件的作用是记录浏览器相关的信息，如果浏览器达不到实验设定的标准，则会终止实验。

当前版本中，该插件可以记录以下信息：

* 浏览器窗口的宽度和高度的像素值
* 浏览器类型 (例如，Chrome, Firefox, Edge, 等等)和版本号*
* 被试是否在使用移动设备*
* 操作系统*
* 是否支持WebAudio API
* 是否支持全屏API，例如[fullscreen插件](../plugins/fullscreen.md)
* 设备的刷新率
* 设备是否有网络摄像头和麦克风。注意，插件只会判断摄像头和麦克风是否存在，如果要使用它们，还是需要获取权限

!!!warning "警告"
    标*的信息是通过解析[user agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent)获取的。这种方法大多时候是准确的，但不能保证100%正确率。当前插件使用[detect-browser包](https://github.com/DamonOehlman/detect-browser)对user agent进行解析。在其[源文件](https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts)中可以找到支持的浏览器和操作系统。

该插件会获取浏览器相关信息，然后根据实验设定的标准检查浏览器是否符合标准。如果符合标准，则实验继续；如果不符合，则实验会立刻结束。不过，如果是因为不满足设定的最小窗口宽度或高度，则插件会呈现一条提示消息，要求被试调整窗口大小。详见下面的例子。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                      | 类型             | 默认值 | 描述                              |
| ------------------------------ | ---------------- | ------------- | ---------------------------------------- |
| features | 字符串数组 | `["width", "height", "webaudio", "browser", "browser_version", "mobile", "os", "fullscreen", "vsync_rate", "webcam", "microphone"]` | 需要记录的浏览器信息。默认值包括了所有的可选项。 |
| skip_features | 字符串数组 | `[]` | 这里的属性会被跳过（即便在`features`中添加了）。如果你想要获取默认选项中的绝大部分信息时，可以设定这个值。
| vsync_frame_count | 整数 | 60 | 测量刷新率 (`"vsync_rate"`)时取样的帧数。这个值越大，测量结果的稳定性也越高，但是相应地测量时间也会变长。在大多数设备上，测量60帧大概需要1秒。
| allow_window_resize | 布尔 | true | 是否允许被试在窗口大小小于`minimum_width`和/或`minimum_height`时调整窗口大小。如果为`false`，则`minimum_width`和`minimum_height`参数不会生效，我们需要在`inclusion_function`限制窗口大小。
| minimum_height | 整数 | 0 | 如果`allow_window_resize`为`true`，则当前值是浏览器窗口的最小高度的像素值，在不满足这个条件时，实验无法继续。
| minimum_width | 整数 | 0 | 如果`allow_window_resize`为`true`，则当前值是浏览器窗口的最小宽度的像素值，在不满足这个条件时，实验无法继续。
| window_resize_message | 字符串 | 详见描述 | 当`allow_window_resize`为`true`时，被试在调整窗口时呈现的文字内容。如果文字中出现带有了特殊ID的HTML元素，例如`browser-check-min-width`, `browser-check-min-height`, `browser-check-actual-height`, `browser-check-actual-width`，则会将这些元素的内容相应地调整为`minimum_width`, `minimum_height`和浏览器当前窗口大小。默认内容是：`<p>Your browser window is too small to complete this experiment. Please maximize the size of your browser window. If your browser window is already maximized, you will not be able to complete this experiment.</p><p>The minimum window width is <span id="browser-check-min-width"></span> px.</p><p>Your current window width is <span id="browser-check-actual-width"></span> px.</p><p>The minimum window height is <span id="browser-check-min-height"></span> px.</p><p>Your current window height is <span id="browser-check-actual-height"></span> px.</p>`.
resize_fail_button_text | 字符串 | `"I cannot make the window any larger"` | 被试在调整浏览器窗口大小的时候，在`window_resize_message`下会出现一个按钮，按钮上的文字就是当前的属性值。如果被试的浏览器窗口实在无法满足要求，可以点击这个按钮，此时实验会结束，并呈现`exclusion_message`。
inclusion_function | 函数 | `() => { return true; }` | 如果浏览器满足设定的标注，则返回`true`，否则返回`false`。函数接受的第一个参数是一个对象，包含了已获取的浏览器信息，该对象属性名和`features`中列出的一样。详见下面的例子。
exclusion_message | 函数 | `() => { return <p>Your browser does not meet the requirements to participate in this experiment.</p> }` | 该函数该函数会返回一段文字，如果`inclusion_function`返回`false`或被试点击了“大小调整失败”的按钮时则呈现这段文字。为了方便对这段文字的自定义，传入函数的第一个参数是一个对象，包含了已获取的浏览器信息，该对象属性名和`features`中列出的一样。详见下面的例子。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称         | 类型    | 值                                    |
| ------------ | ------- | ---------------------------------------- |
| width | 整数 | 浏览器窗口宽度的像素值。如果允许被试调整窗口大小，则该值是*调整后*的宽度。
| height | 整数 | 浏览器窗口高度的像素值。如果允许被试调整窗口大小，则该值是*调整后*的高度。
| browser | 字符串 | 使用的浏览器。
| browser_version | 字符串 | 浏览器的版本号。
| os | 字符串 | 使用的操作系统。
| mobile | 布尔 | 是否是移动端浏览器。
| webaudio | 布尔 |浏览器是否支持WebAudio API。
| fullscreen | 布尔 | 浏览器是否支持API。
| vsync_rate | 数值 | 估算的屏幕刷新率。
| webcam | 布尔 | 是否有网络摄像头。注意，使用设备前需要获取权限。
| microphone | 布尔 | 是否有音频输入设备。注意，使用设备前需要获取权限。

注意，以上值只有包含在`features`参数中才会被记录。

## 模拟模式

在[模拟模式](../overview/simulation.md)中，插件会给出浏览器的真实信息，除了`vsync_rate`，该值始终为60.

在`data-only`模式下，如果`allow_window_resize`为true，且浏览器的宽度和高度小于设定的标准，则数据中记录的宽度和高度会和`minimum_width`和`minimum_height`相等，这相当于被试将浏览器大小调整到了恰好符合标准的程度。

在`visual`模式中，如果如果`allow_window_resize`为true，且浏览器的宽度和高度小于设定的标准，则实验会等待3秒，然后点击“大小调整失败”的按钮。这期间，我们可以调整窗口大小。

和所有模拟的插件一样，我们可以通过`simulation_options`覆盖默认（实际值）的数据。这样，我们就可以使用多种配置测试我们的排除标准。

## 示例

???+ example "记录所有信息，不排除被试"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychBrowserCheck
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-browser-check-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-browser-check-demo1.html">在新标签页中打开</a>

???+ example "要求被试使用Chrome或Firefox"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychBrowserCheck,
          inclusion_function: (data) => {
            return ['chrome', 'firefox'].contains(data.browser);
          },
          exclusion_message: `<p>You must use Chrome or Firefox to complete this experiment.</p>`
        };
        ``` 

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-browser-check-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-browser-check-demo2.html">在新标签页中打开</a>

???+ example "设置最小宽度和高度，并允许被试调整窗口大小"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychBrowserCheck,
          minimum_width: 1000,
          minimum_height: 600
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <p>当前demo只能在可以调整大小的窗口中运行。请<a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-browser-check-demo3.html"> 在新标签页中打开</a>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-browser-check-demo3.html">在新标签页中打开</a>

???+ example "根据获取的信息自定义在排除被试时呈现的消息内容"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychBrowserCheck,
          inclusion_function: (data) => {
            return data.browser == 'chrome' && data.mobile === false
          },
          exclusion_message: (data) => {
            if(data.mobile){
              return '<p>You must use a desktop/laptop computer to participate in this experiment.</p>';
            } else if(data.browser !== 'chrome'){
              return '<p>You must use Chrome as your browser to complete this experiment.</p>'
            }
          }
        };
        ``` 

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-browser-check-demo4.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-browser-check-demo4.html">在新标签页中打开</a>