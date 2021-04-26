// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
/**
 * 查询符合条件的文档信息
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext();
	const db = cloud.database();
	const _ = db.command
	const size = 10; // 每页条数
	const { label, id, content = '.', current = 1, favorites } = event

	const params = [
		{ label },
		{
			_id: id
		},
		{
			content: db.RegExp({
				regexp: content,
				options: 'i'
			})
		}
	]
	if (favorites) {
		// 查询我的收藏文档
		params.push({
			_id: _.in(favorites)
		})
	}
	const fun = db.collection('docs').where(_.and(params));

	// 符合条件的总条数
	const { total } = await fun.count()
	// 总页数
	const totalPage = Math.ceil(total / size)
	const res = await fun.orderBy('createTime', 'desc').skip((current - 1) * size).limit(size).get()
	return {
		totalPage,
		data: res.data,
		openid: OPENID,
		appid: APPID,
		unionid: UNIONID,
	};
};
