class Carousel {
    constructor(root) {
      this.root = root
      this.dotsCt = root.querySelector(".dots")
      this.dots = Array.from(root.querySelectorAll(".dots > span"))
      this.imgs = Array.from(root.querySelectorAll(".panels > a"))
      this.pre = root.querySelector(".pre")
      this.next = root.querySelector(".next")
  
      this.bind()
    }
  
    bind() {
      this.dotsCt.onclick = e => {
        if(e.target.tagName !== "SPAN") return
        let index = this.dots.indexOf(e.target)
  
        this.setDots(index)
        this.setImgs(index)
      }
  
      // 1️⃣给 .pre 和 .next 绑定事件，依然使用箭头函数；
      this.pre.onclick = e => {
  
        // 2️⃣index 的值，从 root 下去找到 dots 中有 active 类名的元素；
        let index = this.dots.indexOf(this.root.querySelector(".dots .active"))
  
        index = (index - 1 + this.dots.length) % this.dots.length
  
        this.setDots(index)
        this.setImgs(index)
      }
  
      this.next.onclick = e => {
        let index = this.dots.indexOf(this.root.querySelector(".dots .active"))
        index = (index + 1) % this.dots.length
  
        this.setDots(index)
        this.setImgs(index)
      }
    }
  
    setDots(index) {
      this.dots.forEach(dot => dot.classList.remove("active"))
      this.dots[index].classList.add("active")
    }
  
    setImgs(index) {
      this.imgs.forEach(img => img.style.zIndex = 1)
      this.imgs[index].style.zIndex = 10
    }
  }
  
  document.querySelectorAll(".carousel").forEach(carousel => new Carousel(carousel))