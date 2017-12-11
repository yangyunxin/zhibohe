function getLocalTime(nS) { 
return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,10)
} 


$(function(){

	$(".search-header").find("input").focus();
	//解决移动端300ms延迟
	FastClick.attach(document.body);

	//左侧菜单滑动
	var width = $("#menu").width();
	if ($('#side-trigger').length) {
		var slideout = new Slideout({
			'panel': document.getElementById('panel'),
			'menu': document.getElementById('menu'),
			'padding': width,
			'tolerance': 70,
			'side': 'right',
			'touch': false
		});
		$('#side-trigger').on('click', function() {
			slideout.toggle();
		});
		function close(eve) {
			eve.preventDefault();
			slideout.close();
		}

		/*解决右侧滑动左侧随着滑动问题*/
		 function fixedBody() {
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;';
		}

		function looseBody() {
			var body = document.body;
			body.style.position = '';
			var top = body.style.top;
			document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
			body.style.top = '';
		}

		var fixed = document.querySelector('.header');
		slideout.on('translate', function(translated) {
			fixed.style.transform = 'translateX(' + translated + 'px)';
			fixed.style.webkitTransform = 'translateX(' + translated + 'px)';
		});

		slideout.on('beforeopen', function () {
			this.panel.classList.add('panel-open');
			fixed.style.transition = 'transform 300ms ease';
			fixed.style.transform = 'translateX(' + -width + 'px)';
			fixed.style.transform = 'translateX(' + -width + 'px)';
			fixed.style.webkitTransition = 'transform 300ms ease';
			fixed.style.webkitTransform = 'translateX(' + -width + 'px)';
			fixed.style.webkitTransform = 'translateX(' + -width + 'px)';
		});

		slideout.on('beforeclose', function () {
			this.panel.classList.remove('panel-open');
			this.panel.removeEventListener('click', close);
			fixed.style.transition = 'transform 300ms ease';
			fixed.style.transform = 'translateX(0px)';
			fixed.style.webkitTransition = 'transform 300ms ease';
			fixed.style.webkitTransform = 'translateX(0px)';
		});

		slideout.on('open', function () {
			fixedBody();
			$("img.lazy").lazyload({
				threshold : 200,
				effect : "fadeIn",
				container: $(".cate-list"),
			})
			this.panel.addEventListener('click', close);
			fixed.style.transition = '';
		});

		slideout.on('close', function () {
			looseBody();
			fixed.style.transition = '';
			fixed.style.webkitTransition = '';
		});
	}

	//图片懒加载
	if ($("img.lazy").length) {
		$("img.lazy").each(function () {
			$(this).lazyload({
				threshold : 200,
				effect : "fadeIn",
				skip_invisible : true
			});
		});
	}
	
	$('.slide').swipeSlide({
		lazyLoad: true,
        continuousScroll:true,
        speed : 3000,
        transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        callback : function(i){
            $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });

    
	
	/*热度排行*/
	$(".rank-contr").on("click", function (e) {
		e.preventDefault();
		if ($(this).parents(".rank-item-top").siblings(".rank-item-bottom").hasClass("none")) {
			$(".rank-bd").find(".rank-contr span").removeClass("cur");
			$(this).find("span").addClass("cur");
			$(this).parents(".rank-item-top").siblings(".rank-item-bottom").removeClass("none");
			$(this).parents("li").siblings("li").find(".rank-item-bottom").addClass("none");
		} else {
			$(this).parents(".rank-item-top").siblings(".rank-item-bottom").addClass("none");
			$(this).find("span").removeClass("cur");
		}
	});

	/*点击搜索*/
	//插入历史记录
	var searchList = localStorage.getItem("searchHistory") ? localStorage.getItem("searchHistory").split(",") : [];
	var historyItem = '';
	//倒序
	for (var i = searchList.length - 1; i >= 0; i--) {
		historyItem += '<a herf="/s_'+searchList[i]+'/">' + searchList[i] + '</a>';
	}
	$(".search-history").append($(historyItem));

	function search(val) {
		if (val) {
			var index = searchList.indexOf(val);
			//如果存在，需要删除重新排位
			if (index != -1) {
				searchList.splice(index, 1);
			}
			//如果数组里面不存在这个词，直接push进去
			searchList.push(val);
			window.location.href = "/s_" + val + "/";
		}
		
		//写入本地
		localStorage.setItem("searchHistory", searchList);
	}
	$("#searchText").on("keydown", function (e) {
		if (e.which == 13) {
			search($.trim($("#searchText").val()));
		}
	});
	$(".search-btn").on("click", function () {
		search($.trim($("#searchText").val()));
	});

	//热门搜索点击
	$(".search-hot").on("click", "a", function () {
		var val = $(this).text();
		search(val);
	});

	//搜索记录点击
	$(".search-history").on("click", "a", function () {
		var val = $(this).text();
		search(val);
	});
	//删除记录
	$(".delete-search").on("click", function () {
		searchList = [];
		localStorage.removeItem("searchHistory");
		$(".search-history").empty();
	});


	//检测视频有播放资源
	var video = document.getElementById("video");
	if (video) {
		video.addEventListener("durationchange", function () {
			$(".video-default").hide();
			$("#video").show();
			$(".cur-video-img").hide();
		});

		//需要把src写的video才能触发error事件！！！！判断在播还是url问题

		video.addEventListener("error", function (err) {
			if (err) {
				$(".video-default").show();
				$("#video").hide();
				$(".cur-video-img").hide();
			}
		}, true);
	}


	//固定头部颜色变化
	if ($(".header").length && $(".content").length) {
		$(window).on("scroll", function () {
			if ($("body").css("position") !== "fixed") {
				if ($(window).scrollTop() > 0) {
					$(".header").css("background-color", "#ffffff");
					$(".header").find(".search-con a").css("background-color", "#f7f7f7");
				} else {
					$(".header").css("background-color", "rgba(255, 255, 255, .2)");
					$(".header").find(".search-con a").css("background-color", "#ffffff");
				}
			}
		})
	}


	//分类数据切换
	$(".cate-list ul li:not(.none)").each(function (key, value) {
		$(this).css("border-right", "1px dashed #cfcfcf");
		if ((key+1) %3 == 0) {
			$(this).css("border-right", "0");
		}
	});
	$(".cate-tab ul").on("click", "li", function(e) {
		e.preventDefault();
		e.stopPropagation()
		var pId = $(this).data("id");
		$(this).addClass("cur").siblings().removeClass("cur");
		if(pId == 0) {
			$(".cate-list").find("li").removeClass("none");
		} else {
			$(".cate-list").find("li").addClass("none");
			$(".cate-list li.pid" + pId).removeClass("none");
		}
		$(".cate-list").scrollTop(0);
		$(".cate-list ul li:not(.none)").each(function (key, value) {
			$(this).css("border-right", "1px dashed #cfcfcf");
			if ((key+1) % 3 == 0) {
				$(this).css("border-right", "0");
			}
		});
	});

	//右侧顶部菜单
	$(".cate-tab ul").slideItem({});

	//分类下直播列表加载更多
	$('#category_room_list_load_more').click(function() {
		var $ul = $('#room_list');
		var categoryId = $ul.data('category_id');
		var page = $ul.data('page');
		var loadMore = $ul.data("load_more");
		var w =$(this).data('word');
		$this = $(this);
		page = page*1 + 1;

		$this.html(w + '...');

		if(loadMore == 1){
			$ul.attr('data-load_more',0);
			$.post(document.URL,{second_category_url:categoryId,page:page},function(msg) {
				var l = msg.list.length;
				if(l > 0){
					var str = '';
					$.each(msg.list,function(m,n){
						str += '<li>\
							<a href="/'+n.room_id+'/">\
								<img src="'+n.p_screenshot+'" alt="'+n.title+'">\
								<h5>'+n.title+'</h5>\
								<p class="clr">\
									<span class="anchor-name">\
										<i></i>\
										'+n.p_name+'\
									</span>\
									<span class="hot-num">\
										<i></i>\
										'+n.rating+'℃\
									</span>\
								</p>\
							</a>\
						</li>';
					});

					$ul.append(str);
					$ul.attr('data-page',page);
					$ul.attr('data-load_more',1);
					$this.html(w);

					if(l < msg.per_num){
						$this.remove();
					}

				}else{
					$this.remove();
				}
			},'json');
		}
	});

	//实时榜单加载更多
	$('#load_more_rank_room_list').click(function(){
		var $ul = $('#rank_room_list');
		var page = $ul.data('page');
		var loadMore = $ul.data('load_more');
		var w = $(this).data('word');
		var $this = $(this);
		$this.html(w+'...');

		page = page*1 + 1;
		var l = $ul.find('li').length;
		$.post(document.URL,{page:page},function(msg) {
			if(msg.list.length > 0){
				var str = '';
				$.each(msg.list,function(m,n){
					l += 1;
					str += '<li>\
						<a href="/'+n.room_id+'/">\
							<div class="rank-item-top clr">\
								<div class="rank-num num'+l+'">\
									<span>'+l+'</span>\
								</div>\
								<div class="rank-anchor">\
									<img class="lazy" data-original="'+n.p_head_pic+'" src="/static/v1wap/images/avator-default.png">\
									<strong>'+n.p_name+'</strong>\
								</div>\
								<div class="rank-tem">\
									<span>'+n.rating+'℃</span>\
								</div>\
								<div class="rank-contr">\
									<span></span>\
								</div>\
							</div>\
							<div class="rank-item-bottom none">\
								<div class="rank-empty"></div>\
								<div class="rank-origin">\
									<p>平台：'+n.platform_detail.name+'</p>\
									<p>状态：正在直播</p>\
								</div>\
								<div class="rank-anchor-cate">\
									<p>分类：'+n.category_detail.name+'</p>\
									<p>'+n.view_num+'<i></i></p>\
								</div>\
							</div>\
						</a>\
					</li>';
				})

				$ul.append(str);
				$('img.lazy').lazyload();
				$ul.attr('data-page',page);
				$this.html(w);
			}else{
				$this.remove();
			}
		},'json');

	});

	//加载更多通告内容
	$cmsList = $('#gf_list');
	$('#load_more_cms').click(function() {
		var page = $cmsList.data('page') * 1 + 1;
		var categoryUrl = $cmsList.data('category_url');
		var loadMore = $cmsList.data('load_more');
		var $this = $(this)
		if(loadMore == 1){
			$cmsList.attr('data-load_more',0);
			$.post(document.URL,{page:page,category_url:categoryUrl},function(msg) {
				if(msg.list.length > 0){
					var str = '';
					$.each(msg.list,function(m,n){
						str += '<div class="notice-row">\
							<a href="/gf-'+n.id+'.html">\
								<h4><span>'+n.title+'</span><i>'+getLocalTime(n.time)+'</i></h4>\
							</a>\
						</div>';
					})

					$cmsList.append(str);
					$cmsList.attr('data-page',page);
					$cmsList.attr('data-load_more',1);
				}else{
					$this.remove();
				}
			},'json');
		}
	});

	$searchLiveList  = $('#search_live_list');
	$searchAnchorList = $('#search_anchor_list');

	//加载更多搜索结果
	$('#load_more_live').click(function(){
		var page = $searchLiveList.data('page') * 1 + 1;
		var keyword = $searchLiveList.data('keyword');
		var loadMore = $searchLiveList.data('load_more');
		var $this = $(this);
		var word = $this.data('word');
		if(loadMore == 1){
			$searchLiveList.attr('data-load_more',0);
			$this.html(word+'...');
			$.post(document.URL,{p:page},function(msg){
				if(msg.list.length > 0){
					var str = '';
					$.each(msg.list,function(m,n){
						if(n.is_online == 1){
							var olStr = '<b></b>';
						}
						str += '<li>\
							<a href="/'+n.room_id+'/">\
								<img class="lazy" data-original="'+n.p_screenshot+'" src="/static/v1wap/images/live-default.jpg" alt="'+n.p_name+'">\
								<h5><span>'+n.title+olStr+'</span></h5>\
								<p class="clr">\
									<span class="anchor-name">\
										<i></i>\
										'+n.p_name+'\
									</span>\
									<span class="hot-num">\
										<i></i>\
										'+n.rating+'℃\
									</span>\
								</p>\
							</a>\
						</li>';
					});

					$searchLiveList.append(str);
					$('img.lazy').lazyload();
					$searchLiveList.attr('data-page',page);
					$searchLiveList.attr('data-load_more',1);
					$this.html(word);
				}else{
					$this.remove();
				}
			},'json');
		}
	});

	$('#load_more_anchor').click(function(){
		var page = $searchAnchorList.data('page') * 1 + 1;
		var keyword = $searchAnchorList.data('keyword');
		var loadMore = $searchAnchorList.data('load_more');
		var $this = $(this);
		var word = $this.data('word');
		if(loadMore == 1){
			$this.html(word+'...');
			$searchAnchorList.attr('data-load_more',0);
			$.post(document.URL,{p:page},function(msg){
				if(msg.list.length > 0){
					var str = '';
					$.each(msg.list,function(m,n){
						if(n.is_online == 1){
							var olStr = '<div class="ancho-status">\
									<div class="status-btn"></div>\
								</div>';
						}
						str += '<li>\
							<a href="/'+n.room_id+'/">\
								<div class="anchor-avator">\
									<img class="lazy" data-original="'+n.p_head_pic+'" src="/static/v1wap/images/avator-default.png" alt="'+n.p_name+'">\
								</div>\
								<div class="anchor-info">\
									<h5>'+n.p_name+'</h5>\
									<p>热度：'+n.rating+'℃</p>\
								</div>\
								<div class="anchor-origin">\
									<p>来源：'+n.platform_detail.name+'</p>\
								</div>'+olStr+'\
							</a>\
						</li>';
					});

					$searchAnchorList.append(str);
					$('img.lazy').lazyload();
					$searchAnchorList.attr('data-page',page);
					$searchAnchorList.attr('data-load_more',1);
					$this.html(word);
				}else{
					$this.remove();
				}
			},'json');
		}
	});
});