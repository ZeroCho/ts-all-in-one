# ts-all-in-one
- [typescript 공식문서](https://www.typescriptlang.org/)
- [typescript 플레이그라운드](https://www.typescriptlang.org/play)
- [typescript 핸드북 필독](https://www.typescriptlang.org/docs/handbook/intro.html)
- [typescript 버전 수정 내역](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)

## 실습할 자료 링크(소스 코드 버전에 따라 변동 가능)
- [axios](https://github.com/axios/axios/blob/v1.x/index.d.ts)
- [react](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)
- [nodejs](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)
- [express](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts)
- [jQuery](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/JQuery.d.ts)
- [redux](https://github.com/reduxjs/redux/blob/master/src/index.ts)

애초에 ts인 redux, 패키지 내부에서 d.ts를 제공하는 axios, @types 패키지가 별도로 존재하는 react, node, express, jquery로 구분됨. @types는 DefinitelyTyped라는 프로젝트로, 커뮤니티에서 라이브러리 타이핑을 제공하는 것.

## 기본 지식
- 메인 룰: typescript는 최종적으로 javascript로 변환된다. 순전한 typescript 코드를 돌릴 수 있는 것은 deno이나 대중화되지가 않았음. 브라우저, 노드는 모두 js 파일을 실행한다.
- typescript는 언어이자 컴파일러(tsc)이다. 컴파일러는 ts 코드를 js로 바꿔준다.
- tsc는 tsconfig.json(tsc --init 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 tsconfig.json 설정을 반드시 봐야한다.
- 단순히 타입 검사만 하고싶다면 tsc --noEmit 하면 된다.
- 개인 의견: tsconfig.json에서 그냥 esModuleInterop: true, strict: true 두 개만 주로 켜놓는 편. strict: true가 핵심임.
- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.
- 에디터가 필수가 됨. VS Code나 웹스톰 반드시 필요. 메모장으로 코딩 불가능한 지경에 이름.

## ts 라이브러리 분석
- package.json의 types 속성에 적힌 파일이 메인 타이핑 파일임.
- npmjs.com에서 패키지를 검색했을 때 패키지 우측에 TS로 뜨면 ts 지원 라이브러리이고, DT로 뜨면 @types를 설치해야 하며, 그것마저도 없으면 직접 타이핑해야 함
- 첫 번째 줄부터 보기 보다는 마지막 줄 exports default나 export = 부분을 보고 거슬러 올라가는 게 좋음
- 제네릭이 제일 읽기 어려워서 제네릭 부분은 따로 필기하면서 보는게 좋음

## ts 문법
- 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 됨.
```typescript
const a: number = 5;
function add(x: number, y: number): number { return x + y }
const add: (x: number, y: number) => number = (x, y) => x + y;
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
```
- ts가 추론해주는 타입이 있는데 이런 건 그냥 그대로 사용하면 됨. ts가 추론하지 못하는 경우에만 직접 타이핑할 것.
```typescript
const a = 5;
const b = '3';
const c = a + b;
function add(x: number, y: number) { return x + y }
```
- : 뒷부분, as 뒷부분, <> 부분, interface, type, function 일부를 제외하면 자바스크립트와 동일. 제외하고 생각하는 연습을 초반에 해야 함.
```typescript
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
const obj = { lat: 37.5, lon: 127.5 };

const a = document.querySelector('#root') as HTMLDivElement;
const a = document.querySelector('#root');

function add<T>(x: T, y: T): T { return x + y }
function add(x, y) { return x + y }

interface A {};
type A = {};
```
- 자바스크립트에 비해서 자유도가 확 줄어듦(ex: 변수에 문자열을 넣었다가 숫자로 바꾸는 등의 행동 어려워짐)
```typescript
let x = 5;
x = 'hello';
```
- any를 최대한 쓰지 않는 것을 목표로 할 것.
- never, unknown, any 타입 주의하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기.
[never 좋은 설명 글](https://ui.toast.com/weekly-pick/ko_20220323)
```typescript
try {
  const array = [];
  array[0];
} catch(error) {
  error;
}
```
- string과 String은 다름. 소문자로 하는 것 기억하기.
```typescript
const a: string = 'hello';
const b: String = 'hell';
```
- 템플릿 리터럴 타입이 존재(유니언 등 사용 가능)
```typescript
type World = "world";

// type Greeting = "hello world"
type Greeting = `hello ${World}`;
```
- 객제 타이핑: type과 interface 구분하기
```typescript
type A = { a: string };
const a: A = { a: 'hello' };

interface B { a: string }
const b: B = { a: 'hello' };
```
- union, intersection
```typescript
function add(x: string | number, y: string | number): string | number { return x + y }
add(1, 2)
add('1', '2')
add(1, '2')
```
- typescript의 타입은 열려있음.
```typescript
type A = {
    a: string;
}
type B = {
    b: string;
}

const aa: A | B = { a: 'hello', b: 'world' };
const bb: A & B = { a: 'hello', b: 'world' };
```
- 타입 가드
```typescript
function numOrStr(a: number | string) {
  if (typeof a === 'string') {
    a.split(',');  
  } else {
    a.toFixed(1);
  }
}

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    a.slice(1);  
  } else {
    a.toFixed(1);
  }
}

type B = { type: 'b', bbb: string };
type C = { type: 'c', ccc: string };
type D = { type: 'd', ddd: string };
type A = B | C | D;
function typeCheck(a: A) {
  if (a.type === 'b') {
    a.bbb;
  } else if (a.type === 'c') {
    a.ccc;
  } else {
    a.ddd;
  }
}

interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog {
  if ((a as Cat).meow) { return false }
  return true;
}
const cat: Cat | Dog = { meow: 3 }
if (catOrDog(cat)) {
    console.log(cat.meow);
}
if ('meow' in cat) {
    console.log(cat.meow);
}
```
class인 경우 instanceof 연산자도 가능!
- optional
```typescript
function abc(a: number, b?: number, c: number?) {}
abc(1)
abc(1, 2)
abc(1, 2, 3)

let obj: { a: string, b?: string }  = { a: 'hello', b: 'world' }
obj = { a: 'hello' };
```
- interface끼리는 서로 합쳐짐.
```typescript
interface A { a: string }
interface A { b: string }
const obj1: A = { a: 'hello', b: 'world' }

type B = { a: string }
type B = { b: string }
const obj2: B = { a: 'hello', b: 'world' }
```
- 제네릭은 타입에 대한 함수라고 생각하면 됨. 추론을 활용하기
```typescript
function add<T>(x: T, y: T): T { return x + y }
add<number>(1, 2);
add(1, 2);
add<string>('1', '2');
add('1', '2');
add(1, '2');
```
- 제네릭 기본값, extends
```typescript
function add<T extends string>(x: T, y: T): T { return x + y }
add(1, 2);
add('1', '2')

// <T extends {...}>
// <T extends any[]>
// <T extends (...args: any) => any>
// <T extends abstract new (...args: any) => any>
```
- class vs interface
- 함수에서 공변성과 반공변성 주의!
```typescript
function a(x: string): number {
  return 0;
}
type B = (x: string) => number | string;
let b: B = a;

function a(x: string): number | string {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string | number): number {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string): number {
  return 0;
}
type B = (x: string | number) => number;
let b: B = a;
```
- 함수 오버로딩
```typescript
function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: number | string, y: number | string) {
  return x + y;
}

interface Add {
  (x: number, y: number): number;
  (x: string, y: string): string;
}
const add: Add = (x, y) => x + y;
```
- infer는 타입 내에서 추론된 값으로 다시 새로운 타입을 만드는 것(밑에 utility types 참고).
- 타입스크립트는 건망증이 심하다
```typescript
try {
  await axios.get();
} catch (err) {
  console.error(err.response?.data);
}
```
- abstract class, abstract 생성자
```typescript
const constructor: abstract new (...args: any) => any = ...
```

## utility types로 알아보기
[링크](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Partial
```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
- Required
```typescript
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```
- ReadOnly
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```
- Pick
```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
- Record
```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
- Exclude
```typescript
type Exclude<T, U> = T extends U ? never : T;
```
- Extract
```typescript
type Extract<T, U> = T extends U ? T : never;
```
- Omit
```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
- NonNullable
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```
- Parameters
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```
- ConstructorParameters
```typescript
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```
- ReturnType
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
- InstanceType
```typescript
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```
- 기타
```typescript
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

function applyStringMapping(symbol: Symbol, str: string) {
    switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
        case IntrinsicTypeKind.Uppercase: return str.toUpperCase();
        case IntrinsicTypeKind.Lowercase: return str.toLowerCase();
        case IntrinsicTypeKind.Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
        case IntrinsicTypeKind.Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
}

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> { }
```
