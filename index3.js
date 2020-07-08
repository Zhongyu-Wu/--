class Carousel {
    constructor(root, animation) {
      this.animation = animation || ((from, to, callback) => callback())
      this.root = root
      this.dotsCt = root.querySelector(".dots")
      this.dots = Array.from(root.querySelectorAll(".dots > span"))
      this.imgs = Array.from(root.querySelectorAll(".panels > a"))
      this.pre = root.querySelector(".pre")
      this.next = root.querySelector(".next")
  
      this.bind()
    }
  
    get index() {
      return this.dots.indexOf(this.root.querySelector(".dots .active"))
    }
  
    get preIndex() {
      return (this.index - 1 + this.dots.length) % this.dots.length
    }
  
    get nextIndex() {
      return (this.index + 1) % this.dots.length
    }
  
    bind() {
      this.dotsCt.onclick = e => {
        if(e.target.tagName !== "SPAN") return
        let index = this.dots.indexOf(e.target)
  
        this.setImgs(index, this.index)
        this.setDots(index)
      }
  
      this.pre.onclick = e => {
        this.setImgs(this.preIndex, this.index)
        this.setDots(this.preIndex)
  
      }
  
      this.next.onclick = e => {
        this.setImgs(this.nextIndex, this.index)
        this.setDots(this.nextIndex)
      }
    }
  
    setDots(index) {
      this.dots.forEach(dot => dot.classList.remove("active"))
      this.dots[index].classList.add("active")
    }
  
    setImgs(toIndex, fromIndex) {
      this.animation(this.imgs[fromIndex], this.imgs[toIndex], () => {
        this.imgs.forEach(img => img.style.zIndex = 1)
        this.imgs[toIndex].style.zIndex = 10
      })
    }
  }
  
  function fade(from, to, onFinish) {
  
    // 1️⃣让元素消失/显现，我们需要的几个变量；
  
    let opacityOffsetFrom = 1 /*
                              1️⃣-①：定义一个变量 opacityOffsetFrom，
                              表示要消失元素 opacity 值为 1；
                               */
  
    let opacityOffsetTo = 0 /*
                            1️⃣-②：定义一个变量 opacityOffsetTo，
                            表示要显现元素 opacity 值为 0；
                             */
  
    let step = 0.04 // 1️⃣-③：定义一个变量 step，表示每一次透明度变化的值为 0.04；
  
    from.style.zIndex = 10 // 1️⃣-④：设置要消失元素的 z-index 为 10（所有元素中最大）；
  
    to.style.zIndex = 9 // 1️⃣-⑤：设置要显现元素的 z-index 为 9 （小于消失元素，大于其他元素）；
  
  
    function fromAnimation() { // 2️⃣定义 fromAnimation() 函数，让第一个元素渐变消失；
  
      if(opacityOffsetFrom > 0) { // 2️⃣-①：当要消失元素的透明度大于 0 时；
  
        // 2️⃣-②：设置要消失元素的透明度值为每次的透明度值再减去 step；
        opacityOffsetFrom -= step
        from.style.opacity = opacityOffsetFrom
  
        requestAnimationFrame(fromAnimation) /*
                                             2️⃣-③：使用 requestAnimationFrame
                                             优化动画执行效果；
                                              */
  
      }else {
  
        from.style.opacity = 0 // 2️⃣-④：直到透明度值不大于 0 时，设置要消失元素透明度为 0；
      }
    }
  
  
    function toAnimation() { // 3️⃣定义 toAnimation() 函数，让第二个元素渐变显现；
  
      if(opacityOffsetTo < 1) { // 3️⃣-①：当要显示元素的透明度小于 1 时；
  
        // 3️⃣-②：设置要显示元素的透明度值为每次的透明度值再加上 step；
        opacityOffsetTo += step
        to.style.opacity = opacityOffsetTo
  
        requestAnimationFrame(toAnimation) /*
                                           3️⃣-③：使用 requestAnimationFrame
                                           优化动画执行效果；
                                            */
      }else {
  
        to.style.opacity = 1 // 3️⃣-④：直到透明度值不小于 1 时，设置要消失元素透明度为 1；
  
        onFinish() // 3️⃣-⑤：动画完成，执行 onFinish()。
      }
    }
  
    // ❗️执行两个动画。
    fromAnimation()
    toAnimation()
  }
  
  document.querySelectorAll(".carousel").forEach(carousel => new Carousel(carousel, fade))