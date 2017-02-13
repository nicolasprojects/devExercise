// drag and drop

    var indexStart = null;
    var indexEnd = null;
    var dragSrcEl = null;

    function handleDragStart(e) {
      // drag a transparent row
      this.style.opacity = '0.4';
      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);

      // store the index for later
      indexStart = getChildIndex(this);
    }
    function handleDragOver(e) {
      if (e.preventDefault) {
        // Allows us to drop
        e.preventDefault();
      }

      // move the object while dragging
      e.dataTransfer.dropEffect = 'move';

      return false;
    }
    function handleDragEnter(e) {
      this.classList.add('over');
    }

    function handleDragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        // Stops the browser from redirecting
        e.stopPropagation();
      }

      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        // move the object in the array
        indexEnd = getChildIndex(this);
        move(objects, indexStart, indexEnd);
        // update the data base as the sortorder column has changed for many objects
        updateBack();
        // refresh the view
        updateFront();
      }

      return false;
    }

    function handleDragEnd(e) {
      // make it opaque again
      this.style.opacity = '1';

      var lis = document.querySelectorAll('li');
      [].forEach.call(lis, function (li) {
        li.classList.remove('over');
      });
    }