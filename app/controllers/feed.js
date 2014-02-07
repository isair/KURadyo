$.feed.open();

var needLoading = true;

$.backButton.addEventListener("click", function(e)
{
    Alloy.createController("index").getView().open();
});

function getDayTagStart(html, previousDayTagEnd, dayTextIndex)
{
    return previousDayTagEnd + html.substring(previousDayTagEnd, dayTextIndex).lastIndexOf("<div class=\"yazi\">");
}

function getDayTagEnd(html, dayTextIndex)
{
    return dayTextIndex + html.substring(dayTextIndex, html.length).indexOf("</div>") + 6;
}

$.feedPage.addEventListener("load", function(e)
{
    if (!needLoading) return;

    needLoading = false;
    $.feedPage.visible = false;

    var html = $.feedPage.html;
    var previousDayTagEnd = 0;
    var dayTexts = ["Pazartesi<", "Salı<", "Çarşamba<", "Perşembe<", "Cuma<",
                    "Cumartesi<", "Pazar<"];
    var programmeTexts = [];

    for (i = 0; i < dayTexts.length; i++)
    {
        var dayTextIndex = html.indexOf(dayTexts[i]);
        var dayTagEnd = getDayTagEnd(html, dayTextIndex);
        var nextDayTextIndex = 0;
        var nextDayTagStart = 0;

        if (i == dayTexts.length - 1)
        {
            nextDayTagStart = html.length;
        }
        else
        {
            nextDayTextIndex = html.search(dayTexts[i + 1]);
            nextDayTagStart = getDayTagStart(html, dayTagEnd, nextDayTextIndex);
        }

        programmeTexts.push(html.substring(dayTagEnd, nextDayTagStart));
    }

    var nhtml = "<html><head><meta name='viewport' content='width=device-width' />" +
    // Add script.
    "<script style='text/javascript'>" +
    "  var programmes = [";

    for (i = 0; i < programmeTexts.length; i++)
    {
        nhtml += "'" + encodeURI(programmeTexts[i].replace(/'/g, "&#039;")) + "'";
        if (i != programmeTexts.length - 1) nhtml += ", ";
    }

    nhtml += " ]; function display(i) {" +
    "    document.getElementById('container').innerHTML = decodeURI(programmes[i]);" +
    "    for (var j = 0; j < 7; j++) {" +
    "      if (j == i) { document.getElementById(j).setAttribute('class', 'selected');" +
    "      } else { document.getElementById(j).setAttribute('class', ''); }" +
    "    }" +
    "  }" +
    "</script>" +
    // Add styles.
    "<style>table{padding-left:5%} #container{border: 1px solid black;padding:5px} " +
    "#menu > div{border: 1px solid black;background-color:black;" +
    "color:white;text-align:center;padding:4% 0 4% 0} #menu > .selected{border-right:0px;background-color:white;color:black}</style></head><body>" +
    // Add the rest.
    "<table width='90%' cellpadding='0' cellspacing='0'><tr><td width='33%' valign='top'>" +
    "<div id='menu'><div class='selected' id='0' onclick='display(0)'>Monday</div><div id='1' onclick='display(1)'>Tuesday</div>" +
    "<div id='2' onclick='display(2)'>Wednesday</div><div id='3' onclick='display(3)'>Thursday</div><div id='4' onclick='display(4)'>Friday</div>" +
    "<div id='5' onclick='display(5)'>Saturday</div><div id='6' onclick='display(6)'>Sunday</div></div></td><td id='container'>" + programmeTexts[0] +  "</td>" +
    "</tr></table>";

    $.feedPage.html = nhtml;
    $.feedPage.visible = true;
});
