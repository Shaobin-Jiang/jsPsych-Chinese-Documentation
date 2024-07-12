# jspsych-preload

这个插件的作用是加载图片、音频和视频文件，用于在实验中使用这些文件前将它们加载完成，从而提升计时的精确性，并防止干扰实验的正常进行。我们推荐在加载多媒体文件的时候都使用这个插件，尤其是实验中使用的多媒体文件体积大或数量多的时候。详见[多媒体文件预加载](/overview/media-preloading.html/)。

使用这个插件的试次会在所有文件加载完成后结束；在(a) 达到`max_load_time`时没有加载完所有的文件，或 (b) 文件加载失败 时，试次会结束（然后继续进行实验）或停止并呈现错误提示（结束实验）。具体是结束还是停止由`continue_after_error`参数决定。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。虽然当插件不强制要求指定任何参数，但还是可以通过`auto_preload`参数或`trials`参数（用于自动加载），以及`images`, `audio`, `video`参数（用于手动加载）指定需要加载的文件。如果需要自动加载时间线上的试次中使用的文件，可以将`auto_preload`参数设置为true（根据传给`jsPsych.init`的主时间线加载文件），或使用`trials`参数指定需要加载哪几个试次中的文件。如果乣手动加载文件，可以使用`images`, `audio`, 和`video`参数。在一个预加载试次中，可以同时使用自动和手动加载。

对于其他参数，如果不需要则不用进行赋值。

| 参数                 | 类型       | 默认值                           | 描述                                                         |
| -------------------- | ---------- | -------------------------------- | ------------------------------------------------------------ |
| auto_preload         | 布尔       | false                            | 如果为true，则插件会根据`jsPsych.init`中指定的主时间线自动加载可以预加载的文件。如果为false，则需要预加载的文件需要通过`trials`参数或`images`, `audio`, 和`video`参数指定。将当前参数设置为false在你需要分批加载文件时很有用。 |
| trials               | 数组       | []                               | 由jsPsych试次或时间线组成的数组。当你需要加载实验中部分试次中用到的文件时，可以使用当前参数。关于创建时间线，详见[创建实验：时间线](/overview/timeline.html)。 |
| images               | 数组       | []                               | 由需要加载的图片文件路径组成的数组，主要用于不能自动从时间线加载的图片文件。 |
| audio                | 数组       | []                               | 由需要加载的音频文件路径组成的数组，主要用于不能自动从时间线加载的音频文件。 |
| video                | 数组       | []                               | 由需要加载的视频文件路径组成的数组，主要用于不能自动从时间线加载的视频文件。 |
| message              | HTML字符串 | null                             | 进度条上方的HTML内容。如果为`null`，则不会显示任何信息。     |
| show_progress_bar    | 布尔       | true                             | 如果为true，则在加载过程中会显示进度条。如果为false，则不显示进度条。 |
| continue_after_error | 布尔       | false                            | 如果为false，则实验会在(a) 文件加载失败，或 (b) 达到`max_load_time`时没有加载完所有的文件 时结束。若`show_detailed_error`参数为true，则会显示详细的错误说明。如果当前参数为true，则实验会在加载失败或超时后继续进行，试次的数据中会记录加载是否成功（详见下面的数据部分）。 |
| error_message        | HTML字符串 | 'The experiment failed to load.' | 加载失败或超时后页面上呈现的HTML内容，仅在`continue_after_error`为false时生效。 |
| show_detailed_errors | 布尔       | false                            | 如果为true，且`continue_after_error`为false，则`error_message`下方会列出具体的错误，包括加载失败的文件路径，如果超市会同时提示超时。这样主要是方便测试和debug。如果为false，且`continue_after_error`为false，则在加载失败或超时的时候仅会显示`error_message`。 |
| max_load_time        | 数值       | null                             | 加载时间限制（单位：毫秒）。如果在这个时间范围内有文件没有完成加载，则试次会结束并返回错误（如果`continue_after_error`为false），或在数据中对超时进行记录（详见下面的数据部分）。如果为`null`，则试次会一直等到所有文件加载完成或返回错误时才结束。 |
| on_error             | 函数       | null                             | 文件加载失败时调用的函数。该函数仅接受一个传入参数，即当前文件的路径。试次结束后，该回调立刻失效。详见下面的示例。 |
| on_success           | 函数       | null                             | 文件加载成功时调用的函数。该函数仅接受一个传入参数，即当前文件的路径。试次结束后，该回调立刻失效。详见下面的示例。 |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称         | 类型    | 值                                    |
| -------------- | ------- | ---------------------------------------- |
| success        | 布尔 | 当所有文件在`max_load_time`规定的范围内加载成功时为true，当有文件加载失败或在`max_load_time`时间范围内没有完成加载则为false。 |
| timeout        | 布尔 | 若在`max_load_time`时间范围内没有完成加载则为true，否则为false。注意，即使加载没有超时（`timeout: false`），整个加载过程可能还是失败了（`success: false`），这是因为可能有文件在超出时间限制前就已经加载失败了。 |
| failed_images  | 数组 | 包含了加载失败的图片文件路径。 |
| failed_audio   | 数组 | 包含了加载失败的音频文件路径。 |
| failed_video   | 数组 | 包含了加载失败的视频文件路径。 |


## 示例

#### 根据主时间线自动加载文件

```javascript
var preload = {
	type: 'preload',
	auto_preload: true // automatically load all files based on the main timeline
};

// define other trials to add to the timeline...

jsPsych.init({
    timeline: [preload, trial1, trial2, trial3]
});
```

#### 手动加载文件

```javascript
var preload = {
	type: 'preload',
	images: ['file1.png']
};
```

#### 同时使用自动和手动加载

```javascript
// automatically load stimuli from the main timeline,
// and manually add any other stimuli files that can't be loaded automatically
var preload = {
	type: 'preload',
	auto_preload: true,  
    images: ['image1.png','image2.png']
};

// define other trials to add to the timeline...

jsPsych.init({
    timeline: [preload, trial1, trial2, trial3]
});
```

#### 分批加载文件

```javascript
var block_1 = {
    timeline: [...]
}

var block_2 = {
    timeline: [...]
}

var preload_1 = {
	type: 'preload',
	trials: block_1 // automatically load block_1 stimuli
};

var preload_2 = {
	type: 'preload',
	trials: block_2 // automatically load block_2 stimuli
};

jsPsych.init(
    // add each preload trial to the timeline before the appropriate trial block
    timeline: [preload_1, block_1, preload_2, block_2]
)
```

#### 使用on_success和on_error函数

```javascript
var preload = {
	type: 'preload',
    audio: ['sound.mp3'],
	on_success: 函数(file) {
        console.log('File loaded: ',file);
    },
    on_error: 函数(file) {
        console.log('Error loading file: ',file);
    }
};
```

更多例子，详见jsPsych的examples文件夹下的jspsych-preload.html文件，及[多媒体文件预加载](/overview/media-preloading.html)部分的文档。