/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

function indexSearchList() {
    var input, filter, table, tr, td, i;
    input = $("#indexSearch");
    if (input.val() == 0) {
        $("#indexList").hide();
    } else {
        $("#indexList").show();
    }
    filter = input.val().toUpperCase();
    table = document.getElementById("indexList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$(document).ready(function () {

});

// $("#indexSearch").(getListItems());

function getIndexListItems() {
    var schoolArray = getSchoolArray();
    $("#indexList").children().empty();
    $.each(schoolArray, function (index, value) {
        $("#indexList").append("<tr><td><a href='calendar.html'>" + value.Skolenavn + "</a></td></tr>");
    });
    $("#indexList").hide();

}

function getIndexListItemsPos() {
    $("#indexList").show();
    $("#indexList").children().empty();
    var fiveClosest = findClosest();
    for(var i = 0; i < 5; i++){ //5 closest schools
        $("#indexList").append("<tr><td><a href='calendar.html'>" + fiveClosest[i][1] + "</a></td></tr>");
    }
}
