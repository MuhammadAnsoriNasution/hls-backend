'use strict';

import util from 'util'
import child_process from 'child_process';
import fs from 'fs'
import path from 'path';

const exec = util.promisify(child_process.exec);

const dir = path.join(__dirname, '../songs');
const dest = path.join(__dirname, '../temp/chunks');

const startTime = new Date();
console.info('> Start reading files', startTime);

fs.readdir(dir, (readDirError, files) => {
	if (readDirError) {
		console.error(readDirError);

		return;
	}

	const countFiles = files.length;
	files.map(async (file, index) => {
		const fileName = path.join(dir, file);
		const name = file.replace('.mp3', '').replace('.mp4', '')
		const { stdout, stderr } = await exec(`ffmpeg -i ${fileName} -profile:v baseline -level 3.0  -hls_time 10 -hls_list_size 0 -f hls  ${dest}/${name}.m3u8`);

		if (countFiles - 1 === index) {
			const endTime = new Date();
			console.info('< End Preparing files', endTime);
		}
	});
});