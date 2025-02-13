# jsPsych.utils

jsPsych.utils 模块包含了在部分场景下可能需要使用到的一些函数。

---

## jsPsych.utils.unique

```javascript
jsPsych.utils.unique(array)
```

### 参数

| 参数 | 类型  | 描述                    |
| --------- | ----- | ------------------------------ |
| array     | 数组 | 任意元素组成的数组 |

### 返回值

由输入数组元素组成但没有重复元素的数组。

### 描述

当前函数传入一个数组，返回由该数组元素组成但没有重复元素的新数组。

### 示例

```javascript
jsPsych.utils.unique(["a", "b", "b", 1, 1, 2]) // returns ["a", "b", 1, 2]
```

---

<h2 id="jspsychutilsdeepcopy">jsPsych.utils.deepCopy</h2>

```javascript
jsPsych.utils.deepCopy(object);
```

### 参数

| 参数 | 类型            | 描述                  |
| --------- | --------------- | ---------------------------- |
| object    | 对象或数组 | 任意的对象或数组 |

### 返回值

传入对象或数组的深拷贝。

### 描述

当前函数传入一个对象或数组并返回其深拷贝，其内部的子对象、子数组也被递归进行深拷贝。

### 示例

```javascript
var myObject = { nested: ["array", "of", "elements"] };
var deepCopy = jsPsych.utils.deepCopy(myObject);
deepCopy.nested[2] = "thingies";
console.log(myObject.nested[2]) // still logs "elements"
```

---

## jsPsych.utils.deepMerge

```javascript
jsPsych.utils.deepMerge(object1, object2);
```

### 参数

| 参数 | 类型   | 描述     |
| --------- | ------ | --------------- |
| object1   | 对象 | 需要合并的对象 |
| object2   | 对象 | 需要合并的对象 |

### 返回值

`object1` 的深拷贝，同时填充了 `object2` 的元素。

### 描述

当前函数传入两个对象，并将其合并成一个新的对象。如果两个对象中某个值存在冲突，则使用 `object2` 中的值。

### 示例

```javascript
var object1 = { a: 1, b: { c: 1, d: 2 } };
var object2 = { b: { c: 2 }, e: 3 };
jsPsych.utils.deepMerge(object1, object2); // returns { a: 1, b: { c: 2, d: 2 }, e: 3 }
```
