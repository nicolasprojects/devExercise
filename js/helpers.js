
// helper functions
  
    // get the index of a child node
    function getChildIndex(child){
      var i = 0;
      while( (child = child.previousSibling) != null ) {
        i++;
      }
      return i;
    }

    // move an element inside an array
    function move(array, from, to){
      array.splice(to, 0, array.splice(from, 1)[0]);
    }

    // get the highest id
    function maxId(){
      var max = 0;
      var id;
      for (var i = 0; i<objects.length; i++){
        id = parseInt(objects[i].id);
        if (id > max){
          max = id;
        }
      }
      return max;
    }