# 使用jsPsych进行调查研究

## 使用相应的插件

jsPsych提供了多种插件供我们进行调查研究。具体该选择哪一种插件取决于你的研究目的，以及你在开发过程中是想要图方便、只调整几个参数就实现相应的需求，还是想要更灵活地控制呈现效果。

* Survey-*插件: [`survey-likert`](../plugins/survey-likert.md), [`survey-multi-choice`](../plugins/survey-multi-choice.md), [`survey-multi-select`](../plugins/survey-multi-select.md), [`survey-text`](../plugins/survey-text.md)
    * 只有一种题型，每一页对应一个试次
    * 设置几个参数就可以轻松定义题目
    * 完美兼容[时间线变量](./timeline.md#_5)
    * 适合重复性强的试次
    * 功能和自定义能力受限
* [`survey-html-form`](../plugins/survey-html-form.md)插件
    * 一页上可以呈现多种题目类型
    * 不通过各种参数编写题目，因为整个表单的HTML都由你编写
    * 极其灵活，如果你想要最大程度掌控调查问卷的内容和样式的话，这个是最合适的选择
* [`survey`](../plugins/survey.md)插件
    * 不能很好地兼容[时间线变量](./timeline.md#_5)
    * 内置了大量题型，可以通过参数方便地自定义
    * 一页上可以呈现多种题目类型
    * 运行被试前后切换页面且不会丢失作答数据
    * 虽然同样使用参数编写问题，但相较于`survey-*`插件需要更多配置/代码
    * 内置参数功能丰富（例如，作答校验、满足特定条件才呈现问题、其他/无/全选等选项）

[`survey` plugin](../plugins/survey.md)与多数jsPsych插件不同之处在于它基于另一个外部的JavaScript库：SurveyJS。这样，我们就可以用到SurveyJS提供的所有特性、文档、示例代码，但是这也意味着`survey`插件不能完全和其他插件按照同样的方式使用。在使用这个插件的时候，我们还需要对SurveyJS库有一定了解。这一页上剩余部分的文档会简单介绍SurveyJS以及jsPsych的`survey`插件。

## 初识SurveyJS

[SurveyJS](https://surveyjs.io/form-library/documentation/overview)是一个十分强大的用于构建调查问卷的框架，自带了丰富的文档、示例代码和实机演示。这里，我们的重点是让jsPsych用户了解这一框架的基本使用，并着重介绍几个用途最广的特性。当然，我们显然不可能把整份SurveyJS的文档都放到这里，所以我们鼓励你也去看看他们那边的文档和示例。

SurveyJS允许我们通过JSON对象、JavaScript函数或者是二者的组合构建调查问卷。你可以在下述两篇SurveyJS的文档中了解一下：

- [使用JSON创建问卷](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#define-a-static-survey-model-in-json)
- [使用JavaScript创建问卷](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#create-or-change-a-survey-model-dynamically)

jsPsych的`survey`插件使用`survey_json`和`survey_function`参数编写调查问卷，二者分别对应SurveyJS中使用JSON和JavaScript方法。本篇接下来的两个小节会分别介绍两种方法：[使用JSON构建问卷](#json) and [使用JavaScript创建或修改问卷](#javascript)。

如果要更深入了解SurveyJS，可以参照以下内容：

- [构建多页的调查问卷](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#add-multiple-pages-to-a-survey)
- [根据条件设置页面是否可见](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#configure-page-visibility)
- [页面浏览相关的UI](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#page-navigation-ui) (后退、前进、提交按钮)
- [设置条件逻辑和动态文本](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic)
- [设置默认值](https://surveyjs.io/form-library/documentation/design-survey/pre-populate-form-fields#default-question-values)

SurveyJS还提供了一些特性，可以用在特定研究领域，例如：

- [自动为题目标号](https://surveyjs.io/form-library/examples/how-to-number-pages-and-questions/jquery) (整个研究、某一页上、使用特殊值和文本，等等)
- [作答校验](https://surveyjs.io/form-library/examples/javascript-form-validation/jquery)
- [目录、浏览不同小节](https://surveyjs.io/form-library/examples/table-of-contents/jquery)
- [进度条](https://surveyjs.io/form-library/examples/configure-form-navigation-with-progress-indicators/jquery)
- [使用前面的选择题的作答](https://surveyjs.io/form-library/examples/carry-forward-responses/jquery)
- [使用前面的矩阵题型的作答](https://surveyjs.io/form-library/examples/pipe-answers-from-dynamic-matrix-or-panel/jquery)
- [Conditional visibility for elements/questions](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-visibility) (另见[此示例](https://surveyjs.io/form-library/examples/implement-conditional-logic-to-change-question-visibility/jquery))
- 单选题特殊选项：[无](https://surveyjs.io/form-library/documentation/api-reference/radio-button-question-model#showNoneItem), [其他](https://surveyjs.io/form-library/documentation/api-reference/radio-button-question-model#showOtherItem), [全选](https://surveyjs.io/form-library/documentation/api-reference/checkbox-question-model#showSelectAllItem), [拒绝作答](https://surveyjs.io/form-library/documentation/api-reference/radio-button-question-model#showRefuseItem), 以及[不知道](https://surveyjs.io/form-library/documentation/api-reference/radio-button-question-model#showDontKnowItem)
- [本地化](https://surveyjs.io/form-library/examples/survey-localization/jquery) (根据国家/地区设置语言)
- [文本管道操作](https://surveyjs.io/form-library/examples/text-piping-in-surveys/jquery) (根据前面的作答，动态将作答内容添加到问题文本/回答中)

你可以在[SurveyJS示例页](https://surveyjs.io/form-library/examples/overview)找到各种案例。如果想要查看其他参数，也可以查看[Survey API文档](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model)。

### 使用JSON创建问卷

SurveyJS允许我们通过一个对象定义调查问卷的内容。最简单的情况下，这个对象应该包含`elements`属性，其值是包含当前页面上呈现的元素/题目的数组（至少包含一个项目）。

```javascript
// Survey with a single text entry question.
const survey_json = {
  elements: [{
    name: "example",
    title: "Enter some text in the box below!",
    type: "text"
  }]
};
```

每个元素都有`type`属性，即该元素的类型（见`survey`插件的[问题/元素类型部分](../plugins/survey.md#_2)）。元素对象还应包含相应类型问题所需要的属性，例如`name`（用于在数据中标明该题目）、`title`（呈现给被试的题目内容）、是否必须作答，等等。 The [问题/元素类型部分](../plugins/survey.md#_2)包含SurveyJS文档对应问题类型的链接，你可以在那里查看必选/可选参数。

在像上面的示例那样创建了一个JSON对象后，就可以用于jsPsych的`survey`试次中的`survey_json`参数：

```javascript
const survey_trial = {
  type: jsPsychSurvey,
  survey_json: survey_json
};

timeline.push(survey_trial);
```

完事！上面这段代码编写了一个调查问卷。

!!! note "JSON和JavaScript对象"
    [JSON (JavaScript Object Notation)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)是一种组织数据的文本格式，和JavaScript对象相似但又不尽相同。`survey_json`参数的内容是一个兼容JSON的JavaScript对象而非JSON字符串。这里我们一直使用JSON一词是为了明确该参数中不应该包含函数，同时也是为了和SurveyJS官方文档保持一致。如果想更多了解JSON和JavaScript对象的区别，可以参见[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#javascript_and_json_differences)以及[这里](https://www.w3schools.com/js/js_json_intro.asp).


#### 多页调查

我们可以将`elements`设置为顶层的属性，此时所有元素都会呈现在一页上。如果希望分页呈现，则可以在JSON中添加`pages`属性，该属性是一个对象构成的数组，每个对象对应一个页面，且应包含`elements`数组。

下面的示例中创建了一个两页的调查问卷。每一页上都有一系列元素/题目以及一些可选参数（页面名称和标题）。

```javascript
const survey_json = {
  pages: [
  {
    name: "page_1",
    title: "Your Name",
    elements: [{
      type: "text",
      name: "first_name",
      title: "Enter your first name:"
    }, {
      type: "text",
      name: "last_name",
      title: "Enter your last name:"
    }
  }, {
    name: "page_2",
    title: "Personal Information",
    elements: [{
      type: "text",
      name: "location",
      title: "Where do you live?"
    }, {
      type: "text",
      name: "occupation",
      title: "What is your occupation?"
    }, {
      type: "text",
      name: "age",
      title: "How old are you?",
      inputType: "number",
      min: 0,
      max: 120
    }
  }]
};
```

#### 问卷相关的属性

我们还可以添加一些和问卷整体相关的属性，例如标题（呈现在页面顶部）、是否自动对问题标号、浏览页面的按钮上的内容、标记必答题目的文本等等。这些参数并不是必须指定的，除非说我们不想使用默认值的时候才需要去设置。

```javascript
const survey_json = {
  title: "Survey title",
  showQuestionNumbers: "off",
  completeText: "Done",
  pageNextText: "Next",
  pagePrevText: "Back",
  requiredText: "[REQUIRED]",
  pages: [{
    elements: {
      // ... page 1 questions
    }
  }, {
    elements: {
      // ... page 2 questions
    }
  }]
};
```

一些属性需要在页面水平上进行设置，见[页面API文档](https://surveyjs.io/form-library/documentation/api-reference/page-model)。

更多JSON相关示例详见[SurveyJS JSON文档](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#define-a-static-survey-model-in-json)、`survey`插件文档页的[示例](../plugins/survey.md#examples)部分以及`survey`插件源代码中的[examples文件夹](https://github.com/jspsych/jsPsych/tree/main/packages/plugin-survey)。


### 使用JavaScript创建或修改问卷

SurveyJS允许我们通过JavaScript创建、修改问卷，这一方法可以实现使用JSON创建问卷得到的效果，而且更加灵活。例如，我们可以通过设置特殊的函数，实现根据被试前面的作答修改问卷的内容的功能。我们可以在调查的多个阶段设置需要执行的不同的函数，比如说，在页面改变或者是被试输入的时候执行某段代码。

在jsPsych的`survey`插件中，`survey_function`函数需要有一个传入参数`survey`，该参数是一个SurveyJS模型，我们可以对其进行各种操作。如果`survey_json`参数为空，则`servey_function`的传入参数也为空。此时，我们需要在`survey_function`中添加至少一个包含至少一个元素/题目的页面。

下面这段代码会创建一个和JSON部分第一个例子相同的问卷：

```javascript
const survey_function = (survey) => {
  // add page
  const page = survey.addNewPage("page1");
  // add question
  const text_question = page.addNewQuestion("text", "example");
  text_question.title = "Enter some text in the box below!";
};

const survey_trial = {
  type: jsPsychSurvey,
  survey_function: survey_function
};

timeline.push(survey_trial);
```

### JSON和函数的组合使用

如果我们使用了`survey_json`参数，则`survey_function`会传入一个基于此JSON创建的问卷对象，此时我们可以在函数中访问该JSON中定义的所有元素。

这里有一个比较切合实际的例子。比如说，我们要求被试在实验开始的时候选择一个颜色，然后后面在`survey`试次中用到了选择的颜色。仅使用JSON是不足以实现这一需求的，因为我们事先不知道被试的选择，只有在实验开始后我们才知道。

不过，我们可以用`survey_function`从jsPsych的数据中获取被试选择的颜色并用到我们的问卷中。仅此一部分动态的内容需要用到`survey_function`，其他的部分可以在JSON中定义。

```javascript
// Create an array of color choices
const color_choices = ['red', 'green', 'blue', 'yellow', 'pink', 'orange', 'purple'];

// Create an html-button-response trial where the participant can choose a color
const select_color_trial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<p>Which of these is your favorite color?</p>',
  choices: color_choices,
  button_html: '<button class="jspsych-btn" style="color:%choice%";">%choice%</button>',
  data: {trial_id: 'color_trial'}
};

// Create the survey JSON 
const color_survey_json = {
  elements: [{
    type: "boolean",
    renderAs: "radio",
    name: "color_confirmation",
    title: "" // This value will be set in the survey function
  }]
};

// Create a survey function to access the participant's response 
// from an earlier trial and modify the survey accordingly
const color_survey_function = (survey) => {
  // Get the earlier color selection response (button index) from the jsPsych data
  const color_choice_index = jsPsych.data.get().filter({trial_id: 'color_trial'}).values()[0].response;
  const color_choice = color_choices[color_choice_index];
  // Get the question that we want to modify
  const color_confirmation_question = survey.getQuestionByName('color_confirmation');
  // Change the question title to include the name of the color that was selected
  color_confirmation_question.title = `
    Earlier you chose ${color_choice.toUpperCase()}. Do you still like that color?
  `;
}

// Create the jsPsych survey trial using both the survey JSON and survey function
const color_survey_trial = {
  type: jsPsychSurvey,
  survey_json: color_survey_json,
  survey_function: color_survey_function
};

jsPsych.run([select_color_trial, color_survey_trial]);
```

如果想要更多了解如何使用JavaScript创建/修改问卷，详见[SurveyJS文档](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#create-or-change-a-survey-model-dynamically)。SurveyJS的API包含了所有的问卷、页面、题目相关的属性、方法、事件。

### JSON与函数的取舍

我们可以完全使用JSON构建`survey`试次，也可以完全使用JavaScript函数，也可以二者兼用。很多时候，具体选择哪种方案更多是一个个人偏好的问题，但也有一些情况下，我们必须用`surey_function`：

- 根据被试在前面的试次中作答或者问卷开始前无从获取的信息修改问卷内容
- 问卷配置时使用了自定义的函数。例如，我们希望某个特定事件触发某个事件，如被试作答内容改变或者是完成问卷的时候。`survey_json`中不允许出现函数，这时候我们就需要把它放到`survey_function`中

!!! note "对作答进行验证"
    有一些特殊情况下不需要使用`survey_function`运行自定义函数，那就是对被试作答校验的时候。`survey`插件提供了一个`validation_function`参数，可以使用自定义的代码对被试作答进行校验。当然，你也可以用`survey_function`实现同样的功能，此时你就需要设置该校验函数在问卷的[`onValidateQuestion`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onValidateQuestion)事件触发的时候执行。

### 使用JSON创建动态的内容

虽然`survey_json`中不能出现函数，SurveyJS还是提供了一些特殊的配置项，以方便我们通过JSON为问卷配置一定的动态功能。例如，我们可以通过JSON设置满足条件时呈现/隐藏题目、选项等（见[Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-visibility)以及[Expressions](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#expressions)）。此外，SurveyJS还允许我们将某个特定问题的回答插入到一段文本中（见[动态文本](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#question-values)）。

总的来说，JSON中可以获取当前问卷中的信息并将其用于一些动态的行为。单数，如果我们需要访问这以外的信息，就需要用到`survey_function`参数了。

### 通过代码定义调查试次/题目

有时候我们也需要通过编程创建我们的问卷内容。例如，我们需要在一页上呈现一系列格式相同、仅有部分内容存在差异的问题，此时我们当然可以一个一个在`survey_json`中创建，但这样做的结果就是我们的JSON非常大而且多是重复的内容。

更好的做法是将重复的内容分离出来。这样，我们可以方便地进行修改、避免错误，因为我们只需要对重复的部分编写一次。

下面这一段展示了如何从一个数组生成大体相同、只有部分地方需要修改的多个问题。

下面的示例中，在`survey_function`中对题目水平的变量进行遍历（标题、`name`），并分别将每个题目添加到单独的页面上。我们可以用同样的方法在多个页面上添加题目。

```javascript
const survey_function = (survey) => {

  // this array stores any information that changes across questions
  const questions = [
    {title: "Question 1", name: "q1"},
    {title: "Question 2", name: "q2"},
    // ... more question-level variables ...
    {title: "Question N", name: "qN"}
  ];

  // create a single page
  const page = survey.addNewPage("questions");

  for (let i=0; i<questions.length; i++) {
    // for each object in the questions array,
    // create a new question and add it to the same page
    let q = page.addNewQuestion("text", questions[i].name, i);
    q.title = questions[i].title;
    q.inputType = "range";
    q.min = 0;
    q.max = 100;
    q.step = 10;
    q.defaultValue = 50;
    q.isRequired = true;
  }

}
```

!!! tip "使用备选项相同的矩阵题型"
    有些时候，当我们的题目文本不同但选项相同的时候，可以使用SurveyJS的[“矩阵”题型](https://surveyjs.io/form-library/examples/single-selection-matrix-table-question/jquery)，它会创建一个表格，每一行对应一个问题，每一列对应一种选项。这种格式常用于李克特量表、满意度等等。你真是可以创建[备选项不同的矩阵题型](https://surveyjs.io/form-library/examples/multi-select-matrix-question/jquery#)。

我们也可以使用试次水平的变量创建不同的`survey`试次。jsPsych的
[时间线变量](./timeline.md#_5)可以和这种做法配合使用，但用法我们习惯的方式有所不同。这是因为我们需要在试次中修改的各个参数并没有对应的插件参数，而是层层嵌套在`survey_json`中。可以通过下面的例子看看是怎样做的。

1. **使用传统的时间线变量方式**。这种做法并不好，因为需要将每个试次的`survey_json`都写进时间线变量里，这样一来时间线变量就没意义了。无论如何，这种做法写起来是这样的：

    ```javascript
    const word_trials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '+',
          choices: "NO_KEYS",
          trial_duration: 500
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: jsPsych.timelineVariable('word'),
          choices: "NO_KEYS",
          trial_duration: 1000
        },
        {
          type: jsPsychSurvey,
          survey_json: jsPsych.timelineVariable('survey_json'),
          data: { word: jsPsych.timelineVariable('word') }
        }
      ],
      timeline_variables: [
        {
          word: 'cheese',
          survey_json: { elements: [ {type: "text", title: "Enter a word related to CHEESE:", autocomplete: "off" } ], showQuestionNumbers: false, completeText: "Next", focusFirstQuestionAutomatic: true } 
        },
        {
          word: 'ring',
          survey_json: { elements: [ {type: "text", title: "Enter a word related to RING:", autocomplete: "off" } ], showQuestionNumbers: false, completeText: "Next", focusFirstQuestionAutomatic: true } 
        },
        {
          word: 'bat',
          survey_json: { elements: [ {type: "text", title: "Enter a word related to BAT:", autocomplete: "off" } ], showQuestionNumbers: false, completeText: "Next", focusFirstQuestionAutomatic: true }
        },
        {
          word: 'cow',
          survey_json: { elements: [ {type: "text", title: "Enter a word related to COW:", autocomplete: "off" } ], showQuestionNumbers: false, completeText: "Next", focusFirstQuestionAutomatic: true }
        }
      ]
    };
    ```

    !!! tip "如果只呈现一种题型，可以使用survey-* 插件"
        上述示例只是用来展示如何将`survey`插件和时间线变量一起使用。如果是真实实验中，由于每个试次只包含一个问题，我们可以直接使用survey-* 插件，因为这些插件和时间线变量配合起来更好。当然，如果你一定要用`survey`插件一定也是有自己的理由，比如说开发更方便，等等。

2. **使用jsPsych的[动态参数功能](./dynamic-parameters.md)**。这样，我们可以直接通过函数返回相应的JSON。

    这种方法允许我们通过各种变量和固定值定义问卷内容。此外，jsPsych会在试次开始前才运行该函数，所以我们可以根据实验中才拿到的一些信息动态修改问卷的内容。参见下面的例子：

    ```javascript
    const word_trials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '+',
          choices: "NO_KEYS",
          trial_duration: 500
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: jsPsych.timelineVariable('word'),
          choices: "NO_KEYS",
          trial_duration: 1000
        },
        {
          type: jsPsychSurvey,
          survey_json: function() {
            // This is a function that dynamically creates the JSON configuration for each trial.
            // Inside the function, you can access timeline variables, jsPsych data, and other global variables
            // that you define. This function will be called right before the trial starts.
            const this_trial_json = { 
              elements: [
                {
                  type: "text", 
                  title: `Enter a word related to ${jsPsych.timelineVariable('word').toUpperCase()}:`, 
                  autocomplete: "off" 
                }
              ], 
              showQuestionNumbers: false, 
              completeText: "Next", 
              focusFirstQuestionAutomatic: true 
            }
            return this_trial_json;
          },
          data: { word: jsPsych.timelineVariable('word') }
        }
      ],
      timeline_variables: [
        { word: 'cheese' },
        { word: 'ring' },
        { word: 'bat' },
        { word: 'cow' }
      ]
    };
    ```

3. **使用`survey_function`参数**。我们可以在其中访问到试次水平的变量，所以大致的思路和上面的例子一样。区别在于，这里我们使用的是SurveyJS的JavaScript API语法而不是JSON。我们当然可以不用时间线变量，但这里这样做更方便：

    ```javascript
    const create_word_survey = (survey) => {
      // Create question using timeline variables
      const page = survey.addNewPage('page1');
      const question = page.addNewQuestion('text'); 
      question.title = `Enter a word related to ${jsPsych.timelineVariable('word').toUpperCase()}`;
      question.autocomplete = "off";
      // Set survey-level parameters
      survey.showQuestionNumbers = false;
      survey.completeText = "Next";
      survey.focusFirstQuestionAutomatic = true;
    }

    const word_trials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '+',
          choices: "NO_KEYS",
          trial_duration: 500
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: jsPsych.timelineVariable('word'),
          choices: "NO_KEYS",
          trial_duration: 1000
        },
        {
          type: jsPsychSurvey,
          survey_function: create_word_survey,
          data: { word: jsPsych.timelineVariable('word') }
        }
      ],
      timeline_variables: [
        { word: 'cheese' },
        { word: 'ring' },
        { word: 'bat' },
        { word: 'cow' }
      ]
    };
    ```

