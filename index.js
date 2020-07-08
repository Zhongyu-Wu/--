const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)


/*
❗️分别在“点”、“上一页”和“下一页”设置当被点击时，调用 setDots(index) 和 setImgs(index) 
切换对应图片和“点”的状态。
 */
$(".carousel .dots").onclick = function(e) {
  if(e.target.tagName !== "SPAN") return
  let index = Array.from($$(".carousel .dots span")).indexOf(e.target)

  setDots(index)
  setImgs(index)
}

$(".pre").onclick = function(e) {
  let index = Array.from($$(".carousel .dots span")).indexOf($(".carousel .dots .active"))
  index = (index - 1 + $$(".carousel .dots span").length) % $$(".carousel .dots span").length

  setDots(index)
  setImgs(index)
}

$(".next").onclick = function(e) {
  let index = Array.from($$(".carousel .dots span")).indexOf($(".carousel .dots .active"))
  index = (index + 1) % $$(".carousel .dots span").length

  setDots(index)
  setImgs(index)
}

// 1️⃣封装 setDots(index) ，负责切换被点击后“点”对应的样式；
function setDots(index) {
  $$(".carousel .dots span").forEach(dot => dot.classList.remove("active"))
  $$(".carousel .dots span")[index].classList.add("active")
}

// 2️⃣封装 setImgs(index) ，负责切换至对应图片。
function setImgs(index) {
  $$(".carousel .panels a").forEach(img => img.style.zIndex = 1) 
  $$(".carousel .panels a")[index].style.zIndex = 10
}