/*
 parceCSV.js downloads schoolRoutes and Schools from the Stavanger Kommune Open data.
 When download is complete it stors each of the datatypes in a session.

 The function getSchoolData combines these two datasets to one containing all schools with theirs respective routes.
 */


//######################################################################################
  //Check if mySchools Cookes is set and go to schools.html

    if( Cookies.get("mySchools") != null && Cookies.get("visiting") == null){
    Cookies.set("visiting", "true");
    Cookies.set("calendarType", "mySchools");
    window.location.href = 'html/schools.html';
    }
    Cookies.set("visiting", "true");
//######################################################################################



function parseData(callback) {
    if (Session.get("schoolRoutes") == null) {
        console.log("downloading schoolRoutes");
        url = "https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/21cfc45a-d2bf-448a-a883-210ee4a96d9a/download/skolerute.csv";
        var start = new Date().getTime();
        Papa.parse(url, { //Denne linken stopper å fungere August 2017 "http://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/32d52130-ce7c-4282-9d37-3c68c7cdba92/download/skolerute-2016-17.csv"
            download: true,
            header: true,
            complete: function (results) {
                console.log("download schoolRoutes complete");
                console.log(results)
                Session.set("schoolRoutes", results.data);
                console.log("schoolRoutes:", Session.get('schoolRoutes'));
                parseSecondData(callback);
                
            }
        });
        var end = new Date().getTime();
        console.log("Time Skolerute:",end-start);
        return;
    }
    parseSecondData(callback);
}

function parseSecondData(callback) {
    if (Session.get("schools") == null) {
        console.log("schools is null, downloading schools");
        url = "https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/12f0d499-6474-4fe4-b457-db976e52cb37/download/skoler.csv";
        var start = new Date().getTime();
        Papa.parse(url, { //"http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv"
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log("download schools complete");
                console.log(results)
                Session.set('schools', results.data);
                console.log("schools:", Session.get('schools'));
                if (callback && typeof callback == "function") {
                    console.log("running callback function");
                    callback();
                }
            }
        });
        var end = new Date().getTime();
        console.log("Time Skolerute:",end-start);
        return;
    }
    if (callback && typeof callback == "function") {
        callback();
    }
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function getSchoolData() {
    var schoolRoutes = Session.get("schoolRoutes");
    var schools = Session.get("schools");
    var data = [];


    for (var i = 0; i < schoolRoutes.length; i++) {
        var entry = schoolRoutes[i];
        if (data.length > 0) { // if data already has schools added to it
            var found = false;
            for (var j = 0; j < data.length; j++) {
                if (data[j].name == entry.skole) { // if the school name of the current object in data is the same as the current entry from ajax
                    found = true;
                    data[j].dates[entry.dato] = formatDato(entry); //adds date to data.dates array with the formatDato format
                }
            }
            if (!found) { //if school is not already in data array, add school and current entry's date
                data.push({name: entry.skole, dates: []});
                data[data.length - 1].dates[entry.dato] = formatDato(entry);
            }
        } else {
            data.push({name: entry.skole, dates: []});
            data[data.length - 1].dates[entry.dato] = formatDato(entry);
        }
    }

    loop1:
        for (var i = 0; i < schools.length; i++) {
            schools[i]['Datoer'] = [];
            for (var j = 0; j < data.length; j++) {

                if (schools[i].Skolenavn == data[j].name) {

                    schools[i].Datoer = data[j].dates;
                    continue loop1;
                }
            }
            schools.splice(i, 1);
            i--;
        }
    return schools;
}

function formatDato(entry) {
    var dayType = "";

    if (entry.elevdag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    if (entry.laererdag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    if (entry.sfodag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }
    return [dayType, entry.kommentar];
};

parseData();
