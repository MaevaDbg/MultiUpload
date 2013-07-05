function handleFiles(files) {
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
	output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
		f.size, ' bytes, last modified: ',
		f.lastModifiedDate.toLocaleDateString(), '</li>');

	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

	// Only process image files.
	if (!f.type.match('image.*')) {
		continue;
	}

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = (function(theFile) {
		return function(e) {
			// Render thumbnail.
			var span = document.createElement('span');
			span.innerHTML = ['<img class="thumb" src="', e.target.result,
			'" title="', escape(theFile.name), '"/>'].join('');
			document.getElementById('list').insertBefore(span, null);
		};
	})(f);

	// Read in the image file as a data URL.
	reader.readAsDataURL(f);
    }
}
function handleFileSelect(files) {
	var files = this.files; // FileList object

	handleFiles(files);
}

function handleFileDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    handleFiles(files);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd and selecction listeners.
var dropZone = document.getElementById('upload_files');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileDrop, false);
document.getElementById('upload_files').addEventListener('change', handleFileSelect, false);
