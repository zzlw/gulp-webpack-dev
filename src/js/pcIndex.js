var target= "http://mp.duduapp.net";
$(function(){
  require("Headhesive");
  //退出功能
  $(".app_nav_con_nav_list_ul_lituichu").find(".right").click(function(){
    if(window.confirm('你确定要退出登录吗？')){
       $.cookie("token", '', { expires: -1, path: "/" });
       window.location.href="/app/app-login";
     }
  })

  //登录退出服务
  var UserInfo = {
    exchange: function(login){   //刷新令牌

      var that = this;
      $.ajax({
         type: "POST",
         headers: {
           "Authorization": "Bearer " + login.token,
         },
         url: target + '/web/token-refresh',
         success: function(data){

           if(!data.error){
             var cookie = { token: data.token, timestamp: new Date().getTime() };
             $.cookie("token", JSON.stringify( cookie ), { path: "/" });
             that.getInfo( cookie );  //获取用户信息
           }else{
             alert(data.message)
           }
         },
         error: function (result){
          if(result.responseJSON.error=="token_expired"||result.responseJSON.error=="token_not_provided"){
            $.cookie("token", "", { path: "/" });
            alert("登录已过期，请重新登录！,错误信息："+result.responseJSON.error);
            window.location.href="/app/app-login";
          }
        }
      })
    },
    getInfo: function(login){    //获取用户信息
      $.ajax({
         type: "GET",
         url: target + '/web/user-info',
         headers: {
              "Authorization": "Bearer " + login.token,
         },
         success: function(info){

           if(!info.error){
             $(".app_nav_con_nav_list_ul_lituichu").show().find(".left").text(info.data.email);
             $(".app_nav_con_nav_list_ul_lidenglu").hide();
           }else{
             alert(info.message)
           }
         },
         error: function (result){
           if(result.responseJSON.error=="token_expired"||result.responseJSON.error=="token_not_provided"){
             alert("登录已过期，请重新登录！,错误信息："+result.responseJSON.error);
             window.location.href="/app/app-login";
           }
        }
      })
    },
    login: function(){    //判断用户状态
      var that = this;

      var login = $.cookie("token")&&JSON.parse($.cookie("token"));

      if( login ){//1800000
        if( new Date().getTime() - login.timestamp > 1800000 ){
          that.exchange( login );  //交换 token
        }else{

          that.getInfo( login );  //获取用户信息
        }
      }else {
        $(".app_nav_con_nav_list_ul_lituichu").hide();
        $(".app_nav_con_nav_list_ul_lidenglu").show();
      }
    }
  }

  UserInfo.login();

  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.jt-next',
      prevButton: '.jt-prev',
      spaceBetween: 30,
      hashnav: true,
      hashnavWatchState: true
  });

  /*回到顶部开始*/
  $(function(){

      $("body").prop({
        "id":"top",
        "name":"top"
      });

      $('a[href*="#"],area[href*="#"]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
          if ($target.length) {
            var targetOffset = $target.offset().top;
            $('html,body').animate({
              scrollTop: targetOffset
            },
            600);
            return false;
          }
        }
      });
    })
  /*回到顶部结束*/

  // Set options
  var options = {
      offset: '#showHere',
      offsetSide: 'top',
      classes: {
          clone:   'banner--clone',
          stick:   'banner--stick',
          unstick: 'banner--unstick'
      }
  };

  // Initialise with options
  var banner = new Headhesive('.banner', options);

  // Headhesive destroy
  // banner.destroy();

})
