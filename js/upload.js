// upload
    
    // the input the user uses to select the image
    var input = document.getElementById("images");
    var formdata = false;

    // verify whether we can hide the submit button
    if (window.FormData) {
      formdata = new FormData();
      document.getElementById("btn").style.display = "none";
    }

    // show the uploaded image in the modal
    function showUploadedItem (source) {
      $('.modal-body img').attr("src", source);
    }
    // show error
    function showDimensionsError () {
      return $('.modal-body #alert').text("Incorrect dimensions. (320x320 max)");
    }
    // show error
    function hideDimensionsError () {
      return $('.modal-body #alert').text("");
    }

    // change event is triggered when the user selects a file
    if (input.addEventListener) {
      input.addEventListener("change", function (evt) {
        var i = 0, len = this.files.length, img, reader, file;
        
        // upload every selected file
        for ( ; i < len; i++ ) {
          file = this.files[i];

          tempItem.image = "uploads/" + file.name;
        
          // if file is an image
          if (!!file.type.match(/image.*/)) {
    
            if ( window.FileReader ) {
              // read the file
              reader = new FileReader();
              reader.onloadend = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function(){
                  // once the reading finishes, show the image in the modal
                  if (this.width > 320 || this.height > 320){
                    showDimensionsError();
                  }else{
                    hideDimensionsError();
                    showUploadedItem(e.target.result);
                  }
                }

              };
              reader.readAsDataURL(file);
            }
            if (formdata) {
              formdata.append("images[]", file);
            }

          } 
        }

        // use ajax to upload the file
        if (formdata) {
          $.ajax({
            url: "server/uploadFile.php",
            type: "POST",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (res) {
            },
            error: function (xhr, ajaxOptions, thrownError) {
              console.log("ERROR 2");
            }
          });
        }
          
      }, false);

    }