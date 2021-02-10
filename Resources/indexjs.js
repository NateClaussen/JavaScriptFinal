/*function getImagesFromFolder(folder) {
    var imageArray = [];
    $.ajax({
        url: folder,
        success: function(data) {
            $(data).find('a').attr("href", function(i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    imageArray.append(folder + val);
                    //$("body").append( "<img src='"+ folder + val + "'>'");
                }
            });
        }
    });
    return imageArray;
}

var allPictures = getImagesFromFolder(location.href.replace(/[^/]*$/, '') + "/resources/images/images/");
for (var i = 0; i < allPictures.length; i++) {
    console.log(allPictures[i]);
}*/

//var fs = require('fs');
//var files = fs.readdirSync('/Final/resources/images/');

var findImages = function() {
    var parentDir = "./resource/images/images/";
    var fileCrowler = function(data) {
        var titlestr = $(data).filter('title').text();
        // "Directory listing for /Resource/materials/xxx"
        var thisDirectory = titlestr.slice(titlestr.indexOf('/'), titlestr.length)
            //List all image file names in the page
        $(data).find("a").attr("href", function(i, filename) {
            if (filename.match(/\.(jpe?g|png|gif)$/)) {
                var fileNameWOExtension = filename.slice(0, filename.lastIndexOf('.'))
                var img_html = "<img src='{0}' id='{1}' alt='{2}' width='75' height='75' hspace='2' vspace='2' onclick='onImageSelection(this);'>".format(thisDirectory + filename, fileNameWOExtension, fileNameWOExtension);
                //$("#image_pane").append(img_html);
                console.log(img_html);
            } else {
                $.ajax({
                    url: thisDirectory + filename,
                    success: fileCrowler
                });
            }
        });
    }

    $.ajax({
        url: parentDir,
        success: fileCrowler
    });
}
window.setInterval(findImages, 10000);