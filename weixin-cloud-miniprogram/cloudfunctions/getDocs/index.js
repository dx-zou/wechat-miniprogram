// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const db = cloud.database();
	const _ = db.command
	const res = await db.collection('docs').where(_.and([
		{ label: event.label },
		{
			_id: event.id
		}
	])).get();
	return {
		data: res.data,
	};
};
