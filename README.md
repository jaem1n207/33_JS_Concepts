<p align="center">
<img src="https://user-images.githubusercontent.com/50766847/86084330-8af0e700-bad7-11ea-8ce8-e75d533e723e.png" height="auto" width="auto" />
</p>

<h1 align="center">모든 자바스크립트 개발자가 알아야 하는 33가지 개념</h1>

<h2>소개</h2>

> 이 레포지토리는 개발자들이 자바스크립트의 개념을 마스터하는 것을 돕기 위해 만들어졌습니다. 필수적인 것은 아니지만 나중의 공부에 있어서 지침서가 될 수 있을 것입니다. 
<a href="https://twitter.com/stephenthecurt" target="blank">Stephen Curtis</a>의 저서를 기반으로 만들어졌으며, <a href="https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1" target="blank">이곳</a>에서 해당 저서를 읽을 수 있습니다

<br></br>

## 목차

1. **[호출 스택](#1-호출-스택)**
1. **[원시 자료형](#2-원시-자료형)**
1. **[값 타입(Value Type)과 참조 타입(Refecrence Type)](#3-값-타입value-type과-참조-타입refecrence-type)**

---

## 1. 호출 스택

## ✋ 들어가기 전에...
JavaScript는 CallStack, EventQueue를 이용하여 Single Thread 기반으로 비동기적으로 동작합니다. Sigle Thread 기반에서는 단 <strong>하나의 CallStack</strong>만 존재하기 때문에 네트워크 요청 등 비용이 많이 드는 연산을 수행하게 되면 매우 비효율적으로 동작됩니다. 이러한 문제점을 어떻게 해결하는지 하나씩 확인해봅시다.

## ✔ 호출 스택이란 무엇인가?
함수의 호출을 기록하는 (LIFO)자료구조입니다. 호출 스택은 주로 함수 호출 (호출)에 사용됩니다. 호출 스택은 단일이므로 함수 실행이 한 번에 하나씩 위에서 아래로 수행됩니다. -> 호출 스택이 동기적임을 의미.

LIFO를 보여주는 코드 샘플 
```JavaScript
function three() {
  console.log("three!");
}
function two() {
  console.log("two");

  three();
  console.log("back to two");
}
function one() {
  console.log("one");

  two();
  console.log("back to one");
}
function zero() {
  console.log("zero");

  one();
  console.log("back to zero");
}
zero();
```
코드가 실행되면 콘솔에 다음과 같이 출력됩니다.
<img src="https://user-images.githubusercontent.com/50766847/86094924-1f654480-baec-11ea-8308-423a55a4647f.PNG" />

1. <code>zero()</code>실행되면 빈 스택 프레임이 생성됩니다. 프로그램의 주요 (익명)진입점입니다.
2. "zero"를 콘솔로 출력합니다. <code>zero()</code>다음 호출 <code>one()</code>스택으로 푸시됩니다.
3. "one"을 콘솔로 출력합니다. <code>one()</code>다음 호출 <code>two()</code>스택으로 푸시됩니다.
4. "two"를 콘솔로 출력합니다. <code>two()</code>다음 호출 <code>three()</code>스택으로 푸시됩니다.
5. "three!"를 콘솔로 출력합니다. <code>three()</code>스택에서 튀어 나옵니다.
6. 실행 순서로 이동합니다<code>two()</code>.
7. <code>two()</code>"back to two"를 콘솔로 출력합니다. 
8. <code>two()</code>스택에서 튀어 나옵니다.
9. 실행 순서로 이동합니다<code>one()</code>.
10. <code>one()</code>"back to one"을 콘솔로 출력합니다.
11. <code>one()</code>스택에서 튀어 나옵니다.
12. 실행 순서로 이동합니다<code>zerio()</code>.
13. <code>zero()</code>"back to zero"를 콘솔로 출력합니다.
14 <code>zero()</code>를 튀어 나와 메모리를 비웁니다.

스택 오버플로 코드 샘플
```JavaScript
function callback() {
  callback();
}
callback();
```
코드가 실행되면 콘솔에 다음과 같이 출력됩니다.
<img src="https://user-images.githubusercontent.com/50766847/86096527-5b99a480-baee-11ea-8fca-844781baac44.PNG" />
Why? 종료 점이없는 재귀 함수 (자체를 호출하는 함수)로 인해 스택영역의 사이즈가 오버해 위와 같은 현상(스택 오버플로)이 발생합니다. 브라우저 (호스팅 환경)에는 스택 오류가 발생하기 전에 수용 할 수있는 최대 스택 호출이 있습니다.
<br></br>
**[⬆  Back to Top](#목차)**

---

## 2. 원시 자료형

## ✋ 들어가기 전에...
JavaScript는 동적언어입니다. JavaScript의 변수는 특정 값 유형과 직접적으로 연관되어 있지 않으며 모든 유형의 변수를 할당(다시 할당) 할 수 있습니다.

```JavaScript
1 | let foo = 42; // foo is now a number
2 | foo = "bar";  // foo is now a string
3 | foo = true;   // foo is now a boolean
```

## 특징
프로그래밍 언어에서 숫자나 문자열같은 것들은 자료형(Data type)이라 부릅니다. 자료형은 변수에 저장하는 데이터의 종류를 말하며 JavaScript에서는 자료형을 크게 원시타입 6개(undefined, null, Boolean, Number, String, Symbol)와 객체타입 1개(Object)로 총 7개가 있으며 원시 자료형은 다음과 같은 특징을 지니고 있습니다.
* 원시 타입은 불변적입니다.
* 원시 타입은 값으로 저장, 객체들은 참조로 저장됩니다.
* 어떠한 메소드를 가지지 않습니다.
* Type을 알고 싶다면 typeof연산자를 쓰면 됩니다.   
> 원시 타입이 아닌 것들은 모두 Object(객체)입니다.<br /> Boolean, Number, String, Symbol은 원시타입이면서 객체입니다. 참고: (**[Wrapper Object](#wrapper-object)**)

> JavaScript 내부에 존재하는 Autoboxing 기능 덕에 몇몇 원시타입들 (Boolean, Number, String)은 Object(객체)처럼 활용할 수 있습니다. 
참고: (**[Autoboxing](#autoboxing)**)

### ✔ 원시 타입
원시 타입은 참조로 저장되는 `Object`와 다르게 값 그 자체로 저장되어 있습니다. 값이 동일한지 체크할 때, 앞의 문장이 정확히 무슨 의미인지 알 수 있습니다. 아래 코드에서 배열과 객체는 내용은 같지만 다른 곳을 참조하기 있기 때문에 `false`를 리턴합니다.
```JavaScript
"apple" === "apple" // true
30 === 30;  // true

{} === {};  // false
[] === [];  // false
```

> 원시 타입은 값(value)으로 저장되고, 객체들은 참조(reference)로 저장됩니다.

### ✔ Boolean
Boolean은 논리적 엔티티를 나타내며 다음 두가지 값을 가질 수 있습니다: `true` and `false`. 자세한 내용은 [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean "Go More Detail Boolean") 과 [Boolean Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean "Go More Detail Boolean")을 참조해주세요.
```JavaScript
function acceptsBoolean(value: boolean) {
  // ...
}

acceptsBoolean(true);     // Works!
acceptsBoolean(false);    // Works!
acceptsBoolean("apple");  // Error!
```

### ✔ Null
null은 NULL의 심볼이며, 의도를 갖고 변수에 null을 할당하여 값이 없다는 것을 나타냅니다. 아래의 코드에서는 null이 할당된 변수의 타입을 확인해 보면 object인 것을 확인하실 수 있습니다.
```JavaScript
let a = null;
console.log(a); // null

console.log(typeof a);  // object
```
Null유형에는 정확히 하나의 값이 있습니다: `null`. 자세한 내용은 [null](https://developer.mozilla.org/en-US/docs/Glossary/Null) 과 [Null Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)을 참조해주세요.

### ✔ Undefined
변수에 값이 할당되어 있지 않은 상태라고 볼 수 있습니다.
```JavaScript
let a;
console.log(a); // undefiend
```
<strong>Undefined가 나오는 경우의 예</strong>

존재하지 않는 객체의 프로퍼티를 읽으려고 할 때
```JavaScript
let obj = {};
console.log(obj.a); // undefined
```
존재하지 않는 배열에 엘리먼트를 읽으려고 할 때
```JavaScript
let arr = [1, 2, 3];
console.log(arr[10]); // undefined
```
✔ <strong>Null과 Undefined</strong>
* 둘은 모두 존재하지 않는 것을 나타냅니다.
* null: 변수를 선언하고 'null'이라는 빈 값을 할당한 경우이며, 타입을 확인해보면 'object'입니다. (존재하지 않음이라는 값)
* undefined: 접근 가능한 스코프에 변수가 선언되었으나 현재 아무런 값도 할당되지 않은 상태이며, 타입을 확인해보면 'undefined'입니다. (정의 되지 않음이라는 값)
```JavaScript
function acceptsNull(value: null) {
  /* ... */
}

function acceptsUndefined(value: void) {
  */ ... */
}

acceptsNull(null);      // Works!
acceptsNull(undefined); // Error!
acceptsUndefined(null);       // Error!
acceptsUndefined(undefined);  // Works!
```
`null`과 `void` 또한 다른 유형으로 나타납니다.

### ✔ Number
숫자의 자료형을 의미합니다. <strong>정수만을 표현하기 위한 특별한 자료형은 없습니다.</strong> 부동 소수점을 표현할 수 있는 것 말고도, Number 타입은 세 가지 의미있는 몇가지 상징적인 값들도 표현할 수 있습니다. 이 값에는 `+Infinity`, `-Infinity`, `NaN(<strong>N</strong>ot a <strong>N</strong>umber")`이 있습니다. 
```JavaScript
function acceptsNumber(value: number) {
  // ...
}

acceptsNumber(10);        // Works!
acceptsNumber(3.14);      // Works!
acceptsNumber(NaN);       // Works!
acceptsNumber(Infinity);  // Works!
acceptsNumber("apple");   // Error!
```

### ✔ String
JavaScript의 `String` 타입은 문자열을 의미하며, 텍스트 데이터를 나타내는데 사용합니다. " 쌍따옴표 또는' 홑따옴표, 백틱 안에 텍스트를 기입하는 방식으로 사용합니다. 단, 주의해야할 점은 쌍따옴표로 시작하면 쌍따옴표로, 홑따옴표로 시작하면 홑따옴표로 끝내야 합니다.
```JavaScript
function acceptsString(value: string) {
  //  ...
}

acceptsString("apple"); // Works!
acceptsString(false);   // Error!
```
JavaScript는 다른 유형의 값을 혼합하여 암시적으로 문자열로 반환합니다.
```JavaScript
"apple" + 10; // "apple10"
"apple" + {}; // "apple[object Object]"
```
Flow는 문자열과 숫자를 문자열에 결합할 때만 허용됩니다.
```JavaScript
"apple" + "apple";  // Works!
"apple" + 10;       // Works!
"apple" + {};       // Error!
"apple" + [];       // Error!
```
명시적이어야 하며 다른 유형을 문자열로 변환해야 합니다. 문자열 방법을 사용하거나 값의 문자열을 구분하는 다른 방법을 사용하여 이 작업을 수행할 수 있습니다.
```JavaScript
"apple" + String({});     // Works!
"apple" + [].toString();  // Works!
"" + JSON.stringify({});  // Works!
```
또한 `string`과 `String`은 다른 유형입니다. 

### ✔ Symbol
Symbol 은 ECMAScript6 에서 추가되었습니다. Symbol은 항상 <strong>유일</strong>하고 <strong>변경 불가능한</strong> (immutable) 기본값입니다. 또한, 객체 속성의 <strong>key 값으로도 사용</strong>될 수 있으며, Symbol은 다음과 같은 특징을 지닙니다.
 1. symbol의 값을 외부에 노출시키지 않습니다.
 1. 객체의 프로퍼티를 symbol로 만들면 Object.getOwnPropertyNames() 반환 값에서 제외됩니다.    [Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
 1. value에 접근할 때는 []를 통해 접근해야 합니다. .을 통해 접근하면 undefined가 반환됩니다.
 
또, C 언어의 이름있는 열거형(enum)과도 비슷합니다. 좀 더 자세히 알아보려면, JavaScript의 [Symbol](https://developer.mozilla.org/ko/docs/Glossary/Symbol) 와 [Symbol](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 객체 래퍼를 참조해주세요.

<br />

### Wrapper Object
이름처럼 래퍼는 원시 타입의 값을 감싸는 형태의 객체입니다.
`Boolean`, `Number`, `String`, `Symbol` 와 같은 원시타입을 `new` 키워드로 생성하면 원시타입에 대한 `Wrapper Object`가 생성됩니다.
`String`은 문자열이 인자로 들어왔을 때, 원시 문자열을 생성하는 전역함수입니다. `String`은 인자로 들어온 값을 문자열로 바꾸려합니다.
```JavaScript
String(); // ""
String(true)  // "true"
String(null)  // "null"
String(undefined) // "undefined"
String(1234)  // "1234"
String("JavaScript") === "JavaScript" // "true"
typeof String("JavaScript");  // "String"
```
하지만 `new` 키워드를 붙인다면 `String`은 여전히 생성자 함수로도 쓰일 수 있습니다.
```JavaScript
const food = new String("apple");
typeof food; // "object"
food === "apple"; // false
```
그리고 위의 생성자는 `Wrapper Object`라고 불리는 새로운 Object를 만듭니다.
위의 코드에서 새로운 Object는 "apple"이라는 문자열을 다음과 같은 프로퍼티로 나타냅니다.
```JavaScript
{
  0: "a",
  1: "p",
  2: "p",
  3: "l",
  4: "e",
  length: 5
}
```
<br />

### Autoboxing
일반 함수에서 this는 window 객체를 가르키게 됩니다. this가 window 객체 (global object)를 가르키는 이유는 autoboxing 덕분입니다.
non-strict 모드에서 this 값이 null 혹은 undefined 일 경우 window 객체(global object)로 자동으로 변환해 주는 것을 autoboxing이라고 합니다.

원시 타입 문자열 생성자와 일반 오브젝트 생성자 모두 `String`함수를 이용합니다. 또한 원시 문자열 타입에서 `constructor`를 이용하여 생성자 프로퍼티를 확인할 수 있습니다.
```JavaScript
const food = new String("apple");
food.constructor === String;  // true
String("apple").constructor === String; // true
```
위 코드에서 `Autoboxing`이 일어납니다. 특정한 원시 타입에서 프로퍼티나 메소드를 호출하려 할 때, JavaScript는 처음으로 이것을 임시 Wrapper Object로 바꾼 뒤에 프로퍼티나 메소드에 접근하려 합니다. 중요한 것은 이 과정에서 원본에는 아무런 영향을 미치지 않습니다.
```JavaScript
const foo = "bar";
foo.length; // 3
foo === "bar";  // true
```
이렇게 Autoboxing덕분에 원시 타입이 생성자 및 해당 메소드를 쓸 수 있습니다. `length`라는 프로퍼티에 접근하기 위해 JavaScript는 `foo`를 `Autoboxing`하고 이것을 Wrapper Object에 넣습니다. 그리고 Wrapper Object의 `length` 프로퍼티에 접근하고 값을 이용한 뒤, 지웁니다. 이 모든 과정은 `foo`라는 원시 타입 변수에 아무런 영향을 미치지 않습니다. `foo`는 여전히 원시 타입 문자열이라는 말입니다.

이러한 과정은 원시 타입은 프로퍼티를 가질 수 없는데도 우리가 원시 타입에 프로퍼티를 할당하려고 할 때 JavaScript가 왜 아무런 경고나 에러메시지를 출력하지 않는지를 알려줍니다. 왜냐하면 프로퍼티를 할당할 때 잠시 원시 타입을 이용한 `Wrapper Object`를 만들고 거기에 할당하기 때문입니다.
```JavaScript
const foo = 42;
foo.bar = "abc";  // 임시 Wrapper Object에 할당
foo.bar;  // undefined
```
만약 `undefined`나 `null`과 같이 Wrapper Object가 없는 원시 타입에 대해서 프로퍼티를 할당하려하면 JavaScript는 에러메시지를 나타냅니다.
```JavaScript
const foo = null;
foo.bar = "abc";  // Uncaught TypeError: Cannot set property 'bar' of null
```

**[⬆  Back to Top](#목차)**

---

## 3. 값 타입(Value Type)과 참조 타입(Refecrence Type)

## ✋ 들어가기 전에...
* JavaScript에는 두가지 종류의 변수가 있습니다. 원시적 변수와 참조 변수입니다.
* 모든 변수를 생성한 후에는 고정 메모리 양이 예약됩니다.
* 변수가 복사되면 메모리 내 값이 복사됩니다.
* call을 통해 변수를 함수에 전달하면 해당 변수의 복사본이 생성됩니다.

### ✔ 값 타입(Value Type)
JavaScript는 <strong>값에 의한 전달</strong>이 일어나는 데이터타입(Boolean, String, Number.. 등)을 가지고 있습니다. 그리고 이러한 데이터타입을 <strong>원시 타입</strong>이라고 부릅니다. 원시 유형의 메모리 내 값은 실제 값입니다.
<strong>값에 의한 복사의 예</strong>
```JavaScript
var a = 10;
var b = "apple";

var x = a;
var y = b;

console.log(a, b, x, y);  // 10 
```
`a`와 `x`는 둘 다 지금 10이라는 값을 가지고 있습니다. 그리고 `b`와 `y`는 현재 둘 다 "apple"이라는 값을 가지고 있습니다. 하지만 값들이 복사되었기 때문에 이들은 분리되어 있습니다. 같은 값을 가진 변수 하나를 바꾸더라도 다른 변수에는 아무런 영향이 없습니다. 각각의 변수들이 아무런 관계도 없다고 생각하면 됩니다. 아래의 코드를 보시면 이해가 잘 될 것입니다.
```JavaScript
var a = 10;     // a에 10을 지정
var b = a;      // a값을 b에 복사
  b = 20;       // b에 20을 지정
console.log(a); // 10
```
=> 원본은 변경되지 않았으며, 사본만 변경할 수 있습니다.

### ✔ 참조 타입(Reference Type)
참조 유형에는 다른 값이 포함될 수 있습니다. 참조 유형의 내용은 변수에 사용할 수 있는 고정 메모리 양에 맞지 않으므로 참조 유형의 메모리 내 값은 참조 자체(메모리 주소)입니다.
* Array
* Object
* Function
<strong>참조 복사의 예</strong>
```JavaScript
var a = { c: 10 };  // 새로운 개체의 참조를 a에 할당
var b = a;          // a내부 개체의 참조를 새 변수 b에 복사
b.c = 20;           // b의 내용을 수정
console.log(a);     // { c: 20 }
```
=> 원본도 참조가 복사되었기에 변경되었습니다.

**[⬆  Back to Top](#목차)**

---
