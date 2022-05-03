class fangda {
  constructor() {
    document.querySelector('.jieshao').addEventListener(
      'mouseenter', this.enterHandler.bind(this)
    )
    document.querySelector('.jieshao').addEventListener(
      'mousemove', this.moveHandler.bind(this)
    )
    document.querySelector('.jieshao').addEventListener(
      'mouseleave', this.leaveHandler.bind(this)
    )
  }

  enterHandler(e) {
    console.log(e.target.childNodes[1]);
    let res = e.target.childNodes[1].childNodes[1]
    console.log(res);
    if (res.classList.contains('uio') == true) {
      res.setAttribute('zoomed', 1)
      // console.log(111);
    }
    // console.log(111);
  }

  moveHandler(e) {
    // console.log(222);
    let rect = e.target.getBoundingClientRect()
    let x = e.offsetX / rect.width
    let y = e.offsetY / rect.height
    e.target.style.setProperty('--x',x)
    e.target.style.setProperty('--y',y)
  }

  leaveHandler(e) {
    let res = e.target.childNodes[1].childNodes[1]
    // console.log(res);
    if (res.classList.contains('uio')) {
      res.removeAttribute('zoomed', 1)

    }
  }


}


new fangda


// document.querySelector('.jieshao').addEventListener(
//   'mouseenter', enterHandler
// )
// document.querySelector('.jieshao').addEventListener(
//   'mousemove', moveHandler
// )
// document.querySelector('.jieshao').addEventListener(
//   'mouseleave', leaveHandler
// )

// function enterHandler(e) {
//   console.log(e.target.childNodes[1].childNodes[1].nodeName);
//   let res = e.target.childNodes[1].childNodes[1]
//   console.log(res);
//   if (res.classList.contains('uio')) {
//     res.setAttribute('zoomed', 1)
//     // console.log(111);
//   }
//   // console.log(111);
// }

// function moveHandler() {
//   // console.log(222);
// }

// function leaveHandler(e) {
//   let res = e.target.childNodes[1].childNodes[1]
//   // console.log(res);
//   if (res.classList.contains('uio')) {
//     res.removeAttribute('zoomed', 1)

//   }
// }