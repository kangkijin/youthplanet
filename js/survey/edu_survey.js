/* 자유형 객관식에서 사용할 다음 ID값 */
var nextChoiceIdx = 0;

/* 질문 추가 */
function addQus() {
	var $tableTr = "";
	$tableTr = $("#qusTable");
	$tableTr.find("tbody").append("<tr>"
			+"<td class='qusNum'></td>"
			+"<td class='td_input'>"
			+"<input type='text' class='form-control input-sm' name='esqTitle' data-validation='{\"requiredAll\" : true}' title='질문 내용' onkeyup='fnKeyUpCommaChk(this);'>"
			+"</td>"
		+"<td class='td_input'>"
			+"<select class='form-control input-sm' name='esqType' onchange='changeType(this);'>"
				+"<option value='SCALE' selected>5점 척도</option>"
				+"<option value='OPEN'>주관식</option>"
				+"<option value='CHOICE'>자유형 객관식</option>"
			+"</select>"

			+"<div id='esaInfoDiv' class='esaInfoDiv'>"
				+"<input type='hidden' name='esqMultiYn' value='N' />"
				+"<input type='hidden' name='esqAnsCnt' value='5' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 아니다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='아니다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='보통이다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='그렇다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 그렇다' />"
			+"<div>"
		+"</td>"
		+"<td class='td_input'>"
			+"<button type='button' class='btn btn-xs btn-danger btn-danger' onclick='removeQus(this);' title='질문삭제'><i class='fa fa-minus'></i></button>"
		+"</td>"
		+"<td class='td_input'>"
			+"<button type='button' onclick='moveUp(this);' class='btn btn_arrow_circle mg_r2' title='위로'><i class='fa fa-arrow-up'></i></button> "
			+"<button type='button' onclick='moveDw(this);' class='btn btn_arrow_circle' title='아래로'><i class='fa fa-arrow-down'></i></button>"
		+"</td>"
	+"</tr>");

	// 질문 넘버링
	qusNumbering();
}


/*질문 유형 변경*/
function changeType(obj) {
	var _val = $(obj).val();
	var $tableTd = $(obj).parent("td");

	/* 5점 척도 */
	if(_val == "SCALE") {
		// 이전요소(질문정보가 들어 있는 td)지우기
		$tableTd.prev().empty();
		// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
		$tableTd.prev().append("<input type='text' class='form-control input-sm' data-validation='{\"requiredAll\" : true}' name='esqTitle' title='질문 내용'>");

		// 설문 조사 정보 지우기
		$tableTd.find(".esaInfoDiv").empty();

		// 설문 조사 정보 넣기
		$tableTd.find(".esaInfoDiv").append("<input type='hidden' name='esqMultiYn' value='N' />"
				+"<input type='hidden' name='esqAnsCnt' value='5' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 아니다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='아니다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='보통이다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='그렇다' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 그렇다' />");

	/* 주관식 */
	} else if(_val == "OPEN") {
		// 이전요소(질문정보가 들어 있는 td)지우기
		$tableTd.prev().empty();

		// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
		$tableTd.prev().append("<input type='text' class='form-control input-sm' data-validation='{\"requiredAll\" : true}' name='esqTitle' title='질문 내용'>");

		// 설문 조사 정보 지우기
		$tableTd.find(".esaInfoDiv").empty();

		// 설문 조사 정보 넣기
		$tableTd.find(".esaInfoDiv").append("<input type='hidden' name='sqmMultiYn' value='N' />"
				+"<input type='hidden' name='esqMultiYn' value='N' />"
				+"<input type='hidden' name='esqAnsCnt' value='1' />"
				+"<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='주관식 문항' />");

	/* 자유형 객관식 */
	} else if(_val == "CHOICE") {
		// 이전요소(질문정보가 들어 있는 td)지우기
		$tableTd.prev().empty();
		// 이전요소(질문정보가 들어 있는 td)질문 내용 넣기
		var _html = "";
		_html += "<input type='text' class='form-control input-sm' name='esqTitle' title='질문 내용' data-validation='{\"requiredAll\" : true}' onkeyup='fnKeyUpCommaChk(this);'>";
		_html +="<div class='ta_l mg_t10'>"
						+"<div class='ad_btn_area1 mg_t10'>"
							+"<button type='button' class='btn btn-xs dp_inline btn-primary mg_r3' onclick='addAns(this);'>문항 추가</button>"
							+"<p class='ad_input_row'>"
								+"<input type='checkbox' class='check' name='esqMultiYnChk1' id='esqMultiYnChk"+nextChoiceIdx+"' onclick='esqMultiYnClick(this);'>"
								+"<label class='check_label check_black' for='esqMultiYnChk"+nextChoiceIdx+"'>다중 선택 허용</label>"
							+"</p>"
						+"</div>"
						+"<ul>"
							+"<li class='ta_l mg_t5'>"
								+"<input type='text' class='form-control input-sm dp_inline wd_p95 va_m' name='esaCont' data-validation='{\"requiredAll\" : true}' onkeyup='fnKeyUpCommaChk(this);' title='문항 내용'>"
								+"<button type='button' class='btn btn-danger btn-xs btn-danger mg_l5 va_m' onclick='removeAns(this);' title='문항 삭제'><i class='fa fa-minus'></i></button>"
							+"</li>"
						+"</ul>"
					+"</div>"
		$tableTd.prev().append(_html);

		// 설문 조사 정보 지우기
		$tableTd.find(".esaInfoDiv").empty();

		// 설문 조사 정보 넣기
		$tableTd.find(".esaInfoDiv").append("<input type='hidden' name='esqMultiYn' value='N'/>"
															+"<input type='hidden' name='esqAnsCnt' value='1' />");
		nextChoiceIdx++;
	}
}

/* 질문 삭제 */
function removeQus(obj) {
	if( $(obj).parent("td").parent("tr").siblings().length > 0 ) {
		// 질문삭제
		$(obj).parent("td").parent("tr").remove();
	} else {
		alert("첫 질문은 삭제할 수 없습니다.");
	}
	// 질문 넘버링
	qusNumbering();
}


/* 질문 넘버링 */
function qusNumbering() {
	$("#qusTable tr .qusNum").each(function(index) {
		$(this).text(index+1);
	});
}

// 질문 순서번경 올리기
function moveUp(obj) {
	var $qusTr = $(obj).parent("td").parent("tr");
	if( $qusTr.prev().html() !== undefined ) {
		$qusTr.prev().before($qusTr);
		// 질문 넘버링
		qusNumbering();
	} else {
		alert("첫 질문은 순서 변경이 불가합니다.");
	}
}
// 질문 순서변경 내리기
function moveDw(obj) {
	var $qusTr = $(obj).parent("td").parent("tr");
	if( $qusTr.next().html() !== undefined  ) {
		$qusTr.next().after($qusTr);
		// 질문 넘버링
		qusNumbering();
	} else {
		alert("마지막 질문은 순서 변경이 불가합니다.");
	}
}


/* 자유형 객관식 문항 추가 (10 limit) */
function addAns(obj) {
	if( $(obj).parent("div").next().children("li").find("input[name=esaCont]").length  == 10 ) {
		alert("더 이상 추가할 수 없습니다.");
		return;
	}
	$(obj).parent("div").next().append("<li class='ta_l mg_t5'>"
			+"<input type='text' class='form-control input-sm dp_inline wd_p95 va_m' name='esaCont' data-validation='{\"requiredAll\" : true}' title='문항 내용'>"
			+"<button type='button' class='btn btn-danger btn-xs btn-danger mg_l5 va_m' onclick='removeAns(this);' title='문항 삭제'><i class='fa fa-minus mg_r0'></i></button>"
		+"</li>");
	// 문항 개수 수정
	$(obj).parent("div").parent("div").parent("td").next().find(".esaInfoDiv input[name=esqAnsCnt]").val( $(obj).parent("div").next().find("li").length );
}

/* 자유형 객관식 문항 삭제 */
function removeAns(obj) {
	var _ansCnt = $(obj).parent("li").siblings().length;
	if( _ansCnt >= 1 ) {
		// 문항 개수 수정
		$(obj).parent("li").parent("ul").parent("div").parent("td").next().find(".esaInfoDiv input[name=esqAnsCnt]").val(_ansCnt);
		// 문항 삭제
		$(obj).parent("li").remove();
	} else {
		alert("하나 이상의 문항이 필요합니다.");
	}
}

/* 자유형 객관식 다중 선택 여부 값 제어 */
function esqMultiYnClick(obj) {
	if( $(obj).prop("checked") ) {
		$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".esaInfoDiv input[name=esqMultiYn]").val("Y");
	} else {
		$(obj).parent("p").parent("div").parent("div").parent("td").next().find(".esaInfoDiv input[name=esqMultiYn]").val("N");
	}
}

/* 콤마 제어 */
function fnKeyUpCommaChk(obj){
	if(event.keyCode == 188){
		alert("질문 작성시 ','(콤마)는 사용할 수 없습니다.");
		obj.value = obj.value.replace(",","");
		return false;
	}
}

/*
***************************************
@ function : 주어진 문항, 답변 정보로 설문 문항을 세팅해줌.
@ comment  : 각 문항을 추가해주고 문항 numbering 수행
@ parameter : _qusList - 문항 list
			  _ansList - 답변 list
			  _isReadonly - 수정불가 여부 (true: 수정 불가, false: 수정 가능)
@ history  : 2022-07-25 (최초작성)
****************************************
*/
function loadSurvey(_qusList, _ansList, _isReadonly) {
	$("#qusTable tbody").empty();
	for (let qusObj of _qusList) {
		addQusWithData(qusObj, _ansList.filter(e => e.esqKeyId === qusObj.esqKeyId), _isReadonly);
	}
	qusNumbering();
}

/*
***************************************
@ function : 주어진 정보로 문항 추가
@ comment  :
@ parameter : _qusObj - 문항 정보 object
			  _ansList - 답변 list
			  _isReadonly - 수정불가 여부 (true: 수정 불가, false: 수정 가능)
@ history  : 2022-07-25 (최초작성)
****************************************
*/
function addQusWithData(_qusObj, _ansList, _isReadonly) {
	const $tbody = $("#qusTable tbody");
	const disabledWhenReadonly = _isReadonly ? "disabled" : "";
	let html = `<tr><td class="qusNum"></td>`;
	switch (_qusObj.esqType) {
		case "SCALE":
		default:
			html += `
				<td class='td_input'>
					<input type="text" class="form-control input-sm" onkeyup='fnKeyUpCommaChk(this);' name="esqTitle" value="${_qusObj.esqCont}"
							data-validation='{"requiredAll" : true}' title="질문 내용" ${disabledWhenReadonly}>
				</td>

				<td class="td_input">
					<select class="form-control input-sm" name="esqType" onchange="changeType(this);" ${disabledWhenReadonly}>
						<option value="SCALE" selected>5점 척도</option>
						<option value="OPEN">주관식</option>
						<option value="CHOICE">자유형 객관식</option>
					</select>

					<div class="esaInfoDiv">
						<input type='hidden' name='esqMultiYn' value="N" />
						<input type='hidden' name='esqAnsCnt' value="5" />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 그렇다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='그렇다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='보통이다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='아니다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 아니다' />
					</div>
				</td>
			`;
			break;
		case "OPEN":
			html += `
				<td class='td_input'>
					<input type="text" class="form-control input-sm" onkeyup='fnKeyUpCommaChk(this);' name="esqTitle" value="${_qusObj.esqCont}"
							data-validation='{"requiredAll" : true}' title="질문 내용" ${disabledWhenReadonly}>
				</td>

				<td class="td_input">
					<select class="form-control input-sm" name="esqType" onchange="changeType(this);" ${disabledWhenReadonly}>
						<option value="SCALE">5점 척도</option>
						<option value="OPEN" selected>주관식</option>
						<option value="CHOICE">자유형 객관식</option>
					</select>

					<div class="esaInfoDiv">
						<input type='hidden' name='esqMultiYn' value="N" />
						<input type='hidden' name='esqAnsCnt' value="1" />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='주관식 문항' />
					</div>
				</td>
				`;
			break;
		case "CHOICE":
			html += `
				<td class='td_input'>
					<input type="text" class="form-control input-sm" onkeyup='fnKeyUpCommaChk(this);' name="esqTitle" value="${_qusObj.esqCont}"
							data-validation='{"requiredAll" : true}' title="질문 내용" ${disabledWhenReadonly}>
					<div class='ta_l mg_t10'>
						<div class='ad_btn_area1 mg_t10'>
							${!_isReadonly ? `<button type='button' class='btn btn-xs dp_inline btn-primary mg_r3' onclick='addAns(this);'>문항 추가</button>` : ''}
							<p class='ad_input_row'>
								<input type='checkbox' name='esqMultiYnChk1' class='check' id='esqMultiYnChk${nextChoiceIdx}'
										onclick='esqMultiYnClick(this);' ${_qusObj.esqMultiYn === "Y"? "checked" : ""} ${disabledWhenReadonly}>
								<label class='check_label check_black' for='esqMultiYnChk${nextChoiceIdx}'>다중 선택 허용</label>
							</p>
						</div>
						<ul>
						${(() => {
							let str = '';
							for (let ansObj of _ansList) {
								str += `
									<li class='ta_l mg_t5'>
										<input type='text' class='form-control input-sm dp_inline wd_p${_isReadonly ? "100" : "95"} va_m' name='esaCont' value="${ansObj.esaCont}"
												onkeyup='fnKeyUpCommaChk(this);' data-validation='{"requiredAll" : true}' title='문항 내용' ${disabledWhenReadonly}>
										${!_isReadonly ? `<button type='button' class='btn btn-danger btn-xs btn-danger mg_l5 va_m' onclick='removeAns(this);' title='문항 삭제'><i class='fa fa-minus'></i></button>` : ""}
									</li>
										`;
							}
							return str;
						})()}
						</ul>
					</div>
				</td>

				<td class="td_input">
					<select class="form-control input-sm" name="esqType" onchange="changeType(this);" ${disabledWhenReadonly}>
						<option value="SCALE">5점 척도</option>
						<option value="OPEN">주관식</option>
						<option value="CHOICE" selected>자유형 객관식</option>
					</select>

					<div class="esaInfoDiv">
						<input type='hidden' name='esqMultiYn' value='${_qusObj.esqMultiYn === "Y"? "Y" : "N"}' >
						<input type='hidden' name='esqAnsCnt' value='${_qusObj.esqAnsCnt}' >
					</div>
				</td>
				`;
			nextChoiceIdx++;
			break;
	}
	html += `
			${!_isReadonly ? `
				<td class='td_input'>
					<button type="button" class="btn btn-xs btn-danger btn-danger" onclick="removeQus(this);" title="질문삭제"><i class="fa fa-minus "></i></button>
				</td>
				<td class="td_input">
					<button type="button" onclick="moveUp(this);" class="btn btn_arrow_circle" title="위로"><i class="fa fa-arrow-up"></i></button>
					<button type="button" onclick="moveDw(this);" class="btn btn_arrow_circle" title="아래로"><i class="fa fa-arrow-down"></i></button>
				</td>
			` : ''}
		</tr>
		`;

	$tbody.append(html);
}

/*
***************************************
@ function : 문항을 reset해줌.
@ comment  : 기존에 추가된 문항들을 지우고 기본 문항을 보여줌.
@ parameter : _isReadonly - 수정불가 여부 (true: 수정 불가, false: 수정 가능)
@ history  : 2022-07-25 (최초작성)
****************************************
*/
function resetQus(_isReadonly) {
	let html;
	if(!_isReadonly) {
		html = `
			<tr>
				<td class="qusNum">1</td>

				<td class='td_input'>
					<input type="text" class="form-control input-sm" onkeyup='fnKeyUpCommaChk(this);' name="esqTitle"
							data-validation='{"requiredAll" : true}' title="질문 내용" >
				</td>

				<td class="td_input">
					<select class="form-control input-sm" name="esqType" id="esqType" onchange="changeType(this);">
						<option value="SCALE" selected>5점 척도</option>
						<option value="OPEN">주관식</option>
						<option value="CHOICE">자유형 객관식</option>
					</select>
					<div class="esaInfoDiv" id="esaInfoDiv">
						<input type='hidden' name='esqMultiYn' value="N" />
						<input type='hidden' name='esqAnsCnt' value="5" />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 아니다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='아니다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='보통이다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='그렇다' />
						<input type='hidden' name='esaCont' class='ad_formstyle wd_p15' value='매우 그렇다' />
					</div>
				</td>

				<td class='td_input'>
					<button type="button" class="btn btn-xs btn-danger btn-danger" onclick="removeQus(this);" title="질문삭제"><i class="fa fa-minus "></i></button>
				</td>

				<td class="td_input">
					<button type="button" onclick="moveUp(this);" class="btn btn_arrow_circle" title="위로"><i class="fa fa-arrow-up"></i></button>
					<button type="button" onclick="moveDw(this);" class="btn btn_arrow_circle" title="아래로"><i class="fa fa-arrow-down"></i></button>
				</td>
			</tr>
		`;
	} else {
		html = `
			<tr>
				<td colspan="3">등록된 설문이 없습니다.</td>
			</tr>
		`;
	}
	$("#qusTable tbody").empty().append(html);
}