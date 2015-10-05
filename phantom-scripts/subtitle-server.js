var page = require('webpage').create();
var fs = require('fs');
page.viewportSize = { width: 1300, height: 215 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7';
page.clipRect = {
        top: 0,
        left: 0,
        width: 1280,
        height: 720
};

var webserver = require('webserver');
var server = webserver.create();
var renderInterval = false;
var currentResponse = false;

var service = server.listen(8081, function(request, response) {
  subtitleEvent = request.url.replace(/^\/([a-z0-9_.-]+).*/i, "$1");

  // FOR TESTING YOU CAN HARD-CODE YOUR EVENT NAME HERE:
  // subtitleEvent = "IHaveADream";


  if (!subtitleEvent) {
	response.writeHead("404", "Please use http://127.0.0.1:8081/EventName");
	response.write("");
	request.close();
	return;
  }

  if (renderInterval) {
    clearInterval(renderInterval);
  }
  if (currentResponse) {
    currentResponse.close();
  }
  currentReponse = response;
  response.setEncoding('binary');
  response.writeHead("200", 
	{
	"Content-Type" : "multipart/x-mixed-replace; boundary=myboundary",
	"Cache-Control" : "no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0",
	"Connection" : "close",
	"Pragma" : "no-cache"
	}
  );
  console.log("Opening embed");
  page.open('streamtext-embed.html?event='+subtitleEvent, function () {
	var i = 0;
	var imageSize = 0;
	var imageContent = "";
        renderInterval = window.setInterval(function () {
		if (i % 4 == 0 ) {
			// We need 10fps to make Wirecast realise we're a genuine stream, but we don't want
			// to actually snapshot our page 10 times a second - that'd be wasteful.
			// So we do it every 4 frames instead.
			i = 0;
			imageContent = window.atob(page.renderBase64('JPEG'));
			imageSize = imageContent.length;
		}
		i++;

		var responseString = "";
		responseString += "\r\n";
		responseString += "--myboundary\r\n";
		responseString += "Content-Type: image/jpeg\r\n";
		responseString += "Content-Length: "+imageSize+"\r\n"
		responseString += "\r\n";

		response.write(responseString);
		response.write(imageContent);
		response.write("\r\n");
		response.write("\r\n");
        }, 100);
  });
});
