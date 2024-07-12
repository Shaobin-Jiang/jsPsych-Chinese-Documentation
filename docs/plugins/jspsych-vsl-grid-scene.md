# jspsych-vsl-grid-scene plugin

这个插件（VSL，visual statistical learning）的作用是呈现组织在网格中的图片。可以用当前插件复现下面文献中的实验：

Fiser, J., & Aslin, R. N. (2001). Unsupervised statistical learning of higher-order spatial structures from visual scenes. *Psychological Science, 12*(6), 499-504.

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数           | 类型 | 默认值       | 描述                                                         |
| -------------- | ---- | ------------ | ------------------------------------------------------------ |
| stimuli        | 数组 | *undefined*  | 该数组定义了一套网格。当前参数应该为一个二维数组，按照`[行][列]`的顺序。如果需要呈现图片，则该位置赋值为图片的路径；如果需要留空，则赋值为0.详见下面的示例。 |
| image_size     | 数组 | `[100, 100]` | 该数组指定了所呈现图片的宽度和高度。网格中每一个单元大小和该数组定义的相等，同时留有10%的内边距。 |
| trial_duration | 数值 | 2000         | 刺激呈现的毫秒数。                                           |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型 | 值                                                           |
| -------- | ---- | ------------------------------------------------------------ |
| stimulus | 数组 | 一个二维数组，对应着试次中呈现的刺激。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |

### 创建刺激的方法

当前插件还内置了一个创建刺激的公有方法。你可以使用该方法创建HTML字符串以生成刺激，还可以将该刺激嵌入到其他插件中。如果要使用这个方法，你需要在页面中引入该插件，并像下面这样调用该方法：

```javascript

var pattern = [
  ["img/1.gif", "img/2.gif", 0],
  [ 0, "img/3.gif", 0],
  ["img/5.gif", "img/4.gif", 0]
];

var image_size = 100; // pixels

var grid_stimulus = jsPsych.plugins['vsl-grid-scene'].generate_stimulus(pattern, image_size);

// grid_stimulus will now contain a string (NOT an HTML DOM object) that you can
// pass into other plugins that accept HTML stimuli as input, such as jspsych-html-keyboard-response.

```

## 示例

#### 基本示例

```javascript
var scene = [
  ["img/1.gif", "img/2.gif", 0],
  [ 0, "img/3.gif", 0],
  ["img/5.gif", "img/4.gif", 0]
]

var trial = {
    type: 'vsl-grid-scene',
    stimuli: scene
};

```
