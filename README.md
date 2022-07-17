# Kuber - eats

Kuber eats Clone의 백엔드 입니다.

- Nest JS 환경
- GraphQL 사용

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
