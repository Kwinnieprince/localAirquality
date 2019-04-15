function home() {
  let html;

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
    $.getJSON('https://api.luftdaten.info/v1/sensor/24242/',function (data){
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

    $('#main').html(fineP1div);
    $('#main').html(fineP2div);
    
  })
}

function telraam() {
  let html;

}
