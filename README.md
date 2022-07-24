# Kuber - eats

Kuber eats Clone의 백엔드 입니다.

- Nest JS 환경
- GraphQL 사용
- TypeORM(Object Relation Mapper)
- Postgres
- joi

## How To Use Environment Variables With NestJS

```
https://blog.devgenius.io/environment-variables-in-nest-js-b989bb0370bf
```

- 일단 내용 조금 바꾸긴 했는데, 일단 지금(07.20)은 에러 안남

#### Configuration

```
npm i --save @nestjs/config
```

- dotenv의 최상위에서 실행됨

#### GraphQL 세팅

```

https://docs.nestjs.com/graphql/quick-start

```

### GraphQL import

```
npm i @nestjs/graphql graphql-tools graphql apollo-server-express
npm i @nestjs/apollo
```

- NestJs에서는 모든 모듈을 AppModule에서 임포트하여서 사용한다.
- GraqhQL도 마찬가지이다.
- apollo driver 옵션이 있기 때문에 apollo 모듈도 추가해서 설치해준다.

```
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  ...
})
```

- autoSchemaFile: join(process.cwd(), 'src/schema.gql') 이 부분은 Nestjs 의 Code first에 기반한 것이다.
- 자동으로 스키마를 생성한다.

```
@Resolver()
export class RestaurantsResolver {
  @Query((returns) => Boolean)
  isPizzaGood() {
    return true;
  }
}
```

- Test Resolver를 만들면 상기의 schema 파일에 자동으로 등록되는 것을 볼 수 있다.
- 위와 같이 등록한 스키마는 개발환경의 URL에서 /graphql로 이동하면 playground에서 확인할 수 있다.

#### ArgsType InputType

- InputType : 말그대로 Input 타입을 정의한다. GraphQL의 Argument type 정의. 하나의 Object 선언
- ArgsType : 분리된 값들을 GraphQL argument로 전달해 줄 수 있도록 함. 하나의 Object에 담지 않음 -> class 유효성 검사도 가능하다.

#### class validator 설치

```
 npm i class-validator
 npm i class-transformer
```

```
  @IsString() //class validator
  @Length(5, 10) //class validator
```

- 위와 같은 식으로 Field를 점검할 수 있다. 물론 main.ts에서 App.UseGlobalPipes(new ValidationPipe()) 를 실행하자

### TypeOrm

TypeOrm에서 syncronize를 true로 하게되면 매 실행할때마다 현재 선언된 엔티티를 중심으로 DB를 동기화한다.

- Entity : typeorm이 Column등으로 지정한 엔티티를 DB에 저장하게 해줌
- Column : 선언된 칼럼은 DB의 칼럼과 연동 된다.
- Interaction : 마치 JPA ORM 같다.
  1. Data Mapper : Entity와 상호작용하는 Repository를 사용한다. 유지관리를 돕고 대규모 앱에 유용하다.
  - NestJs + TypeORM 개발 환경에서 Repository를 사용하는 모듈을 쓸수 있기 때문에 여기에 사용함.
  - repo를 사용하면 어디든지 접근가능하다.
  2. Active Record : BaseEntity 를 상속 받아야 한다. 소규모에서 단순하게 사용한다.

### Reposity

1. Import Repository
2. service에서 @Injectable() 클래스 생성
3. 원하는 엔티티를 InjectRepository 를 사용하여 레포지토리를 서비스에 주입
4. this.[선언명] => 함수 사용

#### create? save?

- create : Dto의 인스턴스를 통해서 엔티티를 생성함. DB 저장하지 않음
- save : 실제로 DB 저장

#### Mapped typeds

- 1개의 파일로 entity, dto, ObjectType를 표시
  1. patial Type : 상속받은 baseEntiry를 required가 아닌 요소로 만들어줌
  2. pick Type : (상속받은) input type에서 몇가지 프로퍼티를 선택해 새로운 class를 만들어줌
  3. Omit Type : base class에서 class를 만드는데 몇몇 field를 제외하고 만듬
  4. Intersection type : 상속받은 class를 함께 합쳐줌

#### 3 Validation Check

- 각 항목을 1개의 entity 파일에서 정의하기에 3번씩 테스트하는 것에 익숙해져야함
  1. graphql
  2. database
  3. valadation

## UserEntity:

- id
- createAt
- updatedAt

- email
- password
- role(client | owner | delivery)

## User CRUD :

- Create Account
- Log in
- See Profile
- Edit Profile

#### enum

- 나열되는 항목에 배열의 인덱스 같은 값이 적용된 형태라고 볼 수 있다.
