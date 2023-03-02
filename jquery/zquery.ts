interface zQuery {
  (tag: string | string[]): zQueryInstance;
  (tag: zQueryInstance): zQueryInstance;
}
interface zQueryInstance {
  removeClass(param: string): this;
  addClass(param: string): this;
  addClass(callback: (this: zQueryInstance, index: number) => string): this;
  text(param: string): this;
  html(param: string): this;
  html(callback: (this: zQueryInstance, index: number) => string): this;
  data(param: string): this;
}

declare const Z: zQuery;

Z("p").removeClass("myClass noClass").addClass("yourClass");

Z(["p", "t"]).text("hello");

const tag2 = Z("ul li").addClass(function(index) {
  return "item-" + index;
});

Z(tag2).html(function(i: number) {
  console.log(this);
  return Z(this).data('name') + '입니다';
});