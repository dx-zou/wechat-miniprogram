# css 属性

## 1. 背景 background

background 包含以下子属性

- background-color：背景颜色
- background-image：背景图像
- background-repeat：背景图像平铺方式
- background-attachment：背景图像依附方式
- background-position：背景图像起始位置
- background-size：背景图像尺寸模式
- background-origin：定位区域
- background-clip：绘制区域
- background-blend-mode：混合模式

推荐属性连写规则

```css
background: color image repeat attachment position/size;
/* 
  origin和clip不能加入到属性连写中，因为其取值都是一致的，有些浏览器无法区分它们的取值
*/
```

background 部分属性取值

- **background-repeat：图像平铺方式**

  - repeat：图像在水平方向和垂直方向重复(默认)
  - repeat-x：图像在水平方向重复
  - repeat-y：图像在垂直方向重复
  - no-repeat：图像仅重复一次
  - space：图像以相同间距平铺且填充整个节点
  - round：图像自动缩放直到适应且填充整个节点

- **background-attachment：图像依附方式**

  - scroll：图像随页面滚动而移动(默认)
  - fixed：图像不会随页面滚动而移动

- **background-position：图像起始位置**
  - Position：位置，可用任何长度单位，第二个位置(Y 轴)不声明默认是 50%(默认 0% 0%)
    Keyword：位置关键字 left、right、top、bottom、center，可单双使用，第二个关键字不声明默认是 center
- **background-size：图像尺寸模式**

  - auto：自动设置尺寸(默认)
  - cover：图像扩展至足够大，使其完全覆盖整个区域， 像某些部分也许无法显示在区域中
  - contain：图像扩展至最大尺寸，使其宽度和高度完全适应整个区域
  - Size：尺寸，可用任何长度单位，第二个尺寸(高)不声明默认是 auto

- **background-origin**：定位区域(与 background-position 结合使用)

  - padding-box：图像相对填充定位(默认)
  - border-box：图像相对边框定位
  - content-box：图像相对内容定位

- **background-clip：绘制区域**
  - border-box：图像被裁剪到边框与边距的交界处(默认)
  - padding-box：图像被裁剪到填充与边框的的交界处
  - content-box：图像被裁剪到内容与填充的交界处
- **background-blend-mode：混合模式**
  - normal：正常(默认)
  - color-burn：颜色加深
  - color-dodge：颜色减淡
  - color：颜色
  - darken：变暗
  - difference：差值
  - exclusion：排除
  - hard-light：强光
  - hue：色相
  - lighten：变亮
  - luminosity：亮度
  - multiply：正片叠底
  - overlay：叠加
  - saturation：饱和度
  - screen：滤色
  - soft-light：柔光

### 背景渐变

- linear-gradient()：线性渐变

```txt
Direction：方向
      Keyword：方向关键字to left/right/top/bottom/top left/top right/bottom left/bottom right(默认to bottom)
      Angle：角度，以顺时针方向的垂直线和渐变线的夹角计算，超出N圈则计算剩余角度
  ColorStop：色标
      Color：颜色，可参考background-color取值，在指定位置产生渐变效果所使用的颜色
      Position：位置，可参考background-position的Position取值，在指定位置产生渐变效果
```

- radial-gradient()：径向渐变

```css
background-image: radial-gradient(shape size at position, color-stop);

/*
  
  Shape：形状
      ellipse：椭圆形(默认)
      circle：圆形
  Size：尺寸
      farthest-corner：从圆心到离圆心最远的角为半径(默认)
      farthest-side：从圆心到离圆心最远的边为半径
      closest-corner：从圆心到离圆心最近的角为半径
      closest-side：从圆心到离圆心最近的边为半径
      Size：尺寸，可用任何长度单位，宽和高必须同时声明
  Position：位置
      Keyword：位置关键字left、right、top、bottom、center(默认center)
      Position：位置，可用任何长度单位
  ColorStop：色标
      Color：颜色，可参考background-color取值，在指定位置产生渐变效果所使用的颜色
      Position：位置，可参考background-position的Position取值，在指定位置产生渐变效果

*/
```

- conic-gradient()：锥形渐变
- repeating-linear-gradient()：重复线性渐变
- repeating-radial-gradient()：重复径向渐变
- repeating-conic-gradient()：重复锥形渐变
