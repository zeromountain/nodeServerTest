document.querySelector('button').addEventListener('click', function() {
  var inputdata = document.forms[0].elements[0].value
  sendAjax('http://127.0.0.1:3000/ajax_send_email', inputdata)
})

function sendAjax(url, data) {
  var data = {'email' : data}
  data = JSON.stringify(data);

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', "application/json")
  xhr.send(data)

  xhr.addEventListener('load', function () {
    var result = JSON.parse(xhr.responseText);
    if(result.result !== "ok") return;
    document.querySelector("div").innerHTML = result.email;
    // console.log(xhr.responseText)
  })
}