// var json = [
//     {fname: "Vishal", lname: "verma",phoneno:"+919971792703"},
//     {fname: "Ravi", lname: "verma",phoneno:"+919971792703"},
//     {fname: "Rahul", lname: "kashyap",phoneno:"+919971792703"},
//     {fname: "Sudhir", lname: "chitkara",phoneno:"+919971792703"},
//     {fname: "Kunal", lname: "bansal",phoneno:"+919971792703"}
// ];

function contactList(array) {
    var $div = $("<div class='list-group pt-2 w-100' style='text-align:center;' ></div>");
    for (var i = 0; i < array.length; i++) {
        var a = $("<a href='#' class='list-group-item' style='background-color: #eee;' data-param='" + JSON.stringify(array[i]) + "'>" + array[i].fname + " " + array[i].lname + "<span class='badge badge-pill text-muted bg-light align-text-bottom'>" + array[i].phoneno + "</span></a>");

        $div.append(a);

        a.click(function (event) {
            event.preventDefault();
            var data = $(this).data("param");
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/sendinfo',
                success: function (data) {
                    console.log(data);
                    window.location.href = "/second";
                }
            });

        });

    }
    return $div;
}
function messageList(array) {
    var $div = $("<div class='list-group pt-2 w-100' style='text-align:center;' ></div>");
    if ( array && array.length) {
        for (var i = 0; i < array.length; i++) {
            var li = $("<div class=list-group-item' style='background-color: #eee;'></div>");
            var name = $("<span style='float:left;'>" + array[i].info.fname + " " + array[i].info.lname + "</span>");
            var time = $("<span style='float:right;'>" + array[i].time + "</span>");
            var otp = $("<p style='float:left;' class='badge badge-pill bg-light text-muted ml-2'>" + "OTP:-" + array[i].OTP + "</p>");

            var row1 = $("<div class='clearfix'></div>");
            row1.append(name);
            row1.append(time);
            li.append(row1);
            li.append(otp);
            $div.append(li);
        }
    }
    else {
        $div.append($("<div class='text-muted mt-5 mx-auto'>No Sent messages</div>"));
    }
    return $div;
}


function renderLists(type) {
    if (type === "contacts") {
        var data = contacts;
        !$("#contactsList").children().length && $("#contactsList").append(contactList(data));
    }
    else {
        var data = localStorage.getItem('messagehistory');
        if (data && data !== "[object Object]" && data !== "null") {
            data = JSON.parse(data);
            data = data.messages;

        }
        else data = null;
        !$("#messagesList").children().length && $("#messagesList").append(messageList(data));
    }
}

function showList(e) {
    e.preventDefault();
    var $contacts = $(".contacts");
    var $messages = $(".messages"); 
    if ($(e.target).data('type') === "contacts") {
        $contacts.removeClass("text-muted");
        $contacts.addClass("border-bottom border-primary");
        $messages.removeClass("border-bottom border-primary");
        $messages.addClass("text-muted");
        $("#messagesList").slideUp();
        $("#contactsList").slideDown();
    }
    else {
        $messages.removeClass("text-muted");
        $messages.addClass("border-bottom border-primary");
        $contacts.removeClass("border-bottom border-primary");
        $contacts.addClass("text-muted");
        $("#contactsList").slideUp();
        $("#messagesList").slideDown();
    }
}

$(document).ready(function () {
    renderLists("contacts");
    renderLists("messages");
})