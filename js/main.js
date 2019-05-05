window.onload = () => {
  $(document).ready(() => {
    home();
  });
};


function home() {
  let welcome_html =
  "<h1>Welkom op het project van de Mechelsesteenweg</h1>" +
    "<br>" +
    "<p>Hier kan je de luchtkwaliteit in de straat bekijken en informatie van het voertuigen, fietsers en voetgangers in de straat</p>" +
    "<br>" +
    "<p>Dit project is echter nog in volle ontwikkeling</p>";
  $('#main').empty();
  $('#main').append(welcome_html);
}

function luftdaten() {
  $.ajaxSetup({
    async: false
  });
  $(document).ready(function () {
    // let values = getFineParicles();
    // let humidityValues = getTemperatureAndHumidity();
    let html;
    let humidity;
    let temperature;
    let fineP1;
    let fineP2;
    let humiditydiv;
    let temperaturediv;
    let fineP1div;
    let fineP2div;
    let iframeHtml =
      "<div class='container-fluid full-height no-padding'>" +
      "<div class='row full-height no-padding'>" +
      "<div class='com-sm-3' id='calculatedvalues'></div>" +
      "<div class='col-sm-9 full-height no-padding'>" +
      "<iframe src='https://maps.luftdaten.info/#15/50.8915/4.6932' class='full-height full-width' id='iframe'></iframe>" +
      "</div>" +
      "</div>" +
      "</div>";
    $.getJSON('https://api.luftdaten.info/v1/sensor/24242/').done(function (data) {
      $.each(data, function (i, field) {
        humidity = field.sensordatavalues[0].value;
        temperature = field.sensordatavalues[1].value;
        console.log(field.sensordatavalues[0].value); //Humidity
        console.log(field.sensordatavalues[1].value); //Temperature
      })
    });
    $.getJSON('https://api.luftdaten.info/v1/sensor/24241/').done(function (data) {
      $.each(data, function (i, field) {
        if (field.sensordatavalues[0]) {
          fineP1 = field.sensordatavalues[0].value;
          fineP2 = field.sensordatavalues[1].value;
          console.log(fineP1 + "P1"); //P1
          console.log(fineP2 + "P2"); //P2
        }
      })
    });
    console.log("P1 " + fineP1 + "  P2 " + fineP2);
    if (fineP1 < 25.00) {
      fineP1div = '<div id="p1div" class="alert alert-success">Er zijn ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    } else if (fineP1 >= 25.00 && fineP1 < 50.00) {
      fineP1div = '<div id="p1div" class="alert alert-warning">Er zijn ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    } else {
      fineP1div = '<div id="p1div" class="alert alert-danger">Er zijn ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    }

    if (fineP2 < 25) {
      fineP2div = '<div id="p2div" class="alert alert-success">Er zijn ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    } else if (fineP2 >= 25 && fineP2 < 50) {
      fineP2div = '<div id="p2div" class="alert alert-warning">Er zijn ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    } else {
      fineP2div = '<div id="p2div" class="alert alert-danger">Er zijn ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    }

    if (humidity < 35) {
      humiditydiv = '<div id="humiditydiv" class="alert alert-danger">De luchtvochtigheid is ' + humidity + ' %</div>'
    } else if (humidity >= 35 && humidity < 70) {
      humiditydiv = '<div id="humiditydiv" class="alert alert-success">De luchtvochtigheid is ' + humidity + ' %</div>'
    } else {
      humiditydiv = '<div id="humiditydiv" class="alert alert-warning">De luchtvochtigheid is ' + humidity + ' %</div>'
    }

    if (temperature < 0) {
      temperaturediv = '<div id="temperaturediv" class="alert alert-primary">De temperatuur is ' + temperature + ' <supq>º</supq>C</div>'
    } else if (temperature >= 15 && temperature < 30) {
      temperaturediv = '<div id="temperaturediv" class="alert alert-success">De temperatuur is ' + temperature + ' <supq>º</supq>C</div>'
    } else {
      temperaturediv = '<div id="temperaturediv" class="alert alert-danger">De temperatuur is ' + temperature + ' <supq>º</supq>C</div>'
    }
    $('#main').empty();
    $('#main').html(iframeHtml);
    $('#calculatedvalues').append(fineP1div);
    $('#calculatedvalues').append(fineP2div);
    $('#calculatedvalues').append(humiditydiv);
    $('#calculatedvalues').append(temperaturediv);
  });
}

function telraam() {
  let html =
    "<div class='container-fluid full-height no-padding'>" +
    "<div class='row full-height no-padding'>" +
    "<div class='col-sm full-height no-padding'>" +
    "<div id='iframeOuter'>" +
    "<iframe src='https://telraam.net' class='full-height full-width' id='iframe'></iframe>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $('#main').empty();
  $('#main').html(html);
}

function information() {
  let information_html =
    "<div class='container-fluid full-height no-padding'>" +
    "<div class='row full-height no-padding'>" +
   "<div class='col-sm full-height no-padding'>" +
    "<div id='iframeOuter'>" +
    "<iframe src='https://telraam.net/nl/location/348180/2019-04-21/2019-05-05' class='full-height full-width' id='iframe'></iframe>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $('#main').empty();
  $('#main').html(information_html);
}
