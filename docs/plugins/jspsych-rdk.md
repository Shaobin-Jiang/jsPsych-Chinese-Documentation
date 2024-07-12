# jspsych-rdk plugin

这个插件的作用是呈现随机运动点阵 (Random Dot Kinematogram, RDK)，并让被试通过按键报告整体运动方向。刺激可以在被试按键后消失，或在超出时间限制后消失。我们可以对RDK进行自定义（详见下面的文档），且可以同时呈现多张参数不同的图。

如果你在使用RDK时能引用下面的文献，我们会十分感谢：
<b>Rajananda, S., Lau, H. & Odegaard, B., (2018). A Random-Dot Kinematogram for Web-Based Vision Research. Journal of Open Research Software. 6(1), p.6. DOI: [http://doi.org/10.5334/jors.194]</b>

为了达到更好的呈现效果，需要被试手动进入全屏模式（例如，在Windows的Chrome浏览器下通过<kbd>F11</kbd>进入）。如果使用jsPsych API中的全屏功能，可能会造成刺激呈现不正常。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                     | 类型           | 默认值               | 描述                                                         |
| ------------------------ | -------------- | -------------------- | ------------------------------------------------------------ |
| choices                  | 字符串数组     | jsPsych.ALL_KEYS     | 被试做反应时的有效按键，必须以字符串的形式指定。如果不指定，则所有按键都有效。 |
| correct_choice           | 数组 或 字符串 | *undefined*          | 当前试次正确反应所对应的按键。该参数值可以是字符串或字符串数组，需要和`coherent_direction`参数结合起来（详见下面的示例）。这个参数的作用是判断被试是否做出了正确的反应，并在数据对象中通过`correct`属性进行记录。 |
| trial_duration           | 数值           | 500                  | 刺激呈现的毫秒数。如果为-1，则刺激在被试做出有效反应后才会消失（`choices`属性值必须指定了有效的按键范围，否则试次会一直进行下去）。 |
| response_ends_trial      | 布尔           | true                 | 如果为true，则被试做反应后试次会结束。如果为false，则刺激会在到达`trial_duration`指定的时间后消失（被试在此期间做了反应就会被记录下来）。 |
| number_of_apertures      | 数值           | 1                    | 屏幕上RDK图的数量。如果大于1，则需要设置位置（即，`aperture_center_x`和`aperture_center_y`）以将它们分开放置。除此之外，可以通过用数组代替数值对参数进行赋值以对不同的图进行不同的设置。如果参数值为数值而非数组，则所有的图在该参数上都会使用同一个值。 |
| number_of_dots           | 数值           | 300                  | 每个set中点的数量，也是每一帧中呈现点的数量。                |
| number_of_sets           | 数值           | 1                    | 循环呈现的点的set数量，每一帧中会呈现一个set（例如，如果有2个set，则第一帧会呈现第一个set，第二帧呈现第二个set，第三帧呈现第三个set，以此类推）。<br><span style="color: red;">译者注：关于set的概念，我们将**number_of_dots**和**number_of_sets**两个参数均设置为2时，默认状况下我们会看到屏幕上有4个点在连续移动，但实际上不是这样的。如果我们将动画修改为500ms刷新一次（如下面的<a href="#rdk-set-demo">视频</a>所示），会看到每一帧实际只会呈现2个点，这就是一个set，而且整个过程中是两个set交替呈现。</span> |
| coherent_direction       | 数值           | 0                    | 动点的主运动方向的角度值。0对应的是三点钟方向，随着该值的增大，方向沿逆时针方向旋转（例如，十二点钟方向对应90，九点钟方向对应180，等等）。取值范围为0 - 360。 |
| coherence                | 数值           | 0.5                  | 沿主运动方向运动的点所占比例，取值范围为0 - 1。              |
| opposite_coherence       | 数值           | 0                    | 沿主运动方向反方向运动的点所占比例，取值范围为0 - (1 - `coherence`)。 |
| dot_radius               | 数值           | 2                    | 每个点半径的像素值。                                         |
| dot_life                 | 数值           | -1                   | 一个点消失并重新出现在新的一帧中所需要的帧数。如果该参数值为-1，则点的生命周期为无限长（即，只会在移动到图的范围外才会消失再重新出现）。 |
| move_distance            | 数值           | 1                    | 每一帧中，点移动的像素值（类似于点的移动速度）。             |
| aperture_width           | 数值           | 600                  | 图宽度的像素值。对于正方形的图，会同时将其宽和高设定为该值；对于圆形的图，会将其直径设置为该值。 |
| aperture_height          | 数值           | 400                  | 图高度的像素值。对于正方形和圆形的图，该参数不起作用。       |
| dot_color                | 字符串         | "white"              | 点的颜色。                                                   |
| background_color         | 字符串         | "gray"               | 背景颜色。                                                   |
| RDK_type                 | 数值           | 3                    | 信号选择规则规则（Same和Different）以及噪声类型（Random Position/Walk/Direction）:<br><br>1 - Same && Random Position<br>2 - Same && Random Walk<br>3 - Same && Random Direction<br>4 - Different && Random Position<br>5 - Different && Random Walk<br>6 - Different && Random Direction<br><br>(详见下面的'RDK参数')<br> |
| aperture_type            | 数值           | 2                    | 图的形状<br><br>1 - 圆形<br>2 - 椭圆<br>3 - 正方形<br>4 - 矩形<br> |
| reinsert_type            | 数值           | 2                    | 移动出范围的点重新回到图中时出现的位置<br><br>1 - 随机出现在图中任意位置<br>2 - 出现在图的另一边。对于正方形和矩形，会出现在对边的一个随机点上；对于圆形和椭圆，会出现在和移出位置关于中心对称的点。<br> |
| aperture_center_x        | 数值           | window.innerWidth/2  | 图中心的横坐标<br>                                           |
| aperture_center_y        | 数值           | window.innerHeight/2 | 图中心的纵坐标<br/>                                          |
| fixation_cross           | 布尔           | false                | 屏幕中心是否呈现十字注视点。                                 |
| fixation_cross_width     | 数值           | 20                   | 十字注视点宽度的像素值。<br>                                 |
| fixation_cross_height    | 数值           | 20                   | 十字注视点高度的像素值。<br/>                                |
| fixation_cross_color     | 字符串         | "black"              | 注视点的颜色。                                               |
| fixation_cross_thickness | 数值           | 1                    | 注视点粗细的像素值。                                         |
| border                   | 布尔           | false                | 图是否有边框。                                               |
| border_thickness         | 数值           | 1                    | 图边框的像素值。                                             |
| border_color             | 字符串         | "black"              | 图边框的颜色。<br>                                 |

<video src="../img/rdk-set.mp4" controls width="100%" id="rdk-set-demo"></video>

### RDK类型参数

** 关于这些信号选择规则和造成类型，详见Scase, Braddick, and Raymond (1996)中的图1。

#### 信号选择规则:
-**Same**: 所有的点要么是一致点（信号），要么是不一致点（噪声），且在所有帧中都保持如此。一致点在所有帧中都会沿主运动方向运动。<br>-**Different**: 所有的点要么是一致点（信号），要么是不一致点（噪声），且在每一帧中都会被重新随机设定（根据`coherence`所指定的权重）。只有一致点在当前帧中会沿主运动方向运动。下一帧中，会对该点是一致的还是不一致的重新进行随机设定。

#### 噪声类型:
-**Random position**: 不一致点在每一帧中出现在随机位置。<br/>
-**Random walk**: 不一致点在每一帧中向随机方向移动（每一帧都会改变方向）。<br/>
-**Random direction**: 不一致点都有自己的方向（在试次开始时随机设定），在每帧中都朝着该方向移动。<br/>


## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称             | 类型   | 值                                                           |
| ---------------- | ------ | ------------------------------------------------------------ |
| rt               | 数值   | 反应时（单位：毫秒）。                                       |
| response         | 字符串 | 被试按的键。                                                 |
| correct          | 布尔   | 被试按键是否和`correct_choice`中指定的一致。                 |
| frame_rate       | 数值   | 试次的平均帧率，为0这说明在第二帧开始前就做了反应。          |
| number_of_frames | 数值   | 试次中呈现的帧数。                                           |
| frame_rate_array | 数组   | 试次中记录了每一帧持续毫秒数的数组。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| canvas_width     | 数值   | canvas元素宽度的像素值。                                     |
| canvas_height    | 数值   | canvas元素高度的像素值。                                     |

## 示例

#### 将correct_choice参数和coherent_direction参数联系起来

```javascript
var trial_right = {
	coherent_direction: 0,
	correct_choice: "p"
};

var trial_left = {
	coherent_direction: 180,
	correct_choice: "q"
};
```

#### 呈现一个有两个备选项的试次，其中一个备选项为正确选项

```javascript
var test_block = {
	type: "rdk", 
	post_trial_gap: 0,
	number_of_dots: 200,
	RDK_type: 3,
	choices: ["a", "l"],
	correct_choice: "a",
	coherent_direction: 180,
	trial_duration: 1000
};
```

#### 呈现一个有多张图的试次

```javascript
var test_block = {
    type: "rdk", 
    number_of_apertures: 3, //This needs to be set if more than one aperture
    trial_duration: 10000,
    RDK_type: 3, //Applied to all apertures if only one value
    aperture_width: 200, //Applied to all apertures if only one value
    number_of_dots: [50, 200, 100], //Different parameter for each aperture. 数组 length must equal number_of_apertures
    aperture_center_x: [(window.innerWidth/2)-300,window.innerWidth/2,(window.innerWidth/2)+300] //Separate the apertures on the screen (window.innerWidth/2 is the middle of the screen)
};
```

