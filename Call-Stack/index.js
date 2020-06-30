/* // 스택의 동작
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
 */
// 스택 오버플로우
function callback() {
  callback();
}
callback();

// 이벤트 큐 (a, c, b 순으로 출력)
/* function a() {
  console.log("a");
}

function b() {
  a();

  setTimeout(function () {
    console.log("b");
  }, 0);

  c();
}

function c() {
  console.log("c");
}

b(); */
