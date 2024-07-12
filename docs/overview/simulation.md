# 模拟模式
*7.1版本新增*

模拟模式可以很方便地自动运行实验并生成数据。

!!! info "补充"
    关于我们为什么要引入模拟模式以及其使用场景，见[de Leeuw, J.R., Gilbert, R.A., Petrov, N.B., & Luchterhandt, B. (2022). Simulation behavior to help researchers build experiments. *Behavior Research Methods*, https://doi.org/10.3758/s13428-022-01899-0](https://doi.org/10.3758/s13428-022-01899-0)。

    pre-print版本[可以通过PsyArXiv访问](https://psyarxiv.com/mq345).

## 开始

如果要使用模拟模式，需要将`jsPsych.run()`替换为`jsPsych.simulate()`。

```js
jsPsych.simulate(timeline);
```

此时，jsPsych会使用默认的`data-only`模拟模式。如果要使用`visual`模拟模式，则还需要再指定一个参数。

```js
jsPsych.simulate(timeline, "data-only");
jsPsych.simulate(timeline, "visual");
```

## 模拟模式都做了什么

模拟模式中，插件会调用其`simulate()`方法而非`trial()`方法。如果插件没有`simulate()`方法，则试次会使用`trial()`方法，此时如果试次需要用户交互，则需要我们手动去进行这些交互。如果插件不支持`visual`模式，则模拟时只能使用`data-only`模式。

### `data-only`模式

该模式下，插件会根据设定的参数生成数据。例如，如果将`trial_duration`参数设置为2000 ms，则生成的反应时不会大于这个值。一般来说，插件默认生成的数据会从可选的值中随机进行挑选 (例如，可点击的按钮)。生成的反应时数据符合指数修正的高斯分布，通过`jsPsych.randomization.sampleExGaussian()`生成。

在`data-only`模式中，通常不会运行插件的`trial()`方法，而是根据试次的参数简单地生成数据，并随后调用`finishTrial()`方法。

### `visual`模式

`visual`模式中，插件会先生成数据，然后根据数据“还原”被试的操作。模拟中会调用插件的`trial()`方法，我们可以实时看到实验的运行过程。模拟的行为中包括鼠标点击、键盘按键和触屏。

`visual`模式中，插件会和`data-only`模式一样生成数据，不过在该模式下，这一部分数据会被用来还原被试的行为，同时最终记录的数据是由插件的`trial()`方法生成的。例如，如果模拟生成的反应时是500 ms，则在`data-only`模式中，`data.rt`值会正好等于`500`，但在`visual`模式中可能是`501`或者是更大的值。这是因为模拟的被试反应会在`500`ms的时候触发，而JavaScript的循环语句可能会造成一定的延迟。

## 使用`simulation_options`调整模拟模式

我们可以在`jsPsych.simulate()`中或单个试次中通过`simulation_options`设置模拟模式的一些参数。

### 在试次中设置

可以通过设置`simulation_options`参数控制如何模拟当前试次。

```js
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>Hello!</p>',
  simulation_options: {
    data: {
      rt: 500
    }
  }
}
```

可选参数包括`data`、`mode`和`simulate`。

#### `data`

设置的`data`的值会用来替代插件默认生成的数据值。我们可以在`data`参数中设置一部分或者所有的数据。没有设置的那些数据会由插件自己生成。

多数情况下，插件会尽量确保生成的数据符合当前试次中的参数。例如，如果试次的`trial_duration`参数为`2000`，但`simulation_options`中却将`rt`设置为`2500`，这就会导致试次在做反应前就已经结束了。一般来说，插件会在`2500`的时候模拟被试反应，这样实际记录的数据中会显示被试没有做反应。可以预见的是，我们经常会遇到这种生成的数据和试次参数不符的情况。所以，最好对模拟的结果进行检查，如果发现生成的数据不对，请[告知我们](https://github.com/jspsych/jspsych/issues)。

#### `mode`

在试次中设置这个参数会覆盖掉`jsPsych.simulate()`中设置的`mode`参数。如果设置`mode: 'data-only'`，则会使用`data-only`模式；如果设置`mode: 'visual'`，则会使用`visual`模式。

#### `simulate`

如果不想在当前试次中使用模拟模式，可以设置`simulate: false`。

#### 函数和时间线变量

`simulation_options`参数也可以使用[动态参数](./dynamic-parameters.md)和[时间线变量](./timeline.md#_5)。如果需要对每次模拟中生成的数据进行随机，就可以使用动态参数。例如，我们可以让`rt`符合指数高斯分布。

```js
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>Hello!</p>',
  simulation_options: {
    data: {
      rt: ()=>{
        return jsPsych.randomization.sampleExGaussian(500, 50, 1/100, true)
      }
    }
  }
}
```

### 全局配置

我们也可以在`jsPsych.simulate()`中设置`simulation_options`。

```js
const simulation_options = {
  default: {
    data: {
      rt: 200
    }
  }
}

jsPsych.simulate(timeline, "visual", simulation_options)
```

上面的示例中，会将没有设置`simulation_options`的试次的`rt`都设定为`200`。这在有些时候非常有用，比如说可以快速检查一下实验内容的呈现是否正确。

如果预先设置好了一套参数，也可以直接在试次中使用这套参数的属性名。

```js
const simulation_options = {
  default: {
    data: {
      rt: 200
    }
  },
  long_response: {
    data: {
      rt: () => {
        return jsPsych.randomization.sampleExGaussian(5000, 500, 1/500, true)
      }
    }
  }
}

const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>This is gonna take a bit.</p>',
  simulation_options: 'long_response'
}
timeline.push(trial);

jsPsych.simulate(timeline, "visual", simulation_options)
```

上面的示例中，`trial`中的`simulation_options`的值是一个字符串 (`'long_response'`)。此时，jsPsych会在全局的`simulation_options`中查找相应的配置项。

在以下情况中可以用到这种方法：

1. 为有着相似行为的试次添加同样的配置，而不必给每个试次都单独写一次
2. 当我们需要在不同模拟选项间进行替换的时候可以选择这种方法。例如，如果需要测试一条添加了`conditional_function`的时间线的运行是否正常，就需要两套配置，一套让`conditional_function`返回`true`，一套返回`false`。如果我们使用了上述的方法，就不需要修改时间线的代码，只修改传入`jsPsych.simulate()`中的代码就可以了。
3. 在极端情况下，时间线上的每个试次都使用了不同的配置名称，此时我们就可以预先准备好多套配置以方便地控制输出的数据。

## 局限

不同于jsPsych的其他特性，模拟模式还没有经过十分全面的测试。虽然我们相信这一模拟功能对于大多数情况都是适用的，但也不排除有一些情况下模拟的行为和实验中实际发生的并不相同。如果你遇到了这种情况，请[告知我们](https://github.com/jspsych/jspsych/issues)!

现阶段，模拟模式不支持扩展和部分插件。不支持的插件在它们自己的文档页中都由标注。
