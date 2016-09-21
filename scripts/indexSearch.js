/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function search() {
    var input, filter, table, tr, td, i;
    input = $("#indexSearch");
    if (input.val() == 0) {
        $("#myTable").hide();
    } else {
        $("#myTable").show();
    }
    filter = input.val().toUpperCase();
    table = document.getElementById("myTable");
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

function getListItems() {
    var schoolArray = getSchoolArray();
    if ($("#myTable").children().length == 0) {
        $.each(schoolArray, function (index, value) {
            $("#myTable").append("<tr><td><a href='calendar.html'>" + value.Skolenavn + "</a></td></tr>");
        });
        $("#myTable").hide();
    }

}
