# 多媒体文件预加载

如果实验中使用了图片、音频或视频作为刺激，则最好在运行实验前对这些文件进行预加载。我们可以使用[jsPsych `preload` 插件](../plugins/jspsych-preload.html)在实验任何阶段加载这些文件。预加载指的是被试的浏览器会下载这些文件并存放在存储中。这样，呈现或播放多媒体文件就会快得多，因为它们已经在被试电脑的存储中了。如果没有预加载，则呈现这些多媒体文件会有明显的延迟，从而影响计时的精确性（如：图片呈现的时间，被试的反应时）。对于一些特别大的文件，如视频，对其进行预加载可以避免实验中较长的停滞，从而防止干扰试验正常进行。

!!! warning "警告"
		注意，在离线运行实验时（如，双击打开HTML文件），视频不会进行预加载，但在线上运行（托管在服务器上）时则会进行预加载。更多信息详见[Cross-origin requests (CORS)和安全模式](running-experiments.html#cross-origin-requests-cors)。

## 自动预加载

如果音频、视频和图片文件作为参数传给插件，则jsPsych可以根据`jsPsych.init`中的时间线自动预加载这些文件。不过，我们需要通过一个`preload`试次启动预加载过程，且应该将该试次插入到时间线上你希望进行预加载的位置，并将`auto_preload`参数设置为true。

```javascript
// the "auto_preload: true" setting tells the plugin to automatically find 
// stimuli to preload based the main experiment timeline (used in jsPsych.init)
var preload = {
	type: 'preload',
	auto_preload: true 
}

// this image file can be automatically preloaded 
var image_trial = {
	type: 'image-keyboard-response',
	stimulus: 'img/file1.png'
}

// the sound file can be automatically preloaded 
var sound_trial = {
	type: 'audio-keyboard-response',
	stimulus: 'audio/hello.mp3'
}

// the video file can be automatically preloaded (as long as the experiment 
// is running on a server)
var video_trial = {
	type: 'video',
	stimulus: ['video/sample_video.mp4']
}

jsPsych.init({
	timeline: [preload, image_trial, sound_trial, video_trial]
});
```

## 手动预加载

如果我们在实验中用到了一些没有直接作为参数传入试次的多媒体文件（例如，使用返回多媒体文件函数作为参数值，使用时间线变量或将多媒体文件嵌入了HTML字符串当中），则我们使用`auto_preload`时不会自动加载这些文件。此时，就需要我们手动在指定这些需要加载的文件。我们可以在`preload`插件中通过`images`, `audio` 和 `video`参数进行设置。

```javascript
// this image file cannot be automatically preloaded because it is embedded in 
// an HTML string
var image_trial = {
	type: 'html-keyboard-response',
	stimulus: '<img src="img/file1.png"></img>',
}

// this audio file cannot be automatically preloaded because it is returned 
// from a function
var sound_trial = {
	type: 'audio-keyboard-response',
	stimulus: function() { return 'audio/sound1.mp3' }
}

// these video files cannot be automatically preloaded because they are passed 
// into a trial using the jsPsych.timelineVariable function
var video_trials = {
	timeline: [
		{
			type: 'video',
			stimulus: jsPsych.timelineVariable('video')
		}
	],
	timeline_variables: [
		{video: ['video/1.mp4']},
		{video: ['video/2.mp4']}
	]
}

// to manually preload media files, create an array of file paths for each 
// media type
var images = ['img/file1.png'];
var audio = ['audio/sound1.mp3'];
var video = ['video/1.mp4', 'video/2.mp4'];

// these array can be passed into the preload plugin using the images, audio 
// and video parameters
var preload = {
	type: 'preload',
	images: images,
	audio: audio,
	video: video
}

jsPsych.init({
	timeline: [preload, image_trial, sound_trial, video_trials],
});

```

## 同时进行自动和手动预加载

我们可以同时进行自动和手动预加载。例如，我们可能想要根据实验的时间线自动加载可以自动加载的文件，还想手动加载不能被自动加载的文件。预加载开始前，会对所有加载流程中重复的文件进行剔除，所以如果多个`preload`中出现了重复的文件不会影响预加载的时长。 

```javascript
// this file can be preloaded automatically
var image_trial = {
	type: 'image-keyboard-response',
	stimulus: 'img/file1.png'
}

// this file can be preloaded automatically
var sound_trial = {
	type: 'audio-keyboard-response',
	stimulus: 'audio/hello.mp3'
}

// these files must be preloaded manually
var video_trials = {
	timeline: [
		{
			type: 'video',
			stimulus: jsPsych.timelineVariable('video')
		}
	],
	timeline_variables: [
		{video: ['video/1.mp4']},
		{video: ['video/2.mp4']}
	]
}

var video = ['video/1.mp4', 'video/2.mp4'];

var preload = {
	type: 'preload',
	auto_preload: true, // automatically preload the image and audio files
	video: video // manually preload the videos used with timeline variables
}

jsPsych.init({
	timeline: [preload, image_trial, sound_trial, video_trials],
});

```

## 分批进行预加载

一些实验可能会用到很多或者体积很大的多媒体文件，如果被试网路连接不好时可能会出现问题，因为过多的文件会增加加载错误的概率。这也可能对文件缓存造成影响，即，将预加载的文件保留在浏览器的存储中，因为一次性加载所有的刺激可能会超出浏览器缓存的极限。解决方案之一是在实验期间分批加载多媒体文件，在使用前再加载文件。例如，如果实验中有多个block，则应该在每个block开始前才加载该block用到的刺激材料。

下面的例子中，试次内的刺激材料可以自动预加载。这里，我们使用了`trials`参数告诉`preload`插件每次只加载一部分刺激材料。

```javascript
// these image files in these trial blocks can be automatically preloaded
var block_1 = {
	timeline: [
		{
			type: 'image-keyboard-response',
			stimulus: 'img/file1.png'
		},
		{
			type: 'image-keyboard-response',
			stimulus: 'img/file2.png'
		}
	]
}

var block_2 = {
	timeline: [
		{
			type: 'image-keyboard-response',
			stimulus: 'img/file3.png'
		},
		{
			type: 'image-keyboard-response',
			stimulus: 'img/file4.png'
		}
	]
}

var preload_1 = {
	type: 'preload',
	trials: block_1 // automatically preload just the images from block_1 trials
}

var preload_2 = {
	type: 'preload',
	trials: block_2 // automatically preload just the images from block_2 trials
}

jsPsych.init({
	// add each preload trial onto the timeline before the appropriate trial block
	timeline: [preload_1, block_1, preload_2, block_2],
});
```

下面的例子中，试次的刺激材料不能自动预加载，因为这些刺激是通过`jsPsych.timelineVariable`传给试次的。这里，我们创建了多个数组，每个数组中添加一部分文件，然后分别将这些数组赋给各个预加载试次。

```javascript
// these trial blocks cannot be automatically preloaded because 
// the media files are passed to the trial parameters with timeline variables
var block_1 = {
	timeline: [...],
	timeline_variables: [
		{stim: 'file1.png'},
		{stim: 'file1.png'}
	]
}

var block_2 = {
	timeline: [...],
	timeline_variables: [
		{stim: 'file3.png'},
		{stim: 'file4.png'}
	]
}

var images_block_1 = ['file1.png', 'file2.png'];
var images_block_2 = ['file3.png', 'file4.png'];

// preload trial for preloading the block 1 stimuli
var preload_1 = {
	type: 'preload',
	images: images_block_1
}

// preload trial for preloading the block 2 stimuli
var preload_2 = {
	type: 'preload',
	images: images_block_2
}

jsPsych.init({
	// add each preload trial to the timeline before the appropriate trial block
	timeline: [preload_1, block_1, preload_2, block_2], 
});

```

## 预加载时呈现进度条

默认情况下，`preload`插件会在加载期间呈现进度条。该进度条表示的是所有被预加载文件的进度，包括通过`auto_preload`和`trials`参数进行自动预加载的文件和通过`audio`, `images`, 和 `video`参数进行手动预加载的文件。如果加载的文件较少，我们可能也不需要呈现进度条，因为它会一闪而过，这会给被试造成困扰。我们可以通过`preload`插件的`show_preogress_bar`参数控制是否呈现进度条。

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true
	show_progress_bar: false // hide progress bar
}
```

## 加载时间限制

我们应该给加载添加一个时间限制，以防止被试等待时间过场。可以通过`max_load_time`参数设置加载时间限制，单位为毫秒。如果我们设置了时间限制，且所有文件没有在这个时间范围内加载完成，则`preload`试次会暂停并报错（如果`continue_after_error`为false，即它的默认值）或直接结束并继续进行实验（如果`continue_after_error`为true）。如果`max_load_time`为null（默认值），则没有时间限制。 

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true
	max_load_time: 60000 // 1 minute
}
```

## 加载期间和出现错误时显示消息

我们可以在加载期间或加载出现错误时显示自定义的消息。可以通过`message`参数对此进行设置，该参数值为HTML字符串。如果 `show_progress_bar`为true，则该消息会呈现在进度条上方。

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true
	message: 'Please wait while the experiment loads. This may take a few minutes.',
}
```

在(a) 文件加载失败，或 (b) 达到`max_load_time`时没有加载完所有的文件 时被视为加载错误。我们可以使用`error_message`参数 定义出现错误时呈现在页面上的文字。只有在`continue_after_error`为false（默认值）时才会显示文字。

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true,
	error_message: 'The experiment failed to load. Please contact the researcher.'
}
```

除了`error_message`参数，我们还可以显示更详细的、记录了具体哪个文件加载失败的提示消息。这是通过`show_detailed_errors`参数控制的。更详细的报错内容会出现在`error_message`上方，只有在`continue_after_error`为false（默认值）时才会生效。

更详细的报错信息在测试和debug的时候很有用。如果`show_detailed_errors`为true，若有文件在加载时间限制内加载失败，报错信息中会将这些文件列出来。注意，这可能不包含所有未完成加载的文件，因为只会对时间范围内加载失败的文件进行记录。如果没有文件加载失败但是在加载时间范围内没有完成加载，则保存信息中会提示超时。 

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true,
	// show details of any file loading errors and/or loading time out
	show_detailed_errors: true 
}
```

## 错误处理选项

如果`continue_after_error`为true，则实验在有一个或多个文件加载失败时不会结束，而是会结束当前试次并让实验继续。不过，预加载试次记录的数据有一项为`success`，会记录是否所有文件都成功加载了，还有一项数据为`timeout`，记录是否所有文件都在`max_load_time`内完成加载。数据中还包含了加载失败的`image`, `audio`, 和 `video`文件。这样，我们可以在预加载失败后根据试次记录的数据判断接下来该干什么。例如，我们可能会跳过所使用的资源加载失败的试次，或重新对这些文件进行加载。又或者，我们可以直接结束实验，但在服务器上记录数据，以方便我们弄清楚为什么会加载失败。

```javascript
var preload_trial = {
	type: 'preload',
	auto_preload: true,
	message: 'Please wait while the experiment loads...',
	// don't stop the experiment if there are file loading errors or if loading times out
	continue_after_error: true 
}

var save_data = {
    type: 'call-function',
    async: true,
    func: function(done){
		var data = jsPsych.data.get().json();
        save_data(data, function() {done()})
    }
}

// the experiment will stop here, since there are no valid key choices or trial duration 
var fail_message = {
	type: 'html-keyboard-response',
	stimulus: 'The experiment failed to load. Please contact the researcher.',
	choices: jsPsych.NO_KEYS,
	trial_duration: null 
}

var if_loading_fails = {
	timeline: [save_data, fail_message],
	conditional_function: function() {
		if (jsPsych.data.getLastTrialData()[0].values().success) {
			// preloading was successful, so skip this conditional timeline
			// and move on with the experiment
			return false;
		} else {
			// preloading failed, so run this conditional timeline:
			// save the data to the server and show the fail message
			return true;
		}
	}
}

// ... rest of experiment

jsPsych.init({
	timeline: [preload_trial, if_loading_fails, ... ]
})

```

`preload`插件`on_success`和`on_error`回调函数也可以帮助我们了解加载的进度并处理加载错误。这些函数在文件成功加载或加载失败时被调用。它们只接受一个传入参数，即当前文件的路径（字符串）。

```javascript
var file_load_count = 0;
var file_error_count = 0;

var preload_trial = {
    type: 'preload',
    auto_preload: true,
    on_error: function(file) {
		file_error_count++;
      	console.log('Error: ',file);
    },
    on_success: function(file) {
		file_load_count++;
      	console.log('Loaded: ',file);
    }
};
```

注意，这两个回调不是一定会触发的，因为在`preload`试次结束后它们就被取消掉了。例如，如果文件在`max_load_time`内没有完成加载，则`preload`试次会因为超时而结束，此时`on_success`和`on_error`回调函数就被取消了。