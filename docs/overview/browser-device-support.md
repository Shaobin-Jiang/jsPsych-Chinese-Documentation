 支持的浏览器和设备

## 台式机和笔记本电脑上的浏览器

**支持的浏览器**

jsPsych支持以下四种最常用浏览器的最新版本：

 * Chrome
 * Firefox
 * Safari
 * Edge

也就是说，jsPsych可以在这些浏览器上运行。如果在上述浏览器中运行效果和你预想的不同，可能是因为存在bug。你可以在找到这些bug后在[jsPsych的GitHub Issues页](https://github.com/jspsych/jsPsych/issues)上指出这个问题。我们对此深表感谢，因为对jsPsych库的改进对所有人都有益。

**不支持的浏览器**

还有许多其他不常用的浏览器可用。其中最著名的是IE和Opera。jsPsych没有在这些浏览器或者是其他没有在上面“支持的浏览器”中列出的浏览器上进行过测试。jsPsych编写的使用可能能在这些浏览器中正常运行，也有可能不能。如果您允许被试选择这些不受支持的浏览器，那么我们建议你对实验进行认真的测试，以确保能按照预期效果呈现。否则的话，我们还是建议要求被试只使用支持的浏览器，或在实验开始时对浏览器、设备以及相应功能进行检查。jsPsych内置了[根据浏览器最小尺寸以及WebAudio API兼容性剔除被试](./exclude-browser.md)的方法。你可以通过添加自己的JavaScript代码，就其他方面进行检查。

## 移动设备

整体上来说，jsPsych编写的实验可以在移动设备（手机、平板电脑）上运行。但是，一些插件在移动设备上无法使用。例如，所有不提供输入框、但要求使用键盘输入的插件，如*-keyboard-response系列插件都无法使用。一些在手机可以使用的插件的运行效果可能和在电脑上运行时不太一样。例如，移动设备上，在输入框内输入时会在屏幕上弹出键盘，并会影响到屏幕上呈现的内容。

如果你想要运行的实验允许被试使用移动设备，那么我们建议你额外做一些测试。特别地，你应该检查：

* 小屏幕上的字体能看得清楚
* 刺激大小足够且合适
* 页面布局和设计的一样（如，元素居中，不重叠）
* 被试方便通过触屏做反应（如，点击按钮而非按键）
* 反应项（如，按钮，输入框，单选框）的大小足够，被试点击起来会很方便

可以使用浏览器的开发者工具模拟移动设备 ([这里讲解了如何在Chrome进行这一工作](https://developers.google.com/web/tools/chrome-devtools/device-mode))。这对于查看你开发的实验在移动端设备的运行效果很有帮助。但是需要注意，模拟器是有局限的，移动设备和浏览器上可能会有一些电脑上的浏览器模拟不出来的问题.

## 移动端浏览器

手机和平板电脑上可供选择的浏览器和电脑上的不太一样。除了移动端版本的Chrome, Firefox, Safari, 和 Edge，还有Opera Mobile, Samsung Internet, UC Browser, 和Dolphin这些浏览器。因为移动端的浏览器多种多样，使用率也并不稳定，jsPsych并不会对任意一种移动端浏览器提供支持。但是，我们认为大多数实验在绝大多数移动端浏览器中还是能正常运行的，尤其是那些我们支持的电脑上的浏览器的移动版本。如果你在使用移动端浏览器运行jsPsych实验的时候遇到了问题，可以在[jsPsych的GitHub Issues页](https://github.com/jspsych/jsPsych/issues)上提出。我们会尽力修复那些并非由实验自身造成的不兼容问题。
