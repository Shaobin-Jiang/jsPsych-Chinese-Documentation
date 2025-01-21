# 开发扩展

## 扩展的要求

在7.0版本中，扩展通过[JavaScript类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)实现。扩展中需要实现：

* [`constructor()`](#constructor)：接收jsPsych实例。
* [`initialize()` function](#initialize)：处理扩展的初始化事件。
* [`on_start()` function](#on_start)：处理扩展的on_start事件。
* [`on_load()` function](#on_load)：处理扩展的on_load事件。
* [`on_finish()` function](#on_finish)：处理扩展的on_finish事件，并保存扩展收集的数据
* [静态的`info`](#static-info)属性：扩展的名称。

### 模板

可以使用JavaScript或TypeScript编写扩展。[JavaScript](https://github.com/jspsych/jspsych-contrib/blob/main/packages/extension-template/index.js)和[TypeScript](https://github.com/jspsych/jspsych-contrib/blob/main/packages/extension-template-ts/src/index.ts)的模板文件可以在[jspsych-contrib仓库](https://github.com/jspsych/jspsych-contrib/)中找到。

## 扩展的构成

### constructor()

扩展的`constructor()`会接收一个`JsPsych`的实例，constructor函数需要将其保存下来用于访问。

```js
class MyAwesomeExtension {
  constructor(jsPsych){
    this.jsPsych = jsPsych;
  }
}
```

### initialize()

`initialize()`函数在初始化jsPsych实例的时候调用 (通过`initJsPsych()`或`new JsPsych()`)。初始化扩展的代码应该下载这个函数里。不同于其他事件每个试次都会触发，每个实验只会初始化一次。`params`对象中包含了配置扩展所需要的参数，它会在调用传递给`initialize()`方法，此时`initialize()`需要返回一个`Promise`对象，在扩展完成初始化后执行。

```js
//... experiment code ...//
let jsPsych = initJsPsych({
  extensions: [
    {type: myAwesomeExtension, params: {demo: 'value'}}
  ]
});

//... extension code ...//
class MyAwesomeExtension {

  initialize(params){
    return new Promise((resolve, reject)=>{
      console.log(params.demo); // will output 'value'

      resolve(); // finish initialzing
    })
  }
}
```

### on_start()

`on_start()`在插件开始执行时先于`plugin.trial`调用。和试次相关的初始化代码应该写在这里，例如创建用于存储数据的对象、重置内部状态等。`params`对象通过扩展的声明传入试次对象，我们可以使用该对象自定义扩展在各个试次中的行为。

```js
//... experiment code ...//
let trial = {
  type: htmlKeyboardResponse,
  stimulus: "You're awesome!",
  extensions: [
    {type: myAwesomeExtension, params: {demo: 'value'}}
  ]
};

//... extension code ...//
class MyAwesomeExtension {

  initialize(params){ ... }

  on_start(params){
    console.log(params.demo); // outputs 'value' before the trial begins.
  }
}
```


### on_load()

`on_load()`在插件的`on_load()`完成后调用，通常是在插件完成对DOM元素的修改以及创建事件的监听器之后。和DOM交互、存储数据的代码应该写在这里。`params`对象通过扩展的声明传入试次对象，我们可以使用该对象自定义扩展在各个试次中的行为。

```js
//... experiment code ...//
let trial = {
  type: htmlKeyboardResponse,
  stimulus: "You're awesome!",
  extensions: [
    {type: myAwesomeExtension, params: {demo: 'value'}}
  ]
};

//... extension code ...//
class MyAwesomeExtension {

  initialize(params){ ... }

  on_start(params){ ... }

  on_load(params){
    // replaces the contents of the display with 'value';
    this.jsPsych.getDisplayElement().innerHTML = params.demo;
  }
}
```

### on_finish()

`on_finish()`在插件调用`jsPsych.finishTrial()`后调用。该方法应该返回一个数据对象，用于添加到插件的数据对象。请注意，这个事件在插件的`on_finish` *之前* 触发，所以其数据可以在试次的`on_finish`中使用。`params`对象通过扩展的声明传入试次对象，我们可以使用该对象自定义扩展在各个试次中的行为。

```js
//... experiment code ...//
let trial = {
  type: htmlKeyboardResponse,
  stimulus: "You're awesome!",
  extensions: [
    {type: myAwesomeExtension, params: {demo: 'value'}}
  ],
  on_finish: (data) => {
    console.log(data.awesome); // will output 'value'.
  }
};

//... extension code ...//
class MyAwesomeExtension {

  initialize(params){ ... }

  on_start(params){ ... }

  on_load(params){ ... }

  on_finish(params){
    return {
      awesome: params.value
    }
  }
}
```

### static .info

`info`属性是一个对象，必须有`name`属性作为扩展的唯一名称、标记了版本的`version`属性以及包含了扩展生成的数据相关信息的`data`属性。

```js
import { version } from '../package.json';

class MyAwesomeExtension {

}

MyAwesomeExtension.info = {
  name: 'awesome',
  version: version, // Should be hardcoded as `version: "1.0.1"` if not using build tools.
  data: {
    /** This will be scraped as metadata describing tracking_data and used to create the JsPsych docs */
    tracking_data: {
      type: ParameterType.STRING,
    }
  }
}
```

`version`属性标记了扩展的版本，且会被保存在数据中。其作用是产生相应的元数据且有助于维Psych-DS标准。它应该从package.json文件引入，做法是在index.ts文件顶部添加import语句。这样，`version`会在changeset中自动更新。如果你没有使用构建环境，而是直接编写JS文件，则可以手动写`version`。

`data`属性是一个包含了插件产生的数据的对象。每一个数据对象都包含`type`和`default`属性。额外说一句，这个属性只应该用于你希望产生的数据。如果你选择生成元数据，jsdoc（/** */内的注释）都会作为元数据用来生成JsPsych文档。

更多关于`data`中可以包含的参数类型的相关信息详见[`ParameterType`文档](./plugin-development.md#parameter-types)。

### 可选方法

扩展还可以额外加入一些方法。参见[WebGazer扩展](../extensions/webgazer.md)。

## 关于编写扩展的建议

如果你希望将开发的扩展加入到jsPsych的主仓库中，请参照[贡献代码指南](contributing.md#_2)。

总的来说，扩展应该适配所有插件，对于DOM中除了实验元素之外还包括了什么不应该有太多限制。如果你开发的扩展只针对少数几个插件，可以考虑修改插件代码。
