var otp = Math.floor((Math.random()*1000000)+100000);
document.getElementById('p1').innerHTML = info["fname"];
document.getElementById('message').value = "Hi! your OTP is "+otp+"";

$('form').submit(function(e){
				e.preventDefault();
				msg = $("#message").val()
				var message = {
					OTP: otp,
					time: (new Date()).toString(),
					info: info,
					msg: msg
				}
        		$.ajax({
					type: 'POST',
					data: JSON.stringify(message),
					contentType: 'application/json',
        			url: '/sendmsg',
        			success: function(response) {
						var messageHistory = localStorage.getItem('messagehistory');
						if(!(messageHistory && messageHistory !== "[object Object]" && messageHistory !== "null"))
							messageHistory = {"messages": []};
						else {
							messageHistory = JSON.parse(messageHistory);
							if(!messageHistory.messages)
								messageHistory.messages = [];
						}
							messageHistory.messages.push(message);
							localStorage.setItem('messagehistory', JSON.stringify(messageHistory));
						$("#show-response").removeClass("alert-danger").addClass("alert-success").html(response.msg);
						$("#show-response").fadeIn(1000, function(){
							window.location.href = "/first";
						})
					  },
					  error: function(err) {
						$("#show-response").addClass("alert-danger").html("ERROR: "+ err.responseJSON ? err.responseJSON.error : "Something went wrong. Please try again");
						$("#show-response").show();
						
					  } 
    			});
   		});
