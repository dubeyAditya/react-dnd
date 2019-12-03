'use strict'
var dragged, dragdrop, dropTarget, droparea;
var marker = document.getElementById("innerDropZone")
marker.style.display = "none";
var innerMarker = marker.cloneNode();
document.addEventListener('drag', function(event) {});



document.addEventListener('dragstart', function(event) {
  console.log(event.target);
  dragged = event.target;
  event.target.style.opacity = 0.9;

});

document.addEventListener('dragenter', function(event) {

  if (event.target.className === "dropzone") {
    marker.style.display = "block";
  }


  if (event.target.className === "innerDropZone") {
    event.target.style.background = '#CCC';

  }

});

document.addEventListener('dragleave', function(event) {
  event.target.style.border = '';
  event.target.style.background = '';
  if (event.target.className === "item" && event.target.parentNode.className === "dropzone" || event.target.parentNode.className === "dropContainer") {

    if (event.clientY > droparea) {
      console.log("below");
      event.target.parentNode.appendChild(document.getElementById("innerDropZone"));
      event.stopPropagation();
    } else if (event.clientY < droparea) {
      console.log("above");
      event.target.parentNode.insertBefore(marker, event.target);
      event.stopPropagation();
    }

  }

});

document.addEventListener('dragexit', function(event) {});


document.addEventListener('dragend', function(event) {});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
  if (event.target.className === "innerDropZone") {
    //console.log(event.target);
    droparea = event.clientY;
    // console.log("over"+event.clientY);
  }
});

document.addEventListener('drop', function(event) {
  dropTarget = event.target;
  event.preventDefault();
  dropTarget.style.border = '';
  dropTarget.style.background = '';
  console.log(dragged.parentNode.className);
  if (dropTarget.className === "innerDropZone") {
    marker.style.display = "none";
    if (dragged.parentNode.className === 'dropzone') {
      dropTarget.parentNode.insertBefore(dragged, dropTarget);
    } else if (dragged.parentNode.className != 'dropzone') //get a new element which needs html from json
    {
      var node = dragged.cloneNode(true);
      var element = document.createElement("div");
      element.classList.add("item");
      element.setAttribute("draggable", "true");
      dropTarget.parentNode.insertBefore(element, dropTarget); // insert element container in DOM
      //  render a react component 
      React.render(
        React.createElement(node.textContent, null, node.textContent), element);
      console.log(node);
    }

    dropTarget.parentNode.appendChild(dropTarget); //appending marker at the end of container    
  } else {
    document.getElementById("dropZone").appendChild(marker);
    marker.style.display = "none";
  }

});

document.getElementById('clear').addEventListener('click', function(event) {
  var elements = document.getElementById("dropZone");
  for (var i = 0; i < elements.childNodes.length; i++) {
    elements.removeChild(elements.firstChild);
  }
  alert("Canvas Cleared....");
});
