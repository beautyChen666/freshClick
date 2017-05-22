/**
 * Created by 王海东 on 2017-02-16.
 * 自定义http拦截器
 */
angular.module('starter.interceptor', [])
  .factory('httpInterceptor', function ($q) {
    return {
      request: function (config) {
        var url = config.url;
        if (url.indexOf('http') >= 0 || url.indexOf('https') >= 0) {
          var guid = new Date().Format("yyyyMMddhhmmss") + getRandomCode();
          //console.log(new Date().Format("yyyyMMddhhmmss"),guid);
          config.headers['user-account'] = "A47B86B0D408DE3F";
          config.headers['user-certification'] = encryptAes(guid + url);
        }

        /**
         * 加密
         * @param data 原始数据
         * @returns {*} 加密数据
         */
        Date.prototype.Format = function (fmt) { //author: meizz
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "y+": this.getFullYear()//年
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
        function encryptAes(data) {
          var key = CryptoJS.enc.Utf8.parse("2C4375D4ECAA45A9");
          var iv = CryptoJS.enc.Utf8.parse("CC0370D2C2FE547A");
          var srcs = CryptoJS.enc.Utf8.parse(data);
          var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
          return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        }

        /**
         * 获取随机数
         * @returns {number}
         */
        function getRandomCode() {
          var code = Math.floor(Math.random() * 10000000000);
          while (true) {
            if (code < 1000000000) {
              code = Math.floor(Math.random() * 10000000000);
            } else {
              break;
            }
          }
          return code;
        }

        return config || $q.when(config);
      },
    };
  });
