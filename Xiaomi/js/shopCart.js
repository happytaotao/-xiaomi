class shopCart {
  constructor() {
    // 获取详情信息
    this.getData()
    // 全选点击事件
    this.$('#quanxuan').addEventListener('click', this.allCheck.bind(this))

    // 绑定委托事件
    this.$('#content2').addEventListener('click', this.getOneChecked.bind(this))

  }
  async getData() {
    let id = localStorage.getItem('id') - 0
    let token = localStorage.getItem('token')
    console.log(id);
    axios.defaults.headers.common['authorization'] = token
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let {
      data,
      status
    } = await axios.get('http://localhost:8888/cart/list?' + 'id=' + id)
    console.log(data);
    // 判断有没有登录，没有登录跳回到登录页面
    if (status == 200) {
      if (data.code == 401 || !token || data.code == 0) {
        location.assign('./login.html?ReturnUrl=./gouwuche.html')
      } else {
        // 商品页展示
        let tr = ''
        data.cart.forEach(item => {
          tr += `
          <div class="content2 center" id="con">
            <div class="sub_content fl ">
              <input type="checkbox" value="quanxuan" class="quanxuan" />
            </div>
            <div class="sub_content fl"><img src="${item.img_small_logo}"></div>
            <div class="sub_content fl ft20">${item.title}</div>
            <div class="sub_content fl ">${item.price}元</div>
            <div class="sub_content fl">
              <input class="shuliang" type="number" value="${item.cart_number}" step="1" min="1">
            </div>
            <div class="sub_content fl" id="price">${item.goods_number*item.price}</div>
            <div class="sub_content fl"><a href="#none" style="font-size:14px; width:30px;" class="remove" id="delete" data-id="${item.goods_id}">删除</a></div>
            <div class="clear"></div>
          </div>
       
          `
        })
        this.$('#content2').innerHTML = tr
      }
    }
  }

  // 事件委托获取单选状态，改变全选
  getOneChecked({
    target
  }) {
    // !如果是单选按钮
    if (target.classList.contains('quanxuan')) {
      // console.log(target.checked);
      // 单选方法封装出去
      this.changeChenked(target)
      // 统计数量和价格
      this.numAndNumber()

    }

    // !如果是删除按钮
    if (target.getAttribute("id") == 'delete') {
      let that = this
      let del = document.querySelector('.remove')
      let goods_id = del.dataset.id
      let id = localStorage.getItem('id') - 0

      // console.log(document.querySelector('#con'));
      // 获取删除的节点
      let con = document.querySelector('#con')
      // 关闭提醒
      let layIndex = layer.open({
        title: "删除提示",
        content: '你要抛弃我吗？',
        btn: ['确定', '取消', ],
        yes: async function (index, layero) {
          //按钮【按钮一】的回调
          let res = await axios.get('http://localhost:8888/cart/remove?id=' + id + '&goodsId=' + goods_id)
          if (res.status == 200) {
            if (res.data.code == 1) {
              // 关闭弹出框
              layer.close(layIndex)
              layer.msg('商品删除成功');
              con.remove()
              // 再调用一次数量总价  此处如果用this的话指向发生变化
              // console.log(this);
              that.numAndNumber()

            }
          }

          console.log(res);



        },
        btn2: function (index, layero) {
          //按钮【按钮二】的回调

          //return false 开启该代码可禁止点击该按钮关闭
        }

      });
    }
  }


  // 全选
  allCheck(e) {
    // 获取全选状态
    // console.log(e.target.checked);
    let allChecked = e.target.checked
    // 获取单选的状态
    // this.$('#quanxuan')
    this.oneChecked(allChecked)
    // this.$('#checked').innerHTML = num
    // 数量和价格
    this.numAndNumber()
  }

  // 点击全选设置每个单选框状态
  oneChecked(checked) {
    // console.log(this.$('.quanxuan'));
    let checkStatus = this.$('.quanxuan')
    checkStatus.forEach(item => {
      item.checked = checked
    })
    // 当全选的时候，显示已选中的个数
    // console.log(this.$('.quanxuan').length);
    let cLength = this.$('.quanxuan').length
    this.$('#checked').innerHTML = cLength

  }

  // 单选按钮的状态转换
  changeChenked(target) {
    // 如果点击的是取消，有一个单选按钮状态为false，则全选为false
    if (!target.checked) {
      this.$('#quanxuan').checked = false
      return
    }
    if (target.checked) {
      // console.log(this.$('.quanxuan'));
      let res = Array.from(this.$('.quanxuan')).find(item => {
        // console.log(item.checked);
        // 每次从前向后查找，有一个没有被选中就返回一个input,当全被选中，没有被选中的单选框时，则返回underfined
        return !item.checked
      })
      // console.log(res);
      // 当找不到未选中的input时，表示单选全部选中，给全选赋值
      if (!res) this.$('#quanxuan').checked = true


    }
  }

  // 统计数量和价格
  numAndNumber() {
    // 获取每个订单，以及订单内的价格数量
    // console.log(document.querySelectorAll('.content2'));
    let goods = document.querySelectorAll('.content2')

    let totalNum = 0
    let totalPrice = 0
    let num = 0 //已选中的个数

    goods.forEach(item => {
      // 获取单选框选中状态的数量和价格
      // console.log(item.firstElementChild.firstElementChild);

      if (item.firstElementChild.firstElementChild.checked) {
        num = (++num);
        // console.log(item.querySelector('.shuliang').value);
        totalNum = item.querySelector('.shuliang').value - 0 + totalNum
        // console.log(totalNum);
        // console.log(item.querySelector('#price').innerHTML - 0);
        totalPrice = item.querySelector('#price').innerHTML - 0 + totalPrice
        // console.log(totalPrice);
      }

    })
    this.$('#totalShop').innerHTML = totalNum
    this.$('#total').innerHTML = totalPrice
    this.$('#checked').innerHTML = num

  }







  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }



}

new shopCart