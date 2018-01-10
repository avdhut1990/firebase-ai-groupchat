var firebaseUserIdToken = null;
var firebaseUserLocalId = null;
var firebaseUserRefreshToken = null;
var chatRefreshLastTimestamp = 0;

var name = "";
var password = "";
var emailId = "";


var $messages = $('.messages-content');
var $chatgroups = $('.chatgroups-content');
var $chatgrouptags = $('.chatgroups-tags');
var $messageinput = $('.message-input');
var $currentChatIcon = $('.chat-title div .avatar img').attr("src");
var messageDate, messageMinutes;
var fgc;


$(window).load(function() {
	fgc = new FirebaseAIGroupChat();
	$messages.mCustomScrollbar();
	setTimeout(function() {
		fgc.triggerDFEvent("WELCOME", showLoading, parseResponse, logError);
	}, 100);

	$('.message-submit').click(function() {
		insertMessage();
	});
	
	$('#plus').click(function() {
		$('.chat').animate({height:"80vh"}, 500);
		$(this).hide(1000);
		$chatgroups.hide();
		$('#minus').show(1000);
	});
	
	$('#minus').click(function() {
		$('.chat').animate({height:"45px"}, 500);
		$(this).hide(1000);
		$chatgroups.hide();
		$('#plus').show(1000);
	});
	
	$messageinput.on('keydown', function(e) {
		if (e.which == 13) {
			insertMessage();
			return false;
		}
	});

	$messageinput.bind("change keyup input paste", function(e) {
		if ($(this).val().substr(-1,1) == "@") {
			$chatgrouptags.slideDown();
		}
		else {
			$chatgrouptags.slideUp();
		}
	});

	$(".chatgroups-tag-option").click(function() {
		$messageinput.val($messageinput.val().substring(0,-1)+$(this).text().trim());
		$chatgrouptags.slideUp();
		$messageinput.focus();
	});

	$(".chat-title div .avatar").click(function() {
		$chatgroups.slideToggle();
	});

	$(".chatgroups-option").click(function() {
		$(this).addClass("selected");
		switchChat();
	});
});


function showLoading(){
	$('<div class="message loading new"><figure class="avatar"><img src="'+$currentChatIcon+'"/></figure><span></span></div>').appendTo($('.mCSB_container'));
	updateScrollbar();
}


function parseResponse(data){
	var receivedMessage = data.result.fulfillment.speech;
	$('.message.loading').remove();
	$('<div class="message new"><figure class="avatar"><img src="'+$currentChatIcon+'"/></figure>' + receivedMessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
	setDate();
	updateScrollbar();
}


function logError(data){
	console.log("event failed");
}


function switchChat(){
	$chatgroups.slideUp();
	var sourceDiv = $(".chatgroups-option.selected");
	var headerDiv = $(".chat-title div");
	sourceHtml = sourceDiv.html();
	sourceId = sourceDiv.attr("id");
	targetHTML = headerDiv.html();
	targetId = headerDiv.attr("id");
	
	headerDiv.html(sourceHtml);
	headerDiv.attr("id", sourceId);
	sourceDiv.html(targetHTML);
	sourceDiv.attr("id", targetId);
	sourceDiv.removeClass("selected");

	$(".chat-title div .avatar").click(function() {
		$chatgroups.slideToggle();
	});

	$currentChatIcon = $('.chat-title div .avatar img').attr("src");
	$messages.mCustomScrollbar("destroy");
	$(".messages-content").html("");
	$messages.mCustomScrollbar();
	setTimeout(function() {
		fgc.triggerDFEvent("WELCOME", showLoading, parseResponse, logError);
	}, 100);
}


function updateScrollbar() {
	$messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
		scrollInertia: 10,
		timeout: 0
	});
}


function setDate(){
	messageDate = new Date();
	if (messageMinutes != messageDate.getMinutes()) {
		messageMinutes = messageDate.getMinutes();
		$('<div class="timestamp">' + messageDate.getHours() + ':' + messageMinutes + '</div>').appendTo($('.message:last'));
	}
}


function insertMessage() {
	msg = $messageinput.val();
	if ($.trim(msg) == '') {
		return false;
	}
	$('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
	setDate();
	$messageinput.val(null);
	updateScrollbar();
	setTimeout(function() {
		fgc.getDFResponse(msg, showLoading, parseResponse, logError);
	}, 1000 + (Math.random() * 20) * 100);
}