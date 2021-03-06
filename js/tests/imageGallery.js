//DropBox Interview
var imgThumbs = ['http://placehold.it/400x400/f0d/f',
'http://placehold.it/300x350/00d/f',
'http://placehold.it/300x200/0df/f',
'http://placehold.it/350x300/fd0/f',
'http://placehold.it/200x300/9d0/f'];
var imgFull = [
'http://placehold.it/300x300/f0d/f',
'http://placehold.it/600x700/00d/f',
'http://placehold.it/600x400/0df/f',
'http://placehold.it/700x600/fd0/f',
'http://placehold.it/400x600/9d0/f'];

var myGallery, thumbnails, largePreview;

function setSelected (el) {
	var ls = thumbnails.querySelectorAll('.thumb');
	ls.forEach(function(thumb){
		thumb.classList.remove('selected');
	});
	el.classList.add('selected');
	var i = el.dataset.i;
	//  TODO: reuse large email rather than regenerate by hiding the next time or prerendering all
	var img = new Image();
	img.src = imgFull[i];
	largePreview.innerHTML = "";
	largePreview.appendChild(img);
}

// requirements: thumbs are original size and clipped in the center of the 100by100 container
export function imageGallery () {
	myGallery = document.getElementById('myGallery');
	thumbnails = myGallery.querySelector('.thumbnails');
	largePreview = myGallery.querySelector('.largePreview');
	
	imgThumbs.forEach(function(url, index){
	  var el = document.createElement('div');
	  var img = new Image();
	  img.src = url;
	  el.appendChild(img);
	  el.classList.add('thumb');
	  el.dataset.i = index;
	  thumbnails.appendChild(el);

	  if(index === 0){
	    setSelected(el);
	  }
	  el.addEventListener('click', function(event){
		setSelected(el);
	  });
	});

	return {
		description: 'a clickable gallery of images',
		value: ''
	};
 }