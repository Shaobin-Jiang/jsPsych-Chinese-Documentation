# 计时精度

你是否会担心jsPsych在对反应时测量精度有较高要求的研究中能否使用？在大多数情况下，答案是可以的。

JavaScript中，**刺激呈现时长的精度**相比于标准的桌面端实验软件没那么精准。桌面端应用可以更直接地调用电脑的图形设备，而JavaScript现阶段在这方面仍然有局限。如果在你的实验中，呈现刺激时哪怕是1 - 2帧 (17 - 33 ms)的时间都是至关重要的，那么请仔细考虑要不要用JavaScript编写实验。我们可以在JavaScript中控制这个误差，但是往往需要对实验代码本身做很多修改，并且对于被试使用的浏览器也有了更多限制。

!!!tip "小贴士"
    如果你对jsPsych中的计时有很高的要求，我们推荐使用[Daiichiro Kuroki](https://twitter.com/kurokida1)开发的[jspsych-psychophysics插件](https://jspsychophysics.hes.kyushu-u.ac.jp/)。

    Kuroki, D. (2021). A new jsPsych plugin for psychophysics, providing accurate display duration and stimulus onset asynchrony. *Behavior Research Methods*, *53*, 301–310. [https://doi.org/10.3758/s13428-020-01445-w](https://doi.org/10.3758/s13428-020-01445-w)

jsPsych（和JavaScript）提供的**反应时测量精度**与使用Psychophysics Toolbox和E-Prime等标准实验软件所提供的是十分类似的。JavaScript测得的反应时一般会略长（约有10-40ms的延迟），但变异相似。

## 参考文献

更多关于基于浏览器的实验中的刺激呈现和反应时计时精度的内容详见下面的文献。

请注意，浏览器的升级很频繁，JavaScript语言本身的标准也一直在变化，所以可能这些文章中的一些结果已经不再适用了。

未来，JavaScript的更新中，很可能会提供更精确的刺激呈现和反应时计时，以提高在线实验的能力。

* [Bridges, D., Pitiot, A., MacAskill, M. R., & Peirce, J. W. (2020). The timing mega-study: Comparing a range of experiment generators, both lab-based and online. *PeerJ, 8*, e9414.](https://peerj.com/articles/9414/)
* [Anwyl-Irvine, A., Dalmaijer, E. S., Hodges, N., & Evershed, J. K. (2020). Realistic precision and accuracy of online experiment platforms, web browsers, and devices. *Behavior Research Methods, 53,* 1-19.](https://link.springer.com/article/10.3758/s13428-020-01501-5)
* [Pronk, T., Wiers, R. W., Molenkamp, B., & Murre, J. (2020). Mental chronometry in the pocket? Timing accuracy of web applications on touchscreen and keyboard devices. *Behavior Research Methods, 52*(3), 1371-1382.](https://link.springer.com/article/10.3758/s13428-019-01321-2)
* [Pinet, S., Zielinski, C., Mathôt, S. et al. (2017). Measuring sequences of keystrokes with jsPsych: Reliability of response times and interkeystroke intervals.  *Behavior Research Methods*, *49*(3), 1177-1178.](http://link.springer.com/article/10.3758/s13428-016-0776-3)
* [de Leeuw, J. R., & Motz, B. A. (2016). Psychophysics in a Web browser? Comparing response times collected with JavaScript and Psychophysics Toolbox in a visual search task. *Behavior Research Methods*, *48*(1), 1-12.](http://link.springer.com/article/10.3758%2Fs13428-015-0567-2)
* [Hilbig, B. E. (2016). Reaction time effects in lab- versus web-based research: Experimental evidence. *Behavior Research Methods*, *48*(4), 1718-1724.](http://dx.doi.org/10.3758/s13428-015-0678-9)
* [Reimers, S., & Stewart, N. (2015). Presentation and response time accuracy in Adobe Flash and HTML5/JavaScript Web experiments. *Behavior Research Methods*, *47*(2), 309-327.](http://link.springer.com/article/10.3758%2Fs13428-014-0471-1)

