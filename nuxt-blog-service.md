# memo
気づいたことをメモ

## store
各storeはdataStore + Entity のように扱っているようだ

つまり、各状態の管理およびその状態の更新や取得ということ

- index.js : ユーザーのログイン状態を管理するstore
- posts.js : 投稿情報を管理するstore
- users.js : ユーザーの詳細情報を管理するstore

## other
{{}} : mustache(マスタッシュ)というらしい 口髭の意

Object.entries()
-> 引数に与えたオブジェクトが所有する、列挙可能なプロパティの組[key,value]からなる配列を返す

```
// this.user.postは [ foo: 'bar', baz: 42] のようなオブジェクト  
Object.entries(this.user.posts)
=> [Array["foo":'bar'], Array["baz": 42]]
Object->Array(Array(),...)
```
ということ

Object.assign()
-> 一つ以上のソースオブジェクトから、直接所有で(own)列挙可能な(enumerable)すべての
プロパティの値を、ターゲットオブジェクトへコピーします

```
const object1 = {
  a: 1,
  b: 2,
  c: 3
};
const object2 = Object.assign({c: 4, d: 5}, object1);
=> Object [c: 3, d: 5, a: 1, b: 2 ] // 存在するkeyのvalueに関しては上書きされる
```

