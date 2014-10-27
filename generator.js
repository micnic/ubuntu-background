var fs = require('fs'),
	path = require('path');

fs.readdir('/usr/share/backgrounds', function (error, files) {

	var content = '';

	content += '<background>\n';
	content += '\t<starttime>\n';
	content += '\t\t<year>1970</year>\n';
	content += '\t\t<month>01</month>\n';
	content += '\t\t<day>01</day>\n';
	content += '\t\t<hour>00</hour>\n';
	content += '\t\t<minute>00</minute>\n';
	content += '\t\t<second>00</second>\n';
	content += '\t</starttime>\n';

	files.filter(function (element) {
		return /\.jpg$/.test(element);
	}).forEach(function (element, index, array) {

		var current = path.join('/usr/share/backgrounds', element);

		content += '\t<static>\n';
		content += '\t\t<duration>55.0</duration>\n';
		content += '\t\t<file>' + current + '</file>\n';
		content += '\t</static>\n';

		content += '\t<transition>\n';
		content += '\t\t<duration>3.0</duration>\n';
		content += '\t\t<from>' + current + '</from>\n';

		if (index < array.length - 1) {
			content += '\t\t<to>' + path.join('/usr/share/backgrounds', array[index + 1]) + '</to>\n';
		} else {
			content += '\t\t<to>' + path.join('/usr/share/backgrounds', array[0]) + '</to>\n';
		}

		content += '\t</transition>\n';
	});

	content += '</background>';

	fs.writeFile('/usr/share/backgrounds/contest/generated.xml', content);
});