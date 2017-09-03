//To enable magnifier function
$host = $('[mag-thumb="inner-inline"]');
$host.mag();

//To get api about subway location
var stationName = " ";
var APP_ID = "4f66435472776c74383857486b6d48";
var authPreFix = "/json/realtimeStationArrival/1/3/";
var currentStationURL = "http://swopenAPI.seoul.go.kr/api/subway/";
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
        // crossDomain: true,
        // dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            saveData(data);
        }
    });
}

function saveData(data) {
    LocationData = JSON.stringify(data);
    console.log(LocationData);
    renderData();
}

function renderData() {
    // $("#subway-name .value").text(LocationData.main.temp);
}

$("#search-btn").click(startSearch);