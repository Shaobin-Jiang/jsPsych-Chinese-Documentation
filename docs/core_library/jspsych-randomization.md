# jsPsych.randomization

jsPsych.randomization模块包含了对试次变量进行随机的函数。

---

## jsPsych.randomization.factorial

```javascript
jsPsych.randomization.factorial(factors, repetitions, unpack)
```

### 参数

| 参数        | 类型 | 描述                                                         |
| ----------- | ---- | ------------------------------------------------------------ |
| factors     | 对象 | 对于每一个因素，当前对象中都包含一个相对应的属性，属性值为一个数组，数组中每一个元素对应当前因素的一个水平。 |
| repetitions | 整数 | 每个处理重复的次数。                                         |
| unpack      | 布尔 | 如果为true，则输出一个对象（详见下面第三个示例）。如果为false，则返回值为对象数组，每个对象对应一个处理。 |

### 返回值

返回值取决于`unpack`参数。详见上面的说明和下面的示例。

### 描述

该方法根据给出的因素及水平组合出所有处理，并将组合结果随机后返回。

### 示例

#### 完整的因素设计

```javascript
var factors = {
	stimulus: ['a.jpg', 'b.jpg'],
	ms_delay: [100, 200]
}

var full_design = jsPsych.randomization.factorial(factors, 1);

/*
output:
full_design = [
	{stimulus: 'a.jpg', ms_delay: 200},
	{stimulus: 'b.jpg', ms_delay: 200},
	{stimulus: 'b.jpg', ms_delay: 100},
	{stimulus: 'a.jpg', ms_delay: 100},
]
*/
```

#### 完整的因素设计并进行重复

```javascript
var factors = {
	stimulus: ['a.jpg', 'b.jpg'],
	ms_delay: [100, 200]
}

var full_design = jsPsych.randomization.factorial(factors, 2);

/*
output:
full_design = [
	{stimulus: 'b.jpg', ms_delay: 200},
	{stimulus: 'b.jpg', ms_delay: 100},
	{stimulus: 'b.jpg', ms_delay: 100},
	{stimulus: 'a.jpg', ms_delay: 100},
	{stimulus: 'a.jpg', ms_delay: 200},
	{stimulus: 'b.jpg', ms_delay: 200},
	{stimulus: 'a.jpg', ms_delay: 100},
	{stimulus: 'a.jpg', ms_delay: 200},
]
*/
```

#### 完整的因素设计，unpack参数为true

```javascript
var factors = {
	stimulus: ['a.jpg', 'b.jpg'],
	ms_delay: [100, 200]
}

var full_design = jsPsych.randomization.factorial(factors, 1, true);

/*
output:
full_design = {
	stimulus: ['a.jpg','b.jpg','b.jpg','a.jpg'],
	ms_delay: [200, 100, 200, 100]
]
*/
```

---

## jsPsych.randomization.randomID

```javascript
jsPsych.randomization.randomID(length)
```

### 参数

| 参数   | 类型 | 描述                 |
| ------ | ---- | -------------------- |
| length | 整数 | 随机生成的ID的长度。 |

### 返回值

返回一个长度为`length`的字符串，其中每一个字符从0 - 9和小写字母a - z中随机选出。

### 描述

生成随机字符串。如果不指定length，则默认长度为32。

### 示例

```javascript
console.log(jsPsych.randomization.randomID());
// outputs: "t7dwz0e713pc8juuaayyfvpkdd9un239"

console.log(jsPsych.randomization.randomID(8));
// outputs: "3xtpcbck"
```

---

## jsPsych.randomization.repeat

```javascript
jsPsych.randomization.repeat(array, repetitions, unpack)
```

### 参数

| 参数        | 类型       | 描述                                                         |
| ----------- | ---------- | ------------------------------------------------------------ |
| array       | 数组       | 随机、重复的数组。                                           |
| repetitions | 整数或数组 | 数组中每个元素重复的次数。如果当前参数值为整数，则`array`中每个元素重复册数相同。当前参数值也可以是和`array`长度相等的数组，此时`array`中的数组会重复`repetitions`相应位置指定的次数。 |
| unpack      | 布尔       | 如果`array`的元素都是对象且这些对象包含了相同的属性名，则将`unpack`设置为true时，返回值是一个对象（详见下面第4个示例）。如果为false，则会返回数组，数组元素为属于`array`的对象。 |

### 返回值

返回值取决于`unpack`参数。详见上面的描述和下面的示例。

### 描述

当前方法对数组随机排列，或在对各个元素分别进行一定次数的重复后再随机排列。

如果数组元素是对象且这些对象具有相同属性，则该方法可以返回一个对象（详见下面的第4个示例）。我们可以在对jsPsych中的一个block进行随机时使用这个功能。

### 示例

#### 对数组随机排列

```javascript
var myArray = [1,2,3,4,5];
var shuffledArray = jsPsych.randomization.repeat(myArray, 1);
// output: shuffledArray = [3,2,4,1,5]
```

#### 对数组重复后进行随机排列

```javascript
var myArray = [1,2,3,4,5];
var shuffledArray = jsPsych.randomization.repeat(myArray, 2);
// output: shuffledArray = [1,3,4,2,2,4,5,1,5,3]
```

#### 随机排列对象数组

```javascript
var trial1 = {
	stimulus: 'img/faceA.jpg',
	correct_key: 'p',
	person_name: 'Joe'
}

var trial2 = {
	stimulus: 'img/faceB.jpg',
	correct_key: 'p',
	person_name: 'Fred'
}

var trial3 = {
	stimulus: 'img/faceC.jpg',
	correct_key: 'q',
	person_name: 'Mary'
}

var myArray = [ trial1, trial2, trial3 ];
var shuffledArray = jsPsych.randomization.repeat(myArray, 2);

// output: shuffledArray = [ trial1, trial3, trial3, trial2, trial1, trial2 ]
```

#### 随机排列对象数组，unpack为true

```javascript
var trial1 = {
	stimulus: 'img/faceA.jpg',
	correct_key: 'p',
	person_name: 'Joe'
}

var trial2 = {
	stimulus: 'img/faceB.jpg',
	correct_key: 'p',
	person_name: 'Fred'
}

var trial3 = {
	stimulus: 'img/faceC.jpg',
	correct_key: 'q',
	person_name: 'Mary'
}

var myArray = [ trial1, trial2, trial3 ];
var shuffledArray = jsPsych.randomization.repeat(myArray, 2, true);

/*
output: shuffledArray = {
	stimulus: ['img/faceB.jpg','img/faceA.jpg','img/faceC.jpg','img/faceA.jpg','img/faceC.jpg','img/faceB.jpg'],
	correct_key: ['p', 'p', 'q', 'p', 'q', 'p'],
	person_name: ['Fred', 'Joe', 'Mary', 'Joe', 'Mary', 'Fred']
}
*/
```

---

## jsPsych.randomization.sampleWithReplacement

```javascript
jsPsych.randomization.sampleWithReplacement(array, sampleSize, weights)
```

### 参数

| 参数       | 类型 | 描述                                                         |
| ---------- | ---- | ------------------------------------------------------------ |
| array      | 数组 | 取样的数组。                                                 |
| sampleSize | 数值 | 取样个数。                                                   |
| weights    | 数组 | `array`中每个元素的权重。jsPsych会对这个数组标准化，所以我们不需要所有权重加起来和为1.当前数组长度需要等于`array`的长度。 |

### 返回值

包含抽取的样本的数组。

### 描述

从一些给定值中随机抽取，可以重复抽取。我们可以通过`weights`指定总体中各元素的权重。

### 示例

#### 抽中概率相等

```javascript
var myArray = [1,2,3,4,5];
var sample = jsPsych.randomization.sampleWithReplacement(myArray, 10);
// output: sample = [3, 1, 2, 2, 5, 1, 4, 3, 1, 5];
```

#### 抽中概率不等

```javascript
var myArray = [1,2,3,4,5];
var sample = jsPsych.randomization.sampleWithReplacement(myArray, 10, [6,1,1,1,1]);
// output: sample = [3, 4, 5, 1, 2, 1, 3, 1, 1, 1];
```

---

## jsPsych.randomization.sampleWithoutReplacement

```javascript
jsPsych.randomization.sampleWithoutReplacement(array, sampleSize)
```

### 参数

| 参数       | 类型 | 描述         |
| ---------- | ---- | ------------ |
| array      | 数组 | 取样的数组。 |
| sampleSize | 数值 | 取样个数。   |

### 返回值

包含抽取的样本的数组。

### 描述

从一些给定值中随机抽取，不可以重复抽取。样本量不能超过总体的长度。

### 示例

#### 无重复抽取的取样

```javascript
var myArray = [1,2,3,4,5];
var sample = jsPsych.randomization.sampleWithoutReplacement(myArray, 2);
// output: sample = [3,2];
```

---

## jsPsych.randomization.shuffle

```javascript
jsPsych.randomization.shuffle(array)
```

### 参数

| 参数  | 类型 | 描述                 |
| ----- | ---- | -------------------- |
| array | 数组 | 用于随机排列的数组。 |

### 返回值

返回随机排列后的数组。

### 描述

对数组进行随机排列。

### 示例

#### 对数组进行随机排列

```javascript
var myArray = [1,2,3,4,5];
var shuffledArray = jsPsych.randomization.shuffle(myArray);
// output: shuffledArray = [3,2,4,1,5]
```

---

## jsPsych.randomization.shuffleNoRepeats

```javascript
jsPsych.randomization.shuffleNoRepeats(array, equalityTest)
```

### 参数

| 参数         | 类型 | 描述                                                         |
| ------------ | ---- | ------------------------------------------------------------ |
| array        | 数组 | 用于随机排列的数组。                                         |
| equalityTest | 函数 | 该函数用于比较数组中相邻元素是否相等。该函数有两个传入参数，分别是需要比较的两个元素。如果这两个元素相等，则函数返回true，否则返回false。默认的函数中使用`===`运算符，该运算符只对简单值有效，对于对象和数组无效。详见下面的示例。 |

### 返回值

随机排列后的数组，且随机后的数组中相邻元素不相等。

### 描述

对数组随机排列，且随机后的数组中相邻元素不相等。

*警告：如果用于随机排列的数组的有效排列方式太少或没有，则当前方法会失效，程序会直接卡死。*

### 示例

#### 基本示例

```javascript
var myArray = [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5];
var shuffledArray = jsPsych.randomization.shuffleNoRepeats(myArray);
// output: shuffledArray = [2, 3, 5, 1, 2, 4, 1, 5, 4, 1, 3, 5, 4, 3, 2]
```

#### 自定义equalityTest

```javascript
var myObjects = [
  {color:"blue"},
	{color:"red"},
	{color:"yellow"},
	{color:"orange"}
];

var repeatedSet = jsPsych.randomization.repeat(myObjects,3);
var shuffled = jsPsych.randomization.shuffleNoRepeats(repeatedSet, function(a,b) { return a.color === b.color });

// console.log(JSON.stringify(shuffled))
// "[{"color":"red"},{"color":"yellow"},{"color":"blue"},{"color":"yellow"},{"color":"orange"},{"color":"red"},{"color":"yellow"},{"color":"orange"},{"color":"blue"},{"color":"orange"},{"color":"red"},{"color":"blue"}]"
```
