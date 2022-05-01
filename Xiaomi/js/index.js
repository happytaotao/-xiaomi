class Problem {
  //请求的基础地址，设置为属性
  baseUsrl = 'http://localhost:3000/problem';
  // 构造方法,new类的时候,直接调用
  constructor() {
    // 调用获取数据的方法
    this.getData()
    this.bindEve();

  }
  bindEve() {
    Problem.$$(".all-sort-list2").addEventListener('click', this.btn.bind(this))
    Problem.$$(".all-sort-list2").addEventListener('mouseover', this.move.bind(this))
    Problem.$$(".all-sort-list2").addEventListener('mouseout', this.out.bind(this))
    // Problem.$$("#xg").addEventListener('click', this.btn2.bind(this))

  }


  async getData() {
    let res = await axios.get(this.baseUsrl)
    let {
      data
    } = res

    // console.log(data);
    let tr = ''
    data.forEach((item) => {
      tr += `
     <li>
         <a href="#none" data-id = ${ item.categoryId }>${item.categoryName}</a>
         <div class="pop">`
      item.categoryChild.forEach(item2 => {
        tr += `
            <div class="left fl">
              <div>
                <div class="xuangou_left fl">
                  <a href="#none" target="_blank" data-id = ${ item2.categoryId } id='xg'>
                    <div class="img fl"><img src="./image/xm6_80.png" alt=""></div>
                    <span class="fl">${item2.categoryName}</span>
                    <div class="clear"></div>
                  </a>
                </div>
              
              </div>
            </div>
          
          `
      })
      tr += `</div>
     </li>
     
     
     `
      Problem.$$('.all-sort-list2').innerHTML = tr
    })

  }


  btn(e) {
    let target = e.target
    console.log(target.nodeName);
    if (target.nodeName == 'A') {
      // console.log(target.getAttribute('data-id'));
      window.location.href = '../liebiao.html'
    }
    if (target.nodeName == 'LI') {
      window.location.href = '../liebiao.html'
    }
    if (target.nodeName == 'SPAN' || 'IMG') {
      window.location.href = '../liebiao.html'
    }
  }
  move(e) {
    // console.log(e.target);
    let target = e.target
    if (target.nodeName == 'SPAN') {
      let sham = target.parentNode
      // console.log(sham);
      // console.log(sham);
      target.style.background = 'pink'
      // sham.forEach

    }
  }
  out(e) {
    let target = e.target
    if (target.nodeName == 'SPAN') {
      let sham = target.parentNode
      // console.log(sham);
      // console.log(sham);
      target.style.background = 'none'
      // sham.forEach

    }
  }



  static $$(ele, all = false) {
    // return all ? document.querySelectorAll(ele) : document.querySelector(ele);
    let res = document.querySelectorAll(ele);
    // console.log(res);
    //通过长度判断获取到的是否为单个节点
    // 获取到的是单个元素, 则返回下标为0
    // 否则就返回所有
    return res.length == 1 ? res[0] : res;
  }
}

new Problem;