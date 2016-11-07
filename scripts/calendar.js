/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready("#pageone", function () {
    parseData(function () {
        setSchoolData(Cookies.get('selected'), Cookies.get("calendarType")); // Sets name & hyperlink on html document
        cal = new calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData());
        cal.buildCalendar(); // Builds calendar
        cal.buildList(); // Builds List
        cal.addHover();

        $('.month').on("swipeleft", function () {
            alert("You swiped left!")
            console.log("Swiped left")
        });

        $('.month').on("swiperight", function () {
            alert("You swiped right!")
            console.log("Swiped right")
        });

        document.ontouchmove = function (e) {
            var target = e.currentTarget;
            while (target) {
                if (checkIfElementShouldScroll(target))
                    return;
                target = target.parentNode;
            }
            e.preventDefault();
        };

        $("#cal_prev").click(function () {
            cal.prevMonth();
        });

        $("#cal_next").click(function () {
            cal.nextMonth();
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 37) { // Left arrow
                cal.prevMonth();
            }
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 39) { // Right arrow
                cal.nextMonth();
            }
        });

    });
});

/**
 * [findSchool description]
 * @param  {[type]} str   [description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function findSchool(str, array) {
    var selectedSchools = [];
    if (str != undefined) {
        var strArr = str.split(",");
        for (var j = 0; j < strArr.length; j++) {
            for (var i = 0; i < array.length; i++) {

                if (array[i].Skolenavn == strArr[j]) {
                    selectedSchools.push(array[i]);
                }
            }
        }
    }
    return selectedSchools;
}

/**
 * [setSchoolData description]
 * @param {[string]} name [description]
 */
function setSchoolData(name, type) {
    if (type == 'selected') {
        if (name == "" || name == null) {
            $("#schoolName").html('Ingen skole valgt');
            alert("Ingen skole valgt");
            return
        }
        $("#schoolName").html(name);
        // setter href for hver skole når du trykker på hver av dem
        var chosenScho = findSchool(name, getSchoolData());
        var elem = document.getElementById("schoolLink");
        elem.href = chosenScho[0].Hjemmeside;
    }
}

var cal; // Creates a calendar
