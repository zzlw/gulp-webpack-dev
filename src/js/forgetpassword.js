$(function(){
  // $('#loginButton').click(function(){
  //   if(!$("#loginForm").valid()){
  //     return ;
  //   }
  //   alert('提交成功！');
  // });
  // $("#loginForm").validate({
  //         errorElement : "label",
  //         focusInvalid : false,
  //         onkeyup: false,
  //         ignore : "input:hidden:not(input:hidden.required)",
  //         rules : {
  //           username:{
  //             required:true,
  //             // number:true,
  //          },
  //           email : {
  //             required:true,
  //             email:true,
  //           },
  //         },
  //         messages:{
  //           username : {
  //             required:"<font color='#BD362F'> 请输入您的登录名称！</font>",
  //           },
  //           email : {
  //             required:"<font color='#BD362F'> 请输入你在注册时填写的邮箱地址！</font>",
  //             email:"<font color='#BD362F'> 请检查您输入的邮箱！</font>",
  //           },
  //         },
  //         errorPlacement : function(error, element){
  //                   error.appendTo(element.parent());
  //         }
  //     });
  $("#phone").focus();
  $("input").blur(function(){
				$(".spa").css("color","#BD362F")
				if($(this).is("#phone")){             //手机判断
					var ph=/^1[3|4|5|7|8|][0-9]{9}$/;
					if($("#phone").val()!=""){
						if(!(ph.test($("#phone").val()))){
							$(".spa1").text("请输入11位手机号码");
							return false;
						}else if(ph){
							$(".spa1").text("");
							return true;
						}
					}else{
						$(".spa1").text("");
					}
				}
				if($(this).is("#message")){            //验证码判断
					var ac=/^\d{6}$/;//6位数字
					if($("#message").val()!=""){
					if(!(ac.test($("#message").val()))){
						$(".spa2").text("请输入正确的验证码");
						return false;
					}else if(ac){
						$(".spa2").text("");
						return true;
					}
					}else{
						$(".spa2").text("");
					}
				}

				if($(this).is("#password")){            //密码判断
					var ps=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
					if($("#password").val()!=""){
					if(!(ps.test($("#password").val()))){
						$(".spa3").text("请输入新的密码");
						return false;
					}else if(ps){
						$(".spa3").text("");
						return true;
					}
					}else{
						$(".spa3").text("");
					}
				}
        if($(this).is("#passwordag")){            //再次密码判断
					var ps=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
					if($("#passwordag").val()!=""){
					if(!(ps.test($("#passwordag").val()))){
						$(".spa4").text("请再次输入密码");
						return false;
					}else if(ps){
						$(".spa4").text("");
						return true;
					}
					}else{
						$(".spa4").text("");
					}
				}
			})

      /** 聚焦提示 **/
			$("input").focus(function(){
				if($(this).is("#phone")){
					$(".spa1").css("color","#aaa")
				}
				if($(this).is("#message")){
					$(".spa2").text("请填写短信验证码").css("color","#aaa")
				}
				if($(this).is("#password")){
					$(".spa3").text("8到16位数字与字母组合").css("color","#aaa")
				}
        if($(this).is("#passwordag")){
					$(".spa4").text("请再次输入密码").css("color","#aaa")
				}
			})
      /** 提交验证 **/
			$("#loginButton").click(function(){
				var ph=/^1[3|4|5|7|8|][0-9]{9}$/;    //手机号正则
				var ps=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;     //密码正则
        var ac=/^\d{6}$/;  //验证码正则
				if(ph.test($("#phone").val())&&ac.test($("#message").val())&&ps.test($("#password").val())&&ps.test($("#passwordag").val())){
          alert('找回密码成功');
				}else{
					if($("#message").val()==""){
						$(".spa1").text('请填写验证码')
					}
					if($("#phone").val()==""){
						$(".spa2").text('请填写手机号码')
					}
					if($("#password").val()==""){
						$(".spa3").text('请填写密码')
					}
          if($("#passwordag").val()==""){
						$(".spa4").text('请再次填写密码')
					}
					return false;
				}
			})
/** 点击input改变输入框背景颜色 **/

  $(".form-control").focus(function(){
            $(this).css("background","#ececec");
        });
  $(".form-control").blur(function(){
            $(this).css("background","white");
        });

  $('input:checkbox').click(function(){
          $(this).toggleClass("checked");
        });


    /** 发送验证码 **/
    $.sends = {
            checked:1,
            send:function(){
              var numbers = /^1[3|4|5|7|8|][0-9]{9}$/;
              var val = $('#phone').val().replace(/\s+/g,""); //获取输入手机号码
              if(numbers.test(val)){
                var time = 30;
                $('.authCode span').remove();
                function timeCountDown(){
                  if(time==0){
                    clearInterval(timer);
                    $('#authCodeSend').css('background',"#d2d2d2").addClass('send1').removeClass('send0').val("发送验证码").attr("disabled",false);
                    sends.checked = 1;
                    return true;
                  }
                  $('#authCodeSend').val(time+"S后再次发送").css('background',"#37b396").attr('disabled',true);
                  time--;
                  return false;
                  sends.checked = 0;
                }
                $('#authCodeSend').addClass('send0').removeClass('send1');
                timeCountDown();
                var timer = setInterval(timeCountDown,1000);
              }
            }
          };
  $('#authCodeSend').bind('click',function(){
      $.sends.send();
  })
})
