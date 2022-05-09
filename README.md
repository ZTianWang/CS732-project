# CS732-project

获取帖子列表：/eepost/getByEntry/:entry_id 
json数组或空数组
第一页：{count:5,eeposts[{},{}]}
第二页：[{},{}]

添加帖子(post)：/eepost/add, 
        entry_id,
        entry_title,
        content,
        user_id,(数据库id)
        user_name
201

删除帖子(get)：/eepost/delete/:id, 
202

更新帖子：/eepost/update    （id,content)   返回202/404    
帖子存在：202

点赞：/eepost/like/:id
返回204

分页？

await Eepost.findByIdAndUpdate(post_id,{$push: {comments:result._id}})
