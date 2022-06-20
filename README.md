# ts-all-in-one
- [typescript 공식문서](https://www.typescriptlang.org/)
- [typescript 플레이그라운드](https://www.typescriptlang.org/play)
- [typescript 핸드북 필독](https://www.typescriptlang.org/docs/handbook/intro.html)

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
- tsc는 tsconfig.json에 따라 ts 코드를 js로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 tsconfig.json 설정을 반드시 봐야한다.
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
- ts가 추론해주는 타입이 있는데 이런 건 그냥 그대로 사용하면 됨. ts가 추론하지 못하는 경우에만 직접 타이핑할 것.
- : 뒷부분, as 뒷부분, <> 부분을 제외하면 자바스크립트와 동일. 제외하고 생각하는 연습을 초반에 해야 함.
- 자바스크립트에 비해서 자유도가 확 줄어듦(ex: 변수에 문자열을 넣었다가 숫자로 바꾸는 등의 행동 어려워짐)
- any를 최대한 쓰지 않는 것을 목표로 할 것.
- string과 String은 다름. 소문자로 하는 것 기억하기.
- never, unknown, any 타입 주의하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기.
- typescript의 타입은 열려있음.
- type과 interface 구분하기
- interface끼리는 서로 합쳐짐.
- 제네릭은 타입에 대한 함수라고 생각하면 됨.
- 함수에서 공변성과 반공변성 주의!
- infer는 타입 내에서 추론된 값으로 다시 새로운 타입를 만드는 것.
