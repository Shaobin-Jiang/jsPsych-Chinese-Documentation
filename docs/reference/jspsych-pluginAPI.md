# jsPsych.pluginAPI

pluginAPI模块包含了用于开发新插件的函数。这些函数可以通过`pluginAPI`对象访问。这篇文档中，我们把它们根据不同功能做了划分。

## 键盘输入

### cancelAllKeyboardResponses

```javascript
jsPsych.pluginAPI.cancelAllKeyboardResponses()
```

#### 参数

无。

#### 返回值

无。

#### 描述

删除所有`jsPsych.pluginAPI.getKeyboardResponse`创建的键盘监听事件。

#### 示例

```javascript
jsPsych.pluginAPI.cancelAllKeyboardResponses();
```

---

### cancelKeyboardResponse

```javascript
jsPsych.pluginAPI.cancelKeyboardResponse(listener_id)
```

#### 参数

参数 | 类型 | 描述 
----------|------|------------
listener_id | 对象 | 通过调用`jsPsych.pluginAPI.getKeyboardResponse`生成的监听器ID。 

#### 返回值

无。

#### 描述

删除`jsPsych.pluginAPI.getKeyboardResponse`创建的某个键盘监听事件。

#### 示例

```javascript
// create a persistent keyboard listener
var listener_id = jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: after_response, 
    valid_responses: ['p','q'], 
    rt_method: 'performance', 
    persist: true,
    allow_held_key: false
});

// cancel keyboard listener
jsPsych.pluginAPI.cancelKeyboardResponse(listener_id);
```

---

### compareKeys

```javascript
jsPsych.pluginAPI.compareKeys(key1, key2)
```

#### 参数

参数 | 类型 | 描述 
----------|------|------------
key1 | 字符串或数值 | 按键的键名或键值。 
key2 | 字符串或数值 | 按键的键名或键值。

#### 返回值

如果两个键相同则返回true，不管传入的是键名还是键值。如果两个键不同则返回false。

#### 描述

比较两个键是否相同，不管是以键名还是键值的形式比较，同时根据实验设置对大小写敏感或不敏感。

如果`initJsPsych`中将`case_sensitive_responses`设置为false（默认值），则比较两个按键时大小写敏感，例如，"a"和"A"视为同一个按键，当前函数会返回true。如果`initJsPsych`中将`case_sensitive_responses`设置为true，则比较两个按键时大小写敏感，例如，"a"和"A"视为不同的按键，当前函数会返回false。

我们推荐在插件和实验代码中使用这个函数比较按键是否相同，而非使用`if (response == 'j')...`这种形式。这是因为通过 `jsPsych.pluginAPI.getKeyboardResponse`函数返回的按键会在`case_sensitive_responses`为false时被转为小写，而在`case_sensitive_responses`为true时对大小写进行匹配。使用当前的`compareKeys`方法可以确保我们在比较按键时严格遵从实验的`case_sensitive_responses`设置，我们也不需要在比较的时候再去考虑按键的大小写了 (例如，`if (response == 'ArrowLeft' || response == 'arrowleft')...`).。 

#### 示例

##### 基本示例

```javascript
jsPsych.pluginAPI.compareKeys('a', 'A');
// returns true when case_sensitive_responses is false in initJsPsych

jsPsych.pluginAPI.compareKeys('a', 'A');
// returns false when case_sensitive_responses is true in initJsPsych

// also works with numeric key codes (but note that numeric keyCode values are now deprecated)
jsPsych.pluginAPI.compareKeys('a', 65);
// returns true

jsPsych.pluginAPI.compareKeys('space', 31);
// returns false
```

##### 比较按键反应和插件中的key参数值

```javascript
// this is the callback_function passed to jsPsych.pluginAPI.getKeyboardResponse
var after_response = function(info) {
  // score the response by comparing the key that was pressed against the trial's key_answer parameter
  var correct = jsPsych.pluginAPI.compareKeys(trial.key_answer, info.key);
  //...
}
```

##### 在实验中判断按键是否正确

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<<<<<',
  choices: ['f','j'],
  prompt: 'Press f for left. Press j for right.',
  on_finish: function(data){
    // score the response by comparing the key that was pressed (data.response) against the 
    // correct response for this trial ('f'), and store reponse accuracy in the trial data
    if(jsPsych.pluginAPI.compareKeys(data.response, 'f')){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}
```

---
### getKeyboardResponse

```javascript
jsPsych.pluginAPI.getKeyboardResponse(parameters)
```

#### 参数

该方法的传入参数为一个对象，对象可以包含的属性见下表：

参数 | 类型 | 描述 
----------|------|------------
callback_function | 函数 | 当被试做出有效的按键反应时执行的函数。 
valid_responses | 数组 | 定义了有效按键范围的数组，数组元素可以是键值或键名。如果被试反应不在范围内，则该反应视为无效。如果当前参数值为空数组，则意味着所有按键反应都有效。 
rt_method | 字符串 | 选择用什么方式计时。如果使用`'performance'`方法，则会调用`performance.now()`，即jsPsych中一般用于计时的方式。[当前主流的浏览器的新版本](http://caniuse.com/#search=performance)都支持这一功能。如果采用`audio`方法，则需要和`audio_context` (需要额外设置的参数)一起使用，该方法会调用音频播放时`audio_context`的时间。 
audio_context | AudioContext对象 | 播放的音频文件的AudioContext。 
audio_context_start_time | 数值 | AudioContext开始播放的时间。 
allow_held_key | 布尔 | 如果为true，则记录按键时也会记录已经按下的按键。如果为false，则只会在按键第一次调用`getKeyboardResponse`的时候记录该反应。例如，如果被试在实验开始前按住了<kbd>A</kbd>键，则第一次调用`getKeyboardResponse`时会记录A键。但是，后面再调用`getKeyboardResponse`就不会再记录A键了，除非被试松开该键然后再按一次。 
persist | 布尔 | 如果为false，则只会在第一次按下有效按键时触发键盘监听。如果为true，则每次按下有效键都会触发键盘监听，直到监听通过`jsPsych.pluginAPI.cancelKeyboardResponse`或`jsPsych.pluginAPI.cancelAllKeyboardResponses`取消。 

#### 返回值

返回监听器对象，可以传入`jsPsych.pluginAPI.cancelKeyboardResponse`以取消键盘监听。

#### 描述

记录被试按键反应并记录第一次调用该函数到被试给出第一个有效反应之间的反应时。

键盘监听事件和`jsPsych.init()`中定义的`display_element`进行绑定（如果没有特别指定，则为`<body>`元素）。这样，我们可以在网页中同时呈现jsPsych实验和其他网页内容，且jsPsych实验不会影响其他的UI元素。

有效按键会触发`callback_function`。该回调函数接受一个传入参数，为包含了`key`和`rt`属性的对象。`key`为按键的键名，`rt`为反应时。

当前函数使用了键盘事件的`.key`属性，该属性对大小写**敏感**。如果`jsPsych.init`中的`case_sensitive_responses`属性为false（默认值），当前函数会将`valid_responses`中的字符串和按键都转换为小写再进行比较，传入`callback_function`中的也是小写的按键。例如，如果`valid_responses`为`['a']`，则'A'和'a'都是有效反应，且返回的按键名为'a'。如果`jsPsych.init`中的`case_sensitive_responses`属性为true，则当前函数在比较`valid_responses`和按键反应时不会对大小写进行转换，也不会对传入`callback_function`的按键的大小写转换。例如，如果`valid_responses`为`['a']`，则只有'a'是有效按键，而'A' 不是。此外，如果`valid_responses`包含了多个选项 (例如`jsPsych.ALL_KEYS`)，如需要检查对被试按键反应是否正确进行判断，则需要对大小写的情况都进行比较，例如`if (response == 'ArrowLeft' || response =='arrowleft') ...`。

#### 示例

##### 记录一次按键反应，不限制有效按键

```javascript

var after_response = function(info){
	alert('You pressed key '+info.key+' after '+info.rt+'ms');
}

jsPsych.pluginAPI.getKeyboardResponse({
  callback_function:after_response,
  valid_responses: "ALL_KEYS",
  rt_method: 'performance',
  persist: false
});
```

##### 在按下q前一直记录按键

```javascript

var after_response = function(info){
	alert('You pressed key '+info.key+' after '+info.rt+'ms');

	if(jsPsych.pluginAPI.compareKeys(info.key,'q')){ /
		jsPsych.pluginAPI.cancelKeyboardResponse(listener);
	}
}

var listener = jsPsych.pluginAPI.getKeyboardResponse({
  callback_function:after_response,
  valid_responses: "ALL_KEYS",
  rt_method: 'performance',
  persist: true
});
```

## 多媒体

## 音频

所有音频相关的功能都由AudioPlayer类管理。

### getAudioPlayer

```javascript
jsPsych.pluginAPI.getAudioPlayer(filepath)
```

#### 返回值

返回一个Promise对象，resolve后得到一个AudioPlayer实例，含有当前音频文件的buffer。

#### 描述

获取AudioPlayer实例，该实例包含了用来播放/停止播放可以用WebAudio API或HTML5 Audio播放的音频的方法。

我们强烈推荐在使用此方法前预加载音频，否则该方法会先加载响应文件，从而在实验中因为下载音频文件而带来延迟。

#### 示例

##### HTML 5 Audio 和 WebAudio API

```javascript
const audio = await jsPsych.pluginAPI.getAudioPlayer('my-sound.mp3')

audio.play()

```

详见`audio-keyboard-response`。

---

### play

```javascript
const audio = jsPsych.pluginAPI.getAudioPlayer(filepath)

audio.play()
```

#### 返回值

无

#### 描述

AudioPlayer类的方法。播放已经加载到AudioPlayer实例缓冲区中的音频。如果音频是一个HTMl5 audio对象，则会播放该音频；如果是一个Webaudio API对象，则开始播放。

#### 示例

##### HTML 5 Audio 和 WebAudio API

```javascript
const audio = await jsPsych.pluginAPI.getAudioPlayer('my-sound.mp3');

audio.play();

```

详见`audio-keyboard-response`。

---

### stop

```javascript
const audio = jsPsych.pluginAPI.getAudioPlayer(filepath);

audio.play();
```

#### 返回值

无

#### 描述

AudioPlayer类的方法。停止播放已经加载到AudioPlayer实例缓冲区中的音频。如果音频是一个HTMl5 audio对象，则会暂停该音频；如果是一个Webaudio API对象，则停止播放。

#### 示例

##### HTML 5 Audio 和 WebAudio API

```javascript
const audio = await jsPsych.pluginAPI.getAudioPlayer('my-sound.mp3');

audio.play();

audio.stop();

```

详见`audio-keyboard-response`。

---

### addEventListener

```javascript
const audio = jsPsych.pluginAPI.getAudioPlayer(filepath);

audio.addEventListener(eventName, callback);
```

#### 返回值

无

#### 描述

AudioPlayer类的方法。向AudioPlayer实例对应的媒体元素添加事件监听。

#### 示例

```javascript
const audio = await jsPsych.pluginAPI.getAudioPlayer('my-sound.mp3');

audio.play();

audio.addEventListener('ended', end_trial());

```

详见`audio-keyboard-response`。

---

### removeEventListener

```javascript
const audio = jsPsych.pluginAPI.getAudioPlayer(filepath);

audio.removeEventListener(eventName, callback);
```

#### 返回值

无

#### 描述

AudioPlayer类的方法。移除AudioPlayer实例对应的媒体元素的事件监听。

#### 示例

```javascript
const audio = await jsPsych.pluginAPI.getAudioPlayer('my-sound.mp3');

audio.play();

audio.addEventListener('ended', end_trial());

audio.removeEventListener('ended', end_trial());

```

详见`audio-keyboard-response`。

---

## 其他媒体

### getAudioBuffer

```javascript
jsPsych.pluginAPI.getAudioBuffer(filepath)
```

#### 参数

参数 | 类型 | 描述 
----------|------|------------
filepath | 字符串 | 预加载的音频文件路径。

#### 返回值

加载音频文件时返回一个Promise对象，加载成功时的回调函数传入参数为对应的音频。如果实验使用了WebAudio API，则为一个AudioBuffer对象，否则为一个HTML5的Audio对象。加载失败时的回调函数传入参数是`preloadAudio`产生的错误。

#### 描述

获取WebAudio API的AudioBuffer对象或HTML5的Audio对象。

我们推荐在调用当前方法前对音频文件进行预加载。如果音频文件没有被加载，则当前方法会先对文件进行加载，从而在实验中因为等待下载音频而出现较长的延迟。

#### 示例

##### HTML 5 Audio

```javascript
jsPsych.pluginAPI.getAudioBuffer('my-sound.mp3')
  .then(function(audio){
    audio.play();
  })
  .catch(function(err){
    console.error('Audio file failed to load')
  })
```

##### WebAudio API

```javascript
var context = jsPsych.pluginAPI.audioContext();

jsPsych.pluginAPI.getAudioBuffer('my-sound.mp3')
  .then(function(buffer){
    audio = context.createBufferSource();
    audio.buffer = buffer;
    audio.connect(context.destination);
    audio.start(context.currentTime);
  })
  .catch(function(err){
    console.error('Audio file failed to load')
  })
```

更多示例详见`audio-keyboard-response`插件。

---

### getAutoPreloadList

```javascript
jsPsych.pluginAPI.getAutoPreloadList(timeline)
```

#### 参数

参数 | 类型 | 描述 
----------|------|------------
timeline | 数组 | 含有需要加载的多媒体文件的试次组成的时间线数组。可以是整个实验的时间线，也可以是主时间线的一部分，如特定几个时间线节点及试次。 

#### 返回值

返回一个对象并包含`images`, `audio`, 和 `video`属性，每个属性值包含了自动从时间线提取的相应类型文件列表（无重复）。如果没有找到某种类型文件，则该属性值为空数组。

#### 描述

该数组通过时间线无重复地获取的图片、音频和视频文件。这些文件用于`plugin`插件，根据插件的`trials`参数或`jsPsych.run`中的时间线（如果`auto_preload`为true）决定哪些文件需要被预加载。我们可以在插件和实验中使用这个功能从时间线中获取图片、音频、视频文件列表。

这个函数只会返回使用了`registerPreload`方法定义了参数的文件类型（图片、音频、视频）且这些参数值不是函数的插件。如果文件路径是通过函数返回的（包括通过`jsPsych.timelineVariable`函数）或者文件路径被嵌入了HTML字符串中，则改文件不会被`getAutoPreloadList`方法检测到。这些情况下，我们需要手动预加载这些文件。详见[多媒体文件预加载](../overview/media-preloading.md)。

#### 示例

```javascript
var audio_trial = {
    type: jsPsychAudioKeyboardResponse
    stimulus: 'file.mp3'
}

var image_trial = {
    type: jsPsychImageKeyboardResponse
    stimulus: 'file.png'
}

var video_trial = {
    type: jsPsychVideoKeyboardResponse
    stimulus: 'file.mp4'
}

var timeline = [audio_trial, image_trial, video_trial];

jsPsych.pluginAPI.getAutoPreloadList(timeline);
```

---

### getCameraRecorder

```javascript
jsPsych.pluginAPI.getCameraRecorder()
```

#### 参数

无

#### 返回值

连接到当前摄像头的`MediaStream`的`MediaRecorder`对象。

#### 描述

允许访问由[initializeCameraRecorder()](#initializecamerarecorder)创建的`MediaRecorder`。如果没有摄像头，返回`null`。

#### 示例

```javascript
const recorder = jsPsych.pluginAPI.getCameraRecorder();
```

---

### getMicrophoneRecorder

```javascript
jsPsych.pluginAPI.getMicrophoneRecorder()
```

#### 参数

无。

#### 返回值

一个`MediaRecorder`对象，该对象连接到当前活跃的麦克风的`MediaStream`对象。

#### 描述

允许我们访问[initializeMicrophoneRecorder()](#initializemicrophonerecorder)创建的`MediaRecorder`。如果不存在麦克风，则返回`null`。

#### 示例

```javascript
const recorder = jsPsych.pluginAPI.getMicrophoneRecorder();
```

---

### initializeCameraRecorder

```javascript
jsPsych.pluginAPI.initializeCameraRecorder(stream)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
stream | `MediaStream` | 当前摄像头的`MediaStream`对象。
opts | `MediaRecorderOptions` | 摄像头的`MediaRecorderOptions`。见[MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder)。

#### 返回值

无

#### 描述

通过提供的`MediaStream`生成`MediaRecorder`并通过[getCameraRecorder()](#getcamerarecorder)存储。

#### 示例

```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: { width: 1280, height: 720 }, // request a certain resolution
});

jsPsych.pluginAPI.initializeCameraRecorder(stream);
```

---

### initializeMicrophoneRecorder

```javascript
jsPsych.pluginAPI.initializeMicrophoneRecorder(stream)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
stream | `MediaStream` | 当前活跃的麦克风设备的`MediaStream`对象。

#### 返回值

无。

#### 描述

从传入的`MediaStream`生成一个`MediaRecorder`，并允许通过[getMicrophoneRecorder()](#getmicrophonerecorder)调用。

#### 示例

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: mic_id } });

jsPsych.pluginAPI.initializeMicrophoneRecorder(stream);
```

---

### preloadAudio

```javascript
jsPsych.pluginAPI.preloadAudio(files, callback_complete, callback_load, callback_error)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
files | 数组 | 数组元素为需要加载的音频文件路径。数组可以嵌套（例如，将文件分在多个数组中，以便于根据实验条件或任务分组）。 
callback_complete | 函数 | 加载完成后执行的函数。 
callback_load | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。 
callback_error | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。

#### 返回值

无。

#### 描述

这个函数用于预加载音频文件。`preload`插件中使用了这个函数，我们也可以在自己开发的插件或实验中直接调用这个函数。详见[多媒体文件预加载](../overview/media-preloading.md)。

我们在使用这个函数的时候也可以不指定回调函数。但是这个时候，在文件加载期间，代码就会继续运行。所以，有可能我们在使用一个文件的时候，该文件还没有加载完成。而如果使用了`callback_complete`函数，就只会在所有文件加载完成后再执行，从而用来控制实验的进程（例如，在`callback_complete`中开始实验）。

`callback_load`和`callback_error`函数在单个文件加载完成或失败后执行，所以我们可以通过这些函数监控加载进程。详见下面的示例。

#### 示例

##### 基本的使用

```javascript
var sounds = ['file1.mp3', 'file2.mp3', 'file3.mp3'];

jsPsych.pluginAPI.preloadAudio(sounds, 
    function(){ startExperiment(); },
    function(file){ console.log('file loaded: ', file); }
    function(file){ console.log('error loading file: ', file); }
);

function startExperiment(){
    jsPsych.run(exp);
}
```

##### 显示加载进度

```javascript
var sounds = ['file1.mp3', 'file2.mp3', 'file3.mp3'];
var n_loaded = 0;

jsPsych.pluginAPI.preloadAudio(sounds, function(){ startExperiment(); }, function(file) { updateLoadedCount(file); });

function updateLoadedCount(file){
  n_loaded++;
	var percentcomplete = n_loaded / sounds.length * 100;

	// could put something fancier here, like a progress bar
	// or updating text in the DOM.
	console.log('Loaded '+percentcomplete+'% of audio files');
}

function startExperiment(){
  jsPsych.run(exp);
}
```

---

### preloadImages

```javascript
jsPsych.pluginAPI.preloadImages(images, callback_complete, callback_load, callback_error)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
images | 数组 | 数组元素为需要加载的图片文件路径。数组可以嵌套（例如，将文件分在多个数组中，以便于根据实验条件或任务分组）。 
callback_complete | 函数 | 加载完成后执行的函数。 
callback_load | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。 
callback_error | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。 

#### 返回值

无。

#### 描述

这个函数用于预加载图片文件。`preload`插件中使用了这个函数，我们也可以在自己开发的插件或实验中直接调用这个函数。详见[多媒体文件预加载](../overview/media-preloading.md)。

我们在使用这个函数的时候也可以不指定回调函数。但是这个时候，在文件加载期间，代码就会继续运行。所以，有可能我们在使用一个文件的时候，该文件还没有加载完成。而如果使用了`callback_complete`函数，就只会在所有文件加载完成后再执行，从而用来控制实验的进程（例如，在`callback_complete`中开始实验）。

`callback_load`和`callback_error`函数在单个文件加载完成或失败后执行，所以我们可以通过这些函数监控加载进程。详见下面的示例。

#### 示例

##### 基本的使用

```javascript
var images = ['img/file1.png', 'img/file2.png', 'img/file3.png'];

jsPsych.pluginAPI.preloadImages(images, 
    function(){ startExperiment(); },
    function(file){ console.log('file loaded: ', file); }
    function(file){ console.log('error loading file: ', file); }
);

function startExperiment(){
    jsPsych.run(exp);
}
```

##### 显示加载进度

```javascript
var images = ['img/file1.png', 'img/file2.png', 'img/file3.png'];
var n_loaded = 0;

jsPsych.pluginAPI.preloadImages(images, function(){ startExperiment(); }, function(file) { updateLoadedCount(file); });

function updateLoadedCount(file){
  n_loaded++;
	var percentcomplete = n_loaded / images.length * 100;

	// could put something fancier here, like a progress bar
	// or updating text in the DOM.
	console.log('Loaded '+percentcomplete+'% of images');
}

function startExperiment(){
  jsPsych.run(exp);
}
```

---

### preloadVideo

```javascript
jsPsych.pluginAPI.preloadVideo(video, callback_complete, callback_load, callback_error)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
videos | 数组 | 数组元素为需要加载的视频文件路径。数组可以嵌套（例如，将文件分在多个数组中，以便于根据实验条件或任务分组）。 
callback_complete | 函数 | 加载完成后执行的函数。 
callback_load | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。 
callback_error | 函数 | 一个文件加载完成后执行的函数。该函数接受一个传入参数，为文件的路径。

#### 返回值

无。

#### 描述

这个函数用于预加载视频文件。`preload`插件中使用了这个函数，我们也可以在自己开发的插件或实验中直接调用这个函数。详见[多媒体文件预加载](../overview/media-preloading.md)。

我们在使用这个函数的时候也可以不指定回调函数。但是这个时候，在文件加载期间，代码就会继续运行。所以，有可能我们在使用一个文件的时候，该文件还没有加载完成。而如果使用了`callback_complete`函数，就只会在所有文件加载完成后再执行，从而用来控制实验的进程（例如，在`callback_complete`中开始实验）。

`callback_load`和`callback_error`函数在单个文件加载完成或失败后执行，所以我们可以通过这些函数监控加载进程。详见下面的示例。

#### 示例

##### 基本的使用

```javascript
var videos = ['vid/file1.mp4', 'vid/file2.mp4', 'vid/file3.mp4'];

jsPsych.pluginAPI.preloadVideo(videos, 
  function(){ startExperiment(); },
  function(file){ console.log('file loaded: ', file); }
  function(file){ console.log('error loading file: ', file); }
);

function startExperiment(){
  jsPsych.run(exp);
}
```

##### 显示加载进度

```javascript
var videos = ['vid/file1.mp4', 'vid/file2.mp4', 'vid/file3.mp4'];
var n_loaded = 0;

jsPsych.pluginAPI.preloadVideo(videos, function(){ startExperiment(); }, function(file) { updateLoadedCount(file); });

function updateLoadedCount(file){
  n_loaded++;
	var percentcomplete = n_loaded / videos.length * 100;

	// could put something fancier here, like a progress bar
	// or updating text in the DOM.
	console.log('Loaded '+percentcomplete+'% of videos');
}

function startExperiment(){
  jsPsych.run(exp);
}
```

---


## 模拟

### clickTarget

```javascript
jsPsych.pluginAPI.clickTarget(target, delay)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
target | DOM元素 | 模拟点击的DOM元素。
delay | 数值 | 等待的毫秒数。点击会在这段延迟之后触发。

#### 返回值

无。

#### 描述

通过在`target`上触发如下三个事件模拟点击：`'mousedown'`，然后是`'mouseup'`，再然后是`'click'`。如果`delay`为正，则会通过`setTimeout`在延迟后触发这些事件。

#### 示例

```javascript
const target = document.querySelector('.jspsych-btn');

jsPsych.pluginAPI.clickTarget(target, 500);
```

---

### ensureSimulationDataConsistency

```javascript
jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
trial | 对象 | 试次参数，例如传入插件的`trial()`方法的参数。
data | 对象 | 包含试次数据的对象。

#### 返回值

无。该方法会对`data`对象做适当的调整。

#### 描述

根据`trial`中的参数对`data`做一些检查。例如，如果`trial.choices` 为`"NO_KEYS"`，而`data.response`是一个按键名，则`data.response`和`data.rt`会被设为`null`。

#### 示例

```javascript
jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
```

---

### fillTextInput

```javascript
jsPsych.pluginAPI.fillTextInput(target, text, delay)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
target | HTML Input元素 | 需要填写的input元素。
text | 字符串 | 填写的文字内容。
delay | 数值 | 等待的毫秒数。文字输入会在这段延迟之后触发。

#### 返回值

无。

#### 描述

将`target`的value设置为`text`。

#### 示例

```javascript
const target = document.querySelector('input[type="text"]');

jsPsych.pluginAPI.fillTextInput(target, "hello!", 500);
```

---

### getValidKey

```javascript
jsPsych.pluginAPI.getValidKey(choices)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
choices | "NO_KEYS" / "ALL_KEYS" / 字符串数组 | `getKeyboardResponse`方法中的有效按键。

#### 返回值

从`choices`中随机抽取的有效按键。

#### 描述

从给出的选项中随机选取一个按键。当前版本中，在`choices`为`"ALL_KEYS"`的时候只会选取字母和数字按键。

#### 示例

```javascript
const random_key = jsPsych.pluginAPI.getValidKey(trial.choices);
```

---

### keyDown

```javascript
jsPsych.pluginAPI.keyDown(key)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
key | 字符串 | 键盘上对应按键的`.key`属性。

#### 返回值

无。

#### 描述

对指定的`key`触发`'keydown'`事件。

#### 示例

```javascript
jsPsych.pluginAPI.keyDown('a');
```

---

### keyUp

```javascript
jsPsych.pluginAPI.keyUp(key)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
key | 字符串 | 键盘上对应按键的`.key`属性。

#### 返回值

无。

#### 描述

对指定的`key`触发`'keyup'`事件。 

#### 示例

```javascript
jsPsych.pluginAPI.keyUp('a');
```

---

### mergeSimulationData

```javascript
jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
default_data | 对象 | 模拟试次所使用的数据对象。
simulation_options | 对象 | 试次的`simulation_options`值

#### 返回值

数据对象

#### 描述

该方法将`default_data`和`simulation_options.data`中指定的数据合并，并优先使用`simulation_options.data`。返回合并后的数据。

#### 示例

```javascript
const default_data = {
  rt: 500,
  response: 'a'
}

const simulation_options = {
  data: {
    rt: 200
  }
}

const data = jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);

data.rt === 200; // true
```

---


## Timeouts

### clearAllTimeouts

```javascript
jsPsych.pluginAPI.clearAllTimeouts()
```

#### 参数

无。

#### 返回值

无。

#### 描述

清除所有使用`jsPsych.pluginAPI.setTimeout()`创建的还未结束的倒计时。

---

### setTimeout

```javascript
jsPsych.pluginAPI.setTimeout(callback, delay)
```

#### 参数

参数 | 类型 | 描述
----------|------|------------
callback | 函数 | 倒计时结束后执行的函数。 
delay | 整数 | 倒计时时长（单位：毫秒）。

#### 返回值

返回setTimeout的句柄。

#### 描述

这个方法会调用JavaScript中的setTimeout函数，但也会将该次调用记录下来。在某些时候，如果我们在某些事件中（试次结束，中止实验）需要结束倒计时，这就很有用了。

#### 示例

```javascript
// print the time
console.log(Date.now())

// print the time 1s later
jsPsych.pluginAPI.setTimeout(function(){
	console.log(Date.now())
}, 1000);
```

