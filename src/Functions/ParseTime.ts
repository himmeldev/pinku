export const ParseTime = (ms: number) => {
	const moment = require("moment");
	require("moment-duration-format");
	return moment.duration(ms).format("Y [Years], M [Months], D [Days], H [Hours], m [Mins], s [Seconds]");
};
