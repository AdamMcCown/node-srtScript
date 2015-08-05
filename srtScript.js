var fs = require('fs'),
	args = process.argv.slice(2),
	srcPath = args[0],
	increment = parseInt(args[1], 10) || 0,
	backUpPath = srcPath.replace(/.srt$/i, "(ORIGINAL).srt"),	
	writeIncrementFunc;
	
//get data
readData(srcPath, function (data) {
	writeIncrementFunc = function () {
		return writeData(srcPath, incrementData(data, increment));
	};
	
	//save a back up if one doesn't already exist
	//then overwrite original data with incremented data
	fs.exists(backUpPath, function (exists) {
		if (!exists) {
			return writeData(backUpPath, data, writeIncrementFunc);
		} else {
			return writeIncrementFunc();
		}
	});
});

function readData(srcPath, cb) {
	fs.readFile(srcPath, 'ucs-2', function (err, data) {
		if (err) {
			throw err;
		}
		console.log("Read data from: " + srcPath);
		return cb(data);
	});
}	

function writeData(destPath, data, cb) {
	fs.writeFile(destPath, data, 'ucs-2', function (err) {
		if (err) {
			throw err;
		}
		console.log("Saved data to: " + destPath);
		return (cb ? cb() : null);
	});
}

/**
* Increments the data's time pattern (hh:mm:ss) by increment seconds
*
* @method incrementData
* @param {String || Buffer?} .srt data
* @param {Number} increment size (in seconds)
* @return {String} altered data where time pattern is incremented by increment seconds
*/
function incrementData(data, increment){
	data = data.toString().replace(/(\d\d)\:(\d\d)\:(\d\d)/g, function(timePattern, hours, minutes, seconds){
		var //times = timePattern.split(":"),
			date = new Date();
			newHour = 0;
			newMinute = 0;
			newSecond = 0;

		date.setHours(hours);
		date.setMinutes(minutes);
		date.setSeconds(Number(seconds) + increment);
		
		newHour = padLeftZero(date.getHours());
		newMinute = padLeftZero(date.getMinutes());
		newSecond = padLeftZero(date.getSeconds());
		
		return newHour + ":" + newMinute + ":" + newSecond;
	});
	return data;
}

/**
* Left pads a number between 0 and 9
*
* @method padLeftZero
* @param {Number} number to be padded
* @return {String || Number} returns original or padded number
*/
function padLeftZero(number) {
	if (number >= 0 && number <= 9) {
		return "0" + number;
	}
	return number;
}