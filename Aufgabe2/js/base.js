// Logik bitte hier
//'counter' und 'fadeControl' für rekursiven Funktionsaufruf
function showImage(counter, fadeControl) {
    "use strict";
    var image = document.getElementById("content_image");
    image.style.opacity = fadeControl / 100;
    fadeControl += 5;
    if (fadeControl <= 100) {
        window.setTimeout(function() {
            showImage(counter, fadeControl);
        }, 20);
    }
}

//'counter' und 'fadeControl' für rekursiven Funktionsaufruf
function fadeOut(counter, fadeControl) {
    "use strict";
    var parts = document.getElementsByClassName("part");
    //Deckkraft des Elements wird verringert
    parts[counter].style.opacity = fadeControl / 100;
    fadeControl -= 5;
    //einschließlich bis die neu zu berechnende Deckkraft = 0 ist, rekursiver Funktionsaufruf
    if (fadeControl >= 0) {
        window.setTimeout(function() {
            fadeOut(counter, fadeControl);
        }, 30);
    } else {
        //Element wird nicht mehr angezeigt
        parts[counter].style.display = "none";
        //Bild wird aus dem Element entfernt
        parts[counter].removeChild(document.getElementById("content_image"));
        //erhöhe den Zähler und beginne den Prozess erneut
        slide(++counter);
    }
}

//'counter' und 'fadeControl' für rekursiven Funktionsaufruf
function fadeIn(counter, fadeControl) {
    "use strict";
    var parts = document.getElementsByClassName("part");
    //Deckkraft des Elements wird erhöht
    parts[counter].style.opacity = fadeControl / 100;
    fadeControl += 5;
    //einschließlich bis die neu zu berechnende Deckkraft = 1 ist, rekursiver Funktionsaufruf
    if (fadeControl <= 100) {
        window.setTimeout(function() {
            fadeIn(counter, fadeControl);
        }, 30);
    } else {
        //setze die Bildquelle und zeige das 'content_image' an
        var image = document.getElementById("content_image");
        image.src = "img/content-image_" + counter + ".jpg";
        showImage(counter, 5);
        //warte 5 Sekunden und lasse dann das Element wieder verschwinden
        window.setTimeout(function() {
            fadeOut(counter, fadeControl);
        }, 5000);
    }
}

//Parameter 'counter' legt zu Beginn das Startelement fest und dient später der Iteration über die Elemente
function slide(counter) {
    "use strict";
    var parts = document.getElementsByClassName("part");
    //Wenn alle Elemente durchgelaufen sind, beginne neu
    if (counter === parts.length) {
        counter = 0;
    }
    //Platzhalter für ein Bild
    var image = document.createElement("img");
    image.style.opacity = 0;
    image.setAttribute("id", "content_image");
    parts[counter].insertBefore(image, parts[counter].childNodes[0]);
    //Element wird angezeigt, ist aber zunächst transparent
    parts[counter].style.opacity = 0;
    parts[counter].style.display = "block";
    //Element erscheinen lassen
    fadeIn(counter, 0);
}