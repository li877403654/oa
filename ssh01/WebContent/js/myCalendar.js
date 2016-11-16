/// <reference path="jquery-1.4.1-vsdoc.js" />
(function() {
	function dateToString(date) {
		var month = (date.getMonth() + 1);
		if (month < 10)
			month = "0" + month;
		var day = date.getDate();
		if (day < 10)
			day = "0" + day;
		return date.getFullYear() + "-" + month + "-" + day;
	}
	function stringToDate(s) {
		var ary = s.split("-");
		var y = ary[0];
		var m = ary[1] - 1;
		var d = ary[2];
		return new Date(y, m, d);
	}
	function getPosition(element) {
		var pos = element.getBoundingClientRect();
		return {
			left: pos.left + document.documentElement.scrollLeft,
			top: pos.top + document.documentElement.scrollTop
		};
	}
	function getDays(y, m) {
		var dates = [];
		var firstDate = new Date(y, m, 1).getDay();
		var days = new Date(y, m + 1, 0).getDate();
		for (var i = 0; i < days; i++) {
			dates[i + firstDate] = i + 1;
		}
		return dates;
	}

	var panel = document.createElement("div");
	panel.className = "Calendar";

	var _currentDate = new Date();
	var calendar = {
		element: undefined,
		date: _currentDate,
		beginYear: _currentDate.getFullYear() - 20,
		endYear: _currentDate.getFullYear() + 20,
		year: _currentDate.getFullYear(),
		month: _currentDate.getMonth(),
		setSelect: function() {
			var slts = panel.getElementsByTagName("select");
			for (var i = 0, len = slts.length; i < len; i++) {
				if (slts[i].className == "year") {
					slts[i].value = this.date.getFullYear();
				}
				else if (slts[i].className == "month") {
					slts[i].value = this.date.getMonth();
				}
			}
		},
		bindData: function() {
			var dates = getDays(this.date.getFullYear(), this.date.getMonth());
			var tds = panel.getElementsByTagName("td");
			for (var i = 0; i < tds.length; i++) {
				tds[i].style.backgroundColor = "#efefef";
				tds[i].onclick = null;
				tds[i].onmouseover = null;
				tds[i].onmouseout = null;
				tds[i].innerHTML = dates[i] || "&nbsp;";
				if (i > dates.length - 1)
					continue;
				if (dates[i]) {
					tds[i].onclick = function() {
						calendar.element.value = dateToString(new Date(calendar.date.getFullYear(), calendar.date.getMonth(), this.innerHTML));
						$(panel).hide("fast");
					}
					tds[i].onmouseover = function() {
						this.style.backgroundColor = "#ffcc00";
					}
					tds[i].onmouseout = function() {
						this.style.backgroundColor = "#efefef";
					}
					var today = new Date();
					if (today.getFullYear() == calendar.date.getFullYear() && today.getMonth() == calendar.date.getMonth() && today.getDate() == dates[i]) {
						tds[i].style.backgroundColor = "#00cc33";
						tds[i].onmouseout = function() {
							this.style.backgroundColor = "#00cc33";
						}
					}
				}
			}
		}
	};

	var html = '<table width="100%" border="0" cellpadding="0" cellspacing="1" align="center">';
	html += '<tr>';
	html += '<th><input type="button" value="&lt;" action="pre" class="btn" /></th>';
	html += '<th colspan="5"><select class="year">';
	for (var i = calendar.beginYear; i <= calendar.endYear; i++) {
		html += '<option value="' + i + '">' + i + '</option>';
	}
	html += '</select>年<select class="month">';
	for (var i = 0; i < 12; i++) {
		html += '<option value="' + i + '">' + ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"][i] + '</option>';
	}
	html += '</select>月</th>';
	html += '<th><input type="button" value="&gt;" action="next" class="btn" /></th>';
	html += '</tr>';
	html += '<tr>';
	for (var i = 0; i < 7; i++) {
		html += '<th class="head">';
		html += ["日", "一", "二", "三", "四", "五", "六"][i];
		html += '</th>';
	}
	html += '</tr>';
	for (var i = 0; i < 6; i++) {
		html += '<tr align="center">';
		for (var j = 0; j < 7; j++) {
			switch (j) {
				case 0:
					html += '<td class="sun">&nbsp;</td>';
					break;
				case 6:
					html += '<td class="sat">&nbsp;</td>';
					break;
				default:
					html += '<td class="normal">&nbsp;</td>';
					break;
			}
		}
		html += '</tr>';
	}
	html += '<tr>';
	html += '<th colspan="7"><input type="button" value="清空" action="clear" /><input type="button" value="今天" action="today" /></th>';
	html += '</tr>';
	html += '</table>';
	$(panel).html(html);

	var fnWin = function() {
		document.body.appendChild(panel);

		$("select", panel).change(function() {
			if ($(this).attr("class") == "year") {
				calendar.year = $(this).val();
			}
			else if ($(this).attr("class") == "month") {
				calendar.month = $(this).val();
			}
			calendar.date = new Date(calendar.year, calendar.month, 1);
			calendar.setSelect();
			calendar.bindData();
		});

		var btns = $(":button", panel);
		$(":button[action=pre]", panel).click(function() {
			if (calendar.year == calendar.beginYear && calendar.month == 0)
				return;
			calendar.month--;
			if (calendar.month == -1) {
				calendar.year--;
				calendar.month = 11;
			}
			calendar.date = new Date(calendar.year, calendar.month, 1);
			calendar.setSelect();
			calendar.bindData();
		});
		$(":button[action=next]", panel).click(function() {
			if (calendar.year == calendar.endYear && calendar.month == 11)
				return;
			calendar.month++;
			if (calendar.month == 12) {
				calendar.year++;
				calendar.month = 0;
			}
			calendar.date = new Date(calendar.year, calendar.month, 1);
			calendar.setSelect();
			calendar.bindData();
		});
		$(":button[action=clear]", panel).click(function() {
			calendar.element.value = "";
			$(panel).hide("fast");
		});
		$(":button[action=today]", panel).click(function() {
			var today = new Date();
			calendar.date = today;
			calendar.year = today.getFullYear();
			calendar.month = today.getMonth();
			calendar.element.value = dateToString(today);
			$(panel).hide("fast");
		});
		btns.hover(function() {
			$(this).css("background-color", "#ffcc00");
		}, function() {
			$(this).css("background-color", "#efefef");
		});
	};
	var fnDoc = function() {
		if (panel.style.display == "block") {
			var src = arguments[0].target;
			do {
				if (src == panel)
					return;
			}
			while ((src = src.parentNode) != null);
			$(panel).hide("fast");
		}
	};

	$(window).bind("load", null, fnWin);
	$(document).mousedown(fnDoc);

	window.Calendar = {
		show: function(element) {
			if (!element)
				element = document.body;
			calendar.element = element;

			if (panel.style.display == "block")
				panel.style.display = "none";

			if (element.value.length > 0) {
				calendar.date = stringToDate(element.value);
				calendar.year = calendar.date.getFullYear();
				calendar.month = calendar.date.getMonth();
			}
			calendar.setSelect();
			calendar.bindData();

			var pos = getPosition(calendar.element);

			$(panel).css({
				"left": pos.left + "px",
				"top": (pos.top + calendar.element.offsetHeight) + "px"
			}).show("fast");
		}
	};
} ());