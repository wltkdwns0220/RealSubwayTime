//To enable magnifier function
$host = $('[mag-thumb="inner-inline"]');
$host.mag();

//To get api about subway location
var stationName = " ";
var APP_ID = "4f66435472776c74383857486b6d48";
var authPreFix = "/json/realtimeStationArrival/1/4/";
var currentStationURL = "https://cors-anywhere.herokuapp.com/http://swopenAPI.seoul.go.kr/api/subway/";
var LocationData = {};

function startSearch() {
    stationName = $("#search-term").val();
    if (stationName != "") {
        requestSubwayInfo();
    } else {
        alert("지하철역 이름을 먼저 치세요");
    }
}

function requestSubwayInfo() {
    var requestURL = currentStationURL + APP_ID + authPreFix + encodeURI(stationName);

    $.ajax({
        type: 'GET',
        url: requestURL,
        success: function(data) {
            saveData(data);
        }
    });
}

function saveData(data) {
    LocationData = data;
    console.log(LocationData);
    renderData();
}

function parseNum(data) {
    if(data.split(" ")[0] === "전역") {
        return 1;
    } else if (data.split(" ")[1] === "진입" || data.split(" ")[1] === "도착") {
        return 0;
    } else {
        return parseInt(data.split("[")[1]);
    }
}

function renderData() {
    $("#subway-way1").text(LocationData.realtimeArrivalList[0].trainLineNm);
    $("#subway-way2").text(LocationData.realtimeArrivalList[1].trainLineNm);
    $("#station1-1 .subway-name").text(LocationData.realtimeArrivalList[0].statnNm);
    $("#station2-3 .subway-name").text(LocationData.realtimeArrivalList[0].statnNm);
    $("#station1-2 .subway-name").text(LocationData.realtimeArrivalList[0].arvlMsg3);
    $("#station2-1 .subway-name").text(LocationData.realtimeArrivalList[3].arvlMsg3);
    $("#station1-3 .subway-name").text(LocationData.realtimeArrivalList[2].arvlMsg3);
    $("#station2-2 .subway-name").text(LocationData.realtimeArrivalList[1].arvlMsg3);
    $("#station1-2 .subway-dot").text(parseNum(LocationData.realtimeArrivalList[0].arvlMsg2));
    $("#station1-3 .subway-dot").text(parseNum(LocationData.realtimeArrivalList[2].arvlMsg2));
    $("#station2-1 .subway-dot").text(parseNum(LocationData.realtimeArrivalList[3].arvlMsg2));
    $("#station2-2 .subway-dot").text(parseNum(LocationData.realtimeArrivalList[1].arvlMsg2));
    
}

$("#search-btn").click(startSearch);


