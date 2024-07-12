# 运行实验

我们可以选择如下方式运行实验：

**离线**, 直接在浏览器中使用 `file://` 协议打开HTML文件。

**在线**, 通过 `http://` 或 `https://` 协议将文件托管到服务器上。

运行实验的方式不同会导致实验某些地方运行效果及可以执行的功能不同。当前文档会对此进行说明。

## 离线运行

我们可以通过双击HTML文件等操作直接在浏览器中打开HTML文件。这样，我们会使用`file://`协议。通常情况下，这样运行实验是最快捷也是最方便的，在写代码和测试的时候很方便。

不过，我们还是需要将实验放到服务器上并用数据库记录数据，因为需要这样来收数据（除非说我们使用自己的电脑做实验、收数据）。李先和在线运行实验有诸多不同。

注意，除非特别说明，我们这里所说的“服务器”指的是本地服务器（在自己的电脑上运行，只能从自己的电脑上访问实验文件，通常在开发阶段使用）或远程服务器（不在自己的电脑上运行，可以通过互联网访问实验文件）。

### Cross-origin requests (CORS) 和安全模式

浏览器有一项名为[cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)的安全策略，规定了网页是否可以请求非同源（即，协议、域名、端口）的资源。在线运行试验时不需要考虑这个问题，因为所有实验文件都是同源的。但是，如果是离线运行实验，CORS会使得jsPsych的一些需要[加载本地文件](https://security.stackexchange.com/questions/190266/why-chrome-blocks-ajax-locally/190321#190321)的功能被禁用。如果我们的实验用到了这些功能，则会出现[CORS错误](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors)，实验将无法进行。

为了防止这些问题，jsPsych使用了安全模式，在检测到当前HTML文件是通过`file://`协议运行时，会自动禁用不能使用的功能。具体来说，当离线运行实验时：

* **禁用Web Audio** (即使在`jsPsych.init`中将`use_webaudio`设置为true)。默认使用WebAudio API是因为这样即使更精确，但是WebAudio在离线环境下无法使用，所以此时我们会用HTML的audio播放音频。等价于在`jsPsych.init`中将`use_webaudio`设置为false。
* **禁用视频预加载** (包括使用`preload`插件进行手动和自动预加载)。离线实验中还是会播放视频，但视频文件在实验期间进行加载，这会造成视频播放前出现延迟。

安全模式通过[`jsPsych.init`](../core_library/jspsych-core.html#jspsychinit)中的`override_safe_mode`参数进行控制，还参数默认值为false。如果采用默认值，则离线运行时不需要考虑CORS错误，也不需要在实验上线的时候修改`jsPsych.init`中的设定。

我们也可以将`override_safe_mode`参数设置为true，这样就可以禁用jsPsych的安全模式。这样做的前提是我们禁用了浏览器的一些安全功能 (关于Chrome中如何操作详见[这里](https://alfilatov.com/posts/run-chrome-without-cors/)以及[这里](https://stackoverflow.com/questions/4819060/allow-google-chrome-to-use-xmlhttprequest-to-load-a-url-from-a-local-file)），不过你需要明白这些操作是干什么的。如果你的实验不适用Web Audio也不需要预加载视频，则jsPsych的安全模式不会对实验产生影响。

`override_safe_mode`参数对于在线运行的实验不产生影响，因为页面使用了`http://`或`https://`协议。

### 多媒体文件预加载

离线运行实验时，加载多媒体速度很快，因为它们就保存在电脑上，所以本地运行实验（离线或通过本地的服务器）时我们应该不会遇到文件加载延迟的问题。但是，如果是在远程服务器上运行实验，则需要通过网络获取文件，此时加载资源需要的时间更长，尤其是对于图片、音频和视频这些多媒体文件。我们在[多媒体文件预加载](media-preloading.html)中提到，这些延迟会对刺激呈现、反应时记录造成影响。

所以，我们需要确保实验中不需要重复加载成功预加载的文件。可以通过浏览器的开发者工具中的Network选项查看文件是什么时候完成加载的，也可以模拟网络连接较慢 (关于怎么在Chrome中操作详见[这里](https://developers.google.com/web/tools/chrome-devtools/network))。如果需要加载大量的或体积大的文件，如视频，我们可能需要在[`preload插件`](../plugins/jspsych-preload.html)中增加`max_load_time`设定的时间范围，这样即便被试的网络连接不好，也能正常进行实验。

### 永久保存数据

我们在[数据存储、汇总和操作](data.md#jspsych)部分提到，jsPsych会在浏览器中记录数据。离线实验时，我们无法用数据库记录数据，但还是可以把数据保存为本地文件 (使用[`jsPsych.data.get().localSave`](../core_library/jspsych-data.html#localsave))、在实验结束后呈现在网页上 (使用[`jsPsych.data.displayData`](../core_library/jspsych-data.html#jspsychdatadisplaydata))或把数据打印在控制台里 (使用[`console.log`](https://www.w3schools.com/jsref/met_console_log.asp))。

有时候，实验代码依赖于一些我们事先无从获取、且在数据收集过程中会改变的数据，此时我们同样需要将数据永久存储起来。例如，在一些认知行为实验中，我们需要进行**版本的平衡**，此时实验代码需要访问过去实验版本的分发情况并据此进行调整分发的版本，以及**涉及多个阶段/训练的研究**，因为我们需要根据被试当前的阶段或任务难度等对实验进行调整。

如果要将这些流程自动化，就需要使用服务器。虽然我们是离线进行开发、测试后，但还是可以对上述内容进行模拟，等到上线后再换到真正的执行方式。例如，我们可以用[randomize](../core_library/jspsych-randomization.html#jspsychrandomizationsamplewithoutreplacement)代替平衡：

```js
var versions = [1,2];
var random_version = jsPsych.randomization.sampleWithoutReplacement(versions,1)[0];
```

或使用[URL query参数](../core_library/jspsych-data.html#jspsychdatageturlvariable)来传入session编号或难度等数据：

```js
// add the variables onto the end of the URL that appears in the browser when you open the file 
// e.g., file:///C:/my_experiment.html?id=1&sess=2&diff=3
var participant_id = jsPsych.data.getURLVariable('id');
var session = jsPsych.data.getURLVariable('sess');
var difficulty = jsPsych.data.getURLVariable('diff');
```

## 在线运行

### 托管实验和保存数据

jsPsych是一个前端的JavaScript库，在被试电脑上运行。如果要通过网络运行实验，则需要先将文件托管到公共的服务器上，然后让被试通过浏览器访问实验。被试完成实验后，数据会保存在被试电脑浏览器的存储中，如果要访问这些数据，就需要将它们发送到服务器上并存入数据库或保存为文件。

出于灵活性的考虑，jsPsych没有提供单一内置的和服务器交互的功能，也正是因为这样，jsPsych兼容很多托管服务和工具，并允许研究中根据需要选择服务器。

可供选择的在线运行jsPsych实验的方式包括：

* [Cognition.run](https://www.cognition.run/) - 免费且只能托管jsPsych实验的服务，其使用界面非常易用。
* [JATOS](https://www.jatos.org/Whats-JATOS.html) - 运行在服务器上的免费程序，提供了搭建实验、访问数据的GUI界面，且提供了创建较为复杂的实验及管理研究者的功能。
* [Pavlovia](https://pavlovia.org/) - 提供托管在线实验的付费服务，由PsychoPy团队运营。通过GitLab仓库管理实验文件。被试可以通过Pavlovia链接访问实验。
* [PsiTurk](https://psiturk.org/) - 基于Python的程序，可以在你自己的电脑上托管实验并从MTurk手机数据（详见下面招募被试部分）。相对容易使用。
* [Pushkin](https://languagelearninglab.gitbook.io/pushkin/) - 包含了一系列搭建在线实验的工具。和其他方式不同，当前方式可以搭建一个包含多个实验的网站，同时包括实验室信息、被试登录以及其他面向大规模数据收集的功能。
* 完全自定义 - 我们也可以搭建自己的服务器和数据库，并自己处理通信问题。可以使用[LAMP](https://www.digitalocean.com/community/tutorial_collections/how-to-install-lamp)/[LEMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-20-04) (Linux操作系统 + Apache 或 Nginx + MySQL数据库 + PHP)这种传统的服务器套件，也可以使用其他常用的服务器框架如[Flask](https://flask.palletsprojects.com/) (Python) 和 [Node.js](https://nodejs.org/) (JavaScript)。

### 招募被试

实验上线后，就可以和线下实验一样开始招募被试了。比如说，如果你所在的机构使用SONA，就可以把你的实验链接贴到SONA上。SONA允许我们将一个ID嵌入到实验的URL中，然后我们可以使用[jsPsych's URL query参数相关的函数](../core_library/jspsych-data.html#jspsychdatageturlvariable)记录该内容。SONA还会生成一个用于在完成实验后让被试跳转的URL，这样在SONA就会将被试标记为已完成实验。

为了充分发挥线上实验的优势，很多研究者会面向更多人宣传他们的实验。除了可以通过社交媒体和其他媒体招募被试外，我们还可以使用一些商业平台宣传实验并向匿名的被试支付被试费。这些平台的使用需要收费，其优势在于帮助我们管理被试费支付和筛选被试。常用的在线行为实验被试招募平台包括：

* [Prolific](https://www.prolific.co/): 在线劳动市场，面向在线研究。
* [Amazon Mechanical Turk (MTurk)](https://www.mturk.com/): 在线劳动市场，用于宣传有偿的“脑力劳动”。该服务本来面向商业应用，但多年来也被用于行为研究。

和SONA一样，Prolific和MTurk也使用URL query参数获取被试信息并在实验结束后跳转到特定URL。jsPsych内置了[便于和MTurk上的被试交互的函数](../core_library/jspsych-turk.html)。关于如何将jsPsych实验接入Prolific的信息可以在官网上找到。
