// 获取url 后参数
 exports.getQueryString = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var u = decodeURIComponent(window.location.search).substr(1).match(reg)
    if (u != null) {
      return unescape(u[2])
    }
    return null
  }
  
  // 获取urlencode 参数值
  exports.getEncodeVal = function (str, name) {
    var r = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var t = str.match(r)
    if (t != null) {
      return unescape(t[2])
    }
    return null
  }
  
  // 获取cookie
  exports.getCookie = function (name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  }
  
  // 去空格
  exports.trim = function (str, isG) {
    var reg = isG ? /\s/g : /(^\s+)|(\s+$)/g
    return str.replace(reg, '')
  }
  
  // 验证手机号
  exports.isTelPhone = function (tel) {
    var regPhone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if (!regPhone.test(tel)) {
      return false
    } else {
      return true
    }
  }
  
  // 验证身份证
  exports.identityCodeValid = function (code) {
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    }
    // var tip = ''
    var pass = true
    if (!code || !/(^\d{17}(\d|X)$)/.test(code)) {
      // tip = '请填写正确的身份证号1'
      pass = false
    } else if (!city[code.substr(0, 2)]) {
      // tip = '请填写正确的身份证号2'
      pass = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length === 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        // var last = parity[sum % 11]
        if (String(parity[sum % 11]) !== code[17]) {
          // tip = '请填写正确的身份证号3'
          pass = false
        }
      }
    }
    return pass
  }
  
  /**
   * 计算两个日期段相差的天数
   * @param sDate1 开始日期
   * @param sDate2 结束日期
   */
  exports.dateDiff = function (sDate1, sDate2) {
    var aDate
    var oDate1
    var oDate2
    var iDays
    aDate = sDate1.split('-')
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    aDate = sDate2.split('-')
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate2 - oDate1) / 1000 / 60 / 60 / 24)
    return iDays
  }
  
  /**
   * 获取两个时间段日期列表
   * @param  {[type]} sDate1 [description]
   * @param  {[type]} sDate2 [description]
   * @return {[type]}        [description]
   */
  exports.dateScope = function (sDate1, sDate2) {
    var getDate = function (str) {
      var tempDate = new Date()
      var list = str.split('-')
      tempDate.setFullYear(list[0])
      tempDate.setMonth(list[1] - 1)
      tempDate.setDate(list[2])
      return tempDate
    }
    var date1 = getDate(sDate1)
    var date2 = getDate(sDate2)
    if (date1 > date2) {
      let t = date1
      date1 = date2
      date2 = t
    }
    date1.setDate(date1.getDate())
    var dateArr = []
    var i = 0
    while (!(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate())) {
      var dayStr = date1.getDate().toString()
      // dateArr[i] = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + dayStr
      dateArr[i] = `${date1.getMonth() + 1}.${dayStr}`
      i++
      date1.setDate(date1.getDate() + 1)
    }
    return dateArr
  }
  
  /**
   * 日期比较大小
   * compareDateString大于dateString，返回1
   * 等于返回0
   * compareDateString小于dateString，返回-1
   * @param dateString 日期
   * @param compareDateString 比较的日期
   */
  function dateCompare (dateString, compareDateString) {
    if (isEmpty(dateString)) {
      alert('dateString不能为空')
      return
    }
    if (isEmpty(compareDateString)) {
      alert('compareDateString不能为空')
      return
    }
    // var dateTime = dateParse(dateString).getTime()
    var dateTime = new Date(dateString).getTime()
    // var compareDateTime = dateParse(compareDateString).getTime()
    var compareDateTime = new Date(compareDateString).getTime()
    if (compareDateTime > dateTime) {
      return 1
    } else if (compareDateTime === dateTime) {
      return 0
    } else {
      return -1
    }
  }
  /**
   * 判断日期是否在区间内，在区间内返回true，否返回false
   * @param dateString 日期字符串
   * @param startDateString 区间开始日期字符串
   * @param endDateString 区间结束日期字符串
   * @returns {Number}
   */
  exports.isDateBetween = function (dateString, startDateString, endDateString) {
    if (isEmpty(dateString)) {
      alert('dateString不能为空')
      return
    }
    if (isEmpty(startDateString)) {
      alert('startDateString不能为空')
      return
    }
    if (isEmpty(endDateString)) {
      alert('endDateString不能为空')
      return
    }
    var flag = false
    var startFlag = (dateCompare(dateString, startDateString) < 1)
    var endFlag = (dateCompare(dateString, endDateString) > -1)
    if (startFlag && endFlag) {
      flag = true
    }
    return flag
  }
  
  function isEmpty (str) {
    if (str === '') {
      return true
    } else {
      return false
    }
  }
  
  exports.getDateStr = function (params) {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    let nowDay = `${year}/${month}/${day}`
    let nowTimeStr = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
    if (params) {
      return nowDay
    } else {
      return nowTimeStr
    }
  }
  
  // 标准时间转换日期
  exports.formatUTCDate = function (time) {
    let Year = time.getFullYear()
    let Month = (time.getMonth() + 1) > 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)
    let Day = time.getDate() > 10 ? time.getDate() : '0' + time.getDate()
    return `${Year}-${Month}-${Day}`
  }
  
  // localStorage set expireTime
  exports.setLocalStorage = function (name, value, expireName, expireTime) {
    const expiration = new Date().getTime() + 3600 * 1000 * 24 * expireTime
    localStorage.setItem(name, value)
    localStorage.setItem(expireName, expiration.toString())
  }
  
  exports.getLocalStorage = function (name, expireName) {
    const nowTime = new Date().getTime()
    const expireTime = localStorage.getItem(expireName)
    const storageName = localStorage.getItem(name)
    if (nowTime > parseInt(expireTime)) {
      localStorage.removeItem(name)
      localStorage.removeItem(expireName)
      return null
    } else {
      return storageName
    }
  }
  
  