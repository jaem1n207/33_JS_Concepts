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
2 | foo = 'bar';  // foo is now a string
3 | foo = true;   // foo is now a boolean
```


## 특징
프로그래밍 언어에서 숫자나 문자열같은 것들은 자료형(Data type)이라 부릅니다. 자료형은 변수에 저장하는 데이터의 종류를 말하며 JavaScript에서는 자료형을 크게 원시타입 6개(undefined, null, Boolean, Number, String, Symbol)와 객체타입 1개(Object)로 총 7개가 있으며 원시 자료형은 다음과 같은 특징을 지니고 있습니다.
* 원시 타입은 불변적입니다.
* 원시 타입은 값으로 저장, 객체들은 참조로 저장됩니다.
* 어떠한 메소드를 가지지 않습니다.
* Type을 알고 싶다면 typeof연산자를 쓰면 됩니다.   
> Boolean, Number, String, Symbol은 원시타입이면서 객체입니다. 참고: (**[Wrapper Object](#wrapper-object)**)
> 

### ✔ Boolean
Boolean은 논리적 엔티티를 나타내며 다음 두가지 값을 가질 수 있습니다: `true` and `false`. 자세한 내용은 [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean "Go More Detail Boolean") 과 [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean "Go More Detail Boolean")을 참조해주세요.

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


**[⬆  Back to Top](#목차)**

---

## 3. 값 타입(Value Type)과 참조 타입(Refecrence Type)

설명

**[⬆  Back to Top](#목차)**

---
