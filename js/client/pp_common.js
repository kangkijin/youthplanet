/* 클라이언트 ui 스크립트 */
/*var sessionUserId = '';

if(sesseionUserId == ""){
   //로그인 안했을때
	console.log("로그인x");
} else {
   //로그인 했을때
	console.log("로그인o");
}*/

// header
function headerStyle(){

	// 공통
	var windowWidth = $(window).outerWidth();
	var windowHeight = $(window).outerHeight();
	
	$('.gnb_2depth').removeAttr('style'); 
	$('.gnb_3depth').removeAttr('style');
	
	// 스크롤시 header 스타일 정의
	$(window).on('scroll resize', function(){
		var scr = $(this).scrollTop();
		if ( scr > 0) {
			$('.page_wrap').addClass('on')
		} else {
			$('.page_wrap').removeClass('on')
		}
		return false;
	});
	
	if (windowWidth < 1025) {
		// console.log('tablet');
		
		//PC 이벤트 제거
		$('body').removeClass('on');
		$('.btn_menu').off('click');
		$(".gnb_list li").off("mouseenter mouseleave");
		$('.sitemap').hide();
		$(".gnb_list li").off("focusin focusout");
		$('.gnb_1depth > a').removeClass("on"); 
		$('.gnb_2depth').removeAttr('style'); 
		$('.btn_admin').prependTo('.gnb_wrap');
		$('.btn_log').prependTo('.gnb_wrap');
		$('.btn_alarm').insertAfter('.header_logo');
		$('.header.main_searchwrap').insertAfter('.subpage_visual');
		
		// mobile 기본설정   
		
		// gnb
		$('.btn_menu').on('click', function(e){
			e.stopImmediatePropagation();
			$('body').toggleClass('on');
		});
		
		// 2depth gnb
		$('.gnb_1depth > a').on('click', function(e){
			e.stopImmediatePropagation();
			var target = $(this).next('.gnb_2depth');
			
			if ( target.is(':visible') ) {
				$(this).removeClass('on');
				target.slideUp('fast');
			} else {
				$('.gnb_1depth > a').removeClass('on');
				$('.gnb_2depth').slideUp('fast');
				$(this).addClass('on');
				target.slideDown('fast');
			}
		});
		
	} else {
		// console.log('pc');
		
		//모바일 이벤트 제거
		$('body').removeClass('on');
		$('.btn_menu, .gnb_list a').off("click");
		$('.btn_menu').off('click');
		$('.search_area').stop().slideUp(200);
		$('.search_area').removeAttr('style');
		$('.sitemap').hide();
		$('.gnb_2depth').removeAttr('style'); 
		$('.gnb_3depth').removeAttr('style');
		$('.btn_admin').prependTo('.header_top');  
		$('.btn_log').prependTo('.header_left li:first-child'); 
		$('.btn_alarm').prependTo('.header_left li:last-child');
		$('.myalarm_wrap').hide();	 
		$('.header.main_searchwrap').insertAfter('.lnb_list');
		
		// 2depth gnb
		$('.gnb_1depth').on({
			'mouseenter focusin':function(){
				$(this).find('.gnb_2depth').stop().slideDown('fast');
			},
			'mouseleave focusout':function(){
				$(this).find('.gnb_2depth').stop().slideUp('fast');
			}
		});
		
		// 3depth gnb
		$('.gnb_2depth > li').on({
			'mouseenter focusin':function(){
				$(this).find('.gnb_3depth').stop().slideDown('fast');
			},
			'mouseleave focusout':function(){
				$(this).find('.gnb_3depth').stop().slideUp('fast');
			}
		});

	}
}

// 윈도우 resize 시 :
var resizeTimer;
$( window ).on( 'resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeEnd, 1000);
} );

function resizeEnd() {
	// header
	headerStyle();
}


//sitemap 
function siteMap(){
	$('.btn_sitemap').on('click', function(e){
		e.stopImmediatePropagation();
		$('body').addClass('on');
		$(".sitemap").fadeIn();
	});

	$('.btn_sitemapclose').on('click', function(e){
		e.stopImmediatePropagation();
		$('body').removeClass('on');
		$(".sitemap").fadeOut();
	});
} 


// lnb 메뉴
function lnbMenu(){
	
	// 서브 lnb 있을 경우 : 
	$(".lnb_list").children('li').each(function(){
		var target = $(this);
		target.children('a').children('span').hide();
		if ( target.find('.sub_lnb').length ) {
			$('<span>펼쳐보기</span>').appendTo( target.children('a') );
		} 
	});
	
	// 마우스오버시 하위메뉴 show/hide :
	$(".lnb_list").children('li').on({
		'mouseenter focus':function(){ 
			$(this).children('a').next().stop().slideDown(200);
		},
		'mouseleave blur':function(){ 
			$(this).children('a').next().stop().slideUp(150);
		}
	})
	
}

//페이지 상단 이동
function moveTop() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.move_top').addClass('on');
		} else {
			$('.move_top').removeClass('on');
		}
	});
	$('.move_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}

// 내알림 알림창
function myAlarm() {
	$('.myalarm_wrap').hide(); 

	$('.btn_alarm').click(function (e) {
		e.stopPropagation();
		$('.myalarm_wrap').toggle();
	});

	$('html').click(function (e) {
		if (!$(e.target).closest('.myalarm_wrap').length) {
			$('.myalarm_wrap').hide();
		}
	}); 

	$('.btn_menu, .btn_sitemap').focus(function(e) { 
		e.stopPropagation(); 
		if($('.myalarm_wrap').show()) { 
			$('.myalarm_wrap').hide();
		}
	}); 
}

// SNS 버튼
function snsBtn() { 
	const snsWrap = $('.fixed_snswrap');

	snsWrap.on('click', function(){
		if(snsWrap.hasClass('on')) {
			snsWrap.removeClass('on');
		} else {
			snsWrap.addClass('on');
		}
	}); 

	$('html').click(function (e) {
		if (!$(e.target).closest('.fixed_snswrap').length) {
			$('.fixed_snswrap').removeClass('on');
		}
	}); 
}

// 내 주변 청소년 시설 이미지탭
function mapSel(){
	var mapList = $('.mapsel_list');
	var mapCnt = $('.mapsel_cnt');
	mapCnt.find('img').hide();
	$('.' + mapList.find("input:checked").attr("data-img")).show();

	mapList.find('input').change(function() {
		var link = mapList.find("input:checked").attr("data-img");
		var mapImg = $('.' + link);
		mapCnt.find('img').not(mapImg).hide();
		mapImg.show();

		var nextSection = mapList.closest('.youth_area').next();
		if(nextSection.length > 0) {
			$('html, body').animate({
				scrollTop: nextSection.offset().top - 300
			}, 500);
		}

	});
}

// 화성시 청소년 인구현황 지도클릭
function useMapClick() {
	
	$('.map_sel').hide();
	$('.img_songsan').show();

	$('map[name="image-map"] area').on('click', function(e) {
		e.preventDefault();

		var targetImageClass = $(this).data('img');
		$('.map_sel').hide();

		var targetImage = $('.' + targetImageClass);
		if(targetImage.length > 0) {
			targetImage.show();
		}
	})
}

//swiper 메인 배너이미지
function swiperSlide1() {
	var swiper = new Swiper('.main_swiperwrap .swiper-container', {  
		loop: false, 
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	}); 
	$('.mainswiper_bottom .slide_stop').click(function(){
		if($(this).hasClass('on')) {
			$(this).removeClass('on'); 	 	 
			swiper.autoplay.start();
		}else{ 
			$(this).addClass('on');   
			swiper.autoplay.stop();
		}
	}); 
} 

//swiper 메인 하단배너바로가기
function swiperSlide2() {
	var swiper = new Swiper('.main_linkwrap .swiper-container', {  
		loop: false, 
		slidesPerView: 3,
		spaceBetween : 155,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			1279: {
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 2.4,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 1.5,
				spaceBetween: 20,
			},
		}
	}); 
} 

//swiper 메인 장비대여/공간예약
function swiperSlide3() {
	var swiper = new Swiper('.main_reservewrap .swiper-container', { 
		effect: 'fade',
		loop: true,  
		navigation: {
			nextEl: '.main_reservewrap .reserve_right',
			prevEl: '.main_reservewrap .reserve_left',
		},
	});
} 

//swiper 카드뉴스 상세 팝업
function swiperSlide3() {
	var swiper = new Swiper('.cardnews_swiper .swiper-container', {   
		navigation: {
			nextEl: '.cardnews_swiper .cardnews_right',
			prevEl: '.cardnews_swiper .cardnews_left',
		},
	});
} 

// tab : '.tab_js' 안에 '.tab_list_js' 와 '.tab_cnt_js'로 구분지어 사용.
function tab(){
	$('.tab_js').each(function(){
		var tabs = $(this).children('.tab_list_js').children('li');
		var panels = $(this).children('.tab_cnt_js').children('div');
		var lastTab = tabs.filter('.on');
		var lastPanel = $(lastTab.children('a').attr('href'));
		panels.hide();
		lastPanel.show();
		tabs.on('click',function(e){
			e.preventDefault();
			var thisTab = $(this);
			var thisPanel = $(thisTab.children('a').attr('href'));
			lastTab.removeClass('on');
			thisTab.addClass('on');
			lastPanel.hide();
			thisPanel.show();
			lastTab = thisTab;
			lastPanel = thisPanel;
		});
	})
}

// tab 모양만
function tabSwitch(){
	$('.tab_switch_js').each(function(){
		var tab = $(this).children('li');

		tab.on('click',function(e){
			e.preventDefault();
			tab.removeClass('on');
			$(this).addClass('on');
		})
	})
}

// 셀렉트 텝
function tabSelect(){
	$('.tab_js').each(function(){
		
		if ( $(this).find('.tab_select_js').is(':visible') ) {
			var tabs = $(this).find('.tab_select_js').children('select');
			var panels = $(this).children('.tab_cnt_js').children('div');
			var lastTab = tabs.children('option:selected');
			var lastPanel = $(lastTab.val());
			panels.hide();
			lastPanel.show();

			tabs.on('click',function(e){
				e.preventDefault();
				var thisTab = $(this).children('option:selected');
				var thisPanel = $(thisTab.val());
				lastTab.prop('selected',false);
				thisTab.prop('selected',true);
				lastPanel.hide();
				thisPanel.show();

				lastTab = thisTab;
				lastPanel = thisPanel;
			});
			
		}
		
	});
}

// 책갈피 기능
function bookmark () {
	$('.bookmark_js').each(function(){
		var bookmark = $(this).find('a');

		bookmark.on('click',function(e){
			e.preventDefault();
			bookmark.removeClass('on');

			var target = $(this).attr('href');

			if (target.length) {
				$(this).addClass('on');
				$('html,body').animate({
					scrollTop: $(target).offset().top - 80
				}, 'slow');
			}
		})
	})
}

// accordion : '.accordion_js' 안에 '.acd_list_js' 와 '.acd_cnt_js'로 구분지어 사용.
function accordion(){
	$('.accordion_js').each(function(){
		var acd_list = $(this).find('.acd_list_js');

		$('.acd_cnt_js').hide();

		// '.on'이 붙은 아이는 페이지 진입시 열어놓기
		acd_list.filter('.on').next('.acd_cnt_js').show();

		acd_list.on('click',function(){
			var thisList = $(this);
			var thisCnt = thisList.next('.acd_cnt_js');
			var notThisList = acd_list.not(thisList);
			var notThisCnt = notThisList.next();

			if(notThisList){
				notThisList.removeClass('on');
				notThisCnt.slideUp(300);
			}

			thisList.toggleClass('on');
			thisCnt.stop().slideToggle(300);
		});
	})
}

// 클릭시 클래스 'on' 제어
function toggleOnClick(){
	$('.on_js').on('click',function(){
		$(this).toggleClass('on');
	});
}

// hover시 클래스 'on' 제어
function toggleOnHover(){
	var windowWidth = $(window).outerWidth();
	
	if( windowWidth > 1024 ) {
		$('.hv_js').on({
			'mouseenter focusin':function(){
				$(this).addClass('on');
			},
			'mouseleave focusout':function(){
				$(this).removeClass('on');
			}
		});
	} 
}

// 스크롤 패럴럭스
function setScrollEffect(selector, extra) {
	checkVisibility();
	$(window).on('scroll resize', function() {
		checkVisibility();
	});

	function checkVisibility() {
		$(selector).each(function(){
			var target = $(this);
			var scrollTop = $(document).scrollTop();
			var minShow = target.offset().top - $(window).height() * extra;

			if ( scrollTop >= minShow ){
				target.addClass('on');
			}
		});
	}
}

// selectbox
function selectBox() {
	$('.select_form').each(function(){
		var target = $(this).children('select'); 
		var targetName = target.children('option:selected').text();
		var label = target.siblings('label');

		target.children('option:selected').attr('selected','selected');
		label.text(targetName);

		target.on('change',function(){
			var thisTarget = $(this).children('select'); 
			var thisTargetName = $(this).children('option:selected').text();
			
			/*target.children('option').removeAttr('selected');*/
			thisTarget.children('option:selected').attr('selected','selected');
			label.text(thisTargetName);
		});
	});
}

// 체크박스 토글(row) : 검색창 셀렉트박스
function checkToggleRow(){
	// 클릭시 셀렉트 박스 보여졌다 사라지는 동작
	$('.show_checktxt').on('click',function(){
		$('.check_row_wrap').slideToggle(300);
	})

	var checkBox = $('.show_checktxt');
	var check = $('input:checkbox[name=check_row]');
	var checkAll = $('input:checkbox[name=checkall_row]');
	var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
	var checkTotalCnt = $('input:checkbox[name=check_row]').length;

	// '전체'외 나머지 선택시
	check.on('change', function(){
		var checkSelected = $('input:checkbox[name=check_row]:checked');
		var checkAllSelected = $('input:checkbox[name=checkall_row]:checked');
		var showCheck = checkSelected.next().html();

		checkBox.text(showCheck);

		if(checkSelected.length == checkTotalCnt){
			check.prop('checked',false);
			checkAll.prop('checked',true);
			checkBox.text('전체');
		}else if(checkSelected.length >= 2){
			checkAllSelected.prop('checked',false);
			checkBox.text('다중선택');
		}else if(checkSelected.length >= 1){
			checkAllSelected.prop('checked',false);
			checkBox.text(showCheck);
		}else{
			checkAll.prop('checked',true);
		}
	});

	// '전체' 선택시
	checkAll.on('change', function(){
		checkAll.prop('checked',true);
		checkBox.text('전체');
		check.prop('checked',false);
	});
}

//체크박스 토글(col) : 체크박스 버튼
function checkToggleCol(){
	$('.check_col_wrapper').each(function(){
		var checkAll = $(this).find('input[name="checkall_col"]');
		var check = $(this).find('input[name="check_col"]');
		var checkTotalCnt = check.length;

		checkAll.on('change',function(){
			check.prop('checked',false);
			$(this).prop('checked',true);
		})

		check.on('change',function(){
			var checkSelected =  check.filter(':checked');
			checkAll.prop('checked',false);

			if(checkSelected.length >= checkTotalCnt){
				checkAll.prop('checked',true);
				check.prop('checked',false);
			}

		})
	})
}

//라디오 토글
function radioToggle() {
	$(".radio_toggle>input[type='radio']").click(function () {
		var previousRadio = $(this).data('storedRadio');
		if (previousRadio) {
			$(this).prop('checked', !previousRadio);
			$(this).data('storedRadio', !previousRadio);
		} else {
			$(this).data('storedRadio', true);
			$(".radio_toggle>input[type=radio]:not(:checked)").data("storedRadio", false);
		}
		if ($(this).is(":checked")){
			$(".radio_toggle").removeClass("on");
			$(this).parent().addClass("on");
		} else {
			$(this).parent().removeClass("on");
		}
	});
}

// 글자수 표기 300자 제한
function letterCount300(){
	var wrapper = $('#letter_count300');

	wrapper.find('textarea').keyup(function() {
		var countLength = $(this).val().length;
		var countLimit = 300;

		wrapper.find('#letter_counter').html(countLength + '/' + countLimit);

		if (countLength > countLimit) {
			alert('300자 이내로 작성하여 주십시오');
			$(this).val($(this).val().substr(0, countLimit));
			$('#letter_counter').html(countLimit + '/' + countLimit);
		}	
	});
	wrapper.find('textarea').keyup();
}


// input 텝키 사용
function tabEnter(){
	$('.check_row').keypress(function(e){
		if((e.keyCode ? e.keyCode : e.which) == 13){
			$(this).find('input').trigger('click');
		}
	});
}

// 답글 남기기 (토론광장)
function reply(){
	var targetBox = $('.letter_count').find('.re_tit');
	targetBox.hide();
	
	$('.btn_rereply').on('click',function(){
		var scrTop = $('.rewrite_box').offset().top;
		var txt = $(this).parent().prev().find('.re_id').text();
		
		targetBox.slideDown(300).find('span').text('@' + txt);
		
		$('body,html').animate({
			scrollTop: scrTop
		}, 800);
		return false;
	});
	
	targetBox.find('.btn_del').on('click',function(){
		$(this).parent().slideUp(300);
	});
}

// 페이징버튼 클릭시 페이지 상단부분으로 이동
function testUp(){
	var windowWidth = $(window).outerWidth();
	var target = $('.testlist_wrap').find('.testlist_move').not('.disabled');
	
	if(windowWidth < 1025) {
		target.on('click', function(e){
			if(!$(this).hasClass("disabled")) { 
				e.preventDefault(); 
				$('body,html').animate({scrollTop: 150 }, 300); 
			} 
		});
	}else {
		target.on('click', function(e){
			if(!$(this).hasClass("disabled")) { 
				e.preventDefault(); 
				$('body,html').animate({scrollTop: 200 }, 300); 
			} 
		});
	}
}

// login 팝업
function loginInput(){
	$('.login_input input').on({
		'focus' : function(){
			$(this).addClass('on');
		},
		'blur' : function(){
			if( $(this).val().length ){
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			}
		}
	});
}

//개인정보수집 동의서 
function privacy() {
  var checkAll = $('.privacy_top .check_only input');
  var checkEach = $('.privacy_footer .check_only input');

  checkAll.on('change', function() {
    console.log('전체선택 체크박스 변경: ' + $(this).prop('checked'));
    checkEach.prop('checked', $(this).prop('checked'));
  });

  checkEach.on('change', function() {
    console.log('개별 체크박스 변경: ' + $(this).prop('checked'));
    checkAll.prop('checked', checkEach.filter(':checked').length === checkEach.length);
  });
}

// 상세검색창
function searchDetails(){
	var windowWidth = $(window).outerWidth();
	
	if (windowWidth < 690) {
		// console.log('tablet,mobile');
		$('.search_box3 .btn_details').each(function(){
			var wrapper = $(this).parents('.search_box3');
			$(this).appendTo(wrapper);
		});
		$('.search_box3 .btn_details').on('click', function(){
			$(this).prev('.search_detail').slideToggle(300);
		});
	}
	
	$('.search_box3 .btn_details').on('click', function(){
		$(this).toggleClass('on');
		$(this).parent().next('.search_detail').slideToggle(300);
	});
} 

//테이블 체크 
function tableCheck() {
	$('.tbl_choice').each(function(){
		var checkAll = $(this).find('input[name="check_all"]');
		var check = $(this).find('input[name="check"]');
		var checkTotalCnt = check.length;

		checkAll.on('change',function(){
			if($(this).prop("checked") == true){
				check.prop('checked',true);
				$(this).prop('checked',true);
				check.parents('tr').addClass('bg_lightgreen');
			}else {
				check.prop('checked',false);
				$(this).prop('checked',false);
				check.parents('tr').removeClass('bg_lightgreen');
			}
		})

		check.on('change',function(){
			var checkSelected =  check.filter(':checked');

			if($(this).prop("checked") == true){
				$(this).prop('checked',true);
				$(this).parents('tr').addClass('bg_lightgreen');
			}else {
				$(this).prop('checked',false);
				$(this).parents('tr').removeClass('bg_lightgreen');
			}

			if(checkSelected.length >= checkTotalCnt){
				checkAll.prop('checked',true);
			}else {
				checkAll.prop('checked',false);
			}

		})
	})
} 

// 스크롤 패럴럭스
function setScrollEffect(selector, extra) {
	checkVisibility();
	$(window).on('scroll resize', function() {
		checkVisibility();
	});

	function checkVisibility() {
		$(selector).each(function(){
			var target = $(this);
			var scrollTop = $(document).scrollTop();
			var minShow = target.offset().top - $(window).height() * extra;

			if ( scrollTop >= minShow ){
				target.addClass('on');
			}
		});
	}
}

// 비교과 프로그램 카드(hover)
function programCardHover(){
	var windowWidth = $(window).outerWidth();
	var target = $('.program_cardtype');
	
	if( windowWidth > 1024 ) {
		$('.program_cardtype').on({
			'mouseenter focus' : function(){
				$(this).addClass('on');
			},
			'mouseleave blur' : function(){
				$(this).removeClass('on');
			}
		})
	}
	
}

// 비교과 프로그램 테이블(hover)
function programTableHover(){
	var windowWidth = $(window).outerWidth();
	
	if( windowWidth > 1024 ) {
		$('.programlist_wrap .nun_tit').on({
			'mouseenter focus' : function(){
				$(this).parents('ul').addClass('on');
			},
			'mouseleave blur' : function(){
				$(this).parents('ul').removeClass('on');
			}
		});
	}
}

// 방문상담 셀렉트 포커스 
function selectFocusOn(){
	$('.selectfocus_js select').on({
		'focusin' : function(){
			$(this).parent().addClass('on');
		},
		'focusout' : function(){
			$(this).parent().removeClass('on');
		}
	});
	$('.selectfocus_js select option').on('click', function(){
		$(this).parent().focusout();
	});
}

// 취업상담 상담사 선택
function selectCounselor() {
	$('.counselor_card .check_row input[type="radio"]').click(function () {
		// 버튼 클릭시 상담사 박스 on/off
		$('.counselor_card').removeClass('on');
		$(this).parents('.counselor_card').addClass('on');
	});
}

// 상담이력 테이블 - 버튼에 호버시 테이블 row on/off
function tableHover(){
	var windowWidth = $(window).outerWidth();
	
	if (windowWidth > 1024) {
		$('.tbl_hover_js table a, .tbl_hover_js table button').parents('td').on({
			'mouseenter focus' : function(){
				$(this).parents('tr').css('background','#f0f3f7');
			},
			'mouseleave blur' : function(){
				$(this).parents('tr').css('background','#fff');
			}
		});
	}
}

// 상담 가능 시간 팝업
function scheduleSelect(){
	var target = $('.schedule_wrap .counsel_status input').not(':disabled');
	var targetSelected = $('.schedule_wrap .counsel_status input:checked');
	targetSelected.parent().parent('td').addClass('on');
	
	target.on('click',function(){
		target.prop('checked',false).parent().parent('td').removeClass('on');
		$(this).prop('checked',true).parent().parent('td').addClass('on');
	});
}

// 테이블 스크롤 커스텀
function tableScroll() {
	// 모바일 기기 접속 여부 체크 후 PC일때만 스크롤 mCustomScrollbar 실행
	var filter = "win16|win32|win64|mac|macintel";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			//alert('모바일');
			//테이블 스크롤  커스터마이징 해제
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar("destroy");
		} else {
			//alert('PC');
			//테이블 스크롤  커스터마이징
			$(".scrollx_tbl_xxl, .scrollx_tbl_xl, .scrollx_tbl_lg, .scrollx_tbl_md, .scrollx_tbl_sm, .scrollx_tbl_xs").mCustomScrollbar({
				axis: "x",
				theme: "dark",
				advanced: {
					autoExpandHorizontalScroll: true,
					updateOnContentResize: true
				}
			});
		}
	}
}


// IE 버전 체크 (UserAgent)
var ua = navigator.userAgent.toLowerCase();
// IE7엔 브라우저 엔진명인 Trident가 없고 IE11엔 MSIE란 문자열이 없으므로 두 가지 경우를 모두 체크.
if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
	var version = 11;
	ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
	if( ua )
	{
		version = parseInt( ua[ 1 ] );
	}
	var classNames = '';
	// 기존 방식에 is-ie 라는 클래스 추가
	classNames += ' is-ie';
	// 기존 방식에 현재 버전 클래스 추가
	classNames += ' ie' + version;
	for( var i = version + 1; i <= 11; i++ ) {
		classNames +=  ' lt-ie' + i;
	}
	// html 태그에 클래스 추가
	document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
}

$(document).ready(function () {
	
	// header
	headerStyle(); 

	//sitemap 
	siteMap(); 
	
	// lnb 메뉴
	lnbMenu();

	//페이지 상단으로 이동
	moveTop();

	
	// 내알림 알림창
	myAlarm();

	// SNS 버튼
	snsBtn();

	// 내 주변 청소년 시설
	mapSel();

	// 화성시 청소년 인구현황 지도클릭
	useMapClick();

	//swiper
	swiperSlide1();  
	swiperSlide2();  
	swiperSlide3();  

	//swiper 카드뉴스 상세 팝업
	swiperSlide3();

	// tab 기본
	tab();

	// tab 모양만
	tabSwitch();

	// 셀렉트 텝
	tabSelect();
	
	// 책갈피 기능
	bookmark(); 

	// accordion
	accordion();
	
	// 클릭시 클래스 'on' 제어
	toggleOnClick();

	// hover시 클래스 'on' 제어
	toggleOnHover();

	// 스크롤 패럴럭스
	setScrollEffect('.fadeup', 1.1);
	setScrollEffect('.fadein', 1.1);
	setScrollEffect('.fadeleft', 1.1);
	setScrollEffect('.faderight', 1.1);
	
	// selectbox
	selectBox();

	// 체크박스 토글(row) : 검색창 셀렉트박스
	checkToggleRow();

	//체크박스 토글(col) : 체크박스 버튼
	checkToggleCol();

	//라디오 토글
	radioToggle();

	// 글자수 표기
	letterCount300();
	
	// input 텝키 사용
	tabEnter();
	
	// 답글 남기기 (토론광장)
	reply();

	// 페이징버튼 클릭시 페이지 상단부분으로 이동
	testUp();
	
	// login 팝업
	loginInput();
	
	//개인정보수집 동의서  
	privacy();

	// 상세검색창
	searchDetails(); 

	//테이블 체크
	tableCheck();

	// 스크롤 패럴럭스
	setScrollEffect('.fadeup', 1.1);
	setScrollEffect('.fadein', 1.1);
	
	// 비교과 프로그램 카드(hover)
	programCardHover();
	
	// 비교과 프로그램 테이블(hover)
	programTableHover();
	
	// 방문상담 셀렉트 포커스 
	selectFocusOn();
	
	// 취업상담 상담사 선택
	selectCounselor();
	
	// 상담이력 테이블 - 버튼에 호버시 테이블 row on/off
	tableHover();
	
	// 상담 가능 시간 팝업
	scheduleSelect();
	
	$(window).on('resize', function () {
		headerStyle();
	});
	
	// 브라우저 알림창 닫기
	$(".browser_alert_close").on("click", function() {
		$("#browser_alert").slideUp();
	});

	// select2 설정
	$(".sel_search_row select").select2({
		formatNoMatches: function() {
			return '결과가 없습니다.';
		}
	});

	// 이미지 라이트박스
	$('.openimg').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		callbacks: {
			resize: changeImgSize,
			imageLoadComplete: changeImgSize,
			change: changeImgSize
		}
	});

	function changeImgSize() {
		var img = this.content.find('img');
		img.css('max-height', '100%');
		img.css('height', 'auto');
		img.css('width', 'auto');
		img.css('max-width', '810px');
	}

});


$(window).on("load", function () {
	tableScroll();
});

// outline 설정 - 키보드로 접근시엔 아웃라인을 보여주고 마우스로 접근할때는 아웃라인을 없애줌
(function (d) {
	var style_element = d.createElement('STYLE'),
		dom_events = 'addEventListener' in d,
		add_event_listener = function (type, callback) {
			// Basic cross-browser event handling
			if (dom_events) {
				d.addEventListener(type, callback);
			} else {
				d.attachEvent('on' + type, callback);
			}
		},
		set_css = function (css_text) {
			// Handle setting of <style> element contents in IE8
			!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
		};

	d.getElementsByTagName('HEAD')[0].appendChild(style_element);

	// Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
	/*add_event_listener('mousedown', function () {
		set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
	});*/
	add_event_listener('keydown', function () {
		set_css(':focus{outline:dotted 1px #193296}::-moz-focus-inner{border:dotted 1px #193296;}');
	});
})(document);


