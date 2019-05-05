function home() {
  let html;
  $('#main').empty();
}

function luftdaten() {
  $(document).ready(function () {
    toggleDropdown();
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
    $.getJSON('https://api.luftdaten.info/v1/sensor/24242/').done(function (data){
      $.each(data, function (i, field) {
        humidity = field.sensordatavalues[0].value;
        temperature = field.sensordatavalues[1].value;
        console.log(field.sensordatavalues[0].value); //Humidity
        console.log(field.sensordatavalues[1].value); //Temperature
      })
    });
    $.getJSON('https://api.luftdaten.info/v1/sensor/24241/').done(function (data){
      $.each(data, function (i, field) {
        if (field.sensordatavalues[0]){
          fineP1 = field.sensordatavalues[0].value;
          fineP2 = field.sensordatavalues[1].value;
          console.log(fineP1 + "P1"); //P1
          console.log(fineP2 + "P2"); //P2
        }
      })
    });
    setTimeout( function(){
    console.log("P1 " + fineP1 + "  P2 " + fineP2);

    if (fineP1 < 25.00){
      fineP1div = '<div id="p1div" class="alert alert-succes">Er is ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    }else if (fineP1 >= 25.00 && fineP1 < 50.00 ){
      fineP1div = '<div id="p1div" class="alert alert-danger">Er is ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    } else {
      fineP1div = '<div id="p1div" class="alert alert-danger">Er is ' + fineP1 + ' mg/m<sup>3</sup> aan partikels van 2.5 &#181;m</div>'
    }

    if (fineP2 < 25){
      fineP2div = '<div id="p2div" class="alert alert-succes">Er is ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    }else if (fineP2 >= 25 && fineP2 < 50 ){
      fineP2div = '<div id="p2div" class="alert alert-danger">Er is ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    } else {
      fineP2div = '<div id="p2div" class="alert alert-danger">Er is ' + fineP2 + ' mg/m<sup>3</sup> aan partikels van 10 &#181;m</div>'
    }

    $('#main').empty();
    $('#main').html(iframeHtml);
    $('#calculatedvalues').append(fineP1div);
    $('#calculatedvalues').append(fineP2div);
  }, 1000);
  })
}

// function getFineParicles() {
//   $.getJSON('https://api.luftdaten.info/v1/sensor/24241/').done(function (data){
//     $.each(data, function (i, field) {
//       if (field.sensordatavalues[0]){
//         let values = [2];
//         return field.sensordatavalues[0].value; // P1
//         // values[1] = field.sensordatavalues[1].value; //P2
//         // return values;
//       }
//     })
//   });
// }

// function getTemperatureAndHumidity() {
//   $.getJSON('https://api.luftdaten.info/v1/sensor/24242/').done(function (data){
//     $.each(data, function (i, field) {
//       let valuesTemp = [2];
//       values[0] = field.sensordatavalues[0].value; // humidity
//       values[1] = field.sensordatavalues[1].value; // temperature
//       return valuesTemp;
//     })
//   });
// }

function telraam() {
  toggleDropdown();
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
  // removeFooter();
}

function removeFooter(){
  $(document).ready(function(){
    $('#iframe').contents().find('footer.site-footer.no-top-margin').remove();
    $('#iframe').contents().find('section.navigation').remove();

    // $("footer.site-footer.no-top-margin ").empty();
    // $("section.navigation").empty();
  });
}

function information() {
  toggleDropdown();
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

function toggleDropdown() {

}
