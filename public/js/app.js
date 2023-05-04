function request() {
  var xhr = new XMLHttpRequest();
  var url = "https://UnpleasantRectangularInstructionset.f-alotaibi.repl.co/gen";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      try {
        var sUrl = `${data.message}`;
        var isCreated = `${data.iscreated}`;
        if (isCreated == "true") {
          document.getElementById('sUrl').innerHTML = `Shortened Url: 
						<a href="${sUrl}" target="_blank">${sUrl}</a><br>`;
        } else {
          document.getElementById('sUrl').innerHTML = `${sUrl}<br>`;
        }
      } catch (err) {
        document.getElementById('sUrl').innerHTML = `${err}<br>`;
      }
    }
  };
  document.getElementById('sUrl').innerHTML = `Shortening...<br>`;
  var data1 = JSON.stringify({
    'url_name': document.getElementById("urlBox").value
  });
  xhr.send(data1);
}