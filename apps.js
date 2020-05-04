//

const apps = {
	app: './src/index.tsx',
};

const getDevApplication = (app) => {
	if (app === 'all' || app.includes(',')) {return getApplicationsToBeBuilt(app, true);}
	const entry = {[app]: apps[app] || apps.app};
	if (!entry.app) {entry.app = apps[app] || apps.app;}
	console.log(`Developing the ${JSON.stringify(entry)} app.`);
	return entry;
};

const getApplicationsToBeBuilt = (env, dev = false) => {
	if (!env || env === 'all') {
		console.log(`${dev ? 'Developing' : 'Building'} All Available Applications:`);
		console.log(JSON.stringify(apps, undefined, '\t'));
		return apps;
	}
	const entry = {};
	const invalid = [];
	env.split(',').map(app => apps[app] ? entry[app] = apps[app] : invalid.push(app));
	console.log(`Applications to be ${dev ? 'developed' : 'built'}:`);
	invalid.length > 0 && console.error('> Invalid Applications:', invalid);
	console.log(JSON.stringify(entry, undefined, '\t'));
	return Object.keys(entry).length === 0 ? {app: apps.app} : entry;
};

module.exports = {
	apps,
	getDevApplication,
	getApplicationsToBeBuilt,
};
