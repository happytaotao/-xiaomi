class LOGIN {
  baseUrl = 'http://localhost:8888/users/login'
  constructor() {
    // 给登录绑定点击事件
    this.$('.submit').addEventListener('click', this.getLogin.bind(this))

  }
  // 点击登录
  async getLogin(e) {
    e.preventDefault();
    let form = document.forms[0]
    // 获取表单的账号输入框的值
    // console.log(form.username[0].value);
    let username = form.username[0].value.trim()
    let password = form.password.value.trim()
    let verificationCode = form.username[1].value.trim()
    if (!username || !password || !verificationCode) {
      layer.msg('请完整填写你的表单', {
        icon: 5
      })
    }
    let data = `username=${username}&password=${password}`;

    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    let res = await axios.post(this.baseUrl, data)
    console.log(res);
    if (res.status == 200) {
      if (res.code == 1) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.user.id)
        console.log(localStorage.search);

      }
    }











  }







  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }

}
new LOGIN