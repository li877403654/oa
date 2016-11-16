/// <reference path="jquery-1.4.1-vsdoc.js" />
(function() {
	var msgbox = {
		show: function(element, msg) {
			if (typeof element == "string")
				element = document.getElementById(element);
			if (element == null)
				return;
			//查看该元素是否已经创建了msgbox
			var box = null;
			for (var i = 0; i < cache.length; i++) {
				if (cache[i].element == element) {
					box = cache[i].box;
					break;
				}
			}
			//获取元素的位置
			var absPosition = getPosition(element);

			if (box == null) {
				//该元素还没有创建，则创建msgbox
				var div = document.createElement("div");
				$(div).css({
					"position": "absolute",
					"width": "160px",
					"z-index": "99",
					"opacity": "0.8",
					"display": "none"
				}).html("<div></div><div></div>").click(function() {
					$(this).hide("normal");
				});
				document.body.appendChild(div);
				$("div:nth-child(1)", div).css({
					"width": "0px",
					"height": "0px",
					"border-left": "7px solid transparent",
					"border-right": "7px solid transparent",
					"border-bottom": "14px solid Red"
				});
				$("div:nth-child(2)", div).css({
					"background-color": "Red",
					"position": "relative",
					"top": "-3px",
					"color": "White",
					"font-size": "13px",
					"padding": "2px 2px 2px 2px",
					"cursor": "pointer"
				});
				//将本次创建的msgbox加入缓存
				cache.push({ element: element, box: div });
				box = div;
			}

			//定位msgbox的位置
			$(box).css({
				"left": absPosition.left + "px",
				"top": (absPosition.top + absPosition.height) + "px"
			});
			//设置msgbox要显示的文字
			$("div:nth-child(2)", box).text(msg);
			$(box).show("normal");
		}
	};

	var cache = []; //存储已经创建了msgbox的element元素，不重复创建
	//cache的项为：{element:已经创建了msgbox的DOM元素,box:该元素的msgbox}

	window.msgbox = msgbox;

	var placeHolder = null; //对话框的容器div
	var maskLayer = null; //对话框的遮罩div
	var dialog = {
		show: function(url, title, width, height) {
			if (maskLayer == null) {
				//遮罩还没有创建，则创建遮罩
				maskLayer = document.createElement("div");
				$(maskLayer).css({
					"display": "none",
					"position": "fixed",
					"top": "0%",
					"left": "0%",
					"width": "100%",
					"height": "100%",
					"background-color": "gray",
					"z-index": "255",
					"opacity": "0.7"
				});
				document.body.appendChild(maskLayer);
			}
			if (placeHolder == null) {
				//对话框容器还没有创建，则创建对话框容器
				placeHolder = document.createElement("div");
				$(placeHolder).css({
					"display": "none",
					"position": "fixed",
					"background-color": "White",
					"left": "50%",
					"top": "50%",
					"z-index": "299",
					"border-color": "#bbd3eb",
					"border-width": "5px",
					"border-style": "solid"
				}).html("<div tag='title'><img><span></span><img title='关闭' style='float:right;'></div>" +
				"<iframe width='100%' frameborder='0' src='' scrolling='auto'></iframe>");
				document.body.appendChild(placeHolder);

				$("div[tag=title]", placeHolder).css({
					"height": "24px",
					"background-color": "#bbd3eb",
					"padding-top": "8px"
				});
				$("span:first", placeHolder).css({
					"font-size": "12px",
					"font-weight": "bold",
					"margin-left": "5px",
					"position": "relative",
					"top": "-3px"
				});
				$("img:eq(0)", placeHolder).attr("src", "data:image/gif;base64,R0lGODlhEAAQAPcJAFy7IP/BAP98AKg8AP7/y1raCHrvB////w2DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAAh7ABMMGDgwgcGDCAccWHhAwACEEBUGmOgwAQAEGDECEHhgYoCKCAiIJFAAAUePIAkYWFlSoICXLx+GXGmgpUCCDxPMZGkS4kEEBYIG7Wkxo0ajCDYaDDmy5EiSRHfWlGpTp0qeV6f+zOqUZlWgQkuGrXrRaNmMSn2qNRgQADs=");
				//关闭按钮
				$("img:eq(1)", placeHolder).click(function() {
					dialog.close();
				}).attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAAbklEQVR42mN8c/Dg7drany9fMhAB2ERENPv6GI9ZW/9684YYDRDAq6fHeEBdnXgNEECxHrvr14HkIU1NZBWYglj0IKvAFMHiNmRFWDVg9w9cKVYNOMMAlw3Us4dk/5ATbuTED5GALD3kpGsy8g8AGQpUuHi81OsAAAAASUVORK5CYII=");
			}

			//设置对话框的宽高
			width = parseInt(width);
			height = parseInt(height);
			if (isNaN(width) || isNaN(height))
				return;
			$(placeHolder).css({
				"width": width + "px",
				"height": height + "px",
				"margin-left": (-width / 2) + "px",
				"margin-top": (-height / 2) + "px"
			});
			//设置标题
			$("span:first", placeHolder).text(title);
			//设置iframe高度、Url
			$("iframe:first", placeHolder).height((height - 40) + "px").attr("src", url.indexOf("?") > 0 ? url + "&" + Math.random() : url + "?" + Math.random());

			//显示对话框
			$(maskLayer).show("slow");
			$(placeHolder).show("slow");
		},
		close: function() {
			$(maskLayer).hide("slow");
			$(placeHolder).hide("slow");
		}
	};

	window.dialog = dialog;

	var tip = null;
	var tooltip = {
		show: function(element, msg, width) {
			if (typeof element == "string")
				element = document.getElementById(element);
			if (element == null)
				return;
			//是否已经创建了tip
			if (tip == null) {
				//没有创建tip，则创建tip
				tip = document.createElement("div");
				$(tip).css({
					"position": "absolute",
					"width": typeof width == "undefined" ? "160px" : parseInt(width) + "px",
					"color": "#000000",
					"background-color": "#FFFFCC",
					"border": "1px solid #000000",
					"padding": "3px",
					"z-index": "99",
					"display": "none"
				});
				document.body.appendChild(tip);
			}
			//对msg编码
			$(tip).html(encodeHTML(msg));
			var absPosition = getPosition(element);
			$(tip).css({
				"left": absPosition.left + "px",
				"top": (absPosition.top + absPosition.height + 3) + "px"
			});
			$(tip).show();
		},
		close: function() {
			$(tip).hide();
		}
	};

	window.tooltip = tooltip;

	//获取元素的绝对位置
	function getPosition(element) {
		var position = element.getBoundingClientRect();
		return {
			width: element.offsetWidth,
			height: element.offsetHeight,
			left: position.left + document.documentElement.scrollLeft,
			top: position.top + document.documentElement.scrollTop
		};
	}
	//HTML编码
	function encodeHTML(s) {
		if (typeof s != "string")
			return s;
		return s.replace(/<|>|\r\n|\n|&|\u0020|\u3000/g, function(exp) {
			switch (exp) {
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case "\r\n":
				case "\n":
					return "<br>";
				case "&":
					return "&amp;";
				case "\u0020":
				case "\u3000":
					return "&nbsp;"
			}
		});
	}
} ());