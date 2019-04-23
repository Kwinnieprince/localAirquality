function home() {
  let html;
  $('#main').empty();
}

function luftdaten() {
  $(document).ready(function () {
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
        console.log(field.sensordatavalues[0].value); //Hunidity
        console.log(field.sensordatavalues[1].value); //Tenperature
      })
    });

    $.getJSON('https://api.luftdaten.info/v1/sensor/24241/').done(function (data){
      $.each(data, function (i, field) {
        if (field.sensordatavalues[0]){
          fineP1 = field.sensordatavalues[0].value;
          fineP2 = field.sensordatavalues[1].value;
          console.log(field.sensordatavalues[0]); //P1
          console.log(field.sensordatavalues[1]); //P2
        }
      })
    });
    
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
  })
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
  removeFooter();
}

function removeFooter(){
  $(document).ready(function(){
    $('#iframe').contents().find('footer.site-footer.no-top-margin').remove();
    $('#iframe').contents().find('section.navigation').remove();

    // $("footer.site-footer.no-top-margin ").empty();
    // $("section.navigation").empty();
  });

}
